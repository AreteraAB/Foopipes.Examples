# Empty template #

Quick start:

    docker-compose build
    docker-compose up

Now you can browse to: <http://localhost/>

## This example does ##
1. Fetch json from external source with an interval
2. Create Hugo style markdown from json 
3. Save markdown as file

## This example shows the following techniques ##
* Dockerfile example using npm 
* Typescript 

## Building Docker container ##
Typescript modules are transpiled during Docker build.

Build Docker container (docker-compose.yaml)

    docker-compose build

Start with:

    docker-compose up
