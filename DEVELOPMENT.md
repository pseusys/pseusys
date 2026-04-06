# `pseusys` personal repository

This document describes building and deployment of this repository, all the associated deployments and assets.

## Repository structure

The `source` branch holds all source files. Automated workflows build artifacts and push them to the `main` branch, which is what GitHub displays on the profile page.

---

## README and GitHub profile

`README.md` on `source` is the source of truth. On every push touching it (and daily via cron), two workflows run in sequence:

1. **Waka Readme** (`statistics.yml`, job `update-readme`) — pulls WakaTime stats and injects them into the `<!--START_SECTION:waka-->` block, then commits the result to `main`.
2. **GitHub stats cards** (`statistics.yml`, job `generate-cards`) — runs after `update-readme` on `main`, generates SVG cards via `readme-tools/github-readme-stats-action` and commits them to `assets/` with `git add -f`.

Cards generated:

- `assets/stats.svg` — GitHub contribution stats
- `assets/top-langs.svg` — top languages (compact layout)

---

## Curriculum vitae

CVs are built from LaTeX sources populated with personal data from YAML files, then compiled to PDF.

### Pipeline

1. All YAML sources in [information/](./information/) are merged into a single dictionary.
2. LaTeX templates in [curriculum_vitae/templates/](./curriculum_vitae/templates/) are rendered using that dictionary (Mustache/Chevron with `%{` / `}%` delimiters).
3. The rendered templates and a LaTeX root file from [curriculum_vitae/sources/](./curriculum_vitae/sources/) are compiled by `pdflatex` inside a Docker container — no local LaTeX installation required.

### Profiles

Each item in the YAML sources has a `profiles:` field. Only items matching the active profile appear in the output.

| Profile | Description |
|---|---|
| `frontend` | Frontend-focused CV |
| `backend` | Backend-focused CV |
| `devops` | DevOps-focused CV |
| `all` | General-purpose CV (all non-research items) |
| `cryptography` | Research CV with cryptography focus |
| `networking` | Research CV with networking focus |

Special profile values in YAML:

- `all` — item appears in every non-research profile
- `none` — item is hidden from all profiles (used to keep items in source without publishing them)

Research profiles use `base_research.tex` (single-column: header → contact + research interests row → full-width sections). All other profiles use `base.tex` (two-column paracol layout).

### Build features

#### Markdown as source of truth

**Markdown is the only formatting syntax present in `information/*.yml`.** No LaTeX commands, no HTML tags — plain Markdown only. Both build targets convert from Markdown at build time:

| Syntax | LaTeX output (`unyaml.py`) | HTML output (`markdown.ts`) |
|---|---|---|
| `**bold**` | `\textbf{bold}` | `<strong>bold</strong>` |
| `[text](url)` | `\href{url}{text}` | `<a href="url">text</a>` |
| `+ item` | `\begin{itemize}\item …\end{itemize}` | `<ul><li>…</li></ul>` |
| `- line` | `line \\` | `line<br/>` |
| `—` (em-dash) | `---` | `—` (passed through) |
| `–` (en-dash) | `--` | `–` (passed through) |
| `&` | `\&` (auto-escaped) | `&amp;` (auto-escaped) |
| `#` | `\#` (auto-escaped) | `#` (safe in HTML) |

URL content inside `[text](url)` links is never subject to `&` / `#` escaping — it is passed verbatim to `\href{}` in LaTeX (where `hyperref` handles it) and to the `href` attribute in HTML (where `&amp;` in query strings is correct).

#### Lambda functions

Two Chevron lambda functions are available in templates:

- `count(expr)` — evaluates a Python math expression and returns the result.
- `max(iterable, key)` — returns the maximum value of `key` across all elements of a Mustache iterable.

### Build commands

```shell
# Build a single profile (PROFILE defaults to "all")
make build-cv PROFILE=research

# Build all profiles
make build-all-cv

# Clean all build artifacts
make clean
```

Profiles: `frontend`, `backend`, `devops`, `all`, `research`, `cryptography`, `networking`.

Output PDFs are written to `curriculum_vitae/pdf/<profile>.pdf`.

---

## Personal website

The website source is in [website/](./website/). It is a Next.js 15 static site (TypeScript + Tailwind CSS v4) deployed to GitHub Pages at [`pseusys.github.io/pseusys`](https://pseusys.github.io/pseusys).

The `website.yml` workflow triggers on pushes to `source` touching `website/**`, builds the static output, and deploys it to the `github-pages` environment.

```shell
# Install dependencies and start local dev server (http://localhost:3000/)
make dev-website

# Build static output to website/out/
make build-website
```

### Data sourcing

Pages are populated at build time from the same YAML sources used by the CV generator (`information/*.yml`). The data layer is in `website/lib/data.ts`; text fields are rendered via `website/lib/markdown.ts`, which converts the same subset of Markdown supported by the CV pipeline (bold, links, bullet lists, line breaks) into HTML, and also handles LaTeX `\href{url}{text}` syntax present in some fields.

| Route | Source files | Notes |
|---|---|---|
| `/` | `contact.yml`, `research.yml` | Name, title, social links, intro paragraph |
| `/research` | `research.yml`, `publications.yml` | Research statement + keywords; papers, reports, theses |
| `/experience` | `work.yml`, `education.yml`, `events.yml` | Work (research profile), education, events & recognitions |
| `/projects` | `projects.yml` | All projects except `profiles: [none]` |
| `/cv` | — | Static links to PDF artifacts from the GitHub `curriculum-vitae` release |
