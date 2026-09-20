# Learning Notes Repo

This repo holds lecture notes from video courses. Raw notes are captured live during
lectures, then Claude restructures them into a consistent template, simplifies the
language, and adds Mermaid flowcharts for any process/algorithm/pipeline. The finished
notes are published to GitHub Pages via MkDocs.

## Folder structure

```
docs/                                  MkDocs docs_dir — everything published to the site
  index.md                             site home page
  <course-slug>/                       e.g. machine-learning/
    index.md                           course overview — lists weeks and their lessons
    week-NN-<week-topic-slug>/         no index.md — just the lesson files
      lesson-01-<topic-slug>.md
      lesson-02-<topic-slug>.md
    week-02-<week-topic-slug>/
      ...
templates/lesson-template.md           not published — canonical template to copy
theme_overrides/                       MkDocs theme custom_dir — CSS/JS assets, not content
  stylesheets/extra.css
  javascripts/mermaid-render.js
  javascripts/breadcrumb-nav.js
```

- All published notes live under `docs/` (required by MkDocs — `docs_dir` can't be the
  repo root). Everything else (`CLAUDE.md`, `templates/`, `.github/`, `theme_overrides/`)
  stays outside it. CSS/JS assets specifically live in `theme_overrides/` (wired up via
  `theme.custom_dir` in `mkdocs.yml`), not `docs/` — they're presentation, not content,
  and would otherwise get treated as publishable pages/nav entries by MkDocs.
- One top-level folder per course under `docs/` (kebab-case).
- One `week-NN-<week-topic-slug>/` folder per course (zero-padded week number + short
  kebab-case slug of the week's topic, e.g. `week-01-introduction-to-machine-learning`).
  **No `index.md` inside it** — just the lesson files. The course `index.md` gives
  each week a **bold plain-text label** (not a link — there's no page for it; no
  wrapping "Weeks" heading, no numbering), with its lessons as a plain bullet list
  underneath. Use bold text, not a real heading (`###`) — the ReadTheDocs theme nests
  the *active page's own headings* as sidebar sub-links, so a real heading here would
  duplicate the week name right next to the actual folder-based nav section for it.
- One file per lesson: `lesson-NN-<topic-slug>.md` (zero-padded lesson number + short
  kebab-case topic slug).
- `templates/lesson-template.md` is the canonical template — copy it for every new
  lesson rather than improvising structure.
- Every page (`docs/index.md`, each course `index.md`, each lesson file) starts with a
  YAML frontmatter block setting `title:` explicitly, e.g.
  `title: "Lesson 1: Topic title"`. This is required — MkDocs' automatic title
  detection reads the first line of the file, and since every page's first line is the
  breadcrumb (not the H1), pages without an explicit `title:` show up mislabeled in the
  sidebar (e.g. as "Index" or the raw filename). Always wrap the value in double quotes
  — an unquoted title containing a colon (e.g. `title: Week 1: Introduction to ML`) is
  invalid YAML and silently fails to set the title.
- A course `index.md` is titled exactly `Overview` (nav label only — the H1 in the body
  still uses the full course name). MkDocs' auto-nav shows a folder-with-index.md as a
  section containing its own index page nested inside; giving the index page the full
  course name too makes the sidebar read as "Machine Learning" nested inside "Machine
  learning" — i.e. duplicated. "Overview" avoids that without hand-maintaining nav.
  Weeks don't have this problem since they have no `index.md` at all.

## Lesson template

Every lesson file uses this structure (see `templates/lesson-template.md`):

```markdown
---
title: "Lesson N: Topic title"
---

[Course name](../../index.md) → <span class="week-crumb">Week N: Week topic</span> → Lesson N: Topic title

---

# Topic title

## Summary
2-3 sentences — what this lecture was actually about

## Key Concepts
### Concept name
- Definition (your words)
- Why it matters / when you'd use it
- Formula/code if relevant

## Worked Examples
[step-by-step, as given in lecture]

## Glossary
| Term | Definition |
```

## Workflow

**Before watching**
- Skim syllabus/previous lecture notes to see where this lecture fits.
- Jot 2-3 questions to answer during the lecture.
- Create the lesson file from the template with frontmatter filled in.

**While watching (user does this, not Claude)**
- Concepts, not transcription. Shorthand: `→` causation, `?` confusion, `★` important.
- Processes/algorithms/pipelines get hand-sketched as flowcharts, not prose.
- Timestamp anything confusing instead of rewinding live.

**After watching — this is where Claude does most of the work**
1. User pastes raw notes (ideally within 24 hours). Claude restructures them into the
   template above: writes the Summary, organizes Key Concepts, cleans up Worked
   Examples, builds the Glossary.
2. If the user has photographed hand-drawn flowcharts, Claude converts them to Mermaid
   syntax and embeds them in the relevant section (```mermaid fenced blocks, rendered
   via `mermaid.js` — see Publishing below).
3. If anything referenced in the raw notes is missing or ambiguous (e.g. a formula, a
   step in a worked example, which week/lesson this belongs to), **ask the user** rather
   than guessing.
4. A lesson can span multiple videos. If the user says the new raw notes continue an
   existing lesson (rather than starting a new one), merge them seamlessly into that
   lesson's existing file — treat it as one continuous lecture: rewrite the Summary to
   cover the whole lesson, extend Key Concepts/Worked Examples/Glossary in place. Don't
   create a new lesson file or literally label a section "Video 2". Under **Key
   Concepts** specifically, structure it as one `###` subsection per video's topic
   (e.g. `### 1. Foundations of Machine Learning`, `### 2. Supervised Learning`), with
   each video's individual concepts nested underneath as `####`, and a `---` divider
   between consecutive numbered topic subsections. For a single-video lesson, skip the
   numbered topic subsection and put concepts directly as `###` (as in the template).
5. Otherwise, save the finished file at
   `docs/<course>/week-NN-<week-topic-slug>/lesson-NN-<topic-slug>.md` (no `index.md` in
   the week folder). Add a link to it from `docs/<course>/index.md`, under that week's
   bold heading (add the heading if it's the first lesson of the week). The breadcrumb
   at the top of the lesson file names the course (linked) and wraps the week name in
   `<span class="week-crumb">...</span>` — there's no week page to link to, but that
   span is wired up (see Publishing) to scroll/highlight the week's section in the
   sidebar nav on click.
6. Commit only when the user asks — this repo publishes to GitHub Pages via CI on push
   to `main`, so a commit+push is a visible, shared action (see root-level agent
   guidance on confirming before push).

## Diagrams

Prefer a diagram over prose wherever one fits — any process, pipeline, algorithm,
comparison, hierarchy, or set of relationships between concepts should become a
Mermaid diagram (flowchart, table already covers simple two-thing comparisons — see
the template) rather than a bullet list describing steps or connections in words.
Keep the notes visual-first and text lean: use a diagram whenever it would let a
reader see the structure at a glance instead of reconstructing it from paragraphs.

Always use Mermaid for flowcharts/diagrams (`flowchart TD` / `graph LR` etc. in a
` ```mermaid ` fence in the markdown source — this renders correctly in GitHub's
preview) so they render both there and in the published MkDocs site (see Publishing
below for why the site's build step retargets these to a `mermaid-diagram` CSS class
rather than mermaid's own `mermaid` class — no action needed when writing notes, this
is purely a build-time detail). Always wrap a flowchart node's label in double quotes
(`E["Applying Model & Performance Evaluation"]`, not `E[Applying Model & Performance
Evaluation]`) if it contains `&`, `(`, `)`, or other special characters — unquoted
labels with these break Mermaid's parser with a syntax error at render time.

## Publishing (MkDocs)

- `mkdocs.yml` builds everything under `docs/` (`docs_dir: docs`) into `site/`.
- Theme: built-in `readthedocs` theme (dark left sidebar nav, no right-hand table of
  contents panel).
- `mkdocs serve` locally to preview; `.github/workflows/deploy-docs.yml` runs
  `mkdocs gh-deploy` on every push to `main`.
- No nav is hand-maintained in `mkdocs.yml` — MkDocs auto-generates navigation from the
  folder structure, so new weeks/lessons show up without editing config. This is why
  every page needs an explicit `title:` frontmatter (see above) — auto-nav labels come
  from that, not the H1.
- Mermaid diagrams: the `readthedocs` theme has no built-in Mermaid support, so the
  mermaid.js CDN script (via `extra_javascript`) plus `theme_overrides/javascripts/
  mermaid-render.js` render any ` ```mermaid ` fenced block client-side. The pymdownx
  custom fence gives these blocks the class `mermaid-diagram`, **not** `mermaid` — this
  is deliberate. Mermaid's own `startOnLoad` auto-render (which targets the `.mermaid`
  class) races its own logic when the script is loaded after the DOM is already parsed
  (as `extra_javascript` does): it can fire twice, and the second pass tries to
  re-parse the first pass's rendered SVG output as mermaid source, breaking every
  diagram with "No diagram type detected" / "Syntax error in text". This happened
  twice while building this out (once from a redundant manual `mermaid.initialize`
  call, once from mermaid's own built-in auto-render) before landing on the fix: never
  let anything match mermaid's auto-detected `.mermaid` class — `mermaid-render.js`
  disables `startOnLoad` and renders each `.mermaid-diagram` element exactly once via
  the explicit `mermaid.render()` API. Don't reintroduce the `mermaid` class or an
  auto-init call.
- Week breadcrumb: `theme_overrides/javascripts/breadcrumb-nav.js` (also via
  `extra_javascript`) makes any `.week-crumb` span clickable — it scrolls the sidebar
  to and briefly highlights the current week's (page-less) nav section, since there's
  no week page to link to. Styling for the cursor/highlight, heading hierarchy, table
  width, and nav capitalization is in `theme_overrides/stylesheets/extra.css`
  (`extra_css` in `mkdocs.yml`).
