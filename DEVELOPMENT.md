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
| `research_crypto` | Research CV with cryptography focus |
| `research_networking` | Research CV with networking focus |

Special profile values in YAML:

- `all` — item appears in every non-research profile
- `none` — item is hidden from all profiles (used to keep items in source without publishing them)

Research profiles use `base_research.tex` (single-column: header → contact + research interests row → full-width sections). All other profiles use `base.tex` (two-column paracol layout).

### Build features

#### Markdown processing

Text fields in YAML support a subset of Markdown, converted to LaTeX at build time:

| Syntax | Renders as |
|---|---|
| `**bold**` | Bold text |
| `[text](url)` | Hyperlink |
| `+ item` | Bullet list |
| `- line` | Line break (not a list) |

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

Profiles: `frontend`, `backend`, `devops`, `all`, `research`, `research_crypto`, `research_networking`.

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
