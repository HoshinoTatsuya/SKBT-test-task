ENV_FILE_PATH="config/local.env"

include $(PWD)/config/local.env

all: help

help:
	@echo "help                  			# this help"
	@echo "build                 			# build prod images"
	@echo "start                 			# build and start prod images"
	@echo "start-from-scratch    			# start prod images with clean database"
	@echo "stop                  			# stop prod containers purge network"
	@echo "dev                   			# run all developers containers in background"
	@echo "dev-stop              			# stop all developers containers"
	@echo "dev-clear             			# stop all developers containers and clear all unusable data"
	@echo "prune                 			# clear all unusable data (prune unusable containers, images amd volumes)"

install:
	(yarn install) & wait

setup-docker:
	curl -fsSL https://get.docker.com | sh
	curl -L "https://github.com/docker/compose/releases/download/v2.26.0/docker-compose-linux-$(uname -m)" -o /usr/local/bin/docker-compose
	chmod +x /usr/local/bin/docker-compose
	docker -v && docker-compose -v

setup-network:
	docker network inspect api-network || docker network create api-network

dev-setup:
	cp -f config/dev.env config/local.env

dev-common:
	docker-compose -f docker-compose.dev.yml --env-file ${ENV_FILE_PATH} up -d db

dev-ms-category: dev-common
	docker-compose -f docker-compose.dev.yml up ms-category

dev: setup-network dev-common
	docker-compose -f docker-compose.dev.yml --env-file ${ENV_FILE_PATH} up -d

dev-stop:
	docker-compose -f docker-compose.dev.yml --env-file ${ENV_FILE_PATH} down


dev-clear: dev-stop prune
	rm -rf dist

prune:
	docker container prune -f
	docker image prune -f
	docker volume prune -f
