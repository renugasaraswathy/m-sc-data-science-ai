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
    index.md                           course overview, links to weeks
    week-NN-<week-topic-slug>/
      index.md                         week overview, links back to course + lessons
      lesson-01-<topic-slug>.md
      lesson-02-<topic-slug>.md
    week-02-<week-topic-slug>/
      ...
templates/lesson-template.md           not published — canonical template to copy
```

- All published notes live under `docs/` (required by MkDocs — `docs_dir` can't be the
  repo root). Everything else (`CLAUDE.md`, `templates/`, `.github/`) stays outside it.
- One top-level folder per course under `docs/` (kebab-case).
- One `week-NN-<week-topic-slug>/` folder per course (zero-padded week number + short
  kebab-case slug of the week's topic, e.g. `week-01-introduction-to-machine-learning`),
  containing an `index.md` (links back to the course index, links forward to each lesson).
- One file per lesson: `lesson-NN-<topic-slug>.md` (zero-padded lesson number + short
  kebab-case topic slug).
- `templates/lesson-template.md` is the canonical template — copy it for every new
  lesson rather than improvising structure.
- Every page (`docs/index.md`, each course `index.md`, each week `index.md`, each
  lesson file) starts with a YAML frontmatter block setting `title:` explicitly, e.g.
  `title: "Lesson 1: Topic title"`. This is required — MkDocs' automatic title
  detection reads the first line of the file, and since every page's first line is the
  breadcrumb (not the H1), pages without an explicit `title:` show up mislabeled in the
  sidebar (e.g. as "Index" or the raw filename). Always wrap the value in double quotes
  — an unquoted title containing a colon (e.g. `title: Week 1: Introduction to ML`) is
  invalid YAML and silently fails to set the title.

## Lesson template

Every lesson file uses this structure (see `templates/lesson-template.md`):

```markdown
---
title: "Lesson N: Topic title"
---

[Course name](../../index.md) → [Week N: Week topic](../index.md) → Lesson N: Topic title

# Topic title

## TL;DR
2-3 sentences — what this lecture was actually about

## Key Concepts
### Concept name
- Definition (your words)
- Why it matters / when you'd use it
- Formula/code if relevant

## Worked Examples
[step-by-step, as given in lecture]

## Questions / Confusions
- [ ] Unresolved question 1
- [ ] Unresolved question 2

## Connections
- Links to [other lecture/concept]
- Real-world tie-in (e.g., how this applies to your A/B testing work)

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
   template above: writes the TL;DR, organizes Key Concepts, cleans up Worked Examples,
   carries forward open Questions, adds Connections, builds the Glossary. Connections
   must only reference material actually in this lesson's notes, other lessons/weeks in
   this repo, or things the user has explicitly told Claude about themselves in this
   conversation — never invent a real-world tie-in (e.g. to a job, project, or past
   conversation) that wasn't actually mentioned.
2. If the user has photographed hand-drawn flowcharts, Claude converts them to Mermaid
   syntax and embeds them in the relevant section (```mermaid fenced blocks, rendered
   via `mermaid.js` — see Publishing below).
3. Claude resolves open "?" questions directly using the lecture content as context,
   checking them off or leaving them open with a note on why.
4. If anything referenced in the raw notes is missing or ambiguous (e.g. a formula, a
   step in a worked example, which week/lesson this belongs to), **ask the user** rather
   than guessing.
5. A lesson can span multiple videos. If the user says the new raw notes continue an
   existing lesson (rather than starting a new one), merge them seamlessly into that
   lesson's existing file — treat it as one continuous lecture: rewrite the TL;DR to
   cover the whole lesson, extend Key Concepts/Worked Examples/Connections/Glossary
   in place, and fold in new Questions alongside existing ones. Don't create a new
   lesson file or mark a "Video 2" divider.
6. Otherwise, save the finished file at
   `docs/<course>/week-NN-<week-topic-slug>/lesson-NN-<topic-slug>.md`. Add a link to it
   from that week's `index.md` (create the week `index.md` if it's the first lesson of
   the week), and link the week from `docs/<course>/index.md` if not already linked. The
   breadcrumb at the top of the lesson file links back to both.
7. Commit only when the user asks — this repo publishes to GitHub Pages via CI on push
   to `main`, so a commit+push is a visible, shared action (see root-level agent
   guidance on confirming before push).

## Diagrams

Always use Mermaid for flowcharts/diagrams (`flowchart TD` / `graph LR` etc. in a
` ```mermaid ` fence) so they render both in GitHub's markdown preview and in the
published MkDocs site.

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
- Mermaid diagrams: the `readthedocs` theme has no built-in Mermaid support, so
  `docs/javascripts/mermaid-init.js` + the mermaid.js CDN script (both wired up via
  `extra_javascript` in `mkdocs.yml`) render any ` ```mermaid ` fenced block client-side.
