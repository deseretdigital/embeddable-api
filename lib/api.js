const express = require('express');
const app = express();

const getEmbed = require('./api/get-embed');

app.get('/embed', getEmbed);


module.exports = app;
