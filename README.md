# FRM Part I Prep — 2026 Curriculum

A complete, self-contained study companion for the **GARP FRM Part I exam**,
built as a GitHub Pages site:

- Chapter-by-chapter notes for **all 62 readings** across the four books,
  aligned to GARP's published 2026 learning objectives
- **Formula sheets** (one per book) for final-week revision
- **Question banks** per book + a full-length **100-question mock exam**
  with a fully worked answer key
- Study plans (16-week and 10-week), exam-day guide, calculator guide,
  and an A–Z glossary

## Viewing the site (GitHub Pages)

1. In this repository on GitHub, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to *Deploy from a branch*.
3. Select the default branch, folder **/ (root)**, and save.
4. After a minute or two, the site is live at
   `https://<your-username>.github.io/FRMprep/`.

The site uses Jekyll with the [just-the-docs](https://just-the-docs.github.io/just-the-docs/)
theme (sidebar navigation + full-text search) and MathJax for formulas —
all rendered automatically by GitHub Pages; no local build needed.

### Running locally (optional)

```bash
gem install bundler jekyll
bundle init && bundle add jekyll github-pages webrick
bundle exec jekyll serve
```

## Structure

```
index.md           Home — exam overview & how to use the site
study-plan.md      16-week and 10-week schedules
exam-guide.md      Logistics, calculator mastery, exam-day strategy
book-1/            Foundations of Risk Management (11 chapters, 20%)
book-2/            Quantitative Analysis (15 chapters, 20%)
book-3/            Financial Markets and Products (20 chapters, 30%)
book-4/            Valuation and Risk Models (16 chapters, 30%)
formula-sheets/    One formula sheet per book
practice/          Question banks per book + 100-question mock exam + key
glossary.md        A–Z glossary of FRM Part I terms
resources.md       Links to free official GARP materials
```

## Disclaimer

Independent study notes prepared from publicly available GARP learning
objectives. Not affiliated with or endorsed by GARP. FRM® is a registered
trademark of the Global Association of Risk Professionals. Always verify
exam policies, dates, and the current study guide at
[garp.org/frm](https://www.garp.org/frm).
