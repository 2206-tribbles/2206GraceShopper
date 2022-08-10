require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require('morgan');
const cors = require('cors')
app.use(morgan('dev'));
app.use(cors())
app.use(express.json())
// Setup your Middleware and API Router here


app.use('/api', require('./api'))

// 404 handler
app.get('*', (req, res) => {
    res.status(404).send({error: '404 - Not Found', message: 'No route found for the requested URL'});
  });
  
  // error handling middleware
  app.use((error, req, res, next) => {
    if(res.statusCode < 400) res.status(500);
    res.send({error: error.message, name: error.name, message: error.message});
  });

module.exports = app;