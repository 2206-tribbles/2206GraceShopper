const client = require('./client');

async function createCart({ user_id, product_id }) {

    try {
        const {
            rows: [cart],
        } = await client.query(
            `
            INSERT INTO carts(user_id, product_id)
            VALUES ($1, $2)
            RETURNING *;
            `,
            [user_id, product_id]
        );
        
        console.log(cart);
        return cart;
    } catch (error) {
        console.error("Error Creating Cart", error);
        throw error;
    }
}

async function getCartById({id}) {
  try {
      const {
          rows: [cart],
      } = await client.query(
          `
          SELECT *
          FROM cart
          WHERE id = $1;
          
          `
          [id]
      );
      return cart;
  } catch (error) {
      console.error("Error Retrieving Cart", error);
      throw error;
  }
} 

async function getCartByUserId({id}) {
    try {
        const {
            rows: [cart],
        } = await client.query(
            `
            SELECT *
            FROM carts
            WHERE id = $1;
            
            `
            [id]
        );
        return cart;
    } catch (error) {
        console.error("Error Retrieving Cart", error);
        throw error;
    }
} 

async function updateCart({ id, ...fields }) {
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
       console.error("Error Retrieving Product", error);
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

 async function destroyItemInCart(cartId, productId) {
    try {
      const {
        rows: [carts],
      } = await client.query(
        `
    DELETE FROM carts_products
    WHERE cart_id=${cartId} && product_id=${productId};
    RETURNING id;
    `,
        [id]
      );
      return carts;
    } catch (error) {
      console.error('Error destroying item in cart!');
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
    destroyCart
  }