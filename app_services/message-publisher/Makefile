service_name = message-publisher
image_tag = latest

registry = registry.gitlab.com

image_path = $(registry)/tenkeyoho/sensor-nodes/indoor-climate-surveillance-ts-mqtt-client/$(service_name):$(image_tag)

containerize: docker-push

docker-login:
	docker login $(registry)

docker-build:
	docker build -t $(image_path) .

docker-push: docker-login docker-build
	docker push $(image_path)