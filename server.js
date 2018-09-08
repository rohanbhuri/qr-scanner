'use strict';

// dependencies
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');

// create an instance of express
const app = express();

// configure body-parser to accept
// urlencoded bodies and json data
app.use(bodyParser.json({ limit: '50mb' }));

//  to allow all cors origin
app.use(cors())

//serving index.html from dist
app.use(express.static(path.join(__dirname + '/dist')));

// error handling

// 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// 500 errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// set the port to use
const port = parseInt(process.env.PORT, 10) || 3000;

// start the server
const server = app.listen(port, () => {
  console.log(`App is running at: localhost:${server.address().port}`);
});