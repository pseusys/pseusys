# `pseusys` personal repository

## README file (and GitHub profile)

The original `README.md` file is on `source` branch, each day + on every change it gets rebuilt.
After rebuilding, it is pushed to `main` branch (that is visible on [pseusys GitHub profile](https://github.com/pseusys)).
The `README` is accompanied with all built images in a single commit.

## Curriculum vitae

CVs are built from `LaTeX` sources, populated with personal information using `mustache` and then compiled to a single PDF file.
The general building workflow is simple:

1. All the information from `YAML` sources in [information](./information) directory is merged into a single dictionary.
2. All the `LaTeX` templates in [templates](./curriculum_vitae/templates/) directory are populated using that dictionary.
3. The `LaTeX` root sources in [sources](./curriculum_vitae/sources/) are built, sources generated from templates are included.

### Build features

For nice, fine-grained and `LaTeX`-independent builds, some information pre-processing is required.

#### List profiling

Whenever a list is processed, a special key (`profiles`) is used to filter elements from appearing in different CV variants.
There are 4 different profiles supported right now: `all`, `backend`, `fullstack` and `backend`, `profiles` field can contain one or many of them.
NB! Profile `all` is equivalent to `backend`, `fullstack` and `backend` together.

#### Markdown processing

All the information fields can include markdown code.
This markdown is processed before including into `LaTeX` sources.
Only subset of markdown is supported for now, although it can be expanded if needed.
Currently supported syntax: bold text, links.

### Build and run

Following commands can be used for automated CV generation.
No local `LaTeX` compiler is required, all the processing is performed with a [`blang/latex`](https://github.com/blang/latex-docker) Docker container.
`LaTeX` sources are only processed once (which is fine, because CV does not and should not include any bibliography).

- For a single profile:

  ```shell
  make build-cv PROFILE=[PROFILE_NAME]
  ```

    where `PROFILE_NAME` should be one of `frontend`, `backend`, `devops`, `all`.

- For all profiles at once:

  ```python
  make build-all-cv
  ```

> The generated files will be named according to profile and placed into `curriculum_vitae/pdf/`.
