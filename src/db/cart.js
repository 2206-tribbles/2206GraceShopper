const client = require('./client');

async function createCart({ user_id, order_id, order_completed }) {

    try {
        const {
            rows: [cart],
        } = await client.query(
            `
            INSERT INTO cart(user_id, order_id, order_completed)
            VALUES ($1, $2, $3)
            RETURNING *;
            `,
            [user_id, order_id, order_completed]
        );
        
        console.log(cart);
        return cart;
    } catch (error) {
        console.error("Error Creating Cart", error);
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

async function updateProduct({ id, ...fields }) {
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

  //export functions

  module.exports = {
    createCart,
    getCartById,
    updateCart,
    destroyCart
  }