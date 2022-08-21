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
    ('Tana','Kline','ante.dictum@yahoo.couk','662-532 Arcu Street','TheKline','a;sldkjf'),
    ('Ad','Min','admin@gracelandshopper.com', '1000 Cool Drive', 'Admin','Password' ); 
    `);

    await client.query(`
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        artist VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        release_date DATE,
        price DECIMAL(12, 2) NOT NULL,
        inventory INTEGER NOT NULL,
        format VARCHAR(30)  NOT NULL,
        genre VARCHAR(30)  NOT NULL,
        photo VARCHAR(255) NOT NULL,
        spotif VARCHAR(255) DEFAULT '/pics/NoMusic.png',
        staffpick BOOLEAN DEFAULT false
      );

      INSERT INTO products(title, artist, description, release_date, price, inventory, format, genre, photo, spotif, staffpick)
      VALUES
      ('The Tubes Greatest Hits','Tubes','All their number one hits','02/03/1978','45.00','39','CD', 'Rock', '/pics/Tubes.jpg','/pics/NoMusic.png', 'true'),
      ('Donna Summer: On The Radio','Donna Summer','All her number one hits','06/06/1980','50','12','CD', 'Disco', '/pics/DonnaSummerOTR.bmp', 'https://open.spotify.com/embed/album/1DeQ0MqQiY2RpMSMFEsILA?utm_source=generator', 'true'),
      ('Men Without Hats Hits','Men Without Hats','All their number one hits','05/06/1982','23.00','5','8-Track', 'Rock', '/pics/MenWithoutHats.jpg', '/pics/NoMusic.png', true),
      ('80s Greatest Hits', 'Various','All number one hits from the 80s','01/01/1990','5.00','100','CD', 'Dance', '/pics/80sGreatestHits.jpg','/pics/NoMusic.png', 'true'),
      ('90s Greatest Hits','Various','All number one hits from the 90s','01/01/2000','10.00','139','Vinyl', 'Dance', '/pics/90sGreatestHits.jpg', '/pics/NoMusic.png', 'true'),
      ('This Year’s Model', 'Elvis Costello & The Attractions', 'This Year’s Model is the second studio album by English singer-songwriter Elvis Costello, released on 17 March 1978 through Radar Records.', 
      '/03/17/1978', '25.00', '6', 'Vinyl', 'Rock', '/pics/ThisYearsModel.bmp', 'https://open.spotify.com/embed/album/4RLIesiAVONV4fOUlOSmr4?utm_source=generator', 'true'),
      ('Power Corruption and Lies', 'New Order', 'Power, Corruption & Lies is the second studio album by English rock band New Order, released on 2 May 1983 by Factory Records.',
      '05/02/1983', '36.00', '21', 'Vinyl', 'Alternative', '/pics/PowerCorruptionAndLies.bmp', 'https://open.spotify.com/embed/album/6NTrwu1XJ56jBPx7HMksbZ?utm_source=generator', 'true'),
      ('Remain in Light', 'Talking Heads', 'Remain in Light is the fourth studio album by American rock band Talking Heads, released on October 8, 1980 by Sire Records.',
      '10/08/80', '15.00', '4', 'Cassette', 'Alternative', '/pics/RemainInLight.bmp', 'https://open.spotify.com/embed/album/3AQgdwMNCiN7awXch5fAaG?utm_source=generator', 'true'),
      ('Construction Time Again', 'Depeche Mode', 'Construction Time Again is the third studio album by English electronic music band Depeche Mode, released on 22 August 1983 by Mute Records.',
      '08/22/83', '20.00', '10', 'CD', 'Alternative', '/pics/ConstructionTimeAgain.bmp', 'https://open.spotify.com/embed/album/6oFsq13ql71yK5Gaar7eIy?utm_source=generator', 'true'),
      ('Pretenders', 'Pretenders', 'Pretenders is the debut studio album by British-American band the Pretenders, released on 27 December 1979 on Sire Records in the US and on 7 January 1980 under Real Records in the UK.',
      '12/27/1979', '10.00', '33', 'Cassette', 'Rock', '/pics/Pretenders.bmp', 'https://open.spotify.com/embed/album/6AFFu3ilmlEDz1I9ZaNOZw?utm_source=generator', 'false'),
      ('Vienna', 'Ultravox', 'Vienna is the fourth studio album by British new wave band Ultravox, first released on Chrysalis Records on 11 July 1980.',
      '07/11/1980', '27.00', '12', 'Vinyl', 'Alternative', '/pics/Vienna.bmp', 'https://open.spotify.com/embed/album/4dOFj5aKOg68jIE7rZP5DZ?utm_source=generator', 'false'),
      ('Penthouse and Pavement', 'Heaven 17', 'Penthouse and Pavement is the debut studio album by English synth-pop band Heaven 17. It was originally released in September 1981, on the label Virgin.' ,
      '09/04/1981', '19.00', '4', 'Cassette', 'Alternative', '/pics/PenthouseAndPavement.bmp', 'https://open.spotify.com/embed/album/662vZghUEjQCywafYimHtK?utm_source=generator', 'false'),
      ('The Velvet Underground & Nico', 'The Velvet Undergroud & Nico', 'The Velvet Underground & Nico is the debut album by the American rock band the Velvet Underground and German singer Nico, released in March 1967 through Verve Records.', 
      '03/12/1967', '16.00', '31', 'Cassette', 'Rock', '/pics/TheVelvetUndergroundAndNico.bmp', 'https://open.spotify.com/embed/album/4xwx0x7k6c5VuThz5qVqmV?utm_source=generator', 'false'),
      ('Autoamerican', 'Blondie', 'Autoamerican is the fifth studio album by American rock band Blondie. It was released in November 1980[7] and reached No. 3 in the UK charts, No. 7 in the US, and No. 8 in Australia. ',
      '11/26/1980', '30.00', '7', 'CD', 'Rock', '/pics/Autoamerican.bmp', 'https://open.spotify.com/embed/album/1VuNXmZV6eIfUwglRlM9Ya?utm_source=generator', 'true'),
      ('Rio', 'Duran Duran', 'Rio is the second studio album by English band Duran Duran, originally released worldwide on 10 May 1982.', 
      '05/10/1982', '32.00', '33', 'CD', 'Rock', '/pics/Rio.bmp', 'https://open.spotify.com/embed/album/02tfQwJSOLP77oCd9U8bqm?utm_source=generator', 'false'), 
      ('Underwater Moonlight', 'The Soft Boys', 'Underwater Moonlight is the second studio album by English rock band The Soft Boys, released on 28 June 1980 by record label Armageddon.',
      '06/28/1980', '25.00', '2', 'Vinyl', 'Alternative', '/pics/UnderwaterMoonlight.bmp', 'https://open.spotify.com/embed/album/4ENlMxVTUYIuMS4b0CVZyk?utm_source=generator', 'false'),
      ('Animals', 'Pink Floyd', 'Animals is the tenth studio album by the English rock band Pink Floyd, released on 21 January 1977[2] through Harvest and Columbia Records.',
      '01/21/1977', '30.00', '66', 'Vinyl', 'Rock', '/pics/Animals.bmp', 'https://open.spotify.com/embed/album/3b4E89rxzZQ9zkhgKpj8N4?utm_source=generator', 'false');




      `);

    await client.query(`
      CREATE TABLE carts(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        order_completed BOOLEAN DEFAULT false,
        purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        INSERT INTO carts(user_id)
        VALUES
        ('1'),
        ('2'),
        ('1'),
        ('4'),
        ('5')

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
