const client = require("./client");

async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    await client.query(`
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS order_history;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS an_order;
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
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(40) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        address VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    INSERT INTO users(first_name,last_name,email,address,username,password)
    VALUES
    ('Zeus','Yang','tincidunt.orci@icloud.ca','3893 Iaculis Street','YZeus', 'abc123'),
    ('Kalia','Park','vulputate.nisi.sem@google.edu','726 Eu Road','kaliapart','sadlk;fj'),
    ('Phelan','Oneil','vel.pede.blandit@icloud.couk','1704 Enim Rd.','DPete','abcdef'),
    ('Declan','Petersen','imperdiet.erat@icloud.org','188-821 Sed, Ave','Pouch','nightmare'),
    ('Tana','Kline','ante.dictum@yahoo.couk','662-532 Arcu Street','TheKline','a;sldkjf');
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

      INSERT INTO products(title, description, price, inventory, format, genre)
      VALUES
      ('The Tubes','All their number one hits','45.00','39','CD', 'Rock'),
      ('Donna Summer','All her number one hits','50','12','CD', 'Disco'),
      ('Men Without Hats','All their number one hits','23.00','5','8-Track', 'Rock'),
      ('80s Greatest Hits','All number one hits from the 80s','5.00','100','CD', 'Dance'),
      ('90s Greatest Hits','All number one hits from the 90s','10.00','139','Vinal', 'Dance');

      `);

    await client.query(`
      CREATE TABLE an_order(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        status VARCHAR NOT NULL,
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        price MONEY NOT NULL
      );

      INSERT INTO an_order(user_id, status, product_id, quantity, price)
       VALUES
       ('2','Pending','2',2,100);
      `);
    await client.query(`
      CREATE TABLE cart(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        order_id INTEGER REFERENCES an_order(id),
        order_status BOOLEAN
        );
        `);
    await client.query(`
        CREATE TABLE order_history(
        id SERIAL PRIMARY KEY,
         user_id INTEGER REFERENCES users(id),
         order_id INTEGER REFERENCES an_order(id),
         product_id INTEGER REFERENCES products(id),
         quantity INTEGER,
         price MONEY,
         purchase_date DATE
        )
        `);

    await client.query(`
        CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        product_id INTEGER REFERENCES products(id),
        order_history_id INTEGER REFERENCES order_history(id),
        review_title VARCHAR(255) NOT NULL,
        review_comments TEXT NOT NULL
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
