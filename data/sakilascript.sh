#!/bin/bash

# Create and Run a MongoDB Server in a Docker Container
# The initialized DB will always be at the same starting state. 

MONGO_HOST_IP=172.21.0.10
MONGO_NETWORK_MASK=172.21.0.0/16
MONGO_NETWORK_NAME=mongodb-network
MONGO_CONTAINER_NAME=testcontainer



docker network create -d bridge --subnet $MONGO_NETWORK_MASK $MONGO_NETWORK_NAME
docker stop $MONGO_CONTAINER_NAME
docker rm $MONGO_CONTAINER_NAME
docker run --detach --name $MONGO_CONTAINER_NAME --network $MONGO_NETWORK_NAME --ip $MONGO_HOST_IP mongo

chmod +r *.json

mongoimport --host $MONGO_HOST_IP --db webtech --collection customers customers.json
mongoimport --host $MONGO_HOST_IP --db webtech --collection shutters shutters.json
mongoimport --host $MONGO_HOST_IP --db webtech --collection parts parts.json
mongoimport --host $MONGO_HOST_IP --db webtech --collection workers workers.json
mongoimport --host $MONGO_HOST_IP --db webtech --collection orders orders.json