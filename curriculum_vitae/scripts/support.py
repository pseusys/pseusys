from enum import StrEnum, unique


@unique
class CVProfile(StrEnum):
    FRONTEND = "frontend"
    BACKEND = "backend"
    DEVOPS = "devops"
    ALL = "all"
    RESEARCH = "research"
    CRYPTOGRAPHY = "cryptography"
    NETWORKING = "networking"


# Child profiles inherit all items tagged with their parent profile.
PROFILE_PARENTS: dict = {
    CVProfile.CRYPTOGRAPHY: CVProfile.RESEARCH,
    CVProfile.NETWORKING: CVProfile.RESEARCH,
}
