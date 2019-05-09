#!/bin/bash

mongoimport --db webtech --collection orders orders.json
mongoimport --db webtech --collection customers customers.json
mongoimport --db webtech --collection shutters shutters.json
mongoimport --db webtech --collection parts parts.json