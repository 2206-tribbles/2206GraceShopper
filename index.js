const PORT = 3000;
const express = require('express');
const server = express();

const router = require("./backend/express");
const cors = require('cors');
const morgan = require('morgan');

server.use(morgan('dev'));
server.use(express.json())

server.use(cors())
server.use('/api', router)


server.use((error, req, res, _) => {
    if(res.statusCode < 400) res.status(500);
    res.send({error: error.message, name: error.name, message: error.message});
  });

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});