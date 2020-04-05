import argparse
import csv
import sys
from typing import TextIO, Union, Any, Dict

from yaml import dump

KEYS = {
    "Groupe": "groupe",
    "Communauté": "communaute",
    "Nom": "nom",
    "Youtube": "youtube",
    "Facebook": "facebook",
    "Lundi": "lundi",
    "Mardi": "mardi",
    "Mercredi": "mercredi",
    "Jeudi": "jeudi",
    "Vendredi": "vendredi",
    "Samedi": "samedi",
    "Dimanche": "dimanche",
}


def transform(mass: Dict[str, Any]) -> Union[None, Dict[str, str]]:
    mass = {k.lower(): v for k, v in mass.items()}
    if "groupe" not in mass or not mass.get("nom"):
        return None

    return {new_key: mass[k.lower()] for k, new_key in KEYS.items()}


def main(infile: TextIO, outfile: TextIO) -> None:
    reader = csv.DictReader(infile)
    rows = list(reader)

    masses = list(filter(None, map(transform, rows)))

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
