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
	@ # Build CV with python script
	python3 curriculum_vitae/scripts/assemble.py devops
.PHONY: build-cv
