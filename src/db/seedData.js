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
    INSERT INTO users(id,firstName,lastName,email,address,username,password)
    VALUES
    (1,'Zeus','Yang','tincidunt.orci@icloud.ca','3893 Iaculis Street','YZeus', 'abc123'),
    (2,'Kalia','Park','vulputate.nisi.sem@google.edu','726 Eu Road','kaliapart','sadlk;fj'),
    (3,'Phelan','Oneil','vel.pede.blandit@icloud.couk','1704 Enim Rd.','DPete','abcdef'),
    (4,'Declan','Petersen','imperdiet.erat@icloud.org','188-821 Sed, Ave','Pouch','nightmare'),
    (5,'Tana','Kline','ante.dictum@yahoo.couk','662-532 Arcu Street','TheKline','a;sldkjf');
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

      INSERT INTO products(id, title, description, price, inventory, format, genre)
      VALUES
      (10,'The Tubes','All their number one hits','45.00','39','CD', 'Rock'),
      (20,'Donna Summer','All her number one hits','50','12','CD', 'Disco'),
      (30,'Men Without Hats','All their number one hits','23.00','5','8-Track', 'Rock'),
      (40,'80s Greatest Hits','All number one hits from the 80s','5.00','100','CD', 'Dance'),
      (50,'90s Greatest Hits','All number one hits from the 90s','10.00','139','Vinal', 'Dance');

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

      /*INSERT INTO anOrder(id, userId, status, productId, quantity, price)
       VALUES
       (1,'2','Pending','20',2,100);
      */ 

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
