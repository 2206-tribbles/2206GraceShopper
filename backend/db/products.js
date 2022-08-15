const client = require('./client');

async function createProduct({ title, artist, description, release_date, price, inventory, format, genre }) {

    try {
        const {
            rows: [product],
        } = await client.query(
            `
            INSERT INTO products(title, artist, description, release_date, price, inventory, format, genre, photo)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
            `,
            [title, artist, description, release_date, price, inventory, format, genre, photo]
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

async function addProductToCart({
    cart_id,
    product_id,
    quantity,
    sale_price,
  }) {
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
      console.error('Error adding product to cart!');
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