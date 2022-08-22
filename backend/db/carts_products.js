const client = require("./client");


async function createCartsProducts({
  cart_id,
  product_id,
  quantity, 
  sale_price
  
}) {
  try {
    const {
      rows: [carts_products],
    } = await client.query(
      `
      INSERT INTO carts_products ( 
        cart_id,
        product_id,
        quantity, 
        sale_price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [cart_id, product_id, quantity, sale_price]
    );
    console.log("LINE 26 INSIDE CREATE CP: ", carts_products)
    return carts_products;
  } catch (error) {
    throw error;
  }
}

async function getCartsProductsById({id}) {
  try {
    const {
      rows,
    } = await client.query(
      `
      SELECT *
      FROM carts_products
      WHERE id=$1;
    `,
      [id]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getCartsProductsByProductId({ id }) {
  try {
    const { rows } = await client.query(
      `
    SELECT *
    FROM carts_products
    WHERE product_id = $1;
    
  `,
      [id]
    );
    return rows;
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

async function destroyCartsProducts({id}) {
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
    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = {
    createCartsProducts,
    destroyCartsProducts,
    updateCartsProducts,
    getCartsProductsById,
    getCartsProductsByProductId,
};
