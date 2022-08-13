## Install on minikube

Change into this [minikube/](../minikube) directory to use `Makefile` targets from console.

### Configuration

Configure number of CPU cores, maximum amount of memory, disk size and VM driver (we recommend `hyperkit` for MacOS). Therefore, to tweak your `minikube` installation copy and edit a [properties.yaml](env/properties.yaml) file like this:

````yaml
num_cpu: 2
memory: 8gb
size_disk: 16gb
vm_driver: hyperkit
k8s_version: v1.22.2
minikubeconfig: ~/.kube/config
````

> **IMPORTANT**: Also apply port and hostname changes to the `*.properties` file.

### Quick Setup

To install a new Kubernetes cluster for `localhost` development including all infrastructure and application services go to console and enter:

```bash
make install
```
After installation the `minikube` external IP address will be saved in [env/ip.yaml](env).

### Cleanup and Remove Everything

To completely remove and destroy the `minikube` cluster later you can use:

```bash
make uninstall
```

### Exposed Services/Endpoints

| URL | Application / Service |
|---- | --------------------- |
| http://ingress.minikube:9000/dashboard/ | Traefik Dashboard |
| http://ingress.minikube/datas/number | Nats Jetstream Publisher Http Post request Number Array |
| http://ingress.minikube/datas/typed | Nats Jetstream Publisher Http Post request Uint8Array |
