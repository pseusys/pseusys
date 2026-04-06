.ONESHELL:
.DEFAULT_GOAL := help

SHELL = /bin/bash
.SHELLFLAGS=-c -e

PATH := venv/bin:$(PATH)

PROFILES = frontend backend devops all research cryptography networking
PROFILE = all
BASE_TEX = $(if $(filter research cryptography networking,$(PROFILE)),base_research,base)


help:
	@ # Display help information
	echo ":)"
.PHONY: help

venv:
	@ # Create python virtual environment
	python3 -m venv venv
	pip3 install --upgrade pip -r curriculum_vitae/requirements.txt

build-cv: venv
	@ # Build CV PDF with python script
	mkdir -p curriculum_vitae/pdf
	python3 curriculum_vitae/scripts/assemble.py $(PROFILE)
	docker run --rm -i --user="$(id -u):$(id -g)" -v "$(PWD)/curriculum_vitae:/data" blang/latex /bin/sh -c "cd sources && pdflatex -output-directory ../build $(BASE_TEX).tex"
	cp curriculum_vitae/build/$(BASE_TEX).pdf curriculum_vitae/pdf/$(PROFILE).pdf
.PHONY: build-cv

build-all-cv:
	@ # Build CV PDFs for all profiles
	for PROF in $(PROFILES)
	do
		if make -s --no-print-directory build-cv PROFILE=$$PROF > /dev/null; then
			echo -e "\e[32;1mCV generated for profile '$$PROF'\e[0m"
		else
			echo -e "\e[31;1mError generating CV for profile '$$PROF'\e[0m" || exit 1
		fi
	done
.PHONY: build-all-cv

website/node_modules:
	@ # Install website npm dependencies
	cd website
	npm install

build-website: website/node_modules
	@ # Build website static files
	cd website
	npm run build
.PHONY: build-website

dev-website: website/node_modules
	@ # Start website development server
	cd website
	npm run dev
.PHONY: dev-website

clean:
	rm -rf venv
	rm -rf curriculum_vitae/build
	rm -rf curriculum_vitae/out
	rm -rf **/__pycache__
	rm -rf website/.next
	rm -rf website/out
	rm -rf website/node_modules
