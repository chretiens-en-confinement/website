import argparse
import csv
from operator import itemgetter
import sys
from typing import TextIO, Union, Any, Dict

from yaml import dump

KEYS = {
    "Groupe": "groupe",
    "Communauté": "communaute",
    "Nom": "nom",
    "Site": "site",
    "Youtube": "youtube",
    "Facebook": "facebook",
    "Lundi": "lundi",
    "Mardi": "mardi",
    "Mercredi": "mercredi",
    "Jeudi": "jeudi",
    "Vendredi": "vendredi",
    "Samedi": "samedi",
    "Dimanche": "dimanche",
    "Forme": "forme",
    "HD": "is_hd",
}
URL_KEYS = ("youtube", "facebook", "site")
BOOL_KEYS = ("hd",)


def transform(mass: Dict[str, Any]) -> Union[None, Dict[str, str]]:
    mass = {k.lower(): v for k, v in mass.items()}
    if "groupe" not in mass or not mass.get("nom"):
        return None

    def get_value(mass, key):
        value = mass[key]

        if key in URL_KEYS:
            if not value.startswith("http") or " " in value:
                # Reset to avoid weird values
                return ""

        if key in BOOL_KEYS:
            return value == "TRUE"

        return value

    m = {new_key: get_value(mass, k.lower()) for k, new_key in KEYS.items()}
    m["id"] = "-".join([m["groupe"], m["nom"]])

    return m


def main(infile: TextIO, outfile: TextIO) -> None:
    reader = csv.DictReader(infile)
    rows = list(reader)

    masses = sorted(list(filter(None, map(transform, rows))), key=itemgetter("groupe"))

    # Alert on duplicates
    ids = list(map(itemgetter("id"), masses))
    duplicates = set(m for m in ids if ids.count(m) > 1)

    if duplicates:
        raise ValueError(f"Found duplicate ids: {duplicates!r}")

    out = {"messes": masses}

    dump(out, outfile)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="description")
    parser.add_argument(
        "infile", nargs="?", type=argparse.FileType("r"), default=sys.stdin
    )
    parser.add_argument(
        "outfile", nargs="?", type=argparse.FileType("w"), default=sys.stdout
    )
    args = parser.parse_args()
    main(args.infile, args.outfile)
