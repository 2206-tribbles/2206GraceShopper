require("dotenv").config();
                   //Port is for Backend Server
const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors());
const morgan = require("morgan");
server.use(morgan("dev"));
server.use(express.json());

// here's our static files
const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));

// here's our API
server.use('/api', require('./api'));

// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const { client } = require('./backend/db');

const PORT = process.env.PORT || 5432;

const router = require("./backend/express");


server.use("/api", router); //get server functionality from /api routes

server.use((error, req, res, _) => {
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

const handle = server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error('Database is closed for repairs!\n', error);
  }
});

// export server and handle for routes/*.test.js
module.exports = { server, handle };