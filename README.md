# embeddable-api

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

An API wrapper around [Embeddable](https://github.com/deseretdigital/embeddable), a service to embed media
via oEmbed or OpenGraph data.

## Get it running

This uses Docker to get up and running. Deploy it as you would in your Docker environment.

## API

* Fetch an embed: `/api/v1/embed?uri=EMBED_URI`
* Retrieve a list of providers: `/api/v1/providers`
