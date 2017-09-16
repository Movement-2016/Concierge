/* eslint-disable */
var express = require('express');
const app = express();
const { PUBLIC_DIR } = require('./config');
app.use(express.static(PUBLIC_DIR));
app.listen(3000);