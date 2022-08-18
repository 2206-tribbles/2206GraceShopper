const express = require("express");
const productsRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
  getProductById,
  createProduct,
  destroyProduct,
  getProductByTitle,
  updateProduct,
  getAllProducts,
} = require("../../db");

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    console.log("here", products);
    res.json(products);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.get("/productById/:productId", async (req, res, next) => {
  try {
    const product = await getProductById(req.params.productId);
    console.log("product", product);
    res.json(product);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.post("/", async (req, res, next) => {
  const {
    title,
    artist,
    description,
    release_date,
    price,
    inventory,
    format,
    genre,
    photo,
  } = req.body;

  try {
    const _product = await getProductByTitle(title);
    if (_product) {
      next({
        name: "ProductExistsError",
        message: "A product by that name already exists",
      });
    }
    const product = await createProduct({
      title,
      artist,
      description,
      release_date,
      price,
      inventory,
      format,
      genre,
      photo,
    });

    res.send(product);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.patch("/:productId", async (req, res, next) => {
  const {
    title,
    artist,
    description,
    release_date,
    price,
    inventory,
    format,
    genre,
    photo,
  } = req.body;
  const updateFields = {
    id: req.params.productId,
  };
  if (title) {
    updateFields.title = title;
  }
  if (artist) {
    updateFields.artist = artist;
  }
  if (description) {
    updateFields.description = description;
  }
  if (release_date) {
    updateFields.release_date = release_date;
  }
  if (price) {
    updateFields.price = price;
  }
  if (inventory) {
    updateFields.inventory = inventory;
  }
  if (format) {
    updateFields.format = format;
  }
  if (genre) {
    updateFields.genre = genre;
  }
  if (photo) {
    updateFields.photo = photo;
  }
  try {
    const updatedProduct = await updateProduct(updateFields);
    res.send(updatedProduct);
  } catch (error) {
    next();
  }
});

productsRouter.delete("/:productId", async (req, res, next) => {
  const id = req.params.productId;
  try {
    const product = await getProductById({ id });

    await destroyProduct(id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
