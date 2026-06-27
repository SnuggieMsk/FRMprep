/* FRM Part I Study Hub — single-page study app
   Works hosted (GitHub Pages) or opened locally; all content is in content.js */
(function () {
  "use strict";

  var DATA = window.STUDY_CONTENT || { chapters: [], readme: "" };
  var CH = DATA.chapters;
  var PAPERS = DATA.papers || [];
  var PRIMER = DATA.primer || "";
  var EXCEL = DATA.excel || "";
  var VIEWS = [
    { key: "notes", label: "Notes", ico: "📖" },
    { key: "flashcards", label: "Flashcards", ico: "🃏" },
    { key: "questions", label: "Quiz", ico: "📝" }
  ];

  // ---------- Math (KaTeX) + Markdown ----------
  function protectMath(src, store) {
    function take(re, forceDisplay) {
      src = src.replace(re, function (m, tex, offset, full) {
        var disp = forceDisplay;
        if (disp == null) {
          var before = full.slice(0, offset), after = full.slice(offset + m.length);
          var bl = before.slice(before.lastIndexOf("\n") + 1);
          var ai = after.indexOf("\n"); var al = ai < 0 ? after : after.slice(0, ai);
          disp = bl.trim() === "" && al.trim() === "";
        }
        var html;
        if (window.katex) {
          try { html = katex.renderToString(tex.trim(), { displayMode: disp, throwOnError: false }); }
          catch (e) { html = esc(m); }
        } else { html = esc(m); }
        store.push(html);
        return " " + (store.length - 1) + " ";
      });
    }
    take(/\$\$([\s\S]+?)\$\$/g, null);
    take(/\\\[([\s\S]+?)\\\]/g, true);
    take(/\\\(([\s\S]+?)\\\)/g, false);
    return src;
  }
  function restoreMath(html, store) {
    return html.replace(/(\d+)/g, function (_, i) { return store[+i] || ""; });
  }
  if (window.marked && marked.setOptions) {
    marked.setOptions({ gfm: true, breaks: false, headerIds: true, mangle: false });
  }
  function md(src) {
    if (!src) return "";
    var store = []; src = protectMath(src, store);
    var html = null;
    if (window.marked) { try { html = marked.parse(src); } catch (e) {} }
    if (html == null) {
      html = "<pre>" + src.replace(/[&<>]/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c];
      }) + "</pre>";
    }
    return restoreMath(html, store);
  }
  function inlineMd(src) {
    src = src || "";
    var store = []; src = protectMath(src, store);
    var html = null;
    if (window.marked && marked.parseInline) { try { html = marked.parseInline(src); } catch (e) {} }
    if (html == null) html = esc(src);
    return restoreMath(html, store);
  }

  // ---------- Number helpers ----------
  function inr(x) {
    if (!isFinite(x)) return "—";
    var neg = x < 0; x = Math.round(Math.abs(x));
    var s = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (neg ? "-$" : "$") + s;
  }
  function inrDec(x) { // two decimals, grouped
    if (!isFinite(x)) return "—";
    var neg = x < 0, a = Math.abs(x), whole = Math.floor(a);
    var s = whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var dec = (a - whole).toFixed(2).slice(1);
    return (neg ? "-$" : "$") + s + dec;
  }
  function pct(x, d) { return (isFinite(x) ? (x).toFixed(d == null ? 2 : d) : "—") + "%"; }

  // ---------- Progress (localStorage) ----------
  var PKEY = "frm_progress_v1";
  function loadProgress() { try { return JSON.parse(localStorage.getItem(PKEY)) || {}; } catch (e) { return {}; } }
  function saveProgress(p) { try { localStorage.setItem(PKEY, JSON.stringify(p)); } catch (e) {} }
  var progress = loadProgress();
  function progKey(num, view) { return num + ":" + view; }
  function isDone(num, view) { return !!progress[progKey(num, view)]; }
  function totalUnits() { return CH.length * VIEWS.length; }
  function doneCount() { return Object.keys(progress).filter(function (k) { return progress[k]; }).length; }
  function updateProgressUI() {
    var pctv = totalUnits() ? Math.round(doneCount() / totalUnits() * 100) : 0;
    var f = document.getElementById("progressFill");
    var t = document.getElementById("progressPct");
    if (f) f.style.width = pctv + "%";
    if (t) t.textContent = pctv + "%";
  }

  // ---------- Theme ----------
  var TKEY = "frm_theme";
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    var b = document.getElementById("themeBtn");
    if (b) b.textContent = t === "dark" ? "☀️" : "🌙";
    try { localStorage.setItem(TKEY, t); } catch (e) {}
  }
  (function initTheme() {
    var saved; try { saved = localStorage.getItem(TKEY); } catch (e) {}
    // Default to the light reading theme; only use dark if the user chose it.
    applyTheme(saved === "dark" ? "dark" : "light");
  })();

  // ---------- Reading text size ----------
  var FKEY = "frm_readscale", readScale = 1;
  function applyScale(s) {
    readScale = Math.max(0.85, Math.min(1.45, Math.round(s * 100) / 100));
    // rem-based reading text scales; fixed-px chrome stays put
    document.documentElement.style.fontSize = (16 * readScale).toFixed(2) + "px";
    try { localStorage.setItem(FKEY, String(readScale)); } catch (e) {}
  }
  (function initScale() { var s; try { s = parseFloat(localStorage.getItem(FKEY)); } catch (e) {} applyScale(isFinite(s) && s ? s : 1); })();

  // ---------- Helpers ----------
  function chapterByNum(num) { for (var i = 0; i < CH.length; i++) if (CH[i].num === num) return CH[i]; return null; }
  function esc(s) { return (s || "").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  /* =====================================================================
     TIME-VALUE-OF-MONEY MATH (matches Excel/Calc PV, FV, PMT, NPER, RATE)
     ===================================================================== */
  function tvmFV(rate, nper, pmt, pv, type) {
    pmt = pmt || 0; pv = pv || 0; type = type || 0;
    if (rate === 0) return -(pv + pmt * nper);
    var p = Math.pow(1 + rate, nper);
    return -(pv * p + pmt * (1 + rate * type) * (p - 1) / rate);
  }
  function tvmPV(rate, nper, pmt, fv, type) {
    pmt = pmt || 0; fv = fv || 0; type = type || 0;
    if (rate === 0) return -(fv + pmt * nper);
    var p = Math.pow(1 + rate, nper);
    return -(fv + pmt * (1 + rate * type) * (p - 1) / rate) / p;
  }
  function tvmPMT(rate, nper, pv, fv, type) {
    pv = pv || 0; fv = fv || 0; type = type || 0;
    if (rate === 0) return -(pv + fv) / nper;
    var p = Math.pow(1 + rate, nper);
    return -(pv * p + fv) * rate / ((1 + rate * type) * (p - 1));
  }
  function tvmNPER(rate, pmt, pv, fv, type) {
    pmt = pmt || 0; pv = pv || 0; fv = fv || 0; type = type || 0;
    if (rate === 0) return -(pv + fv) / pmt;
    var a = pmt * (1 + rate * type) / rate;
    return Math.log((a - fv) / (a + pv)) / Math.log(1 + rate);
  }
  function tvmRATE(nper, pmt, pv, fv, type) {
    // bisection on FV residual
    type = type || 0;
    function f(r) { return tvmFV(r, nper, pmt, pv, type) - fv; }
    var lo = -0.9999, hi = 1.0, flo = f(lo), fhi = f(hi), mid, fm, i;
    if (flo * fhi > 0) { hi = 10; fhi = f(hi); if (flo * fhi > 0) return NaN; }
    for (i = 0; i < 200; i++) {
      mid = (lo + hi) / 2; fm = f(mid);
      if (Math.abs(fm) < 1e-7 || (hi - lo) < 1e-10) return mid;
      if (flo * fm < 0) { hi = mid; fhi = fm; } else { lo = mid; flo = fm; }
    }
    return mid;
  }

  /* =====================================================================
     SAFE EXPRESSION EVALUATOR (basic calculator) — recursive descent
     ===================================================================== */
  function calcEval(expr) {
    var s = String(expr).replace(/×/g, "*").replace(/÷/g, "/").replace(/,/g, "").replace(/\s+/g, "");
    var i = 0;
    function peek() { return s[i]; }
    function num() {
      var start = i;
      while (i < s.length && /[0-9.]/.test(s[i])) i++;
      return parseFloat(s.slice(start, i));
    }
    function primary() {
      if (s[i] === "(") { i++; var v = expression(); if (s[i] === ")") i++; return v; }
      if (s[i] === "-") { i++; return -primary(); }
      if (s[i] === "+") { i++; return primary(); }
      return num();
    }
    function power() { var b = primary(); if (s[i] === "^") { i++; return Math.pow(b, power()); } return b; }
    function term() {
      var v = power();
      while (i < s.length) {
        if (s[i] === "*") { i++; v *= power(); }
        else if (s[i] === "/") { i++; v /= power(); }
        else if (s[i] === "%") { i++; v = v / 100; }
        else break;
      }
      return v;
    }
    function expression() {
      var v = term();
      while (i < s.length) {
        if (s[i] === "+") { i++; v += term(); }
        else if (s[i] === "-") { i++; v -= term(); }
        else break;
      }
      return v;
    }
    var r = expression();
    if (i < s.length) throw new Error("bad");
    return r;
  }

  /* =====================================================================
     FLOATING FINANCIAL CALCULATOR
     ===================================================================== */
  var calcBuilt = false;
  function buildCalculator() {
    if (calcBuilt) return; calcBuilt = true;
    var fab = document.createElement("button");
    fab.id = "calcFab"; fab.className = "fab"; fab.title = "Financial calculator (c)";
    fab.innerHTML = "🧮";
    document.body.appendChild(fab);

    var panel = document.createElement("div");
    panel.id = "calcPanel"; panel.className = "calc-panel"; panel.hidden = true;
    panel.innerHTML =
      '<div class="calc-head"><strong>🧮 Financial Calculator</strong>'
      + '<span class="calc-sub">matches Excel PV / FV / PMT</span>'
      + '<button class="calc-close" id="calcClose">✕</button></div>'
      + '<div class="calc-tabs">'
      + '<button class="calc-tab active" data-ctab="tvm">TVM</button>'
      + '<button class="calc-tab" data-ctab="finance">Finance</button>'
      + '<button class="calc-tab" data-ctab="basic">Basic</button>'
      + '</div>'
      + '<div class="calc-body">'
      // ---- TVM ----
      + '<div class="calc-pane" data-pane="tvm">'
      + '<p class="calc-tip">Fill any four, then press <b>CPT</b> next to the one you want. '
      + '💡 Money you <b>pay out</b> is negative; money you <b>receive</b> is positive.</p>'
      + tvmRow("N", "nper", "periods (years or months)")
      + tvmRow("I/Y %", "rate", "interest rate per period")
      + tvmRow("PV", "pv", "present value / today")
      + tvmRow("PMT", "pmt", "payment each period")
      + tvmRow("FV", "fv", "future value / goal")
      + '<label class="calc-mode"><input type="checkbox" id="tvmType"> Payments at <b>beginning</b> of period (annuity-due)</label>'
      + '<div class="calc-actions"><button id="tvmClear" class="calc-btn ghost">Clear all</button>'
      + '<span class="calc-out" id="tvmOut"></span></div>'
      + '</div>'
      // ---- Finance ----
      + '<div class="calc-pane" data-pane="finance" hidden>'
      + financeTool("CAGR (growth rate)", "cagr", [["Start value", "a"], ["End value", "b"], ["Years", "n"]])
      + financeTool("Real (inflation-adjusted) return", "real", [["Nominal return %", "nom"], ["Inflation %", "inf"]])
      + financeTool("Future cost with inflation", "infl", [["Cost today $", "c"], ["Inflation %", "i"], ["Years", "n"]])
      + financeTool("Lump-sum future value", "lump", [["Amount $", "p"], ["Return % p.a.", "r"], ["Years", "n"]])
      + financeTool("SIP / monthly investment maturity", "sip", [["Monthly $", "m"], ["Return % p.a.", "r"], ["Years", "n"]])
      + '</div>'
      // ---- Basic ----
      + '<div class="calc-pane" data-pane="basic" hidden>'
      + '<input id="basicExpr" class="calc-display" type="text" inputmode="decimal" placeholder="0" value="">'
      + '<div class="calc-res" id="basicRes">0</div>'
      + '<div class="calc-keys" id="basicKeys"></div>'
      + '</div>'
      + '</div>';
    document.body.appendChild(panel);

    // keypad
    var keys = ["C", "(", ")", "⌫", "7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "0", ".", "=", "+"];
    var kp = panel.querySelector("#basicKeys");
    keys.forEach(function (k) {
      var b = document.createElement("button");
      b.className = "ckey" + (/[÷×\-+=]/.test(k) ? " op" : "") + (k === "=" ? " eq" : "") + (k === "C" ? " clr" : "");
      b.textContent = k; b.dataset.k = k; kp.appendChild(b);
    });
    var expr = panel.querySelector("#basicExpr"), res = panel.querySelector("#basicRes");
    function liveCalc() { try { var v = calcEval(expr.value || "0"); res.textContent = isFinite(v) ? inrDec(v).replace("$", "") : "—"; } catch (e) { res.textContent = "…"; } }
    kp.addEventListener("click", function (e) {
      var k = e.target.dataset.k; if (!k) return;
      if (k === "C") expr.value = "";
      else if (k === "⌫") expr.value = expr.value.slice(0, -1);
      else if (k === "=") { try { expr.value = String(calcEval(expr.value)); } catch (x) {} }
      else expr.value += k;
      liveCalc();
    });
    expr.addEventListener("input", liveCalc);

    // TVM logic
    function val(id) { var el = panel.querySelector("#tvm_" + id); var v = parseFloat(String(el.value).replace(/,/g, "")); return el.value === "" ? null : v; }
    function setVal(id, v) { panel.querySelector("#tvm_" + id).value = (Math.round(v * 100) / 100); }
    function typ() { return panel.querySelector("#tvmType").checked ? 1 : 0; }
    function out(msg) { panel.querySelector("#tvmOut").innerHTML = msg; }
    panel.querySelectorAll("[data-cpt]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.dataset.cpt;
        var n = val("nper"), r = val("rate"), pv = val("pv"), pmt = val("pmt"), fv = val("fv"), t = typ();
        var ri = r == null ? null : r / 100, ans;
        try {
          if (target === "fv") { ans = tvmFV(ri, n, pmt, pv, t); setVal("fv", ans); out("FV = <b>" + inrDec(ans) + "</b>"); }
          else if (target === "pv") { ans = tvmPV(ri, n, pmt, fv, t); setVal("pv", ans); out("PV = <b>" + inrDec(ans) + "</b>"); }
          else if (target === "pmt") { ans = tvmPMT(ri, n, pv, fv, t); setVal("pmt", ans); out("PMT = <b>" + inrDec(ans) + "</b> per period"); }
          else if (target === "nper") { ans = tvmNPER(ri, pmt, pv, fv, t); setVal("nper", ans); out("N = <b>" + (Math.round(ans * 100) / 100) + "</b> periods"); }
          else if (target === "rate") { ans = tvmRATE(n, pmt, pv, fv, t) * 100; setVal("rate", ans); out("Rate = <b>" + pct(ans) + "</b> per period"); }
        } catch (e) { out("<span style='color:var(--danger)'>Check your inputs.</span>"); }
      });
    });
    panel.querySelector("#tvmClear").addEventListener("click", function () {
      ["nper", "rate", "pv", "pmt", "fv"].forEach(function (id) { panel.querySelector("#tvm_" + id).value = ""; });
      out("");
    });

    // Finance tools
    panel.querySelectorAll("[data-fin]").forEach(function (form) {
      form.querySelector(".fin-go").addEventListener("click", function () {
        var g = function (k) { return parseFloat(form.querySelector("[data-f='" + k + "']").value); };
        var kind = form.dataset.fin, o = form.querySelector(".fin-out"), r;
        try {
          if (kind === "cagr") { r = (Math.pow(g("b") / g("a"), 1 / g("n")) - 1) * 100; o.innerHTML = "CAGR = <b>" + pct(r) + "</b> per year"; }
          else if (kind === "real") { r = ((1 + g("nom") / 100) / (1 + g("inf") / 100) - 1) * 100; o.innerHTML = "Real return = <b>" + pct(r) + "</b> per year"; }
          else if (kind === "infl") { r = g("c") * Math.pow(1 + g("i") / 100, g("n")); o.innerHTML = "Future cost = <b>" + inr(r) + "</b>"; }
          else if (kind === "lump") { r = g("p") * Math.pow(1 + g("r") / 100, g("n")); o.innerHTML = "Maturity value = <b>" + inr(r) + "</b>"; }
          else if (kind === "sip") { var i = g("r") / 100 / 12, n = g("n") * 12; r = g("m") * ((Math.pow(1 + i, n) - 1) / i) * (1 + i); o.innerHTML = "SIP maturity ≈ <b>" + inr(r) + "</b><br><small>(payments at month start)</small>"; }
        } catch (e) { o.textContent = "Check inputs."; }
      });
    });

    // tabs
    panel.querySelectorAll(".calc-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        panel.querySelectorAll(".calc-tab").forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        panel.querySelectorAll(".calc-pane").forEach(function (p) { p.hidden = p.dataset.pane !== tab.dataset.ctab; });
      });
    });

    function toggle() { panel.hidden = !panel.hidden; if (!panel.hidden) panel.classList.add("show"); }
    fab.addEventListener("click", toggle);
    panel.querySelector("#calcClose").addEventListener("click", function () { panel.hidden = true; });
  }
  function tvmRow(label, id, hint) {
    return '<div class="tvm-row"><label>' + label + '</label>'
      + '<input id="tvm_' + id + '" type="text" inputmode="decimal" placeholder="' + hint + '">'
      + '<button class="cpt" data-cpt="' + id + '">CPT</button></div>';
  }
  function financeTool(title, kind, fields) {
    var h = '<div class="fin-tool" data-fin="' + kind + '"><div class="fin-title">' + title + '</div>';
    fields.forEach(function (f) { h += '<div class="fin-row"><label>' + f[0] + '</label><input data-f="' + f[1] + '" type="text" inputmode="decimal"></div>'; });
    h += '<div class="fin-actions"><button class="calc-btn fin-go">Calculate</button><span class="fin-out"></span></div></div>';
    return h;
  }

  /* =====================================================================
     FINANCIAL MATHS LAB — infinite practice generator
     ===================================================================== */
  var LAB_TYPES = {
    fv_lump: "Future value (lump sum)",
    fv_sip: "Future value (yearly investment)",
    pv_goal: "Amount to invest today (PV)",
    pmt_goal: "Yearly investment needed (PMT)",
    cagr: "CAGR / growth rate",
    inflation: "Inflation-adjusted future cost",
    real: "Real (inflation-adjusted) return",
    corpus: "Retirement corpus (PV of annuity)"
  };
  function approxEqual(a, b) { return Math.abs(a - b) <= Math.max(1, Math.abs(a)) * 0.005; }
  function buildOptions(correct, wrongs, fmt) {
    var opts = [{ v: correct, ok: true }];
    wrongs.forEach(function (w) {
      if (opts.length >= 4) return;
      if (!isFinite(w)) return;
      if (opts.some(function (o) { return approxEqual(o.v, w); })) return;
      opts.push({ v: w, ok: false });
    });
    // Fallback fillers — both multiplicative and additive so this never
    // loops forever (e.g. when `correct` is 0 or tiny).
    var spread = Math.max(Math.abs(correct) * 0.12, 1);
    var fillers = [correct * 0.85, correct * 1.15, correct * 0.7, correct * 1.3,
                   correct + spread, correct - spread, correct + 2 * spread, correct - 2 * spread,
                   correct * 0.5, correct * 1.5];
    for (var k = 0; k < fillers.length && opts.length < 4; k++) {
      var cand = fillers[k];
      if (isFinite(cand) && !opts.some(function (o) { return approxEqual(o.v, cand); })) opts.push({ v: cand, ok: false });
    }
    var guard = 1;
    while (opts.length < 4) { opts.push({ v: correct + spread * (++guard), ok: false }); }
    for (var i = opts.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = opts[i]; opts[i] = opts[j]; opts[j] = t; }
    var correctIndex = opts.findIndex(function (o) { return o.ok; });
    return { options: opts.map(function (o) { return fmt(o.v); }), correctIndex: correctIndex };
  }
  function genProblem(type) {
    if (type === "any") type = pick(Object.keys(LAB_TYPES));
    var fmtMoney = function (v) { return inr(v); };
    var fmtPct = function (v) { return pct(v); };
    var P, r, n, fv, ans, q, sol, built;
    if (type === "fv_lump") {
      P = rnd(1, 20) * 50000; r = rnd(6, 14); n = rnd(3, 25);
      var f = Math.pow(1 + r / 100, n); ans = P * f;
      q = "You invest <b>" + inr(P) + "</b> today in a fund expected to earn <b>" + r + "% per year</b>, compounded annually. What is it worth after <b>" + n + " years</b>?";
      sol = "**Formula:** FV = PV × (1 + r)ⁿ\n\n- PV (today's money) = " + inr(P) + "\n- r = " + r + "% = " + (r / 100) + "\n- n = " + n + " years\n\nFV = " + inr(P) + " × (1 + " + (r / 100) + ")^" + n + " = " + inr(P) + " × " + f.toFixed(4) + " = **" + inr(ans) + "**\n\n*Logic: each year the money grows by " + r + "%, and next year you also earn growth on the growth — that compounding is why we raise (1+r) to the power n.*";
      built = buildOptions(ans, [P * (1 + r * n / 100), P * Math.pow(1 + r / 100, n - 1), P * Math.pow(1 + r / 100, n + 1)], fmtMoney);
    } else if (type === "fv_sip") {
      P = rnd(1, 20) * 10000; r = rnd(6, 14); n = rnd(5, 30);
      var i1 = r / 100, fac = (Math.pow(1 + i1, n) - 1) / i1; ans = P * fac;
      q = "You invest <b>" + inr(P) + "</b> at the <b>end of every year</b> for <b>" + n + " years</b>, earning <b>" + r + "% per year</b>. What is the maturity value?";
      sol = "**Formula (ordinary annuity FV):** FV = PMT × [ (1 + r)ⁿ − 1 ] ÷ r\n\n- PMT (yearly investment) = " + inr(P) + "\n- r = " + (i1) + "\n- n = " + n + "\n\nFV = " + inr(P) + " × (" + Math.pow(1 + i1, n).toFixed(4) + " − 1) ÷ " + i1 + " = " + inr(P) + " × " + fac.toFixed(4) + " = **" + inr(ans) + "**\n\n*Logic: each instalment compounds for a different number of years; the bracket adds up all those growth factors in one shot.*";
      built = buildOptions(ans, [P * n, P * n * Math.pow(1 + i1, n), P * ((Math.pow(1 + i1, n) - 1) / i1) * (1 + i1)], fmtMoney);
    } else if (type === "pv_goal") {
      fv = rnd(10, 60) * 100000; r = rnd(6, 13); n = rnd(3, 20);
      var f2 = Math.pow(1 + r / 100, n); ans = fv / f2;
      q = "You need <b>" + inr(fv) + "</b> in <b>" + n + " years</b>. If your money earns <b>" + r + "% per year</b>, how much must you invest <b>today</b> (one lump sum)?";
      sol = "**Formula:** PV = FV ÷ (1 + r)ⁿ\n\n- FV (goal) = " + inr(fv) + "\n- r = " + (r / 100) + "\n- n = " + n + "\n\nPV = " + inr(fv) + " ÷ (1 + " + (r / 100) + ")^" + n + " = " + inr(fv) + " ÷ " + f2.toFixed(4) + " = **" + inr(ans) + "**\n\n*Logic: this is compounding run backwards — we ‘discount’ the future goal to see its value in today's rupees.*";
      built = buildOptions(ans, [fv / (1 + r * n / 100), fv / Math.pow(1 + r / 100, n - 1), fv * Math.pow(1 + r / 100, -n + 1)], fmtMoney);
    } else if (type === "pmt_goal") {
      fv = rnd(20, 100) * 100000; r = rnd(6, 13); n = rnd(5, 25);
      var i3 = r / 100; ans = fv * i3 / (Math.pow(1 + i3, n) - 1);
      q = "You want to build <b>" + inr(fv) + "</b> in <b>" + n + " years</b>, investing a fixed amount at the <b>end of each year</b> earning <b>" + r + "% per year</b>. What yearly investment is needed?";
      sol = "**Formula (PMT for a goal):** PMT = FV × r ÷ [ (1 + r)ⁿ − 1 ]\n\n- FV (goal) = " + inr(fv) + "\n- r = " + i3 + "\n- n = " + n + "\n\nPMT = " + inr(fv) + " × " + i3 + " ÷ (" + Math.pow(1 + i3, n).toFixed(4) + " − 1) = **" + inr(ans) + "** per year\n\n*Logic: it's the sinking-fund formula — we reverse the annuity-FV formula to find the instalment that grows into the target.*";
      built = buildOptions(ans, [fv / n, fv * i3 / (Math.pow(1 + i3, n + 1) - 1), fv / ((Math.pow(1 + i3, n) - 1) / i3) / (1 + i3)], fmtMoney);
    } else if (type === "cagr") {
      var a = rnd(1, 10) * 50000; n = rnd(3, 15); var growth = rnd(40, 320) / 100; var b = a * growth; ans = (Math.pow(b / a, 1 / n) - 1) * 100;
      q = "An investment grew from <b>" + inr(a) + "</b> to <b>" + inr(b) + "</b> over <b>" + n + " years</b>. What is the CAGR (compound annual growth rate)?";
      sol = "**Formula:** CAGR = (End ÷ Start)^(1/n) − 1\n\n- Start = " + inr(a) + ", End = " + inr(b) + ", n = " + n + "\n\nCAGR = (" + inr(b) + " ÷ " + inr(a) + ")^(1/" + n + ") − 1 = (" + (b / a).toFixed(3) + ")^(1/" + n + ") − 1 = **" + pct(ans) + "**\n\n*Logic: CAGR is the single steady yearly rate that would turn the start value into the end value — it smooths out the ups and downs.*";
      built = buildOptions(ans, [((b - a) / a) * 100, ((b - a) / a) * 100 / n, (Math.pow(b / a, 1 / (n + 1)) - 1) * 100], fmtPct);
    } else if (type === "inflation") {
      P = rnd(1, 20) * 50000; r = rnd(4, 9); n = rnd(5, 30); var f4 = Math.pow(1 + r / 100, n); ans = P * f4;
      q = "Something costs <b>" + inr(P) + "</b> today. With inflation of <b>" + r + "% per year</b>, what will it cost in <b>" + n + " years</b>?";
      sol = "**Formula:** Future cost = Present cost × (1 + inflation)ⁿ\n\n- Present cost = " + inr(P) + "\n- inflation = " + (r / 100) + "\n- n = " + n + "\n\nFuture cost = " + inr(P) + " × (1 + " + (r / 100) + ")^" + n + " = " + inr(P) + " × " + f4.toFixed(4) + " = **" + inr(ans) + "**\n\n*Logic: inflation compounds just like interest — prices grow by the inflation rate every year, on top of the previous year's price.*";
      built = buildOptions(ans, [P * (1 + r * n / 100), P * Math.pow(1 + r / 100, n - 1), P / Math.pow(1 + r / 100, n)], fmtMoney);
    } else if (type === "real") {
      var inf = rnd(4, 7), nom = inf + rnd(2, 6); ans = ((1 + nom / 100) / (1 + inf / 100) - 1) * 100;
      q = "Your investment returns <b>" + nom + "% per year</b> while inflation is <b>" + inf + "% per year</b>. What is your <b>real</b> (inflation-adjusted) return?";
      sol = "**Formula:** Real return = [ (1 + nominal) ÷ (1 + inflation) ] − 1\n\n- nominal = " + (nom / 100) + ", inflation = " + (inf / 100) + "\n\nReal = (1 + " + (nom / 100) + ") ÷ (1 + " + (inf / 100) + ") − 1 = " + ((1 + nom / 100) / (1 + inf / 100)).toFixed(4) + " − 1 = **" + pct(ans) + "**\n\n*Logic: we don't just subtract (" + (nom - inf) + "%). Because both grow together, we divide the growth factors — this is the accurate ‘purchasing-power’ return the exam expects.*";
      built = buildOptions(ans, [nom - inf, ((1 + inf / 100) / (1 + nom / 100) - 1) * 100, (nom - inf) * 1.05], fmtPct);
    } else { // corpus
      var W = rnd(2, 10) * 100000; r = rnd(6, 10); n = rnd(15, 30); var i5 = r / 100; ans = W * (1 - Math.pow(1 + i5, -n)) / i5;
      q = "After retiring you want to withdraw <b>" + inr(W) + "</b> at the <b>end of each year</b> for <b>" + n + " years</b>. If the corpus earns <b>" + r + "% per year</b>, how big a corpus do you need at retirement?";
      sol = "**Formula (PV of an annuity):** Corpus = W × [ 1 − (1 + r)⁻ⁿ ] ÷ r\n\n- W (yearly withdrawal) = " + inr(W) + "\n- r = " + i5 + "\n- n = " + n + "\n\nCorpus = " + inr(W) + " × (1 − " + Math.pow(1 + i5, -n).toFixed(4) + ") ÷ " + i5 + " = **" + inr(ans) + "**\n\n*Logic: the corpus must be just big enough that yearly withdrawals plus the returns it keeps earning run out exactly after " + n + " years.*";
      built = buildOptions(ans, [W * n, W / i5, W * (1 - Math.pow(1 + i5, -(n + 1))) / i5], fmtMoney);
    }
    return { type: type, q: q, sol: sol, options: built.options, correctIndex: built.correctIndex };
  }

  var labState = { type: "any", q: null, answered: false, score: 0, total: 0, streak: 0, best: 0 };
  function renderLab() {
    var typeOpts = '<option value="any">🎲 Mixed (all types)</option>';
    Object.keys(LAB_TYPES).forEach(function (k) { typeOpts += '<option value="' + k + '">' + LAB_TYPES[k] + "</option>"; });
    contentEl.innerHTML =
      '<div class="hero lab-hero"><h1>🔢 Financial Maths Lab</h1>'
      + '<p>Unlimited practice for the calculations the exam loves — <b>PV, FV, PMT, CAGR, inflation, real return & retirement corpus</b>. Every answer comes with a full worked solution. Open the 🧮 calculator (bottom-right) to check your working.</p>'
      + (PRIMER ? '<div class="hero-cta"><a href="#/primer" class="cta">📐 New here? Read the PV/FV/PMT primer first</a></div>' : "") + '</div>'
      + '<div class="lab-bar">'
      + '<label class="lab-pick">Practice: <select id="labType">' + typeOpts + '</select></label>'
      + '<div class="lab-scores">'
      + '<span class="lab-stat" title="Correct / attempted">✅ <b id="labScore">0</b>/<b id="labTotal">0</b></span>'
      + '<span class="lab-stat" title="Current streak">🔥 <b id="labStreak">0</b></span>'
      + '<span class="lab-stat" title="Best streak">🏆 <b id="labBest">0</b></span>'
      + '</div></div>'
      + '<div id="labCard" class="lab-card"></div>'
      + '<details class="lab-formulas"><summary>📐 Formula cheat-sheet (tap to open)</summary>'
      + '<div class="markdown-body">' + md(LAB_CHEATSHEET) + '</div></details>';
    document.getElementById("labType").value = labState.type;
    document.getElementById("labType").addEventListener("change", function () { labState.type = this.value; newLabQ(); });
    syncLabScores();
    newLabQ();
    chapterNavEl.innerHTML = "";
    highlightNav(null);
    var lk = document.querySelector('.nav-tool[data-link="lab"]'); if (lk) lk.classList.add("active");
    document.title = "Financial Maths Lab — FRM Part I";
  }
  function syncLabScores() {
    document.getElementById("labScore").textContent = labState.score;
    document.getElementById("labTotal").textContent = labState.total;
    document.getElementById("labStreak").textContent = labState.streak;
    document.getElementById("labBest").textContent = labState.best;
  }
  function newLabQ() {
    labState.q = genProblem(labState.type); labState.answered = false;
    var card = document.getElementById("labCard"); if (!card) return;
    var p = labState.q;
    var h = '<div class="lab-q">' + p.q + "</div><div class='lab-opts'>";
    p.options.forEach(function (o, idx) {
      h += '<button class="lab-opt" data-i="' + idx + '"><span class="lab-letter">' + "ABCD"[idx] + '</span>' + esc(o) + "</button>";
    });
    h += "</div><div class='lab-feedback' id='labFeedback'></div>"
      + "<div class='lab-controls'><button class='calc-btn' id='labNext'>Next question →</button>"
      + "<button class='calc-btn ghost' id='labReveal'>Show solution</button></div>";
    card.innerHTML = h;
    card.querySelectorAll(".lab-opt").forEach(function (b) { b.addEventListener("click", function () { answerLab(parseInt(b.dataset.i, 10)); }); });
    document.getElementById("labNext").addEventListener("click", newLabQ);
    document.getElementById("labReveal").addEventListener("click", function () { if (!labState.answered) answerLab(-1); else showLabSolution(); });
  }
  function answerLab(choice) {
    if (labState.answered) return;
    labState.answered = true;
    var p = labState.q, card = document.getElementById("labCard");
    var opts = card.querySelectorAll(".lab-opt");
    opts.forEach(function (b, idx) {
      b.disabled = true;
      if (idx === p.correctIndex) b.classList.add("correct");
      if (idx === choice && choice !== p.correctIndex) b.classList.add("wrong");
    });
    labState.total++;
    var fb = document.getElementById("labFeedback");
    if (choice === p.correctIndex) {
      labState.score++; labState.streak++; if (labState.streak > labState.best) labState.best = labState.streak;
      fb.innerHTML = "<div class='lab-msg ok'>" + pick(["✅ Correct! Nicely done.", "✅ Spot on! 🔥", "✅ Yes! You nailed it.", "✅ Perfect — that's the one."]) + "</div>";
    } else if (choice === -1) {
      labState.streak = 0;
      fb.innerHTML = "<div class='lab-msg neutral'>Here's the full working 👇</div>";
    } else {
      labState.streak = 0;
      fb.innerHTML = "<div class='lab-msg no'>❌ Not quite — the correct answer is <b>" + esc(p.options[p.correctIndex]) + "</b>. Study the steps below.</div>";
    }
    labState.lastChoice = choice;
    syncLabScores();
    showLabSolution();
  }
  function showLabSolution() {
    var fb = document.getElementById("labFeedback"); if (!fb) return;
    if (fb.querySelector(".lab-sol")) return;
    var d = document.createElement("div");
    d.className = "lab-sol markdown-body";
    d.innerHTML = md(labState.q.sol);
    if (window.FRMViz) {
      var chart = window.FRMViz.numericChartHTML(labState.q.options, labState.q.correctIndex,
        labState.lastChoice == null ? -1 : labState.lastChoice);
      if (chart) d.innerHTML += '<div class="q-viz">' + chart + "</div>";
    }
    fb.appendChild(d);
  }
  var LAB_CHEATSHEET = [
    "| Goal | Formula | Plain-English |",
    "|---|---|---|",
    "| **Future value of a lump sum** | FV = PV × (1+r)ⁿ | money today grows with compounding |",
    "| **Present value of a goal** | PV = FV ÷ (1+r)ⁿ | discount a future amount to today |",
    "| **FV of yearly investment (annuity)** | FV = PMT × [(1+r)ⁿ − 1] ÷ r | add up each instalment's growth |",
    "| **Investment needed (PMT)** | PMT = FV × r ÷ [(1+r)ⁿ − 1] | sinking-fund instalment |",
    "| **Corpus for withdrawals (PV annuity)** | PV = W × [1 − (1+r)⁻ⁿ] ÷ r | nest-egg that funds a pension |",
    "| **CAGR** | (End ÷ Start)^(1/n) − 1 | steady yearly growth rate |",
    "| **Real return** | (1+nominal) ÷ (1+inflation) − 1 | purchasing-power return |",
    "| **Inflation-adjusted cost** | Cost × (1+inflation)ⁿ | future price of something |",
    "",
    "> **Excel/Calc tip (test machines have a spreadsheet!):** `=FV(rate,nper,pmt,pv,type)`, `=PV(...)`, `=PMT(...)`. Enter money you **pay** as a negative number. `type` = 0 for end-of-period, 1 for beginning."
  ].join("\n");

  // ---------- Sidebar ----------
  function buildSidebar() {
    var nav = document.getElementById("nav");
    var html = '<a class="nav-chap-head" href="#/home"><span class="nav-chap-num">🏠</span>'
      + '<span class="nav-chap-title">Home &amp; Exam Guide</span></a>';
    html += '<div class="nav-module">Study Tools</div>';
    if (PRIMER) html += '<a class="nav-tool" data-link="primer" href="#/primer"><span class="nav-chap-num">📐</span><span class="nav-chap-title">Financial Maths Primer</span></a>';
    if (EXCEL) html += '<a class="nav-tool" data-link="excel" href="#/excel"><span class="nav-chap-num">💻</span><span class="nav-chap-title">Excel TVM Calculator</span></a>';
    if (PAPERS.length) html += '<a class="nav-tool" data-link="papers" href="#/papers"><span class="nav-chap-num">📑</span><span class="nav-chap-title">Mock Test Papers</span></a>';
    html += '<button class="nav-tool" id="navCalc"><span class="nav-chap-num">🧮</span><span class="nav-chap-title">Financial Calculator</span></button>';
    var lastModule = null;
    CH.forEach(function (c) {
      if (c.module !== lastModule) { html += '<div class="nav-module">' + esc(c.module) + "</div>"; lastModule = c.module; }
      var chDone = VIEWS.every(function (v) { return isDone(c.num, v.key); });
      html += '<div class="nav-chapter" data-ch="' + c.num + '">'
        + '<button class="nav-chap-head" data-toggle="' + c.num + '">'
        + '<span class="nav-chap-num">' + c.num + "</span>"
        + '<span class="nav-chap-title">' + esc(c.title) + "</span>"
        + '<span class="nav-check" data-check="' + c.num + '">' + (chDone ? "✓" : "") + "</span>"
        + '</button><div class="nav-sub">';
      VIEWS.forEach(function (v) {
        html += '<a href="#/ch/' + c.num + "/" + v.key + '" data-link="' + c.num + "/" + v.key + '">'
          + '<span class="dot">' + v.ico + "</span>" + v.label
          + '<span class="nav-check" data-check="' + c.num + ":" + v.key + '">' + (isDone(c.num, v.key) ? "✓" : "") + "</span></a>";
      });
      html += "</div></div>";
    });
    nav.innerHTML = html;
    nav.querySelectorAll("[data-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var wrap = btn.closest(".nav-chapter"), num = btn.getAttribute("data-toggle");
        if (!wrap.classList.contains("open")) location.hash = "#/ch/" + num + "/notes";
        else wrap.classList.toggle("open");
      });
    });
    var nc = document.getElementById("navCalc");
    if (nc) nc.addEventListener("click", function () { var p = document.getElementById("calcPanel"); if (p) { p.hidden = false; p.classList.add("show"); } closeSidebar(); });
  }
  function refreshChecks() {
    document.querySelectorAll("[data-check]").forEach(function (n) {
      var key = n.getAttribute("data-check");
      if (key.indexOf(":") > -1) n.textContent = progress[key] ? "✓" : "";
      else n.textContent = VIEWS.every(function (v) { return isDone(key, v.key); }) ? "✓" : "";
    });
  }
  function highlightNav(num, view) {
    document.querySelectorAll(".nav-chap-head,.nav-tool").forEach(function (n) { n.classList.remove("active"); });
    document.querySelectorAll(".nav-sub a").forEach(function (a) { a.classList.remove("active"); });
    document.querySelectorAll(".nav-chapter").forEach(function (w) { w.classList.remove("open"); });
    if (!num) {
      var h = location.hash;
      if (h.indexOf("/primer") > -1) { var pr = document.querySelector('.nav-tool[data-link="primer"]'); if (pr) pr.classList.add("active"); }
      else if (h.indexOf("/excel") > -1) { var ex = document.querySelector('.nav-tool[data-link="excel"]'); if (ex) ex.classList.add("active"); }
      else if (h.indexOf("/lab") > -1) { var l = document.querySelector('.nav-tool[data-link="lab"]'); if (l) l.classList.add("active"); }
      else if (h.indexOf("/paper") > -1) { var pp = document.querySelector('.nav-tool[data-link="papers"]'); if (pp) pp.classList.add("active"); }
      else { var home = document.querySelector('.nav-chap-head[href="#/home"]'); if (home) home.classList.add("active"); }
      return;
    }
    var wrap = document.querySelector('.nav-chapter[data-ch="' + num + '"]');
    if (wrap) { wrap.classList.add("open"); wrap.querySelector(".nav-chap-head").classList.add("active"); }
    var link = document.querySelector('.nav-sub a[data-link="' + num + "/" + view + '"]');
    if (link) link.classList.add("active");
  }

  // ---------- Renderers ----------
  var contentEl = document.getElementById("content");
  var chapterNavEl = document.getElementById("chapterNav");

  function renderHome() {
    var hero = '<div class="hero"><h1>🎯 FRM&reg; Part I Study Hub</h1>'
      + '<p>Financial Risk Manager — Part I (2026 curriculum). Notes, flashcards &amp; exam-style MCQs for all 62 readings. Study at your own pace.</p>'
      + '<div class="hero-cta">'
      + (PAPERS.length ? '<a href="#/papers" class="cta">📝 Mock Exam</a>' : "")
      + '<a href="#/ch/101/notes" class="cta ghost">📖 Start Book 1</a></div></div>';
    var cards = '<div class="home-cards">';
    CH.forEach(function (c) {
      cards += '<div class="home-card" data-go="#/ch/' + c.num + '/notes">'
        + '<div class="hc-num">CHAPTER ' + c.num + "</div>"
        + '<div class="hc-title">' + esc(c.title) + "</div>"
        + '<div class="hc-links"><span class="chip">📖 Notes</span><span class="chip">🃏 Cards</span><span class="chip">📝 Quiz</span></div></div>';
    });
    cards += "</div>";
    var readme = '<div class="markdown-body">' + md(DATA.readme || "") + "</div>";
    contentEl.innerHTML = hero + "<h2>Jump to a chapter</h2>" + cards
      + '<hr><details open><summary style="cursor:pointer;font-weight:700;font-size:18px">📋 Full exam guide & study plan</summary>' + readme + "</details>";
    contentEl.querySelectorAll("[data-go]").forEach(function (card) { card.addEventListener("click", function () { location.hash = card.getAttribute("data-go"); }); });
    chapterNavEl.innerHTML = ""; highlightNav(null); document.title = "FRM Part I Study Hub";
  }
  function viewTabs(num, active) {
    var done = isDone(num, active), h = '<div class="view-tabs">';
    VIEWS.forEach(function (v) {
      h += '<a class="view-tab ' + (v.key === active ? "active" : "") + '" href="#/ch/' + num + "/" + v.key + '"><span class="vt-ico">' + v.ico + "</span>" + v.label + "</a>";
    });
    h += '<button class="mark-read ' + (done ? "done" : "") + '" id="markReadBtn">' + (done ? "✓ Marked as studied" : "Mark as studied") + "</button></div>";
    return h;
  }
  function bindMarkRead(num, view) {
    var btn = document.getElementById("markReadBtn"); if (!btn) return;
    btn.addEventListener("click", function () {
      var k = progKey(num, view); progress[k] = !progress[k]; saveProgress(progress);
      btn.classList.toggle("done", !!progress[k]); btn.textContent = progress[k] ? "✓ Marked as studied" : "Mark as studied";
      refreshChecks(); updateProgressUI();
    });
  }
  function renderNotes(num) {
    var c = chapterByNum(num);
    contentEl.innerHTML = viewTabs(num, "notes") + conceptBanner(num) + '<div class="markdown-body">' + md(c.notes) + "</div>";
    bindMarkRead(num, "notes");
  }
  // ----- Interactive quiz: parse markdown question bank into structured MCQs -----
  function parseBlocks(text) {
    var out = [], re = /\*\*Q([\w-]+)\.\*\*\s*([\s\S]*?)\r?\n(A\)[^\n]*B\)[^\n]*C\)[^\n]*D\)[^\n]*)\r?\n<details>[\s\S]*?<\/summary>([\s\S]*?)<\/details>/g, m;
    while ((m = re.exec(text))) {
      var optline = m[3], expl = m[4].trim();
      var om = optline.match(/A\)\s*([\s\S]*?)\s*B\)\s*([\s\S]*?)\s*C\)\s*([\s\S]*?)\s*D\)\s*([\s\S]*)/);
      if (!om) continue;
      var cm = expl.match(/\*\*Correct:\s*([A-D])\)/i);
      if (!cm) continue;
      out.push({ id: m[1], q: m[2].trim(), options: [om[1], om[2], om[3], om[4]].map(function (s) { return s.trim(); }), correct: "ABCD".indexOf(cm[1].toUpperCase()), expl: expl });
    }
    return out;
  }
  function parseQuiz(src) {
    var caseIdx = src.search(/\n##\s*🧩/);
    var head = caseIdx > -1 ? src.slice(0, caseIdx) : src;
    var caseMd = caseIdx > -1 ? src.slice(caseIdx) : "";
    var tiers = [], parts = head.split(/\n(?=##\s)/);
    parts.forEach(function (part) {
      var hm = part.match(/^##\s*(.*)/), title = hm ? hm[1] : "";
      var cls = "mix", dot = "📝", label = "MCQs";
      if (/exam-level/i.test(title) || /🎯/.test(title)) { cls = "hard"; dot = "🎯"; label = "Exam-level"; }
      else if (/easy/i.test(title) || /🟢/.test(title)) { cls = "easy"; dot = "🟢"; label = "Easy"; }
      else if (/medium/i.test(title) || /🟡/.test(title)) { cls = "med"; dot = "🟡"; label = "Medium"; }
      else if (/hard/i.test(title) || /🔴/.test(title)) { cls = "hard"; dot = "🔴"; label = "Hard"; }
      else if (/standalone/i.test(title)) { cls = "mix"; dot = "📝"; label = "Skill MCQs"; }
      var qs = parseBlocks(part);
      if (qs.length) tiers.push({ cls: cls, dot: dot, label: label, questions: qs });
    });
    if (!tiers.length) { var qs = parseBlocks(head); if (qs.length) tiers.push({ cls: "mix", dot: "📝", label: "Questions", questions: qs }); }
    return { tiers: tiers, caseMd: caseMd };
  }

  var quizCtx = null;
  function qCard(q, t) {
    var opts = "";
    ["A", "B", "C", "D"].forEach(function (L, i) {
      opts += '<button class="q-opt" data-i="' + i + '"><span class="q-letter">' + L + '</span><span class="q-otext">' + inlineMd(q.options[i]) + "</span></button>";
    });
    return '<div class="q-card" data-tier="' + t.cls + '" data-qid="' + q.id + '" data-correct="' + q.correct + '">'
      + '<div class="q-head"><span class="q-num">Q' + q.id + '</span><span class="q-tierlabel ' + t.cls + '">' + t.dot + " " + t.label + "</span></div>"
      + '<div class="q-text">' + inlineMd(q.q) + "</div>"
      + '<div class="q-opts">' + opts + "</div>"
      + '<div class="q-expl markdown-body" hidden>' + md(q.expl) + "</div></div>";
  }
  function renderTierCards(parsed) {
    var h = "";
    parsed.tiers.forEach(function (t) {
      h += '<div class="q-tier-head ' + t.cls + '">' + t.dot + " " + esc(t.label) + ' <span class="q-tier-count">' + t.questions.length + " questions</span></div>";
      t.questions.forEach(function (q) { h += qCard(q, t); });
    });
    return h;
  }
  function correctMap() { var map = {}; quizCtx.parsed.tiers.forEach(function (t) { t.questions.forEach(function (q) { map[q.id] = q.correct; }); }); return map; }
  function saveQuiz() { try { localStorage.setItem(quizCtx.qkey, JSON.stringify(quizCtx.saved)); } catch (e) {} }
  // chapter -> a representative concept diagram (for the banner at the top of Notes/Quiz)
  var CH_CONCEPT = {
    "101": "lossDist", "105": "sml", "106": "sml", "107": "cml",
    "203": "fatTails", "205": "normalTest", "206": "normalTest", "207": "regression",
    "208": "regression", "209": "regression", "212": "ewma",
    "308": "hedgeBasis", "311": "hedgeBasis", "312": "callPayoff", "313": "parity",
    "314": "straddle", "316": "yieldCurve", "318": "psa",
    "401": "normalVaR", "402": "normalVaR", "403": "ewma", "404": "lossDist", "406": "lossDist",
    "409": "yieldCurve", "410": "yieldCurve", "411": "bondConvexity", "412": "bondConvexity",
    "413": "curveShift", "414": "binomial2", "415": "callPayoff", "416": "callPayoff"
  };
  function conceptBanner(num) {
    var key = CH_CONCEPT[num];
    if (!key || !window.FRMViz || !window.FRMViz.has(key)) return "";
    return '<div class="concept-banner"><div class="q-viz-title">📊 Visualize this topic</div>' + window.FRMViz.conceptSVG(key) + "</div>";
  }
  function injectViz(card, correct, chosen) {
    if (!window.FRMViz) return;
    var expl = card.querySelector(".q-expl");
    if (!expl || expl.querySelector(".q-viz")) return;
    var opts = Array.prototype.map.call(card.querySelectorAll(".q-otext"), function (o) { return o.textContent.trim(); });
    var stem = (card.querySelector(".q-text") || {}).textContent || "";
    var html = window.FRMViz.buildQuestionViz(opts, correct, chosen, stem + " " + (expl.textContent || ""));
    if (html) expl.insertAdjacentHTML("beforeend", html);
  }
  function applyAnswer(card, chosen, restore) {
    card.classList.add("answered");
    var correct = parseInt(card.dataset.correct, 10);
    card.querySelectorAll(".q-opt").forEach(function (o, idx) {
      o.disabled = true;
      if (idx === correct) o.classList.add("correct");
      if (idx === chosen && chosen !== correct) o.classList.add("wrong");
      if (idx === chosen) o.classList.add("chosen");
    });
    card.querySelector(".q-expl").hidden = false;
    injectViz(card, correct, chosen);
    if (!restore) {
      var fl = chosen === correct ? "flash-ok" : "flash-no";
      card.classList.add(fl); setTimeout(function () { card.classList.remove(fl); }, 700);
    }
  }
  function updateQuizScore() {
    var map = correctMap(), ans = Object.keys(quizCtx.saved).length, correct = 0;
    Object.keys(quizCtx.saved).forEach(function (qid) { if (quizCtx.saved[qid] === map[qid]) correct++; });
    var pctv = ans ? Math.round(correct / ans * 100) : 0;
    var setT = function (id, v) { var e = document.getElementById(id); if (e) e.textContent = v; };
    setT("qAns", ans); setT("qCorrect", correct);
    var pe = document.getElementById("qPct"); if (pe) pe.textContent = ans ? "(" + pctv + "%)" : "";
    var fill = document.getElementById("qFill"); if (fill) fill.style.width = (quizCtx.total ? ans / quizCtx.total * 100 : 0) + "%";
    var done = document.getElementById("qDone");
    if (done) done.hidden = !(ans === quizCtx.total && quizCtx.total > 0);
    if (ans === quizCtx.total && quizCtx.total > 0) {
      var msg = pctv >= 80 ? "🏆 Excellent — exam-ready on this chapter!" : pctv >= 60 ? "👍 Good — review the ones you missed." : "📚 Keep going — re-read the notes and retry.";
      var d2 = document.getElementById("qDoneMsg"); if (d2) d2.innerHTML = "You scored <b>" + correct + "/" + quizCtx.total + " (" + pctv + "%)</b>. " + msg;
    }
  }
  function shuffleQuiz() {
    quizCtx.parsed.tiers.forEach(function (t) {
      for (var i = t.questions.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var tmp = t.questions[i]; t.questions[i] = t.questions[j]; t.questions[j] = tmp; }
    });
    var list = document.getElementById("qList"); list.innerHTML = renderTierCards(quizCtx.parsed);
    Object.keys(quizCtx.saved).forEach(function (qid) { var card = list.querySelector('.q-card[data-qid="' + qid + '"]'); if (card) applyAnswer(card, quizCtx.saved[qid], true); });
  }
  function toggleReading() {
    var c = chapterByNum(quizCtx.num);
    var wrap = document.getElementById("quizInteractive");
    wrap.outerHTML = '<div id="quizReading"><div class="quiz-tools"><button id="qInteractive">🎯 Back to interactive</button>'
      + '<button id="expandAll">▾ Reveal all</button><button id="collapseAll">▸ Hide all</button><button id="toTop">↑ Top</button></div>'
      + '<div class="markdown-body" id="quizBody">' + md(c.questions) + "</div></div>";
    document.getElementById("qInteractive").onclick = function () { renderQuestions(quizCtx.num); };
    var body = document.getElementById("quizBody");
    document.getElementById("expandAll").onclick = function () { body.querySelectorAll("details").forEach(function (d) { d.open = true; }); };
    document.getElementById("collapseAll").onclick = function () { body.querySelectorAll("details").forEach(function (d) { d.open = false; }); };
    document.getElementById("toTop").onclick = function () { window.scrollTo({ top: 0, behavior: "smooth" }); };
  }
  function renderQuestions(num) {
    var c = chapterByNum(num), parsed = parseQuiz(c.questions);
    var total = parsed.tiers.reduce(function (a, t) { return a + t.questions.length; }, 0);
    if (!total) { // fallback to reading mode if parsing fails
      contentEl.innerHTML = viewTabs(num, "questions") + '<div class="markdown-body">' + md(c.questions) + "</div>";
      bindMarkRead(num, "questions"); return;
    }
    var qkey = "frm_quiz_" + num, saved = {};
    try { saved = JSON.parse(localStorage.getItem(qkey)) || {}; } catch (e) {}
    quizCtx = { num: num, parsed: parsed, saved: saved, qkey: qkey, total: total };

    var counts = { easy: 0, med: 0, hard: 0, mix: 0 };
    parsed.tiers.forEach(function (t) { counts[t.cls] += t.questions.length; });
    var chips = '<div class="q-filters"><button class="q-chip active" data-f="all">All (' + total + ")</button>";
    if (counts.easy) chips += '<button class="q-chip" data-f="easy">🟢 Easy (' + counts.easy + ")</button>";
    if (counts.med) chips += '<button class="q-chip" data-f="med">🟡 Medium (' + counts.med + ")</button>";
    if (counts.hard) chips += '<button class="q-chip" data-f="hard">🔴 Hard (' + counts.hard + ")</button>";
    if (counts.mix) chips += '<button class="q-chip" data-f="mix">📝 MCQs (' + counts.mix + ")</button>";
    chips += "</div>";
    var bar = '<div class="q-scorebar"><div class="q-score-text">📊 <b id="qAns">0</b>/' + total + ' answered · <b id="qCorrect">0</b> correct <span id="qPct" class="q-pct"></span></div>'
      + '<div class="q-progress"><div id="qFill" class="q-progress-fill"></div></div>'
      + '<div id="qDone" class="q-done" hidden><span id="qDoneMsg"></span></div></div>';
    var tools = '<div class="quiz-tools"><button id="qShuffle">🔀 Shuffle</button><button id="qReset">↺ Reset answers</button><button id="qReading">📄 Reading mode</button><button id="toTop">↑ Top</button></div>';
    var tip = '<div class="q-tip">💡 Tap an option to lock your answer — you will instantly see the right choice and a full explanation. FRM Part I has <b>no negative marking</b>, so never leave a question blank.</div>';
    var caseHtml = parsed.caseMd ? '<div class="q-case markdown-body"><div class="q-case-tag">🧩 Worked Case Study — read & learn the method</div>' + md(parsed.caseMd.replace(/^##\s*🧩[^\n]*\n/, "")) + "</div>" : "";
    contentEl.innerHTML = viewTabs(num, "questions") + conceptBanner(num)
      + '<div id="quizInteractive">' + chips + bar + tip + tools + '<div id="qList">' + renderTierCards(parsed) + "</div>" + caseHtml + "</div>";
    bindMarkRead(num, "questions");

    var root = document.getElementById("quizInteractive"), list = document.getElementById("qList");
    Object.keys(saved).forEach(function (qid) { var card = list.querySelector('.q-card[data-qid="' + qid + '"]'); if (card) applyAnswer(card, saved[qid], true); });
    updateQuizScore();
    list.addEventListener("click", function (e) {
      var btn = e.target.closest(".q-opt"); if (!btn) return;
      var card = btn.closest(".q-card"); if (card.classList.contains("answered")) return;
      var i = parseInt(btn.dataset.i, 10);
      applyAnswer(card, i, false); quizCtx.saved[card.dataset.qid] = i; saveQuiz(); updateQuizScore();
    });
    root.querySelectorAll(".q-chip").forEach(function (ch) {
      ch.addEventListener("click", function () {
        root.querySelectorAll(".q-chip").forEach(function (x) { x.classList.remove("active"); });
        ch.classList.add("active");
        list.className = ""; if (ch.dataset.f !== "all") list.classList.add("filter-" + ch.dataset.f);
      });
    });
    document.getElementById("qReset").onclick = function () { if (confirm("Clear your saved answers for this chapter?")) { quizCtx.saved = {}; saveQuiz(); renderQuestions(num); } };
    document.getElementById("qShuffle").onclick = shuffleQuiz;
    document.getElementById("qReading").onclick = toggleReading;
    document.getElementById("toTop").onclick = function () { window.scrollTo({ top: 0, behavior: "smooth" }); };
  }
  function parseFlashcards(src) {
    var lines = (src || "").split("\n"), cards = [], cur = null, mode = null, qRe = /^\s*\*\*Q\d+\.?\*\*\s*(.*)$/i;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i], m = line.match(qRe);
      if (m) { if (cur) cards.push(cur); cur = { q: m[1] ? m[1].trim() : "", a: "" }; mode = "q"; continue; }
      if (!cur) continue;
      var bq = line.match(/^\s*>\s?(.*)$/);
      if (bq) { var txt = bq[1].replace(/^\*\*A:?\*\*\s*/i, "").replace(/^\*\*Answer:?\*\*\s*/i, ""); cur.a += (cur.a ? "\n" : "") + txt; mode = "a"; }
      else if (line.trim() === "") { if (mode === "a") cur.a += "\n"; else if (mode === "q") cur.q += "\n"; }
      else { if (mode === "a") cur.a += "\n" + line; else cur.q += "\n" + line.trim(); }
    }
    if (cur) cards.push(cur);
    return cards.filter(function (c) { return c.q || c.a; });
  }
  var fcState = { cards: [], idx: 0 };
  function renderFlashcards(num) {
    var c = chapterByNum(num), cards = parseFlashcards(c.flashcards);
    fcState = { cards: cards, idx: 0 };
    if (!cards.length) { contentEl.innerHTML = viewTabs(num, "flashcards") + '<div class="markdown-body">' + md(c.flashcards) + "</div>"; bindMarkRead(num, "flashcards"); return; }
    contentEl.innerHTML = viewTabs(num, "flashcards")
      + '<div class="fc-toolbar"><span class="fc-counter" id="fcCounter"></span><div style="flex:1"></div>'
      + '<button class="view-tab" id="fcShuffle">🔀 Shuffle</button><button class="view-tab" id="fcReset">↺ Reset order</button></div>'
      + '<div class="flashcard" id="flashcard"><div class="flashcard-inner">'
      + '<div class="fc-face fc-front"><div class="fc-tag">Question</div><div class="fc-body" id="fcFront"></div><div class="fc-hint">Click card / press Space to flip</div></div>'
      + '<div class="fc-face fc-back"><div class="fc-tag">Answer</div><div class="fc-body" id="fcBack"></div><div class="fc-hint">Click to flip back</div></div>'
      + "</div></div>"
      + '<div class="fc-controls"><button id="fcPrev">← Prev</button><button class="primary" id="fcFlip">Flip</button><button id="fcNext">Next →</button></div>';
    bindMarkRead(num, "flashcards");
    var orig = cards.slice(), card = document.getElementById("flashcard");
    function show() {
      card.classList.remove("flipped");
      var cc = fcState.cards[fcState.idx];
      document.getElementById("fcFront").innerHTML = md(cc.q);
      document.getElementById("fcBack").innerHTML = md(cc.a);
      document.getElementById("fcCounter").textContent = "Card " + (fcState.idx + 1) + " / " + fcState.cards.length;
    }
    function flip() { card.classList.toggle("flipped"); }
    function next() { fcState.idx = (fcState.idx + 1) % fcState.cards.length; show(); }
    function prev() { fcState.idx = (fcState.idx - 1 + fcState.cards.length) % fcState.cards.length; show(); }
    card.addEventListener("click", flip);
    document.getElementById("fcFlip").onclick = function (e) { e.stopPropagation(); flip(); };
    document.getElementById("fcNext").onclick = next;
    document.getElementById("fcPrev").onclick = prev;
    document.getElementById("fcShuffle").onclick = function () {
      for (var i = fcState.cards.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = fcState.cards[i]; fcState.cards[i] = fcState.cards[j]; fcState.cards[j] = t; }
      fcState.idx = 0; show();
    };
    document.getElementById("fcReset").onclick = function () { fcState.cards = orig.slice(); fcState.idx = 0; show(); };
    fcState._nav = { next: next, prev: prev, flip: flip };
    show();
  }
  /* =====================================================================
     MOCK TEST RUNNER (10 papers, 100 marks, timer + negative marking)
     ===================================================================== */
  function paperByNum(num) { for (var i = 0; i < PAPERS.length; i++) if (PAPERS[i].num === num) return PAPERS[i]; return null; }
  function parsePaper(src) {
    var title = (src.match(/^#\s+(.*)/) || [])[1] || "Mock Paper";
    var meta = (src.match(/\*\*(Total:[^*]*)\*\*/) || [])[1] || "";
    var groups = [];
    var sections = src.split(/\n(?=##\s)/);
    sections.forEach(function (sec) {
      var hm = sec.match(/^##\s+(.*)/); if (!hm) return;
      var stitle = hm[1].trim();
      var marks = /2\s*marks?/.test(stitle) ? 2 : 1;
      if (/###\s/.test(sec)) {
        // case-based section: split into cases
        var cases = sec.split(/\n(?=###\s)/);
        cases.forEach(function (cp) {
          var cm = cp.match(/^###\s+(.*)/); if (!cm) return;
          var ctitle = cm[1].trim();
          var firstQ = cp.search(/\*\*Q[\w-]+\.\*\*/);
          var scenario = firstQ > -1 ? cp.slice(cp.indexOf("\n", cp.indexOf(cm[0])) + 1, firstQ).trim() : "";
          var qs = parseBlocks(cp);
          if (qs.length) groups.push({ kind: "case", title: ctitle, scenario: scenario, marks: marks, questions: qs });
        });
      } else {
        var qs2 = parseBlocks(sec);
        if (qs2.length) groups.push({ kind: "mcq", title: stitle, marks: marks, questions: qs2 });
      }
    });
    return { title: title, meta: meta, groups: groups };
  }

  var paperCtx = null, paperTimer = null;
  function clearPaperTimer() { if (paperTimer) { clearInterval(paperTimer); paperTimer = null; } }
  function fmtTime(s) { var m = Math.floor(s / 60), ss = s % 60; return (m < 10 ? "0" : "") + m + ":" + (ss < 10 ? "0" : "") + ss; }
  function paperMaxMarks() { return paperCtx.parsed.groups.reduce(function (a, g) { return a + g.questions.length * g.marks; }, 0); }
  function paperTotalQ() { return paperCtx.parsed.groups.reduce(function (a, g) { return a + g.questions.length; }, 0); }
  function paperMarksMap() { var m = {}; paperCtx.parsed.groups.forEach(function (g) { g.questions.forEach(function (q) { m[q.id] = { marks: g.marks, correct: q.correct }; }); }); return m; }
  function savePaper() { try { localStorage.setItem(paperCtx.qkey, JSON.stringify(paperCtx.saved)); } catch (e) {} }
  function updatePaperScore() {
    var map = paperMarksMap(), attempted = 0, correct = 0, score = 0;
    Object.keys(paperCtx.saved).forEach(function (qid) {
      if (!map[qid]) return;
      attempted++;
      if (paperCtx.saved[qid] === map[qid].correct) { correct++; score += map[qid].marks; }
    });
    score = Math.round(score * 100) / 100;
    var max = paperMaxMarks(), total = paperTotalQ();
    var set = function (id, v) { var e = document.getElementById(id); if (e) e.textContent = v; };
    set("pAtt", attempted + "/" + total);
    set("pCorrect", correct);
    set("pScore", score);
    set("pMax", max);
    var fill = document.getElementById("pFill"); if (fill) fill.style.width = (total ? attempted / total * 100 : 0) + "%";
    var done = document.getElementById("pDone");
    if (done) {
      if (attempted === total && total > 0) {
        clearPaperTimer();
        var pctv = Math.round(score / max * 100);
        var passed = pctv >= 60;
        done.hidden = false;
        done.className = "p-done " + (passed ? "pass" : "fail");
        done.innerHTML = "<b>" + (passed ? "✅ On track" : "📚 Below target") + "</b> — Score <b>" + score + " / " + max
          + " (" + pctv + "%)</b> · " + correct + "/" + total + " correct · Time " + fmtTime(paperCtx.elapsed)
          + ". <span class='p-passnote'>FRM Part I has no fixed pass mark; ~60%+ is a reasonable target.</span>";
      } else done.hidden = true;
    }
  }
  function paperCardHtml(q, g, gi) {
    var opts = "";
    ["A", "B", "C", "D"].forEach(function (L, i) {
      opts += '<button class="q-opt" data-i="' + i + '"><span class="q-letter">' + L + '</span><span class="q-otext">' + inlineMd(q.options[i]) + "</span></button>";
    });
    return '<div class="q-card" data-sec="' + gi + '" data-qid="' + q.id + '" data-correct="' + q.correct + '">'
      + '<div class="q-head"><span class="q-num">Q' + q.id + '</span><span class="q-tierlabel mix">' + g.marks + " mark" + (g.marks > 1 ? "s" : "") + "</span></div>"
      + '<div class="q-text">' + inlineMd(q.q) + "</div>"
      + '<div class="q-opts">' + opts + "</div>"
      + '<div class="q-expl markdown-body" hidden>' + md(q.expl) + "</div></div>";
  }
  function renderPaper(num) {
    clearPaperTimer();
    var p = paperByNum(num);
    if (!p) { renderPapersHome(); return; }
    var parsed = parsePaper(p.md);
    if (!parsed.groups.length) { contentEl.innerHTML = '<div class="markdown-body">' + md(p.md) + "</div>"; return; }
    var qkey = "frm_paper_" + num, saved = {}, elapsed = 0, ekey = "frm_paper_time_" + num;
    try { saved = JSON.parse(localStorage.getItem(qkey)) || {}; } catch (e) {}
    try { elapsed = parseInt(localStorage.getItem(ekey), 10) || 0; } catch (e) {}
    paperCtx = { num: num, parsed: parsed, saved: saved, qkey: qkey, ekey: ekey, elapsed: elapsed, running: false };

    var body = '<div class="p-top"><a href="#/papers" class="p-back">← All papers</a>'
      + '<h1 class="p-title">' + esc(parsed.title) + "</h1>"
      + '<div class="p-meta">' + esc(parsed.meta) + "</div></div>";
    body += '<div class="p-bar">'
      + '<div class="p-timer-wrap"><span class="p-timer" id="pTimer">' + fmtTime(elapsed) + "</span>"
      + '<button class="calc-btn ghost" id="pStart">▶ Start</button>'
      + '<button class="calc-btn ghost" id="pReset">↺ Reset</button></div>'
      + '<div class="p-score"><span>Attempted <b id="pAtt">0</b></span><span>✅ <b id="pCorrect">0</b></span>'
      + '<span class="p-scorebig">Score <b id="pScore">0</b> / <b id="pMax">0</b></span></div>'
      + '</div>'
      + '<div class="q-progress"><div id="pFill" class="q-progress-fill"></div></div>'
      + '<div id="pDone" class="p-done" hidden></div>'
      + '<div class="q-tip">💡 Full-length mock. Tap an option to lock it in — you will see the worked solution instantly. <b>No negative marking</b> on the FRM. Keep the 🧮 calculator (bottom-right) handy and watch your pace (~2.4 min/question).</div>';

    var qhtml = "";
    parsed.groups.forEach(function (g, gi) {
      if (g.kind === "mcq") {
        qhtml += '<div class="p-section-head">' + esc(g.title) + "</div>";
        g.questions.forEach(function (q) { qhtml += paperCardHtml(q, g, gi); });
      } else {
        qhtml += '<div class="p-case"><div class="p-case-head">🧩 ' + esc(g.title) + ' <span class="p-case-marks">5 × ' + g.marks + ' = ' + (5 * g.marks) + ' marks</span></div>'
          + '<div class="p-case-scenario markdown-body">' + md(g.scenario) + "</div>";
        g.questions.forEach(function (q) { qhtml += paperCardHtml(q, g, gi); });
        qhtml += "</div>";
      }
    });
    contentEl.innerHTML = body + '<div id="pList">' + qhtml + "</div>";
    chapterNavEl.innerHTML = "";

    var list = document.getElementById("pList");
    Object.keys(saved).forEach(function (qid) { var card = list.querySelector('.q-card[data-qid="' + qid + '"]'); if (card) applyAnswer(card, saved[qid], true); });
    updatePaperScore();
    list.addEventListener("click", function (e) {
      var btn = e.target.closest(".q-opt"); if (!btn) return;
      var card = btn.closest(".q-card"); if (card.classList.contains("answered")) return;
      if (!paperCtx.running) startPaperTimer();
      var i = parseInt(btn.dataset.i, 10);
      applyAnswer(card, i, false); paperCtx.saved[card.dataset.qid] = i; savePaper(); updatePaperScore();
    });
    document.getElementById("pStart").onclick = function () { paperCtx.running ? pausePaperTimer() : startPaperTimer(); };
    document.getElementById("pReset").onclick = function () {
      if (confirm("Reset this paper — clear answers and timer?")) {
        clearPaperTimer(); paperCtx.saved = {}; paperCtx.elapsed = 0; savePaper();
        try { localStorage.setItem(ekey, "0"); } catch (e) {}
        renderPaper(num);
      }
    };
    document.title = parsed.title + " — FRM Part I";
    highlightNav(null);
    var pl = document.querySelector('.nav-tool[data-link="papers"]'); if (pl) pl.classList.add("active");
  }
  function startPaperTimer() {
    if (!paperCtx || paperCtx.running) return;
    paperCtx.running = true;
    var btn = document.getElementById("pStart"); if (btn) btn.textContent = "⏸ Pause";
    paperTimer = setInterval(function () {
      paperCtx.elapsed++;
      var t = document.getElementById("pTimer"); if (t) t.textContent = fmtTime(paperCtx.elapsed);
      try { localStorage.setItem(paperCtx.ekey, String(paperCtx.elapsed)); } catch (e) {}
    }, 1000);
  }
  function pausePaperTimer() {
    if (!paperCtx) return; paperCtx.running = false; clearPaperTimer();
    var btn = document.getElementById("pStart"); if (btn) btn.textContent = "▶ Resume";
  }
  function renderPapersHome() {
    clearPaperTimer();
    var hero = '<div class="hero"><h1>📝 Mock Exam</h1>'
      + '<p>Full-length, exam-weighted mock papers with a timer and instant worked solutions. 100 questions, 4 hours, no negative marking — just like the real FRM Part I.</p></div>';
    var cards = '<div class="home-cards">';
    if (!PAPERS.length) cards += '<p class="markdown-body">Mock papers are being prepared — check back shortly.</p>';
    PAPERS.forEach(function (p) {
      var saved = {}; try { saved = JSON.parse(localStorage.getItem("frm_paper_" + p.num)) || {}; } catch (e) {}
      var att = Object.keys(saved).length;
      var ttl = (p.md.match(/^#\s+(.*)/) || [])[1] || ("Mock Paper " + p.num);
      var totalQ = (p.md.match(/\bQ[\w-]+\./g) || []).length || 100;
      cards += '<div class="home-card" data-go="#/paper/' + p.num + '">'
        + '<div class="hc-num">MOCK ' + p.num + "</div>"
        + '<div class="hc-title">Full-length paper</div>'
        + '<div class="hc-links"><span class="chip">📝 100 questions</span><span class="chip">⏱ 4 hours</span>'
        + (att ? '<span class="chip" style="background:var(--brand-soft);color:var(--brand)">' + att + " done</span>" : "") + "</div></div>";
    });
    cards += "</div>";
    contentEl.innerHTML = hero + cards;
    contentEl.querySelectorAll("[data-go]").forEach(function (card) { card.addEventListener("click", function () { location.hash = card.getAttribute("data-go"); }); });
    chapterNavEl.innerHTML = "";
    highlightNav(null);
    var pl = document.querySelector('.nav-tool[data-link="papers"]'); if (pl) pl.classList.add("active");
    document.title = "Mock Test Papers — FRM Part I";
  }

  function renderPrimer() {
    clearPaperTimer();
    contentEl.innerHTML = '<div class="markdown-body primer-body">' + md(PRIMER || "Primer not available.") + "</div>"
      + '<div class="chapter-nav"><a class="prev" href="#/lab"><div class="cn-label">Practice →</div><div class="cn-title">🔢 Financial Maths Lab</div></a>'
      + '<div class="cn-spacer"></div></div>';
    chapterNavEl.innerHTML = "";
    highlightNav(null);
    var pl = document.querySelector('.nav-tool[data-link="primer"]'); if (pl) pl.classList.add("active");
    document.title = "Financial Maths Primer — FRM Part I";
  }

  var XL_PRESETS = [
    { group: "From the practice sheet (the photo)", items: [
      { label: "$10,000 today @10% for 15y → FV", vals: { nper: 15, rate: 10, pv: -10000, pmt: 0, fv: "" }, target: "fv" },
      { label: "$10,000/yr for 15y @10% → worth today (PV)", vals: { nper: 15, rate: 10, pmt: -10000, fv: 0, pv: "" }, target: "pv" },
      { label: "$1L grew to $3.45L in 15y → RATE (the #NUM! fix)", vals: { nper: 15, pmt: 0, pv: -100000, fv: 345000, rate: "" }, target: "rate" },
      { label: "Clear $1L @10% over 15y → PMT", vals: { nper: 15, rate: 10, pv: -100000, fv: 0, pmt: "" }, target: "pmt" }
    ]},
    { group: "Exam drills", items: [
      { label: "$5,000/month SIP @12% p.a., 20 yrs → corpus", vals: { nper: 240, rate: 1, pmt: -5000, pv: 0, fv: "" }, target: "fv" },
      { label: "Need $1 cr in 25y @10% → invest today", vals: { nper: 25, rate: 10, pmt: 0, fv: 10000000, pv: "" }, target: "pv" },
      { label: "$50L goal in 15y @9% → save per year", vals: { nper: 15, rate: 9, pv: 0, fv: 5000000, pmt: "" }, target: "pmt" },
      { label: "$2L → $8L in 12y → CAGR", vals: { nper: 12, pmt: 0, pv: -200000, fv: 800000, rate: "" }, target: "rate" },
      { label: "$30L corpus @8%, withdraw $3L/yr → lasts how long", vals: { rate: 8, pmt: 300000, pv: -3000000, fv: 0, nper: "" }, target: "nper" }
    ]}
  ];
  function xlVal(id) { var el = document.getElementById("xl_" + id); if (!el || el.value === "") return null; var v = parseFloat(String(el.value).replace(/,/g, "")); return isFinite(v) ? v : null; }
  function xlSet(id, v) { var el = document.getElementById("xl_" + id); if (el) el.value = (v === "" || v == null) ? "" : v; }
  function xlFormulaStr(target, n, r, pv, pmt, fv, t) {
    var R = (r == null ? "rate" : r + "%"), N = (n == null ? "nper" : n), P = (pv == null ? "pv" : pv), M = (pmt == null ? "pmt" : pmt), F = (fv == null ? "fv" : fv);
    var tail = t ? ", 1" : "";
    if (target === "fv") return "=FV(" + R + ", " + N + ", " + M + ", " + P + tail + ")";
    if (target === "pv") return "=PV(" + R + ", " + N + ", " + M + ", " + F + tail + ")";
    if (target === "pmt") return "=PMT(" + R + ", " + N + ", " + P + ", " + F + tail + ")";
    if (target === "nper") return "=NPER(" + R + ", " + M + ", " + P + ", " + F + tail + ")";
    return "=RATE(" + N + ", " + M + ", " + P + ", " + F + tail + ")";
  }
  function xlCompute(target) {
    var n = xlVal("nper"), r = xlVal("rate"), pv = xlVal("pv"), pmt = xlVal("pmt"), fv = xlVal("fv");
    var t = document.getElementById("xlType").checked ? 1 : 0;
    var ri = r == null ? null : r / 100, ans, shown;
    var fEl = document.getElementById("xlFormula"), rEl = document.getElementById("xlResult");
    try {
      if (target === "fv") { ans = tvmFV(ri, n, pmt, pv, t); shown = inrDec(ans); xlSet("fv", Math.round(ans * 100) / 100); }
      else if (target === "pv") { ans = tvmPV(ri, n, pmt, fv, t); shown = inrDec(ans); xlSet("pv", Math.round(ans * 100) / 100); }
      else if (target === "pmt") { ans = tvmPMT(ri, n, pv, fv, t); shown = inrDec(ans) + " per period"; xlSet("pmt", Math.round(ans * 100) / 100); }
      else if (target === "nper") { ans = tvmNPER(ri, pmt, pv, fv, t); shown = (Math.round(ans * 100) / 100) + " periods"; xlSet("nper", Math.round(ans * 100) / 100); }
      else { ans = tvmRATE(n, pmt, pv, fv, t) * 100; shown = pct(ans) + " per period"; xlSet("rate", Math.round(ans * 100) / 100); }
      if (!isFinite(ans)) throw new Error("nan");
      fEl.textContent = xlFormulaStr(target, n, r, pv, pmt, fv, t);
      rEl.innerHTML = shown;
      rEl.classList.remove("xl-err");
    } catch (e) {
      fEl.textContent = xlFormulaStr(target, n, r, pv, pmt, fv, t);
      rEl.innerHTML = "#NUM! — check the <b>signs</b>: money you pay out must be negative (one of PV/PMT/FV must be opposite-signed).";
      rEl.classList.add("xl-err");
    }
  }
  function renderExcel() {
    clearPaperTimer();
    var rows = [
      ["nper", "N — periods", "years (or months)"],
      ["rate", "Rate % / period", "10 yearly · 1 for 12%/12 monthly"],
      ["pv", "PV — today", "money out = negative"],
      ["pmt", "PMT — each period", "SIP/EMI; out = negative"],
      ["fv", "FV — later", "goal / maturity"]
    ];
    var sheet = '<div class="xl-sheet"><div class="xl-titlebar">📗 TVM Worksheet <span>fills & computes like Excel\'s =FV / =PV / =PMT / =RATE / =NPER</span></div>';
    rows.forEach(function (r) {
      sheet += '<div class="xl-row"><div class="xl-label">' + r[1] + '</div>'
        + '<input class="xl-input" id="xl_' + r[0] + '" type="text" inputmode="decimal" placeholder="' + r[2] + '">'
        + '<button class="xl-cpt" data-xcpt="' + r[0] + '">CPT</button></div>';
    });
    sheet += '<label class="calc-mode"><input type="checkbox" id="xlType"> Payments at <b>beginning</b> of period (type = 1, annuity-due)</label>'
      + '<div class="xl-out"><code class="xl-formula" id="xlFormula">Fill any four → press CPT on the one you want</code><div class="xl-result" id="xlResult"></div></div>'
      + '<div class="lab-controls"><button class="calc-btn ghost" id="xlClear">Clear all</button></div></div>';
    var presets = "";
    XL_PRESETS.forEach(function (g) {
      presets += '<div class="xl-preset-group">' + esc(g.group) + "</div><div class='xl-presets'>";
      g.items.forEach(function (p, i) { p._gi = presets.length + ":" + i; });
      g.items.forEach(function (p) {
        presets += '<button class="xl-preset" data-xp="' + esc(JSON.stringify({ v: p.vals, t: p.target })).replace(/"/g, "&quot;") + '">' + esc(p.label) + "</button>";
      });
      presets += "</div>";
    });
    contentEl.innerHTML =
      '<div class="hero" style="background:linear-gradient(135deg,#107c41,#2f6df6)"><h1>💻 Excel TVM Calculator</h1>'
      + '<p>The exam machines have Excel — this page behaves exactly like it. Fill any four boxes, press <b>CPT</b> on the fifth, and see the Excel formula you\'d type. Try the one-click presets (including the exact sums from the practice sheet photo).</p>'
      + '<div class="hero-cta"><a class="cta" href="nism-tvm-practice.xlsx" download>⬇️ Download the practice workbook (.xlsx)</a></div></div>'
      + sheet
      + '<h2 class="xl-h2">⚡ One-click presets</h2>' + presets
      + '<details class="lab-formulas"><summary>📖 Read the full one-pager guide (sign rules, error decoder, drills)</summary><div class="markdown-body">' + md(EXCEL) + "</div></details>";
    contentEl.querySelectorAll("[data-xcpt]").forEach(function (b) { b.addEventListener("click", function () { xlCompute(b.dataset.xcpt); }); });
    contentEl.querySelectorAll(".xl-preset").forEach(function (b) {
      b.addEventListener("click", function () {
        var cfg = JSON.parse(b.getAttribute("data-xp"));
        ["nper", "rate", "pv", "pmt", "fv"].forEach(function (k) { xlSet(k, cfg.v[k] === undefined ? "" : cfg.v[k]); });
        document.getElementById("xlType").checked = false;
        xlCompute(cfg.t);
        document.querySelector(".xl-sheet").scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
    document.getElementById("xlClear").addEventListener("click", function () {
      ["nper", "rate", "pv", "pmt", "fv"].forEach(function (k) { xlSet(k, ""); });
      document.getElementById("xlFormula").textContent = "Fill any four → press CPT on the one you want";
      document.getElementById("xlResult").innerHTML = "";
    });
    chapterNavEl.innerHTML = '<a class="prev" href="#/primer"><div class="cn-label">The formulas behind it</div><div class="cn-title">📐 Financial Maths Primer</div></a>'
      + '<a class="next" href="#/lab"><div class="cn-label">Practice →</div><div class="cn-title">🔢 Financial Maths Lab</div></a>';
    highlightNav(null);
    var el = document.querySelector('.nav-tool[data-link="excel"]'); if (el) el.classList.add("active");
    document.title = "Excel TVM Calculator — FRM Part I";
  }

  function renderChapterNav(num) {
    var i = -1; for (var k = 0; k < CH.length; k++) if (CH[k].num === num) { i = k; break; }
    var prev = i > 0 ? CH[i - 1] : null, next = i < CH.length - 1 ? CH[i + 1] : null, h = "";
    if (prev) h += '<a class="prev" href="#/ch/' + prev.num + '/notes"><div class="cn-label">← Previous</div><div class="cn-title">' + esc(prev.num + ". " + prev.title) + "</div></a>"; else h += '<div class="cn-spacer"></div>';
    if (next) h += '<a class="next" href="#/ch/' + next.num + '/notes"><div class="cn-label">Next →</div><div class="cn-title">' + esc(next.num + ". " + next.title) + "</div></a>"; else h += '<div class="cn-spacer"></div>';
    chapterNavEl.innerHTML = h;
  }

  // ---------- Router ----------
  function route() {
    var hash = location.hash || "#/home";
    window.scrollTo(0, 0); closeSidebar();
    if (typeof clearPaperTimer === "function") clearPaperTimer();
    if (/^#\/primer/.test(hash)) { renderPrimer(); return; }
    if (/^#\/excel/.test(hash)) { renderExcel(); return; }
    if (/^#\/papers/.test(hash)) { renderPapersHome(); return; }
    var pm = hash.match(/^#\/paper\/([\w-]+)/);
    if (pm) { renderPaper(pm[1]); return; }
    if (/^#\/lab/.test(hash)) { renderLab(); return; }
    var m = hash.match(/^#\/ch\/(\d{2,3})\/(notes|flashcards|questions)/);
    if (m) {
      var num = m[1], view = m[2], c = chapterByNum(num);
      if (!c) { renderHome(); return; }
      if (view === "notes") renderNotes(num); else if (view === "flashcards") renderFlashcards(num); else renderQuestions(num);
      renderChapterNav(num); highlightNav(num, view);
      document.title = num + ". " + c.title + " — FRM Part I";
    } else renderHome();
  }

  // ---------- Search ----------
  var searchInput = document.getElementById("search"), searchResults = document.getElementById("searchResults");
  function snippet(text, q) {
    var idx = text.toLowerCase().indexOf(q.toLowerCase()); if (idx < 0) return "";
    var start = Math.max(0, idx - 40), end = Math.min(text.length, idx + q.length + 60);
    var s = (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
    var re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
    return esc(s).replace(re, "<mark>$1</mark>");
  }
  function doSearch(q) {
    q = q.trim(); if (q.length < 2) { searchResults.hidden = true; return; }
    var results = [];
    CH.forEach(function (c) {
      VIEWS.forEach(function (v) {
        var text = c[v.key] || "";
        if (text.toLowerCase().indexOf(q.toLowerCase()) > -1) results.push({ num: c.num, title: c.title, view: v.key, vlabel: v.label, snip: snippet(text, q) });
      });
    });
    if (!results.length) { searchResults.innerHTML = '<div class="sr-empty">No matches for “' + esc(q) + '”.</div>'; searchResults.hidden = false; return; }
    var html = "";
    results.slice(0, 40).forEach(function (r) {
      html += '<a class="sr-item" href="#/ch/' + r.num + "/" + r.view + '"><div class="sr-where">Ch ' + r.num + ". " + esc(r.title) + " · " + r.vlabel + '</div><div class="sr-snip">' + r.snip + "</div></a>";
    });
    searchResults.innerHTML = html; searchResults.hidden = false;
    searchResults.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { searchResults.hidden = true; searchInput.value = ""; }); });
  }
  searchInput.addEventListener("input", function () { doSearch(this.value); });
  document.addEventListener("click", function (e) { if (!e.target.closest(".search-wrap")) searchResults.hidden = true; });

  // ---------- Sidebar toggle ----------
  var sidebar = document.getElementById("sidebar"), overlay = document.getElementById("overlay");
  function openSidebar() { sidebar.classList.add("open"); overlay.classList.add("show"); }
  function closeSidebar() { sidebar.classList.remove("open"); overlay.classList.remove("show"); }
  document.getElementById("menuBtn").addEventListener("click", function () { sidebar.classList.contains("open") ? closeSidebar() : openSidebar(); });
  overlay.addEventListener("click", closeSidebar);

  document.getElementById("themeBtn").addEventListener("click", function () { applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"); });
  var fu = document.getElementById("fontUp"), fd = document.getElementById("fontDown");
  if (fu) fu.addEventListener("click", function () { applyScale(readScale + 0.1); });
  if (fd) fd.addEventListener("click", function () { applyScale(readScale - 0.1); });
  document.getElementById("resetProgress").addEventListener("click", function () { if (confirm("Reset all progress checkmarks?")) { progress = {}; saveProgress(progress); refreshChecks(); updateProgressUI(); } });

  document.addEventListener("keydown", function (e) {
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (e.key === "/" && !typing) { e.preventDefault(); searchInput.focus(); return; }
    if (e.key === "c" && !typing) { var p = document.getElementById("calcPanel"); if (p) { p.hidden = !p.hidden; if (!p.hidden) p.classList.add("show"); } return; }
    if (typing) return;
    if (fcState._nav && location.hash.indexOf("/flashcards") > -1) {
      if (e.key === "ArrowRight") fcState._nav.next();
      else if (e.key === "ArrowLeft") fcState._nav.prev();
      else if (e.key === " ") { e.preventDefault(); fcState._nav.flip(); }
    }
  });

  // ---------- Init ----------
  buildSidebar();
  buildCalculator();
  updateProgressUI();
  window.addEventListener("hashchange", route);
  route();
})();
