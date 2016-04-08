const express = require('express');
const app = express();

const getEmbed = require('./api/get-embed');
const parseEmbeds = require('./api/parse-embeds');

app.get('/embed', getEmbed);
app.post('/parse-embeds', parseEmbeds);

module.exports = app;
