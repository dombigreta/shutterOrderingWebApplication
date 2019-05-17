#!/bin/bash

echo 'Installing node depedencies for the server'
npm install

echo 'Installing node depedencies for the client'
cd ./client && npm install && cd ..

echo 'Init database'
cd ./data &&  ./sakilascript.sh && cd..

echo 'Running tests'
npm test

echo 'Building the app'
npm start