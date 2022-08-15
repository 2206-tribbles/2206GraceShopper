/* 
DO NOT CHANGE THIS FILE
*/
const client = require('./client');
const { rebuildDB } = require('./seedData');
client.connect()
rebuildDB()
  .catch(console.error)
  .finally(() => client.end());