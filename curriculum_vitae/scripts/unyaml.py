from pathlib import Path
from re import compile, match, sub, split
from typing import Any, Dict, List, TypeVar

from yaml import safe_load


_T = TypeVar("_T", Dict, List, str, Any)

_MD_LIST_LINE = compile(r"\+ (?P<content>.*)")
_MD_BREAK_LINE = compile(r"\- (?P<content>.*)")

_MD_BOLD = compile(r"\*\*(?P<content>.*?)\*\*")
_LATEX_BOLD = r"\\textbf{\g<content>}"

_MD_LINK = compile(r"\[(?P<text>.*?)\]\((?P<url>.*?)\)")
_LATEX_LINK = r"\\href{\g<url>}{\g<text>}"

# Matches already-converted \href{url}{text} blocks — used to protect URLs
# from special-character escaping that follows link conversion.
_LATEX_HREF_SPLIT = compile(r"(\\href\{[^}]*\}\{[^}]*\})")
_URL_SPLIT = compile(r"(https?://[^\s}]+)")

_UNICODE_SUBS = [
    (compile(r"×"), r"$\\times$"),
    (compile(r"—"), r"---"),   # Unicode em-dash → LaTeX em-dash
    (compile(r"–"), r"--"),    # Unicode en-dash → LaTeX en-dash
]


def _create_latex_list(items: List[str]) -> str:
    list_items = " ".join(f"\\item {item}" for item in items)
    return f"\\begin{{itemize}} {list_items} \\end{{itemize}}"


def _md_process_lines(string: str) -> str:
    result = list()
    current_list = list()

    for line in string.split("\n"):
        stripped = line.strip()

        list_line = match(_MD_LIST_LINE, stripped)
        if list_line is not None:
            current_list += [list_line.groups("content")[0]]
            continue
        elif len(current_list) > 0:
            result += [_create_latex_list(current_list)]
            current_list = list()

        break_line = match(_MD_BREAK_LINE, stripped)
        if break_line is not None:
            result += [f"{break_line.groups('content')[0]} \\\\"]
        else:
            result += [stripped]

    if len(current_list) > 0:
        result += [_create_latex_list(current_list)]

    return " ".join(result)


def _escape_latex_specials(text: str) -> str:
    """Escape &, #, _ for LaTeX, but leave URLs and \\href{}{} untouched."""
    parts = _LATEX_HREF_SPLIT.split(text)
    result = []
    for i, part in enumerate(parts):
        if i % 2 == 1:
            # Odd indices are \href{}{} matches — leave verbatim
            result.append(part)
        else:
            # Even indices are plain text — protect raw URLs, then escape
            url_parts = _URL_SPLIT.split(part)
            for j, url_part in enumerate(url_parts):
                if j % 2 == 1:
                    result.append(url_part)  # Raw URL — leave untouched
                else:
                    result.append(url_part.replace("&", r"\&").replace("#", r"\#").replace("_", r"\_"))
    return "".join(result)


def _md_to_latex(object: _T) -> _T:
    if isinstance(object, Dict):
        for key in object.keys():
            object[key] = _md_to_latex(object[key])
    elif isinstance(object, List):
        for idx in range(len(object)):
            object[idx] = _md_to_latex(object[idx])
    elif isinstance(object, str):
        object = _md_process_lines(object)
        object = sub(_MD_BOLD, _LATEX_BOLD, object)
        object = sub(_MD_LINK, _LATEX_LINK, object)
        object = _escape_latex_specials(object)
        for pattern, replacement in _UNICODE_SUBS:
            object = sub(pattern, replacement, object)
    return object


def unyaml(info_root: Path) -> Dict:
    information = dict()
    for info in info_root.glob("*.yml"):
        with open(info, encoding="utf-8") as file:
            information |= safe_load(file)
    return _md_to_latex(information)
