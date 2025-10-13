require('dotenv').config();
const express = require('express');
const { STATIC_PATH } = require('./constants');
const { errorHandlers } = require('./middleware');
const router = require('./routes/index');

const app = express();

app.use(express.json());

app.use(express.static(STATIC_PATH));

app.use('/api', router);

app.use(errorHandlers.dbErrorHandler, errorHandlers.errorHandler);

module.exports = app;
