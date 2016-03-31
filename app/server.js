/* eslint-disable no-console */
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const api = require('../lib/api');

app.use('/api/v1', api);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
/* eslint-enable no-console */
