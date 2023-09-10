const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const pool = require('./bin/database');
const app = express();

app.use((req, res, next) => {
  req.mysql = pool;
  next();
});
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'client')));

module.exports = app;
