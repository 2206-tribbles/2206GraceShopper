const client = require("./client");

async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    await client.query(`
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS orderHistory;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS anOrder;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;

    `);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.log("Error dropping tables");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(20) NOT NULL,
        lastName VARCHAR(40) NOT NULL,
        email VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
     `);
    await client.query(`
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price MONEY NOT NULL,
        inventory INTEGER NOT NULL,
        format VARCHAR(30)  NOT NULL,
        genre VARCHAR(30)  NOT NULL
      );
      `);
    await client.query(`
      CREATE TABLE anOrder(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        status VARCHAR NOT NULL,
        "productId" INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        price MONEY NOT NULL
      );
      `);
    await client.query(`
      CREATE TABLE cart(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "orderId" INTEGER REFERENCES anOrder(id),
        orderStatus BOOLEAN
        );
        `);
    await client.query(`
        CREATE TABLE orderHistory(
        id SERIAL PRIMARY KEY,
         "userId" INTEGER REFERENCES users(id),
         "orderId" INTEGER REFERENCES anOrder(id),
         "productId" INTEGER REFERENCES products(id),
         quantity INTEGER,
         price MONEY,
         purchaseDate DATE
        )
        `);

    await client.query(`
        CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id),
        "orderHistoryId" INTEGER REFERENCES orderHistory(id),
        reviewTitle VARCHAR(255) NOT NULL,
        reviewComments TEXT NOT NULL
        )
    `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}
async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
