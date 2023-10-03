.ONESHELL:
.DEFAULT_GOAL := help

SHELL = /bin/bash
PATH := venv/bin:$(PATH)

PROFILES = frontend backend devops all none
PROFILE = all


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
	python3 curriculum_vitae/scripts/assemble.py $(PROFILE)
.PHONY: build-cv

build-pdf: build-cv
	@ # Build CV PDF with python script
	mkdir -p curriculum_vitae/pdf
	docker run --rm -i --user="$(id -u):$(id -g)" -v "$(PWD)/curriculum_vitae:/data" blang/latex /bin/sh -c "cd sources && pdflatex -output-directory ../build base.tex"
	cp curriculum_vitae/build/base.pdf curriculum_vitae/pdf/$(PROFILE).pdf
.PHONY: build-pdf

build-all: venv
	@ # Build CV PDFs for all profiles
	for PROF in $(PROFILES)
	do
		if make -s --no-print-directory build-pdf PROFILE=$$PROF > /dev/null; then
			echo -e "\e[32;1mCV generated for profile '$$PROF'\e[0m"
		else
			echo -e "\e[31;1mError generating CV for profile '$$PROF'\e[0m" || exit 1
		fi
	done
.PHONY: build-all

clean:
	rm -rf venv
	rm -rf curriculum_vitae/build
	rm -rf curriculum_vitae/out
	rm -rf **/__pycache__
