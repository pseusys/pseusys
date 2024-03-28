from pathlib import Path
from re import compile, search
from typing import Any, Dict, List, TypeVar

from yaml import safe_load


_T = TypeVar("_T", Dict, List, str, Any)

_MD_BOLD = compile(r"\*\*(\S*)\*\*")


def _md_bold_to_latex(string: str) -> str:
    bold_found = search(_MD_BOLD, string)
    while bold_found is not None:
        start, end = bold_found.start(), bold_found.end()
        text = bold_found.group(1)
        string = string[:start] + f"\\textbf{{{text}}}" + string[end:]
        bold_found = search(_MD_BOLD, string)
    return string


def _md_to_latex(object: _T) -> _T:
    if isinstance(object, Dict):
        for key in object.keys():
            object[key] = _md_to_latex(object[key])
    elif isinstance(object, List):
        for idx in range(len(object)):
            object[idx] = _md_to_latex(object[idx])
    elif isinstance(object, str):
        object = _md_bold_to_latex(object)
    return object


def unyaml(info_root: Path) -> Dict:
    information = dict()
    for info in info_root.glob("*.yml"):
        with open(info) as file:
            information |= safe_load(file)
    return _md_to_latex(information)
