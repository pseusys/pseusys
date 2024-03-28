from enum import Enum, unique


@unique
class CVProfile(Enum):
    FRONTEND = "frontend"
    BACKEND = "backend"
    DEVOPS = "devops"
    NONE = "none"
    ALL = "all"

    def __str__(self):
        return self.value
