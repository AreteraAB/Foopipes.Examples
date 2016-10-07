# Ponty example #

Quick start:

    docker-compose build
    docker-compose up

Now you can browse to: <http://localhost:9200/ponty/_search?q=.NET>

*Note:* this example has the compiled Typescript files in ./modules for ease of use. 

## This example does ##
1. Fetch job adverts as json from external service
2. Insert job adverts into elasticsearch
3. Fetch images in adverts
4. Scale image to 300x300 and store as file using a node module.

## This example shows the following techniques ##
* Using a scheduler
* Split an json array into separate documents
* Invoking a binary node module
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

    docker -v ~/images:/var/images -p 5000:5000 myaggregator