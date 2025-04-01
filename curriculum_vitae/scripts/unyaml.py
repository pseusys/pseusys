from pathlib import Path
from re import compile, sub
from typing import Any, Dict, List, TypeVar

from yaml import safe_load


_T = TypeVar("_T", Dict, List, str, Any)

_MD_BOLD = compile(r"\*\*(?P<content>.*?)\*\*")
_LATEX_BOLD = r"\\textbf{\g<content>}"

_MD_LINK = compile(r"\[(?P<text>.*?)\]\((?P<url>.*?)\)")
_LATEX_LINK = r"\\href{\g<url>}{\g<text>}"


def _md_to_latex(object: _T) -> _T:
    if isinstance(object, Dict):
        for key in object.keys():
            object[key] = _md_to_latex(object[key])
    elif isinstance(object, List):
        for idx in range(len(object)):
            object[idx] = _md_to_latex(object[idx])
    elif isinstance(object, str):
        object = sub(_MD_BOLD, _LATEX_BOLD, object)
        object = sub(_MD_LINK, _LATEX_LINK, object)
    return object


def unyaml(info_root: Path) -> Dict:
    information = dict()
    for info in info_root.glob("*.yml"):
        with open(info) as file:
            information |= safe_load(file)
    return _md_to_latex(information)
