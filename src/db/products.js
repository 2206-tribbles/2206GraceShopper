const client = require('./client');

async function createProduct({ title, artist, description, release_date, price, inventory, format, genre }) {

    try {
        const {
            rows: [product],
        } = await client.query(
            `
            INSERT INTO products(title, artist, description, release_date, price, inventory, format, genre)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
            `,
            [title, artist, description, release_date, price, inventory, format, genre]
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
 
 async function getProductById({id}) {
    try {
        const {
            rows: [product],
        } = await client.query(
            `
            SELECT *
            FROM products
            WHERE id = $1;
            
            `
            [id]
        );
        return product;
    } catch (error) {
        console.error("Error Retrieving Product", error);
        throw error;
    }
} 
 
 async function destroyProduct(id) {
    await client.query(
      `
      DELETE FROM an_order order_history
       WHERE product_id=${id};
      DELETE FROM reviews 
       WHERE product_id=${id};
      DELETE FROM products
       WHERE id=${id};
      `
    );
    await client.query(
      `
     DELETE FROM an_order cart 
      WHERE product_id=${id};
     DELETE FROM order_history reviews 
      WHERE product_id=${id};
     DELETE FROM products
      WHERE id=${id};
      `
    );
  }

  //export functions

module.exports = {
    createProduct,
    getProductById,
    updateProduct,
    destroyProduct
  }