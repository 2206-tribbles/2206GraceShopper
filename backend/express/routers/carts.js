//create cart, update cart, destroy cart

const express = require("express");
const cartsRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
    createCart,
    updateCart,
    getCartById,
    destroyCart
} = require("../../db");


//CREATE CART
cartsRouter.post("/", async (req, res) => {
    console.log("creating cart...")
    const {
        user_id,
        product_id,
        order_completed,
        purchase_date
    } = req.body;
    const cart = await createCart({
        user_id,
        product_id,
        order_completed,
        purchase_date
    });
    res.send(cart);
});

//UPDATE CART
cartsRouter.patch("/:cartId", async (req, res, next) => {

    const {
        order_completed
    } = req.body;
    const updateFields = {
      id: req.params.cartId,
    };
      updateFields.order_completed = order_completed;
    try {
        const updatedCart = await updateCart(updateFields);
        console.log("cart updated")
      res.send(updatedCart);
    } catch (error) {
      next();
    }
  });

  //DELETE CART
  cartsRouter.delete("/:cartId", async (req, res, next) => {
    const id = req.params.cartId;
    try {
      const carts = await getCartById({ id });
  
      await destroyCart(id);
      res.send(carts);
  
    } catch (error) {
      next(error);
    }
  });

module.exports = cartsRouter;
