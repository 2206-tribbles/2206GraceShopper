const client = require("./client");

async function createProduct({
  title,
  artist,
  description,
  release_date,
  price,
  inventory,
  format,
  genre,
  photo,
  spotif,
  staffpick
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO products(title, artist, description, release_date, price, inventory, format, genre, photo, spotif, staffpick)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *;
            `,
      [
        title,
        artist,
        description,
        release_date,
        price,
        inventory,
        format,
        genre,
        photo,
        spotif,
        staffpick
      ]
    );

    console.log(product);
    return product;
  } catch (error) {
    console.error("Error Creating Product", error);
    throw error;
  }
}

async function updateProduct({ id, ...fields }) {
  // build the set string
  console.log(id, fields, "line27");
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [product],
    } = await client.query(
      `
             UPDATE products
             SET ${setString}
             WHERE id=${id};
             RETURNING *;
             `,
      Object.values(fields)
    );
    return product;
  } catch (error) {
    console.error("Error Retrieving Product", error);
    throw error;
  }
}

async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            SELECT *
            FROM products
            WHERE id = $1;
            
        `,
      [id]
    );
    return product;
  } catch (error) {
    console.error("Error Retrieving Product", error);
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows } = await client.query(
      `
          SELECT *
          FROM products;
          `,
    );
    return rows;
  } catch (error) {
    console.error("Error Retrieving Products", error);
    throw error;
  }
}

async function getProductByTitle(title) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT *
    FROM products
    WHERE title=$1;
  `,
      [title]
    );
    return product;
  } catch (error) {
    console.error("Error getting product by title!");
    throw error;
  }
}

async function addProductToCart({ cart_id, product_id, quantity, sale_price }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
          INSERT INTO carts_products("cart_id",
            "product_id",
            quantity,
            sale_price
            ) 
          VALUES($1, $2, $3, $4) 
          ON CONFLICT DO NOTHING
          RETURNING *;
        `,
      [cartId, productId, quantity, sale_price]
    );

    //console.log('THIS IS THE ROUTINE TO RETURN: ', routine);
    return product;
  } catch (error) {
    console.error("Error adding product to cart!");
    throw error;
  }
}

async function destroyProduct(id) {
 try{
  console.log(id, "line160")
  await client.query(
    `
      DELETE FROM products
       WHERE id=$1;
      `,
      [id]
  );
 }catch(error){
  throw error;
 }
}

//export functions

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  destroyProduct,
  getProductByTitle,
  addProductToCart,
  getAllProducts,
};
