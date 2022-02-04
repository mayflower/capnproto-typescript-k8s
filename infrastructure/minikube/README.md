## Install on minikube

Change into this [minikube/](../minikube) directory to use `Makefile` targets from console.

### Configuration

> **IMPORTANT**: Go to [minikube/env/](env) directory and copy the `*.yaml.sample` files to the same file without the `.sample` extension into same directory. Edit your new `ENV` files and make changes as needed.

Configure number of CPU cores, maximum amount of memory, disk size and VM driver (we recommend `hyperkit` for MacOS). Therefore, to tweak your `minikube` installation copy and edit a [values.yaml](env/values.yaml.sample) file like this:

````yaml
num_cpu: 2
memory: 8gb
size_disk: 16gb
vm_driver: hyperkit
k8s_version: v1.22.2
minikubeconfig: ~/.kube/config
````

> **IMPORTANT**: Also apply port and hostname changes to the `*.properties` files.

### Quick Setup

To install a new Kubernetes cluster for `localhost` development including all infrastructure and application services go to console and enter:

```bash
make install
```

### Detailed Setup

Edit [env/helm.yaml](env/helm.yaml.sample) before continue the installation procedure.
All changeable values being used for Helm charts live here.

Make sure to proceed with the installation in given order as some steps depend on resources installed by previous steps.
Next installation steps on your new `minikube` cluster:

1. To install a new Kubernetes cluster for `localhost` development go to console and enter:
   
   ```bash
   make install-minikube
   ```
   
   After installation the `minikube` external IP address will be saved in [env/ip.yaml](env).

2. To install **Metal-LB** and **Traefik**:

    ```bash
    make install-ingress
    ```

3. To update `/etc/hosts`:

    ```bash
    make install-hosts
    ```

### Cleanup and Remove Everything

To completely remove and destroy the `minikube` cluster later you can use:

```bash
make uninstall
```

### Exposed Services

| URL | Application / Service |
|---- | --------------------- |
| http://traefik-ui.minikube | Traefik Dashboard (Ingress Routes) |
