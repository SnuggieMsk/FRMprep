/* FRM Study Hub — visualization engine
   Auto-generates a visual for any question:
     - numeric answer-choice bar chart (when the 4 options are numbers)
     - a concept diagram chosen by keyword (payoffs, VaR, SML, yield curve, ...)
   Pure SVG/HTML, theme-aware via CSS variables. No dependencies. */
(function () {
  "use strict";

  // ---------- plotting helpers ----------
  var W = 340, H = 190, ML = 40, MR = 16, MT = 16, MB = 30;
  function X(t) { return (ML + t * (W - ML - MR)).toFixed(1); }
  function Y(v) { return (MT + (1 - v) * (H - MT - MB)).toFixed(1); } // v in 0..1
  function frame(inner, cap) {
    return '<figure class="frm-fig"><svg class="frm-svg" viewBox="0 0 ' + W + ' ' + H + '" '
      + 'role="img" preserveAspectRatio="xMidYMid meet">' + inner + '</svg>'
      + (cap ? '<figcaption>' + cap + '</figcaption>' : '') + '</figure>';
  }
  function poly(pts, stroke, w, dash) {
    return '<polyline fill="none" stroke="' + stroke + '" stroke-width="' + (w || 2.4) + '"'
      + (dash ? ' stroke-dasharray="' + dash + '"' : '')
      + ' stroke-linejoin="round" stroke-linecap="round" points="'
      + pts.map(function (p) { return X(p[0]) + ',' + Y(p[1]); }).join(' ') + '"/>';
  }
  function line(x1, y1, x2, y2, stroke, w, dash) {
    return '<line x1="' + X(x1) + '" y1="' + Y(y1) + '" x2="' + X(x2) + '" y2="' + Y(y2)
      + '" stroke="' + stroke + '" stroke-width="' + (w || 1) + '"'
      + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
  }
  function txt(x, y, s, anchor, fill, size) {
    return '<text x="' + X(x) + '" y="' + Y(y) + '" text-anchor="' + (anchor || "middle")
      + '" fill="' + (fill || "var(--text-soft)") + '" font-size="' + (size || 10)
      + '" font-family="Inter,sans-serif">' + s + '</text>';
  }
  function dot(x, y, r, fill) { return '<circle cx="' + X(x) + '" cy="' + Y(y) + '" r="' + (r || 3.2) + '" fill="' + fill + '"/>'; }
  function axes(xlabel, ylabel) {
    var ax = line(0, 0.06, 1, 0.06, "var(--border)", 1.5)         // x-axis
      + line(0.02, 0, 0.02, 1, "var(--border)", 1.5);            // y-axis
    if (xlabel) ax += '<text x="' + X(1) + '" y="' + (Y(0.06) + 16) + '" text-anchor="end" fill="var(--text-soft)" font-size="9.5" font-family="Inter,sans-serif">' + xlabel + '</text>';
    if (ylabel) ax += '<text x="' + (X(0.02) - 5) + '" y="' + (Y(1) - 4) + '" text-anchor="start" fill="var(--text-soft)" font-size="9.5" font-family="Inter,sans-serif">' + ylabel + '</text>';
    return ax;
  }
  function zeroLine() { return line(0, 0.5, 1, 0.5, "var(--border)", 1.2, "3 3") + txt(0.0, 0.5, "0", "end", "var(--text-soft)", 9); }
  function gauss(mu, sd, scale, base) {
    var p = []; base = base || 0.1; scale = scale || 0.78;
    for (var i = 0; i <= 60; i++) { var t = i / 60; p.push([t, base + scale * Math.exp(-0.5 * Math.pow((t - mu) / sd, 2))]); }
    return p;
  }
  function shade(pts, fill) { // close a curve down to baseline
    var d = "M " + X(pts[0][0]) + " " + Y(0.1);
    pts.forEach(function (p) { d += " L " + X(p[0]) + " " + Y(p[1]); });
    d += " L " + X(pts[pts.length - 1][0]) + " " + Y(0.1) + " Z";
    return '<path d="' + d + '" fill="' + fill + '" opacity="0.85"/>';
  }

  var BRAND = "var(--brand)", ACC = "var(--accent)", DANG = "var(--danger)", SOFT = "var(--text-soft)", MED = "var(--med,#d97706)";

  // ---------- concept diagrams ----------
  var C = {};

  function payoff(pts, kind, strikes, cap) {
    var s = axes("underlying price S", "profit") + zeroLine();
    (strikes || []).forEach(function (k) { s += line(k, 0, k, 1, "var(--border)", 1, "2 2") + txt(k, 0.0, "K", "middle", SOFT, 9); });
    s += poly(pts, BRAND, 2.8);
    return frame(s, cap);
  }
  C.callPayoff = function () { return payoff([[0, 0.35], [0.45, 0.35], [1, 0.92]], "call", [0.45], "<b>Long call</b> — losses capped at the premium; unlimited upside once price clears the strike (K) and the breakeven."); };
  C.putPayoff = function () { return payoff([[0, 0.92], [0.55, 0.35], [1, 0.35]], "put", [0.55], "<b>Long put</b> — pays off as the price falls below the strike; loss capped at the premium paid."); };
  C.shortCall = function () { return payoff([[0, 0.65], [0.45, 0.65], [1, 0.08]], "sc", [0.45], "<b>Short call</b> — keep the premium if price stays low; unlimited loss if it rises. Mirror image of the long call."); };
  C.shortPut = function () { return payoff([[0, 0.08], [0.55, 0.65], [1, 0.65]], "sp", [0.55], "<b>Short put</b> — keep the premium unless price falls; large loss in a crash."); };
  C.straddle = function () { return payoff([[0, 0.9], [0.5, 0.28], [1, 0.9]], "v", [0.5], "<b>Long straddle</b> (call + put, same strike) — profits from a BIG move either way; worst case at the strike. Two breakevens."); };
  C.bullCall = function () { return payoff([[0, 0.32], [0.35, 0.32], [0.65, 0.72], [1, 0.72]], "bc", [0.35, 0.65], "<b>Bull call spread</b> — buy low strike, sell high strike. Profit and loss are both capped."); };
  C.bearPut = function () { return payoff([[0, 0.72], [0.35, 0.72], [0.65, 0.32], [1, 0.32]], "bp", [0.35, 0.65], "<b>Bear put spread</b> — profits as price falls, between the two strikes; capped both sides."); };
  C.butterfly = function () { return payoff([[0, 0.4], [0.3, 0.4], [0.5, 0.72], [0.7, 0.4], [1, 0.4]], "bf", [0.3, 0.5, 0.7], "<b>Long butterfly</b> — max profit at the middle strike, small capped loss away from it. A bet on low volatility."); };
  C.collar = function () { return payoff([[0, 0.3], [0.3, 0.3], [0.7, 0.7], [1, 0.7]], "col", [0.3, 0.7], "<b>Collar</b> (own stock + buy put + sell call) — downside floored, upside capped: a risk band."); };
  C.coveredCall = function () { return payoff([[0, 0.15], [0.6, 0.72], [1, 0.72]], "cc", [0.6], "<b>Covered call</b> — own the stock, sell a call. Extra income but upside is capped at the strike."); };
  C.protectivePut = function () { return payoff([[0, 0.32], [0.45, 0.32], [1, 0.85]], "pp", [0.45], "<b>Protective put</b> — own the stock + buy a put = insured downside, full upside (minus premium)."); };
  C.parity = function () {
    var s = axes("underlying price S", "value") + zeroLine();
    s += poly([[0, 0.5], [0.5, 0.5], [1, 0.92]], BRAND, 2.4) + txt(0.86, 0.86, "call", "start", BRAND, 9);
    s += poly([[0, 0.92], [0.5, 0.5], [1, 0.5]], ACC, 2.4) + txt(0.14, 0.86, "put", "end", ACC, 9);
    s += line(0.5, 0, 0.5, 1, "var(--border)", 1, "2 2") + txt(0.5, 0.0, "K", "middle", SOFT, 9);
    return frame(s, "<b>Put–call parity:</b> $$c + Ke^{-rT} = p + S_0$$. A call and a put on the same strike are two halves of the same relationship — know one and you can price the other.");
  };
  C.normalVaR = function () {
    var g = gauss(0.55, 0.15, 0.78, 0.1), tail = g.filter(function (p) { return p[0] <= 0.25; });
    var s = axes("loss / return", "likelihood");
    s += shade(tail, DANG);
    s += poly(g, BRAND, 2.4);
    s += line(0.25, 0.1, 0.25, 0.62, DANG, 1.6) + txt(0.25, 0.66, "VaR", "middle", DANG, 9.5);
    s += line(0.13, 0.1, 0.13, 0.4, MED, 1.4, "3 2") + txt(0.10, 0.44, "ES", "middle", MED, 9.5);
    return frame(s, "<b>VaR vs Expected Shortfall.</b> VaR is the loss cutoff at a confidence level (the red line). ES is the <i>average</i> loss in the shaded tail beyond VaR — so ES ≥ VaR always.");
  };
  C.normalTest = function () {
    var g = gauss(0.5, 0.15, 0.78, 0.1);
    var lt = g.filter(function (p) { return p[0] <= 0.2; }), rt = g.filter(function (p) { return p[0] >= 0.8; });
    var s = axes("test statistic", "");
    s += shade(lt, DANG) + shade(rt, DANG) + poly(g, BRAND, 2.4);
    s += line(0.2, 0.1, 0.2, 0.5, DANG, 1.4) + line(0.8, 0.1, 0.8, 0.5, DANG, 1.4);
    s += txt(0.5, 0.7, "fail to reject H₀", "middle", SOFT, 9) + txt(0.1, 0.4, "reject", "middle", DANG, 8.5) + txt(0.9, 0.4, "reject", "middle", DANG, 8.5);
    return frame(s, "<b>Two-tailed hypothesis test.</b> If the test statistic lands in either red rejection region (beyond the critical values), reject H₀. A one-tailed test shades only one side.");
  };
  C.fatTails = function () {
    var s = axes("return", "");
    s += poly(gauss(0.5, 0.1, 0.8, 0.1), BRAND, 2.2) + txt(0.5, 0.96, "normal", "middle", BRAND, 9);
    s += poly(gauss(0.5, 0.16, 0.5, 0.16), DANG, 2.2, "4 2") + txt(0.86, 0.34, "fat-tailed (t)", "start", DANG, 9);
    return frame(s, "<b>Fat tails (leptokurtosis).</b> Real financial returns have more weight in the tails than the normal curve — extreme moves happen more often than the bell predicts. Kurtosis > 3.");
  };
  C.skew = function () {
    var p = []; for (var i = 0; i <= 60; i++) { var t = i / 60; var v = 0.1 + 0.78 * Math.exp(-0.5 * Math.pow((t - 0.38) / (t < 0.38 ? 0.1 : 0.22), 2)); p.push([t, v]); }
    var s = axes("return", "") + poly(p, BRAND, 2.4);
    s += line(0.38, 0.1, 0.38, 0.7, ACC, 1.3, "3 2") + txt(0.38, 0.74, "mode", "middle", ACC, 8.5);
    s += txt(0.72, 0.3, "long right tail", "middle", SOFT, 9);
    return frame(s, "<b>Positive (right) skew.</b> A long tail to the right: mean > median > mode. Negative skew is the mirror image (long left tail) — common and dangerous for asset returns.");
  };
  C.sml = function () {
    var s = axes("beta (β)", "E[R]");
    s += poly([[0.02, 0.25], [1, 0.9]], BRAND, 2.6);
    s += line(0, 0.25, 1, 0.25, "var(--border)", 1, "2 2") + txt(0.0, 0.25, "Rf", "end", SOFT, 9);
    s += dot(0.5, 0.575, 3.4, ACC) + txt(0.5, 0.64, "fairly priced", "middle", ACC, 8.5);
    s += dot(0.5, 0.74, 3.4, MED) + txt(0.62, 0.78, "underpriced (α>0)", "start", MED, 8);
    return frame(s, "<b>Security Market Line (CAPM).</b> $$E[R_i]=R_f+\\beta_i(E[R_m]-R_f)$$. Expected return rises linearly with beta. Points above the line are underpriced (positive alpha); below = overpriced.");
  };
  C.cml = function () {
    var fr = []; for (var i = 0; i <= 40; i++) { var t = i / 40; fr.push([0.15 + 0.6 * Math.pow(t, 0.5) * 0.9, 0.2 + 0.7 * t]); }
    var s = axes("risk (σ)", "E[R]");
    s += poly(fr, SOFT, 1.8, "4 2") + txt(0.8, 0.55, "efficient frontier", "middle", SOFT, 8.5);
    s += poly([[0.02, 0.25], [0.95, 0.92]], BRAND, 2.4) + txt(0.4, 0.66, "CML", "middle", BRAND, 9);
    s += line(0, 0.25, 1, 0.25, "var(--border)", 1, "2 2") + txt(0.0, 0.25, "Rf", "end", SOFT, 9);
    s += dot(0.52, 0.6, 3.4, ACC) + txt(0.52, 0.52, "market", "middle", ACC, 8.5);
    return frame(s, "<b>Capital Market Line.</b> Mixing the risk-free asset with the market portfolio gives the best risk/return trade-off — a straight line from Rf through the market (tangency) point.");
  };
  C.efficientFrontier = C.cml;
  C.yieldCurve = function () {
    var s = axes("maturity", "yield");
    s += poly([[0.02, 0.3], [0.4, 0.6], [1, 0.78]], BRAND, 2.4) + txt(0.9, 0.86, "normal", "end", BRAND, 9);
    s += poly([[0.02, 0.72], [0.4, 0.52], [1, 0.34]], DANG, 2.2, "4 2") + txt(0.9, 0.28, "inverted", "end", DANG, 9);
    s += poly([[0.02, 0.5], [1, 0.5]], SOFT, 1.8, "1 3") + txt(0.2, 0.55, "flat", "middle", SOFT, 8.5);
    return frame(s, "<b>Term-structure shapes.</b> Normal = upward sloping (longer = higher yield); inverted = downward (often a recession signal); flat = little difference across maturities.");
  };
  C.curveShift = function () {
    var s = axes("maturity", "yield");
    s += poly([[0.02, 0.32], [0.4, 0.58], [1, 0.74]], BRAND, 2.4) + txt(0.92, 0.8, "base", "end", BRAND, 8.5);
    s += poly([[0.02, 0.32], [0.4, 0.62], [1, 0.9]], MED, 2.2, "4 2") + txt(0.92, 0.94, "steepened", "end", MED, 8.5);
    return frame(s, "<b>Non-parallel shift.</b> When long rates move more than short rates the curve <i>steepens</i> — a single duration number misses this; key-rate (KR01) measures capture it.");
  };
  C.bondConvexity = function () {
    var p = []; for (var i = 0; i <= 40; i++) { var t = i / 40; p.push([t, 0.15 + 0.75 * Math.exp(-1.6 * t)]); }
    var s = axes("yield", "price");
    s += poly([[0.05, 0.84], [0.95, 0.12]], DANG, 1.8, "5 3") + txt(0.78, 0.22, "duration (line)", "end", DANG, 8.5);
    s += poly(p, BRAND, 2.6) + txt(0.6, 0.5, "true price", "start", BRAND, 9);
    return frame(s, "<b>Convexity.</b> The price–yield relationship curves (blue). Duration is just the straight-line tangent (red): it under-predicts price, so convexity is a positive correction term.");
  };
  C.binomial1 = function () {
    var s = "";
    s += line(0.12, 0.5, 0.7, 0.82, SOFT, 1.6) + line(0.12, 0.5, 0.7, 0.18, SOFT, 1.6);
    s += dot(0.12, 0.5, 5, BRAND) + txt(0.06, 0.5, "S₀", "end", SOFT, 10);
    s += dot(0.7, 0.82, 5, ACC) + txt(0.78, 0.84, "S·u (prob p)", "start", SOFT, 9);
    s += dot(0.7, 0.18, 5, DANG) + txt(0.78, 0.18, "S·d (prob 1−p)", "start", SOFT, 9);
    return frame(s, "<b>One-step binomial tree.</b> Price moves up (×u) or down (×d). Value the option with the <i>risk-neutral</i> probability $$p=\\dfrac{e^{r\\Delta t}-d}{u-d}$$, then discount at the risk-free rate.");
  };
  C.binomial2 = function () {
    var s = "";
    function e(x1, y1, x2, y2) { return line(x1, y1, x2, y2, SOFT, 1.4); }
    s += e(0.1, 0.5, 0.5, 0.78) + e(0.1, 0.5, 0.5, 0.22) + e(0.5, 0.78, 0.9, 0.92) + e(0.5, 0.78, 0.9, 0.5) + e(0.5, 0.22, 0.9, 0.5) + e(0.5, 0.22, 0.9, 0.08);
    s += dot(0.1, 0.5, 4.5, BRAND) + dot(0.5, 0.78, 4, BRAND) + dot(0.5, 0.22, 4, BRAND);
    s += dot(0.9, 0.92, 4.5, ACC) + dot(0.9, 0.5, 4.5, BRAND) + dot(0.9, 0.08, 4.5, DANG);
    s += txt(0.06, 0.5, "S₀", "end", SOFT, 9) + txt(0.95, 0.92, "uu", "start", SOFT, 8.5) + txt(0.95, 0.5, "ud", "start", SOFT, 8.5) + txt(0.95, 0.08, "dd", "start", SOFT, 8.5);
    return frame(s, "<b>Two-step binomial tree.</b> Build the price lattice forward, then work <i>backward</i> from the payoffs at the end, discounting node-by-node with the risk-neutral probability.");
  };
  C.regression = function () {
    var s = axes("X", "Y");
    var seed = [[0.15, 0.3], [0.25, 0.42], [0.35, 0.38], [0.45, 0.55], [0.55, 0.5], [0.62, 0.68], [0.72, 0.62], [0.8, 0.8], [0.9, 0.75], [0.3, 0.5]];
    seed.forEach(function (q) { s += dot(q[0], q[1], 2.8, BRAND); });
    s += poly([[0.1, 0.32], [0.92, 0.78]], DANG, 2.2) + txt(0.8, 0.86, "fitted line", "end", DANG, 9);
    return frame(s, "<b>Linear regression.</b> The line minimizes the squared vertical gaps (residuals). Slope $$\\hat\\beta=\\dfrac{\\text{Cov}(X,Y)}{\\text{Var}(X)}$$; R² is the fraction of Y's variation the line explains.");
  };
  C.ewma = function () {
    var s = axes("lag (how old the data is)", "weight");
    var lam = 0.78;
    for (var i = 0; i < 9; i++) { var t = 0.08 + i * 0.1, h = 0.12 + 0.7 * Math.pow(lam, i); s += '<rect x="' + (X(t) - 8) + '" y="' + Y(h) + '" width="16" height="' + (Y(0.1) - Y(h)) + '" fill="' + (i === 0 ? ACC : BRAND) + '" rx="2"/>'; }
    return frame(s, "<b>EWMA / GARCH weighting.</b> Recent returns get the biggest weight; older ones decay geometrically by λ. That's why EWMA volatility reacts quickly to fresh market shocks.");
  };
  C.lossDist = function () {
    var p = []; for (var i = 0; i <= 60; i++) { var t = i / 60; p.push([t, 0.1 + 0.78 * Math.exp(-0.5 * Math.pow((t - 0.3) / (t < 0.3 ? 0.12 : 0.26), 2))]); }
    var s = axes("credit loss", "likelihood") + poly(p, BRAND, 2.4);
    s += line(0.3, 0.1, 0.3, 0.78, ACC, 1.5) + txt(0.3, 0.82, "EL", "middle", ACC, 9);
    s += line(0.66, 0.1, 0.66, 0.5, DANG, 1.5) + txt(0.66, 0.54, "VaR", "middle", DANG, 9);
    s += '<line x1="' + X(0.3) + '" y1="' + Y(0.2) + '" x2="' + X(0.66) + '" y2="' + Y(0.2) + '" stroke="' + MED + '" stroke-width="1.4" marker-end="url(#ah)"/>';
    s += txt(0.48, 0.24, "UL", "middle", MED, 9);
    return frame('<defs><marker id="ah" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="' + MED + '"/></marker></defs>' + s,
      "<b>Credit loss distribution.</b> Expected Loss (EL = PD×LGD×EAD) is covered by pricing/provisions. Unexpected Loss (UL, the gap up to VaR) is covered by economic capital.");
  };
  C.hedgeBasis = function () {
    var s = axes("time", "price");
    s += poly([[0.05, 0.8], [1, 0.62]], BRAND, 2.2) + txt(0.2, 0.86, "spot", "start", BRAND, 9);
    s += poly([[0.05, 0.5], [1, 0.6]], ACC, 2.2) + txt(0.2, 0.42, "futures", "start", ACC, 9);
    s += line(0.05, 0.8, 0.05, 0.5, MED, 1.4) + txt(0.02, 0.65, "basis", "end", MED, 8.5);
    s += txt(0.95, 0.5, "→ 0 at expiry", "end", SOFT, 8.5);
    return frame(s, "<b>Basis risk.</b> Basis = spot − futures. It shrinks toward zero as the contract nears expiry (convergence). A hedge isn't perfect because the basis can move while you hold it.");
  };
  C.psa = function () {
    var s = axes("loan age (months)", "CPR");
    s += poly([[0.02, 0.12], [0.33, 0.78], [1, 0.78]], BRAND, 2.6);
    s += txt(0.55, 0.84, "100% PSA: 6% CPR", "middle", SOFT, 8.5);
    s += line(0.33, 0.1, 0.33, 0.78, "var(--border)", 1, "2 2") + txt(0.33, 0.04, "30m", "middle", SOFT, 8.5);
    return frame(s, "<b>PSA prepayment ramp.</b> 100% PSA = prepayments rise 0.2% per month for 30 months, then level off at 6% CPR. Faster prepayment (higher PSA) shortens an MBS's life.");
  };
  C.diversification = function () {
    var p = []; for (var i = 0; i <= 40; i++) { var n = i / 40; p.push([n, 0.2 + 0.62 * Math.exp(-4 * n)]); }
    var s = axes("number of stocks", "portfolio risk") + poly(p, BRAND, 2.6);
    s += line(0, 0.2, 1, 0.2, ACC, 1.4, "4 2") + txt(0.7, 0.26, "systematic (market) risk floor", "middle", ACC, 8);
    return frame(s, "<b>Diversification.</b> Adding stocks averages away company-specific (idiosyncratic) risk, but systematic/market risk cannot be diversified away — that's the floor.");
  };

  // ---------- keyword -> concept ----------
  var RULES = [
    [/put[\s-]*call parity/i, "parity"],
    [/protective put/i, "protectivePut"],
    [/covered call/i, "coveredCall"],
    [/straddle|strangle/i, "straddle"],
    [/bull (call )?spread/i, "bullCall"],
    [/bear (put )?spread/i, "bearPut"],
    [/butterfly/i, "butterfly"],
    [/collar/i, "collar"],
    [/short call|writing a call|written call/i, "shortCall"],
    [/short put|writing a put|written put/i, "shortPut"],
    [/\bcall option|long call|call payoff/i, "callPayoff"],
    [/\bput option|long put|put payoff/i, "putPayoff"],
    [/expected shortfall|\bES\b|conditional var/i, "normalVaR"],
    [/value[\s-]?at[\s-]?risk|\bVaR\b/i, "normalVaR"],
    [/expected loss|unexpected loss|economic capital|credit var|\bEL\b|\bUL\b|PD\b.*LGD|LGD\b.*EAD/i, "lossDist"],
    [/security market line|\bSML\b|\bCAPM\b|jensen|\balpha\b|\bbeta\b/i, "sml"],
    [/capital market line|\bCML\b|efficient frontier|two[\s-]fund|tangency/i, "cml"],
    [/diversif|idiosyncratic|systematic risk|specific risk/i, "diversification"],
    [/key[\s-]?rate|non[\s-]?parallel|steepen|kr01|partial '?01/i, "curveShift"],
    [/yield curve|term structure|spot rate|forward rate|inverted|upward[\s-]?sloping|bootstrapp/i, "yieldCurve"],
    [/convexity|duration|dv01|price[\s-]?yield/i, "bondConvexity"],
    [/binomial|risk[\s-]?neutral|two[\s-]?step tree|up[\s-]?factor|\bu = e/i, "binomial2"],
    [/black[\s-]?scholes|\bBSM\b|\bd_?1\b|\bd_?2\b|delta|gamma|vega|theta|\brho\b/i, "callPayoff"],
    [/regression|\bOLS\b|r[\s-]?squared|residual|slope|heteroskedastic|multicollinear/i, "regression"],
    [/ewma|garch|exponentially weighted|volatility clustering/i, "ewma"],
    [/basis risk|hedge ratio|cross[\s-]?hedg|minimum[\s-]?variance hedge|convergence/i, "hedgeBasis"],
    [/\bPSA\b|\bCPR\b|\bSMM\b|prepayment|mortgage/i, "psa"],
    [/skew/i, "skew"],
    [/kurtosis|fat tail|leptokurtic|\bt[\s-]?distribution|heavy tail/i, "fatTails"],
    [/hypothesis|null hypothesis|p[\s-]?value|two[\s-]?tailed|one[\s-]?tailed|t[\s-]?test|critical value|significance/i, "normalTest"],
    [/normal distribution|z[\s-]?score|confidence interval|standard normal/i, "normalTest"]
  ];
  function pickConcept(text) {
    if (!text) return null;
    for (var i = 0; i < RULES.length; i++) if (RULES[i][0].test(text)) return RULES[i][1];
    return null;
  }
  function conceptSVG(key) { return (key && C[key]) ? C[key]() : ""; }

  // ---------- numeric answer-choice chart ----------
  function parseNum(s) {
    if (s == null) return null;
    var m = String(s).replace(/[−]/g, "-").replace(/,/g, "");
    // grab the first signed number (ignore $, %, units)
    var mm = m.match(/-?\d+(?:\.\d+)?/);
    if (!mm) return null;
    var v = parseFloat(mm[0]);
    return isFinite(v) ? v : null;
  }
  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }
  function numericChartHTML(opts, correct, chosen) {
    if (!opts || opts.length !== 4) return "";
    var vals = opts.map(parseNum);
    if (vals.some(function (v) { return v === null; })) return "";
    var uniq = {}; vals.forEach(function (v) { uniq[v] = 1; });
    if (Object.keys(uniq).length < 2) return "";
    var min = Math.min.apply(null, vals), max = Math.max.apply(null, vals);
    var span = max - min || 1;
    var rows = opts.map(function (o, i) {
      var pctLen = 12 + 88 * (vals[i] - min) / span; // 12%..100%
      var cls = i === correct ? "ok" : (i === chosen ? "no" : "");
      var mark = i === correct ? "✓" : (i === chosen ? "✗" : "");
      return '<div class="frm-bar-row ' + cls + '">'
        + '<span class="frm-bar-key">' + "ABCD"[i] + '</span>'
        + '<span class="frm-bar-track"><span class="frm-bar-fill" style="width:' + pctLen.toFixed(1) + '%"></span></span>'
        + '<span class="frm-bar-val">' + esc(o) + ' <b>' + mark + '</b></span></div>';
    }).join("");
    return '<figure class="frm-fig"><div class="frm-bars">' + rows + '</div>'
      + '<figcaption>How the four answer choices compare — the green bar is correct'
      + (chosen != null && chosen !== correct ? ", red was your pick" : "")
      + '. Notice how close the trap values sit to the right answer.</figcaption></figure>';
  }

  // ---------- fallback outcome chips (non-numeric, no concept match) ----------
  function chipsHTML(opts, correct, chosen) {
    if (!opts || opts.length !== 4) return "";
    var rows = opts.map(function (o, i) {
      var cls = i === correct ? "ok" : (i === chosen ? "no" : "");
      var mark = i === correct ? "✓" : (i === chosen ? "✗" : "");
      return '<div class="frm-chip-row ' + cls + '"><span class="frm-chip-key">' + "ABCD"[i] + '</span>'
        + '<span class="frm-chip-txt">' + esc(o) + '</span><span class="frm-chip-mark">' + mark + '</span></div>';
    }).join("");
    return '<figure class="frm-fig"><div class="frm-chips-v">' + rows + '</div>'
      + '<figcaption>Answer map — ✓ is correct' + (chosen != null && chosen !== correct ? ", ✗ was your pick" : "") + '.</figcaption></figure>';
  }

  // ---------- public: build the full visual block for a question ----------
  function buildQuestionViz(opts, correct, chosen, conceptText) {
    var parts = [];
    var num = numericChartHTML(opts, correct, chosen);
    if (num) parts.push(num);
    var ck = pickConcept(conceptText);
    if (ck) parts.push(conceptSVG(ck));
    if (!parts.length) { var ch = chipsHTML(opts, correct, chosen); if (ch) parts.push(ch); }
    if (!parts.length) return "";
    return '<div class="q-viz"><div class="q-viz-title">📊 Visual aid</div>' + parts.join("") + '</div>';
  }

  window.FRMViz = {
    pickConcept: pickConcept,
    conceptSVG: conceptSVG,
    numericChartHTML: numericChartHTML,
    buildQuestionViz: buildQuestionViz,
    has: function (k) { return !!C[k]; }
  };
})();
