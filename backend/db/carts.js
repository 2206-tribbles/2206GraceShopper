const client = require("./client");

async function createCart({ user_id }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
            INSERT INTO carts(user_id)
            VALUES ($1)
            RETURNING *;
            `,
      [user_id]
    );

    console.log(cart);
    return cart;
  } catch (error) {
    console.error("Error Creating Cart", error);
    throw error;
  }
}

async function getCartById({ id }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
          SELECT *
          FROM cart
          WHERE id = $1;
          
          `[id]
    );
    return cart;
  } catch (error) {
    console.error("Error Retrieving Cart", error);
    throw error;
  }
}

async function getCartByUserId(id) {
  try {
    const { rows } = await client.query(
      `
            SELECT *
            FROM carts
            JOIN carts_products
            ON carts.id = carts_products.cart_id
            JOIN products
            ON carts_products.product_id = products.id
            WHERE user_id = $1 AND order_completed = false;
            
            `,
      [id]
    );
    return rows;
  } catch (error) {
    console.error("Error Retrieving Cart", error);
    throw error;
  }
}

// async function getCartByUserId(id) {
//   console.log("line 44 user id: ", id);
//   try {
//     const {
//       rows: [cart],
//     } = await client.query(
//       `
//             SELECT *
//             FROM carts
//             WHERE user_id = $1 AND order_completed = true;

//             `,
//       [id]
//     );
//     console.log("line 55 carts", cart);
//     return cart;
//   } catch (error) {
//     console.error("Error Retrieving Cart", error);
//     throw error;
//   }
// }

async function updateCart({ id, ...fields }) {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  console.log("set string", setString);
  console.log("fields", Object.values(fields));

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }
  console.log(`
  UPDATE carts
  SET ${setString}
  WHERE id=${id}
  RETURNING *;
  `);
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
           UPDATE carts
           SET ${setString}
           WHERE id=${id}
           RETURNING *;
           `,
      Object.values(fields)
    );
    return cart;
  } catch (error) {
    console.error("Error Updating cart", error);
    throw error;
  }
}

async function updateCartItem({ id, ...fields }) {
  // build the set string
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
             WHERE id=${id}
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

async function destroyItemInCart(cartId) {
  try {
    const {
      rows: [carts],
    } = await client.query(
      `
    DELETE FROM carts_products
    WHERE cart_id=${cartId};
    RETURNING id;
    `,
      [id]
    );
    return carts;
  } catch (error) {
    console.error("Error destroying item in cart!");
  }
}

async function destroyCart(id) {
  try {
    await client.query(
      `
        DELETE FROM carts
        WHERE "id"=${id}
        `
    );
    return true;
  } catch (error) {
    console.error("Error Deleting Cart", error);
    throw error;
  }
}

//export functions

module.exports = {
  createCart,
  getCartById,
  getCartByUserId,
  updateCart,
  updateCartItem,
  destroyItemInCart,
  destroyCart,
};
