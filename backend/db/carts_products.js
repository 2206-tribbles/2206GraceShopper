const client = require("./client");
/* eslint-disable */

async function addProductToCartProducts({
  title,
  artist,
  description,
  release_date,
  price,
  inventory,
  format,
  genre,
}) {
  try {
    const {
      rows: [carts_products],
    } = await client.query(
      `
      INSERT INTO carts_products (title, artist, description, release_date, price, inventory, format, genre)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
      `,
      [(title, artist, description, release_date, price, inventory, format, genre)]
    );
    return carts_products;
  } catch (error) {
    throw error;
  }
}

async function getCartsProductsById(id) {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
      SELECT *
      FROM cart_products
      WHERE id=$1;
    `,
      [id]
    );

    return products;
  } catch (error) {
    throw error;
  }
}

async function getCartsProductsByProductId({ id }) {
  try {
    const { rows: product } = await client.query(
      `
    SELECT *
    FROM carts_products
    WHERE product_id = $1;
    
  `,
      [id]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function updateCartsProducts({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  console.log(setString, "Here is the setString");
  // // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [product],
    } = await client.query(
      `
      UPDATE carts_products
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function destroyCartsProducts(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    DELETE FROM carts_products
    WHERE id = $1
    `,
      [id]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
    destroyCartsProducts,
    updateCartsProducts,
    getCartsProductsById,
    addProductToCartProducts,
    getCartsProductsByProductId
};
