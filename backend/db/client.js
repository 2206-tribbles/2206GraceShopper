const {Client} = require('pg')

const DB_NAME = 'graceShopper-dev';

const connectionString =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;

  const client = new Client({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  });
  
client.connect()

module.exports = client;