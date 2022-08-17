const client = require("./client");

async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    await client.query(`
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS carts_products;
    DROP TABLE IF EXISTS carts;
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
        artist VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        release_date DATE,
        price MONEY NOT NULL,
        inventory INTEGER NOT NULL,
        format VARCHAR(30)  NOT NULL,
        genre VARCHAR(30)  NOT NULL,
        photo BYTEA
      );

      INSERT INTO products(title, artist, description, release_date, price, inventory, format, genre, photo)
      VALUES
      ('The Tubes Greatest Hits','Tubes','All their number one hits','02/03/1978','45.00','39','CD', 'Rock', './pics/Tubes.jpg'),
      ('Donna Summers Hits','Donna Summer','All her number one hits','06/06/1980','50','12','CD', 'Disco', './pics/DonnaSummer.jpg'),
      ('Men Without Hats Hits','Men Without Hats','All their number one hits','05/06/1982','23.00','5','8-Track', 'Rock', './pics/MenWithoutHats.jpg'),
      ('80s Greatest Hits', 'Various','All number one hits from the 80s','01/01/1990','5.00','100','CD', 'Dance', './pics/80sGreatestHits.jpg'),
      ('90s Greatest Hits','Various','All number one hits from the 90s','01/01/2000','10.00','139','Vinal', 'Dance', './pics/90sGreatestHits.jpg');

      `);
    
    await client.query(`
      CREATE TABLE carts(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        product_id INTEGER REFERENCES products(id), 
        order_completed BOOLEAN DEFAULT false,
        purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        INSERT INTO carts(user_id, product_id)
        VALUES
        ('1','1'),
        ('2','3'),
        ('1','2'),
        ('4','3'),
        ('5','1')

        `);

    await client.query(`
      CREATE TABLE carts_products(
          id SERIAL PRIMARY KEY,
          cart_id INTEGER REFERENCES carts(id),
          product_id INTEGER REFERENCES products(id), 
          quantity INTEGER NOT NULL,
          sale_price MONEY NOT NULL,
          UNIQUE (cart_id, product_id)
          );

          INSERT INTO carts_products(cart_id, product_id, quantity, sale_price)
          VALUES
          ('1','1','2','10'),
          ('2','3','3','4.35'),
          ('3','2','8','400'),
          ('4','1','10','30')
   
          `);     
   
    await client.query(`
        CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        carts_id INTEGER REFERENCES carts(id) UNIQUE,
        review_title VARCHAR(255) NOT NULL,
        review_comments TEXT NOT NULL
        );

        INSERT INTO reviews(carts_id, review_title, review_comments)
        VALUES
        ('1','Test review for Cart 1','This is the greatest of tests'),
        ('3','Test review for cart 3','This is the greatest of tests yahoo for you'),
        ('4','Test review for Cart 4','This is the greatest of tests')

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
