username = saggzz
service_name = message-subscriber
image_tag = latest

image_path = $(username)/$(service_name):$(image_tag)

containerize: docker-push

docker-login:
	docker login

docker-build:
	docker build -t $(image_path) .

docker-push: docker-login docker-build
	docker push $(image_path)