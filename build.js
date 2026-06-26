#!/usr/bin/env node
/* Build content.js for the FRM Part I Study Hub from the markdown sources.
 *
 *   node build.js
 *
 * Sources (already in the repo):
 *   book-<b>/ch<NN>.md          chapter notes (+ trailing "## Quick quiz")
 *   practice/book-<b>-questions.md   per-book question bank (+ answer key)
 *   practice/mock-exam-1.md / -answers.md   100-question mock + key
 *   flashcards/<id>.md          flashcards (Q / "> A:" format) — optional
 *   content/readme.md           home page / exam guide — optional
 *
 * Chapter id = book*100 + chapter, zero-padded to 2 (e.g. Book 1 Ch 5 -> "105").
 */
"use strict";
const fs = require("fs");
const path = require("path");

const BOOKS = {
  1: { name: "Foundations of Risk Management", chapters: 11, weight: "20%" },
  2: { name: "Quantitative Analysis", chapters: 15, weight: "20%" },
  3: { name: "Financial Markets and Products", chapters: 30 > 20 ? 20 : 20, weight: "30%" },
  4: { name: "Valuation and Risk Models", chapters: 16, weight: "30%" }
};
const ROOT = __dirname;
const read = (p) => fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "";
const id3 = (b, c) => String(b) + String(c).padStart(2, "0");

// ---- callout + front-matter cleanup for notes ----
const CALLOUT = {
  note: "📝 **Note**", warning: "⚠️ **Exam trap**",
  tip: "💡 **Exam tip**", important: "📌 **Important**"
};
function cleanNotes(src) {
  // strip YAML front matter
  src = src.replace(/^---\n[\s\S]*?\n---\n?/, "");
  // drop the trailing "## Quick quiz" section (it becomes the Quiz tab)
  const qi = src.search(/\n#{2,3}\s*Quick quiz/i);
  if (qi > -1) src = src.slice(0, qi);
  // convert "{: .warning }\npara" callouts into blockquotes
  const lines = src.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\{:\s*\.(\w+)\s*\}\s*$/);
    if (m && CALLOUT[m[1]]) {
      const label = CALLOUT[m[1]];
      const body = [];
      i++;
      while (i < lines.length && lines[i].trim() !== "") { body.push(lines[i]); i++; }
      out.push("> " + label + "  ");
      body.forEach((b) => out.push("> " + b));
      out.push("");
    } else {
      out.push(lines[i]);
    }
  }
  return out.join("\n").trim();
}

// ---- option parsing (handles "- **A.** x", "A. x  B. y", "A) x") ----
function parseOptions(block) {
  let t = block.replace(/\r/g, "");
  t = t.replace(/^\s*[-*]\s*/gm, "");      // bullet dashes
  t = t.replace(/\*\*/g, "");               // bold markers around letters
  t = " " + t.replace(/\n/g, "  ") + " ";   // flatten
  const re = /(?:^|\s)([A-D])[\.\)]\s+/g;
  const idx = [];
  let m;
  while ((m = re.exec(t))) idx.push({ L: m[1], start: re.lastIndex });
  const opts = {};
  for (let k = 0; k < idx.length; k++) {
    const end = k + 1 < idx.length ? idx[k + 1].start - 3 : t.length;
    opts[idx[k].L] = t.slice(idx[k].start, end).trim().replace(/\s+/g, " ");
  }
  if (opts.A && opts.B && opts.C && opts.D) return [opts.A, opts.B, opts.C, opts.D];
  return null;
}

// emit one question block in the app's quiz format
function emitQ(n, stem, opts, letter, expl) {
  return "**Q" + n + ".** " + stem.trim() + "\n"
    + "A) " + opts[0] + " B) " + opts[1] + " C) " + opts[2] + " D) " + opts[3] + "\n"
    + "<details><summary>Answer &amp; explanation</summary>\n"
    + "**Correct: " + letter + ")** " + expl.trim() + "\n"
    + "</details>\n";
}

// flexible answer-key parser: handles "**Q1 — B.**", "**1. B**", "1. **B**",
// "**1.** B —", optionally prefixed by ">" — line oriented.
function parseAnswerKey(text) {
  const ans = {};
  let cur = null;
  text.split("\n").forEach((line) => {
    const l = line.replace(/^\s*>?\s*/, "");
    const m = l.match(/^(?:\*\*)?\s*Q?(\d+)[\.\):]?\s*(?:\*\*)?\s*[—–-]*\s*(?:\*\*)?\(?([A-D])\)?(?=[\s.\)*]|$)/);
    if (m) {
      cur = m[1];
      ans[cur] = { L: m[2], expl: l.slice(m[0].length).replace(/^[\s*.\)—–:-]+/, "") };
    } else if (cur && l.trim()) {
      ans[cur].expl += " " + l.trim();
    }
  });
  return ans;
}

// ---- parse a chapter's "## Quick quiz" -> concept questions (format-agnostic) ----
function parseQuickQuiz(src) {
  const qi = src.search(/\n#{2,3}\s*Quick quiz/i);
  if (qi < 0) return [];
  let blk = src.slice(qi).replace(/\n#{2,3}\s*Quick quiz[^\n]*\n/i, "\n");
  const dm = blk.match(/<details[^>]*>[\s\S]*?<\/details>/i);
  const answers = dm ? parseAnswerKey(dm[0].replace(/<\/?[^>]+>/g, "")) : {};
  const body = dm ? blk.slice(0, blk.indexOf(dm[0])) : blk;
  const qs = [];
  const parts = body.split(/\n(?=\s*(?:\*\*)?Q?\d+[\.\)])/);
  parts.forEach((p) => {
    const qm = p.match(/^\s*(?:\*\*)?Q?(\d+)[\.\)]\*{0,2}\s*([\s\S]*)/);
    if (!qm) return;
    const num = qm[1];
    const rest = qm[2];
    const om = rest.search(/(?:^|\n)\s*(?:[-*]\s*)?(?:\*\*)?[A-D][\.\)]/);
    if (om < 0) return;
    const stem = rest.slice(0, om).trim().replace(/\*\*$/, "").trim();
    const opts = parseOptions(rest.slice(om));
    const ans = answers[num];
    if (opts && ans) qs.push({ stem, opts, L: ans.L, expl: ans.expl });
  });
  return qs;
}

// ---- parse a per-book question bank -> {chapter: [q,...]} ----
function parseBank(b) {
  const src = read(path.join(ROOT, "practice", "book-" + b + "-questions.md"));
  if (!src) return {};
  const ai = src.search(/##\s*Answers and explanations/i);
  const qpart = ai > -1 ? src.slice(0, ai) : src;
  const apart = ai > -1 ? src.slice(ai) : "";
  // answers: **Q1 — C.** *(Easy.)* expl
  const answers = {};
  const are = /\*\*Q(\d+)\s*[—-]+\s*([A-D])\.?\*\*\s*([\s\S]*?)(?=\n\*\*Q\d+\s*[—-]|\Z)/g;
  let a;
  while ((a = are.exec(apart))) {
    let expl = a[3].trim();
    let tier = "mix";
    const tm = expl.match(/^\*?\(?(Easy|Medium|Hard)\.?\)?\*?\.?\*?/i);
    if (tm) { tier = tm[1].toLowerCase(); expl = expl.replace(tm[0], "").trim(); }
    answers[a[1]] = { L: a[2], expl, tier: tier === "medium" ? "med" : tier };
  }
  const byChapter = {};
  const parts = qpart.split(/\n(?=\*\*Q\d+\s*\()/);
  parts.forEach((p) => {
    const qm = p.match(/\*\*Q(\d+)\s*\(Ch\s*(\d+)\)\.\*\*\s*([\s\S]*)/i);
    if (!qm) return;
    const num = qm[1], ch = parseInt(qm[2], 10), rest = qm[3];
    const om = rest.search(/(?:^|\n)\s*(?:[-*]\s*)?(?:\*\*)?[A-D][\.\)]/);
    if (om < 0) return;
    const stem = rest.slice(0, om).trim();
    const opts = parseOptions(rest.slice(om));
    const ans = answers[num];
    if (!opts || !ans) return;
    const cid = id3(b, ch);
    (byChapter[cid] = byChapter[cid] || []).push({ stem, opts, L: ans.L, expl: ans.expl, tier: ans.tier });
  });
  return byChapter;
}

// ---- per-chapter practice bank (easy, fully-worked) ----
// Source format per question:
//   **Q1.** stem
//   - A. ..  - B. ..  - C. ..  - D. ..
//   **Answer: B**
//   <multi-paragraph detailed explanation, markdown + $$math$$>
function parsePractice(cid) {
  const src = read(path.join(ROOT, "practice-bank", cid + ".md"));
  if (!src.trim()) return [];
  const s = src.replace(/^---\n[\s\S]*?\n---\n?/, "");
  const blocks = s.split(/\n(?=\*\*Q\d+\.\*\*)/);
  const qs = [];
  blocks.forEach((b) => {
    const qm = b.match(/\*\*Q(\d+)\.\*\*\s*([\s\S]*)/);
    if (!qm) return;
    const rest = qm[2];
    const om = rest.search(/(?:^|\n)\s*(?:[-*]\s*)?(?:\*\*)?[A-D][\.\)]/);
    if (om < 0) return;
    const stem = rest.slice(0, om).trim();
    const after = rest.slice(om);
    const am = after.search(/\*\*\s*(?:Answer|Correct)\b/i);
    if (am < 0) return;
    const opts = parseOptions(after.slice(0, am));
    const ansPart = after.slice(am);
    const lm = ansPart.match(/\*\*\s*(?:Answer|Correct)\s*[:=]?\s*\(?([A-D])\)?\.?\s*\*\*/i);
    if (!opts || !lm) return;
    const expl = ansPart.replace(/^[\s\S]*?\*\*\s*(?:Answer|Correct)\s*[:=]?\s*\(?[A-D]\)?\.?\s*\*\*\s*/i, "").trim();
    qs.push({ stem, opts, L: lm[1].toUpperCase(), expl });
  });
  return qs;
}

// ---- assemble a chapter's quiz markdown (tiered) ----
function buildQuiz(concept, bankQs, practiceQs) {
  let n = 0;
  let out = "";
  if (practiceQs && practiceQs.length) {
    out += "## 🟢 Easy practice — fully worked\n\n";
    practiceQs.forEach((q) => { n++; out += emitQ(n, q.stem, q.opts, q.L, q.expl) + "\n"; });
  }
  if (concept.length) {
    out += "## 📝 Concept check\n\n";
    concept.forEach((q) => { n++; out += emitQ(n, q.stem, q.opts, q.L, q.expl) + "\n"; });
  }
  const tiers = [["easy", "🟢 Easy"], ["med", "🟡 Medium"], ["hard", "🔴 Hard"], ["mix", "📝 More MCQs"]];
  tiers.forEach(([key, label]) => {
    const qs = bankQs.filter((q) => q.tier === key);
    if (!qs.length) return;
    out += "## " + label + "\n\n";
    qs.forEach((q) => { n++; out += emitQ(n, q.stem, q.opts, q.L, q.expl) + "\n"; });
  });
  if (!n) out = "_Interactive questions for this chapter are being added. Use the chapter notes and the full Mock Exam in the meantime._\n";
  return out.trim() + "\n";
}

// ---- flashcards (optional source) ----
function buildFlashcards(cid, title) {
  const f = read(path.join(ROOT, "flashcards", cid + ".md"));
  if (f.trim()) return f.replace(/^---\n[\s\S]*?\n---\n?/, "").trim() + "\n";
  return "_Flashcards for " + title + " are being added._\n";
}

// ---- mock exam -> paper ----
function buildPapers() {
  const qsrc = read(path.join(ROOT, "practice", "mock-exam-1.md"));
  const asrc = read(path.join(ROOT, "practice", "mock-exam-1-answers.md"));
  if (!qsrc || !asrc) return [];
  // answers: **Q1 — Book 3, Forward pricing** — **C.** expl...
  const answers = {};
  const are = /\*\*Q(\d+)\s*[—-]+\s*Book\s*(\d)[^—]*\*\*\s*[—-]+\s*\*\*([A-D])\.?\*\*\s*([\s\S]*?)(?=\n\*\*Q\d+\s*[—-]|\n##\s|\Z)/g;
  let a;
  while ((a = are.exec(asrc))) answers[a[1]] = { book: parseInt(a[2], 10), L: a[3], expl: a[4].trim() };
  // questions: **1.** stem \n - A. .. - B. ..
  const body = qsrc.replace(/^---\n[\s\S]*?\n---\n?/, "");
  const parts = body.split(/\n(?=\*\*\d+\.\*\*)/);
  const bucket = { 1: [], 2: [], 3: [], 4: [] };
  parts.forEach((p) => {
    const qm = p.match(/\*\*(\d+)\.\*\*\s*([\s\S]*)/);
    if (!qm) return;
    const num = qm[1], rest = qm[2];
    const om = rest.search(/(?:^|\n)\s*(?:[-*]\s*)?(?:\*\*)?[A-D][\.\)]/);
    if (om < 0) return;
    const stem = rest.slice(0, om).trim();
    const opts = parseOptions(rest.slice(om));
    const ans = answers[num];
    if (!opts || !ans) return;
    bucket[ans.book].push({ num: parseInt(num, 10), stem, opts, L: ans.L, expl: ans.expl });
  });
  let md = "# Mock Exam 1\n**Total: 100 questions · 4 hours · no negative marking**\n\n";
  let emitted = 0;
  [1, 2, 3, 4].forEach((b) => {
    if (!bucket[b].length) return;
    md += "## " + BOOKS[b].name + " (1 mark)\n\n";
    bucket[b].sort((x, y) => x.num - y.num).forEach((q) => {
      emitted++;
      md += emitQ(q.num, q.stem, q.opts, q.L, q.expl) + "\n";
    });
  });
  if (!emitted) return [];
  return [{ num: "01", md }];
}

// ---- README / home ----
function buildReadme() {
  const r = read(path.join(ROOT, "content", "readme.md"));
  if (r.trim()) return r.replace(/^---\n[\s\S]*?\n---\n?/, "").trim();
  return "# FRM Part I Study Hub\n\nPick a chapter from the sidebar to begin.";
}

// ================= assemble =================
const chapters = [];
for (let b = 1; b <= 4; b++) {
  const bk = BOOKS[b];
  const bankByCh = parseBank(b);
  for (let c = 1; c <= bk.chapters; c++) {
    const cid = id3(b, c);
    const file = path.join(ROOT, "book-" + b, "ch" + String(c).padStart(2, "0") + ".md");
    const raw = read(file);
    if (!raw) { console.warn("missing", file); continue; }
    const fm = raw.match(/title:\s*"?(.+?)"?\s*\n/);
    let title = fm ? fm[1].replace(/^\d+\.\s*/, "") : ("Chapter " + c);
    const notes = cleanNotes(raw);
    const concept = parseQuickQuiz(raw);
    const quiz = buildQuiz(concept, bankByCh[cid] || [], parsePractice(cid));
    const flashcards = buildFlashcards(cid, title);
    chapters.push({
      num: cid,
      module: "Book " + b + ": " + bk.name,
      title: title,
      notes: notes,
      flashcards: flashcards,
      questions: quiz
    });
  }
}

// ---- reference & revision pages (formula sheets, glossary, plan, guide) ----
const REF = [
  { num: "901", title: "Formula Sheet — Book 1 (Foundations)", file: "formula-sheets/book-1.md" },
  { num: "902", title: "Formula Sheet — Book 2 (Quant)", file: "formula-sheets/book-2.md" },
  { num: "903", title: "Formula Sheet — Book 3 (Markets)", file: "formula-sheets/book-3.md" },
  { num: "904", title: "Formula Sheet — Book 4 (Valuation)", file: "formula-sheets/book-4.md" },
  { num: "905", title: "Glossary (A–Z)", file: "glossary.md" },
  { num: "906", title: "Study Plan", file: "study-plan.md" },
  { num: "907", title: "Exam-Day Guide", file: "exam-guide.md" },
  { num: "908", title: "Free Resources", file: "resources.md" }
];
const refNote = "_This is a reference page — open the **Notes** tab to read it._\n";
REF.forEach((r) => {
  const raw = read(path.join(ROOT, r.file));
  if (!raw) { console.warn("missing ref", r.file); return; }
  chapters.push({
    num: r.num, module: "📌 Reference & Revision", title: r.title,
    notes: cleanNotes(raw), flashcards: refNote, questions: refNote
  });
});

const DATA = {
  readme: buildReadme(),
  primer: "",
  excel: "",
  chapters: chapters,
  papers: buildPapers()
};

const js = "window.STUDY_CONTENT = " + JSON.stringify(DATA) + ";\n";
fs.writeFileSync(path.join(ROOT, "content.js"), js);

// report
const qTotal = chapters.reduce((s, c) => s + (c.questions.match(/\*\*Q\d+\.\*\*/g) || []).length, 0);
const fcReal = chapters.filter((c) => !/being added/.test(c.flashcards)).length;
console.log("chapters:", chapters.length, "| quiz Qs:", qTotal, "| flashcard sets:", fcReal + "/" + chapters.length, "| papers:", DATA.papers.length, "| size:", (js.length / 1024).toFixed(0) + "KB");
