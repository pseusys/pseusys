from enum import StrEnum, unique


@unique
class CVProfile(StrEnum):
    FRONTEND = "frontend"
    BACKEND = "backend"
    DEVOPS = "devops"
    ALL = "all"
    RESEARCH = "research"
    RESEARCH_CRYPTO = "research_crypto"
    RESEARCH_NETWORKING = "research_networking"


# Child profiles inherit all items tagged with their parent profile.
PROFILE_PARENTS: dict = {
    CVProfile.RESEARCH_CRYPTO: CVProfile.RESEARCH,
    CVProfile.RESEARCH_NETWORKING: CVProfile.RESEARCH,
}
