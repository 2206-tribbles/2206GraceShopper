const express = require("express");
const productsRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
  getProductById,
  createProduct,
  destroyProduct,
  getProductByTitle,
  updateProduct,
} = require("../../db");

productsRouter.post("/", async (req, res, next) => {
  console.log("creating product...");
  console.log("line8");
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
    console.log("line12");
    const _product = await getProductByTitle(title);
    if (_product) {
      next({
        name: "ProductExistsError",
        message: "A product by that name already exists",
      });
    }
    console.log(title, "line21");
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
  console.log(req.params.productId, "line 33");
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
    // const originalProduct = await getProductById(id);
    console.log(updateFields, "line65");
    // updateFields.id = product_id
    const updatedProduct = await updateProduct(updateFields);
    console.log("hello world");
    res.send(updatedProduct);
  } catch (error) {
    next();
  }
});

productsRouter.delete("/:productId", async (req, res, next) => {
  const  id  = req.params.productId;
  console.log(id, "line94")
  try {
    const product = await getProductById({id});
  
      await destroyProduct(id);
      res.send(product);
   
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
