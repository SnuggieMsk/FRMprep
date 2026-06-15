# FRM Part I Study Hub

An interactive, self-contained study app for the **GARP FRM® Part I** exam
(2026 curriculum), served as a static site on GitHub Pages — no build step
required on GitHub's side.

**Live site:** enable Pages (below), then visit
`https://<your-username>.github.io/FRMprep/`

## Features

- **62 chapter readings** across all four books, each with three tabs:
  **Notes**, **Flashcards**, and an **interactive Quiz** (tap to answer,
  instant worked explanations, difficulty tiers, score tracking).
- **Full 100-question Mock Exam** runner — exam-weighted (20/20/30/30),
  4-hour timer, no negative marking, auto-scored with worked solutions.
- **Reference & Revision:** four formula sheets, an A–Z glossary, the study
  plan, exam-day guide, and free-resource links.
- **Floating financial calculator** (TVM / finance / basic), **full-text
  search** (press `/`), **dark mode**, adjustable **text size**, and
  **progress tracking** — all saved in the browser.
- Beautiful math via **KaTeX**, rendered from `$$...$$` in the source.

## How it works

The app is plain HTML/CSS/JS — `index.html` + `style.css` + `app.js` —
that renders a single data file, `content.js`, with
[marked](https://marked.js.org) and [KaTeX](https://katex.org).

`content.js` is **generated** from the markdown sources by `build.js`:

```bash
node build.js      # reads book-*/ch*.md, practice/*.md, formula-sheets/*.md,
                   # glossary.md, study-plan.md, exam-guide.md, resources.md,
                   # flashcards/*.md, content/readme.md  ->  content.js
```

Edit the markdown, re-run `node build.js`, commit the regenerated
`content.js`. The site needs no Jekyll (a `.nojekyll` file is included).

### Source layout

```
index.html style.css app.js     the app shell + engine
content.js                       generated study data (committed)
build.js                         markdown -> content.js generator
content/readme.md                home page
book-<b>/ch<NN>.md               chapter notes (+ trailing "## Quick quiz")
practice/book-<b>-questions.md   per-book question banks (+ answer keys)
practice/mock-exam-1*.md         100-question mock + answer key -> Mock Exam
flashcards/<id>.md               per-chapter flashcards (id = book*100 + ch)
formula-sheets/ glossary.md      reference pages
study-plan.md exam-guide.md resources.md
```

## Enable GitHub Pages

1. **Settings → Pages**
2. **Source:** *Deploy from a branch*
3. Branch: your default branch · folder **/ (root)** · **Save**
4. Wait ~1–2 minutes, then open the published URL.

## Disclaimer

Independent study notes prepared from publicly available GARP learning
objectives. Not affiliated with or endorsed by GARP. FRM® is a registered
trademark of the Global Association of Risk Professionals.
