# Empty template #

Quick start:

    docker-compose build
    docker-compose up

Now you can browse to: <http://localhost:9200/_search?q=>

## This example does ##
1. Provide a starting point for your own project

## This example shows the following techniques ##
* Dockerfile example using npm 
* Docker-compose file with elasticsearch
* Typescript 

## Building typescript ##
Prerequisites: Node.js - <https://nodejs.org/>

Install Typescript v2

    npm install -g typescript

Install dependencies (from package.json)

    npm install

Compile typescript (using tsconfig.json)

    tsc 

Build Docker container (docker-compose.yaml)

    docker-compose build

Or:

    docker build -t myaggregator .

Start with:

    docker-compose up

Or:

    docker run -p 5000:5000 myaggregator