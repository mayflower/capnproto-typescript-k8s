username = saggzz
service_name = message-publisher
image_tag = latest

image_path = $(username)/$(service_name):$(image_tag)

containerize: docker-push

build:
	npm run build

docker-login:
	docker login

docker-build:
	docker build -t $(image_path) .

docker-push: build docker-login docker-build
	docker push $(image_path)