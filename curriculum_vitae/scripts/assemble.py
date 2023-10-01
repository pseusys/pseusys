#!/usr/bin python3

from argparse import ArgumentParser
from pathlib import Path
from shutil import copytree, rmtree

from chevron import render

from moustache import ProfileDict
from support import CVProfile
from unyaml import unyaml


curriculum_dir = Path(__file__).parent.parent.resolve()


def repopulate_build() -> None:
    build_root = curriculum_dir / "build"
    rmtree(build_root, ignore_errors=True)
    build_root.mkdir()


def process_templates(profile: CVProfile) -> None:
    info_root = curriculum_dir.parent / "information"
    template_root = curriculum_dir / "templates"
    build_root = curriculum_dir / "build"
    information = unyaml(info_root)
    for template in template_root.glob("*.tex"):
        data = ProfileDict(information, template.stem, profile)
        with open(template, "r") as file:
            payload = render(file, data, def_ldel="%{", def_rdel="}%")
        with open(build_root / template.name, "w") as file:
            file.write(payload)


parser = ArgumentParser()
parser.add_argument("profile", type=CVProfile, choices=list(CVProfile))


if __name__ == "__main__":
    arguments = parser.parse_args()
    repopulate_build()
    process_templates(arguments.profile)
