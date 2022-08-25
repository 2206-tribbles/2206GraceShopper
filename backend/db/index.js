const client = new client(process.env.DATABASE_URL || 'postgres://localhost:5432/graceShopper-dev');


module.exports = {
    ...require('./users'),
    ...require('./carts'),
    ...require('./products'),
    ...require('./carts_products'),
    ...require('./reviews'),
  };