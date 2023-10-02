.ONESHELL:
.DEFAULT_GOAL := help

SHELL = /bin/bash
PATH := venv/bin:$(PATH)


help:
	@ # Display help information
	echo ":)"
.PHONY: help

venv:
	@ # Create python virtual environment
	python3 -m venv venv
	pip3 install --upgrade pip -r curriculum_vitae/requirements.txt

build-cv: venv
	@ # Build CV templates with python script
	python3 curriculum_vitae/scripts/assemble.py devops
.PHONY: build-cv

build-pdf: build-cv
	@ # Build CV PDF with python script
	rm -rf curriculum_vitae/pdf/*
	docker run --rm -i --user="$(id -u):$(id -g)" -v "$(PWD)/curriculum_vitae:/data" blang/latex /bin/sh -c "cd sources && pdflatex -output-directory ../pdf base.tex"
.PHONY: build-pdf

clean:
	rm -rf venv
	rm -rf curriculum_vitae/build
	rm -rf curriculum_vitae/pdf
	rm -rf **/__pycache__
