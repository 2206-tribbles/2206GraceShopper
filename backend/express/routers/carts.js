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
  createCartsProducts,
  destroyCartsProducts,
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
  console.log("cart", userCart);
  res.json(userCart);
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
  const { cart_id, user_id, cart } = req.body;
  if (cart_id) {
    // Update the products
    // Delete all the products associated with this cart_id and then re add them?
    const rows = await destroyCartsProducts({ cart_id });
    const promises = [];
    for (let i = 0; i < cart.length; i++) {
      const product = cart[i];
      const promise = await createCartsProducts({
        cart_id,
        product_id: product.id,
        quantity: product.quantity,
        sale_price: product.quantity * parseFloat(product.price),
      });
      promises.push(promise);
    }
    const inserted = await Promise.all(promises);
    // update order_completed boolean to true
    const row = await updateCart({ id: cart_id, order_completed: true });
    res.json("order successfully completed");
  } else {
    console.log(3);
    const createdCart = await createCart({ user_id });
    console.log("createdCart", createdCart);
    // Update cart_products with all the products in this cart
    console.log("cart", cart);
    const promises = [];
    for (let i = 0; i < cart.length; i++) {
      const product = cart[i];
      const promise = await createCartsProducts({
        cart_id: createdCart.id,
        product_id: product.id,
        quantity: product.quantity,
        sale_price: product.quantity * parseFloat(product.price),
      });
      promises.push(promise);
    }
    const inserted = await Promise.all(promises);
    const row = await updateCart({ id: createdCart.id, order_completed: true });
    res.json("order successfully completed");
  }
});

cartsRouter.put("/update", async (req, res, next) => {
  console.log("herfe");
  // Check to see if that cart already exists
  console.log("req body", req.body);
  let { cart_id, user_id, cart } = req.body;
  console.log("cart..", cart);
  if (!cart_id) {
    // Create the cart
    const createdCart = await createCart({ user_id });
    console.log("createdCart", createdCart);
    cart_id = createdCart.id;
  }
  const rows = await destroyCartsProducts({ cart_id });
  const promises = [];
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    const promise = await createCartsProducts({
      cart_id,
      product_id: product.id,
      quantity: product.quantity,
      sale_price: product.quantity * parseFloat(product.price),
    });
    promises.push(promise);
  }
  const inserted = await Promise.all(promises);

  res.json(cart_id);
});

module.exports = cartsRouter;
