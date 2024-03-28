from typing import Callable, Dict, List

from support import CVProfile


class ProfileDict(Dict):
    _PROFILE_KEY = "profiles"
    _COUNT_KEY = "count"

    def __init__(self, info: Dict, file: str, profile: CVProfile):
        self.info = info
        self.file = file
        self.profile = profile
        self.functions = {self._COUNT_KEY: self._count}

    def _count(self, text: str, render: Callable) -> str:
        expression = render(text, self)
        return str(eval(expression))

    def _find_subdict(self, subinfo: Dict, subpath: str) -> str:
        if "." in subpath:
            final = subpath.index(".")
            key = subpath[:final]
            if key in subinfo:
                return self._find_subdict(subinfo[key], subpath[final + 1:])
        elif subpath in subinfo:
            return subinfo[subpath]
        raise RuntimeError(f"There is no entry '{subpath}' in info dictionary!")

    def _filter_iter(self, iterable: List) -> List:
        filtered = list()
        for elem in iterable:
            profs = elem.get(self._PROFILE_KEY, None)
            if self.profile is CVProfile.NONE:
                continue
            elif self.profile is CVProfile.ALL:
                filtered += [elem]
            elif profs is not None:
                if self.profile.value in profs or CVProfile.ALL.value in profs:
                    filtered += [elem]
                elif not isinstance(profs, List):
                    raise RuntimeError(f"Profile key '{self._PROFILE_KEY}' should be a list on every element!")
        return filtered

    def __getitem__(self, key: str):
        if key in self.functions:
            return self.functions[key]
        if ":" in key:
            final = key.index(":")
            file = key[:final]
            key = key[final + 1:]
        else:
            file = self.file
        if file in self.info:
            item = self._find_subdict(self.info[file], key)
            return self._filter_iter(item) if isinstance(item, List) else item
        else:
            raise RuntimeError(f"There is no key '{file}' in info dictionary!")

    def __repr__(self):
        return f"ProfileDict with '{self.profile}' on '{self.file}' over '{self.info}'"
