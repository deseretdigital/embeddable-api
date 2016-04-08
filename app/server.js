/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const api = require('../lib/api');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', api);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
/* eslint-enable no-console */
