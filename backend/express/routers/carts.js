//create cart, update cart, destroy cart

const { response } = require("express");
const express = require("express");
const cartsRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
  createCart,
  updateCart,
  getCartById,
  destroyCart,
  getCartByUserId,
} = require("../../db");

//CREATE CART
cartsRouter.post("/", async (req, res) => {
  console.log("creating cart...");
  const { user_id, order_completed, purchase_date } = req.body;
  const cart = await createCart({
    user_id,
    order_completed,
    purchase_date,
  });
  res.send(cart);
});
//GET CART USER ID
cartsRouter.get("/:user_id", async (req, res) => {
  console.log("getting cart...");
  const id = req.params.user_id;
  const userCart = await getCartByUserId(id);
  console.log("cart user id ", userCart.id);
  res.send(userCart.id);
});
//UPDATE CART
cartsRouter.patch("/:cartId", async (req, res, next) => {
  const { order_completed } = req.body;
  const updateFields = {
    id: req.params.cartId,
  };
  updateFields.order_completed = order_completed;
  try {
    const updatedCart = await updateCart(updateFields);
    console.log("cart updated");
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

cartsRouter.post("/checkout", async (req, res, next) => {
  console.log("herfe");
  // Check to see if that cart already exists
  const { cart_id, user_id } = req.body;
  if (cart_id) {
    console.log(1);
    const cart = await getCartById({ id: cart_id });
    console.log(2);
    if (!cart) {
      // Create the cart for the user
      console.log(3);
      const createdCart = await createCart({ user_id });
      console.log("createdCart", createdCart);
    }
  } else {
    const createdCart = await createCart({ user_id });
    console.log("createdCart", createdCart);
  }
  res.json("hello");
});

module.exports = cartsRouter;
