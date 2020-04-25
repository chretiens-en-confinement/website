SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

develop:
	npm start

src/data/messes-en-direct.yaml: src/data/messes-en-direct.csv scripts/csv2yaml.py
	python3 scripts/csv2yaml.py $< $@

build:
	npm run build
.PHONY: build

install:
	npm install
.PHONY: install
