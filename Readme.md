# This repository is corresponding to the following blog posts
[Blog I](https://blog.mayflower.de/13838-capn-proto-react-nestjs.html)

# Test setup
1. ```git clone``` this repository
2. Install local Kubernetes cluster within Minikube by running: ```$ cd <project root> && make -C infrastructure/minikube install``` 
3. Enter your sudo pw for modifying your local hosts file
4. Start React frontend application: ```$ npm start --prefix app_services/react-frontend```
5. Port forward Nats Jetstream ports to localhost: ```$  export KUBECONFIG=~/.kube/config && kubectl port-forward -n messaging svc/nats 4222 8222 7777 6222```
6. Start application which is receiving the data from the React frontend and publishes it to Nats Jetstream:  ```$ npm start --prefix app_services/nestjs-receiver-publisher```
7. Start application which is consuming Nats Jetstream messages: ```$ npm start --prefix app_services/nestjs-subscriber```
8. Navigate to React frontend: ```http://localhost:3000/```
9. submit some arbitrary Form data
10. check log outputs in **nestjs-receiver-publisher** and **nestjs-subscriber**
11. checki stream: in minikube pods press ```s``` on nats-box which will open a shell terminal. Type ```$ nats s view stream``` which should display the last send message plus some meta data. 
