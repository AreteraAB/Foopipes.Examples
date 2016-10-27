# Contentful #

Quick start:

    docker-compose build
    docker-compose up

Now you can browse to: <http://localhost:9200/_search?q=>

## This example does ##
1. Polls Contentful's sync-api for incremental changes of entries or assets
2. Listens to webhook calls for immediate updates of entries or assets
3. Stores entities and assets into Elasticsearch.
3. Downloads images and saves to file.

## This example shows the following techniques ##
* Webhooks 
* Polling using a scheduler
* Using Elasticsearch as a key-value store for keeping state between polls
* Transformation of data using a Node.js module.
* Async fetching of data by using message queuing.
* "PublishAndWait" to make sure all asset images are downloaded before an entry is saved to Elasticsearch.
* Dockerfile example using npm 
* Docker-compose file with elasticsearch
* Typescript 2.1 with async await

## Api keys ##
Contentful api keys are supplied by environment variables in `docker-compose.yaml`

## Webhooks ##
For trying out the webhook callbacks you can use an utility like ngrok <https://ngrok.com/> to avoid exposing your 
containers directly.

Start ngrok with `ngrok http 5000`

In the Contentful admin gui, configure a webhook using the url given by ngrok.

## Locales ##
Contentful's sync-api and webhooks callbacks always returns content for all locales at once. But that is not always 
the preferred way to consume the data. This example repo contains two config files, `contentful.json` and `contentful_locale.json` which
handles this differently depending on the needs.

The first example simply stores all data as it is received into the same index `contentful` in Elasticsearch.
The second example split the data into one document per locale, transforms it, and store the documents into 
different indexes, `contentful_<locale>`.

Edit `docker-compose.yaml` to specify what config file you'd like to use.


## Building Docker container ##
Typescript modules are transpiled during Docker build.

Build Docker container (docker-compose.yaml)

    docker-compose build

Or:

    docker build -t myaggregator .

Start with:

    docker-compose up

Or:

    docker run -p 5000:5000 myaggregator