# `pseusys` personal repository

## README file (and GitHub profile)

The original `README.md` file is on `source` branch, each day + on every change it gets rebuilt.
After rebuilding, it is pushed to `main` branch (that is visible on [pseusys GitHub profile](https://github.com/pseusys)).
The `README` is accompanied with all built images in a single commit.

## Curriculum vitae

### Build and run

- For a single profile:

  ```shell
  make build-cv PROFILE=[PROFILE_NAME]
  ```

    where `PROFILE_NAME` should be one of `none`, `frontend`, `backend`, `devops`, `all`.

- For all profiles at once:

  ```python3
  make build-all-cv
  ```

> The generated files will be named according to profile and placed into `curriculum_vitae/pdf/`.

### TODOs

1. Add sections from oldest versions of CV.
2. Projects: replace name + link with name (MD link) + GitHub link.
