const client = require('./client');

module.exports = {
    ...require('./users'),
    ...require('./carts'),
    ...require('./products'),
    ...require('./carts_products'),
    ...require('./reviews'),
  };