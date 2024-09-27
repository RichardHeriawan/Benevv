SHELL := /bin/bash

IMAGE_BASE  := smarttwigs/benevv
BRANCH_NAME := $(shell git rev-parse --abbrev-ref HEAD | sed 's/[^a-zA-Z0-9\-\.]/-/g')
COMMIT_HASH := $(shell git log -1 --format=format:"%H" | cut -c 1-8)
IMAGE_TAG   := $(IMAGE_BASE):$(BRANCH_NAME)-$(COMMIT_HASH)
LATEST_TAG  := $(IMAGE_BASE):latest

VERSION_FILE := app.json

.PHONY: build
build:
	docker build -t $(IMAGE_TAG) -t $(LATEST_TAG) .

.PHONY: push
push: build
	docker push $(IMAGE_BASE)

.PHONY:	login-docker
login-docker:
	echo "${SVCSMARTTWIGS_DOCKER_HUB_PWD}" | docker login --username svcsmarttwigs --password-stdin

.PHONY:	tag
tag:
	./set-tag.sh $(VERSION_FILE)

.PHONY: build-ios
build-ios:
	./deploy.sh -b ios

.PHONY: submit-ios
submit-ios:
	./deploy.sh -s ios
