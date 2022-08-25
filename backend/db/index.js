const client = new client({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/graceShopper-dev',
 ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined, 
});


module.exports = {
    ...require('./users'),
    ...require('./carts'),
    ...require('./products'),
    ...require('./carts_products'),
    ...require('./reviews'),
  };