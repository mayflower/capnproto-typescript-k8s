.PHONY: setup-galaxy

install: install-minikube install-hosts install-ingress install-messaging install-capnproto

use-context:
	 kubectl config use-context minikube

setup-galaxy:
	ansible-galaxy collection install -r ansible-requirements.yaml
	pip install -r python-requirements.txt

install-minikube: setup-galaxy
	ansible-playbook local-dev-start.yaml

install-hosts: use-context
	ansible-playbook local-dev-hosts.yaml --ask-become-pass

install-ingress: use-context
	ansible-playbook local-dev-ingress.yaml

install-messaging: use-context
	ansible-playbook local-dev-messaging.yaml

install-capnproto: use-context
	ansible-playbook loacl-dev-capnproto.yaml

uninstall:
	ansible-playbook local-dev-delete.yaml

reinstall: uninstall install
