from enum import StrEnum, unique


@unique
class CVProfile(StrEnum):
    FRONTEND = "frontend"
    BACKEND = "backend"
    DEVOPS = "devops"
    ALL = "all"
