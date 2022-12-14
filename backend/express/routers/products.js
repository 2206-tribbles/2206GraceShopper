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
    res.json(products);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.get("/productById/:productId", async (req, res, next) => {
  try {
    const product = await getProductById(req.params.productId);
    res.json(product);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.post("/Admin", async (req, res, next) => {
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
    spotif,
    staffpick
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
      spotif,
      staffpick
    });

    res.send(product);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.patch("/:productId", async (req, res, next) => {
  console.log("line75 in .patch")
  const id = req.params.productId;
  console.log("id: line77", id);
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
    spotif,
    staffpick,
  } = req.body;
  console.log("req.body: ", req.body);
  const _product = await getProductById( id );
  console.log("_product: ", _product);
  const updateFields = {};
  updateFields.id =id;
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
  if (spotif) {
    updateFields.spotif = spotif;
  }
  if (staffpick){
    updateFields.staffpick = staffpick
  }
  try {
    const updatedProduct = await updateProduct(updateFields);
    console.log(updatedProduct, "line130")
    res.send(updatedProduct);
  } catch (error) {
    next();
  }
});

productsRouter.delete("/:productId", async (req, res, next) => {
  console.log("line133")
  const id = req.params.productId;
  console.log(id, 'line134')
  try {
    const deletedProduct = await destroyProduct(id);
    res.send(deletedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
