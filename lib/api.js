const express = require('express');
const app = express();

const version = require('./api/version');
const getEmbed = require('./api/get-embed');
const parseEmbeds = require('./api/parse-embeds');
const listProviders = require('./api/list-providers');

app.get('/', version);
app.get('/embed', getEmbed);
app.get('/providers', listProviders);
app.post('/parse-embeds', parseEmbeds);

module.exports = app;
