// create carts_products, update carts_products, destroy carts_products

const express = require("express");
const carts_productsRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
    createCartsProducts,
    updateCartsProducts,
    getCartsProductsById,
    destroyCartsProducts,
    getCartsProductsByProductId

} = require("../../db");


//CREATE CART_PRODUCTS
carts_productsRouter.post("/create", async (req, res, next) => {
    console.log("creating cart_products...")
    const {
        cart_id,
        product_id,
        quantity,
        sale_price
    } = req.body;
    const cart = await createCartsProducts({
        cart_id,
        product_id,
        quantity,
        sale_price
    });
    res.send(cart);
});
carts_productsRouter.get("/:carts_productsId", async (req, res, next) => {
  const id = req.params.carts_productsId;
  const _cartProduct = await getCartsProductsByProductId({id})

  res.send(_cartProduct);

})







//UPDATE CARTs_PRODUCTS
carts_productsRouter.patch("/:carts_productsId/update", async (req, res, next) => {
    const id = req.params.carts_productsId;
    const { quantity, sale_price } = req.body;
    try {
      const _cartProduct = await getCartsProductsById({id})
      if (!_cartProduct) {
        res.send({
          name: "this cart product is not available",
          message: `This cart product doesn't exist`,
          error: "Error no cart product doesn't exist..",
        });
      }

      const updateField = {};
      if (quantity) {
        updateField.quantity = quantity;
      }
  
      if (sale_price) {
        updateField.sale_price = sale_price;
      }

      const updatedCartProducts = await updateCartsProducts({
        id: id,
        quantity: quantity,
        sale_price: sale_price,
      });
      res.send(updatedCartProducts);
    } catch (error) {
      next(error);
    }
  });

  //DELETE CART_PRODUCTS
  carts_productsRouter.delete("/:carts_productsId/delete", async (req, res, next) => {
    const id = req.params.carts_productsId;
    try {
    
      const deleteCartsProducts = await destroyCartsProducts({id});
      res.send(deleteCartsProducts);

    } catch (error) {
      next(error);
    }
  });

module.exports = carts_productsRouter;