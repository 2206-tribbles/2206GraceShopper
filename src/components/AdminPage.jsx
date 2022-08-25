import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter, Route, Link, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./components_css/AdminPage.css";
import { SingleProductEdit, ProductEdit } from "./index";


import {
  createProduct,
  getProductById,
  getCartByUserId,
  createCart,
  getAllProducts,
  destroyProduct,
  updateProduct
} from "../api_adapter";

const AdminPage = () => {

  const [allProducts, setAllProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [release_date, setReleaseDate] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");
  const [format, setFormat] = useState("");
  const [genre, setGenre] = useState("");
  const [photo, setPhoto] = useState("");
  const [spotif, setSpotif] = useState("");
  const [staffpick, setStaffpick] = useState(false);

  useEffect(() => {
    getAllProducts()
      .then((products) => {
        setAllProducts(products);
      })
      .catch((error) => {
        console.error(error, "Something broke");
      });
  }, []);
  console.log(allProducts, "line29");

  // const handleSubmit2 = async (event) => {
  //   event.preventDefault();
  //  await updateProduct(
  //     title,
  //     artist,
  //     description,
  //     release_date,
  //     price,
  //     inventory,
  //     format,
  //     genre,
  //     photo,
  //     spotif,
  //     staffpick,
  //   )
  //   setShowEdit(false);
  // }

  const displayProducts = allProducts.map((product, index) => {
    const id = product.id;
    return (
      <div className="editForm">
        <h4 className="adminTitle">Title: {product.title}</h4>
        <p className="adminArtist">Artist: {product.artist}</p>
        <p className="adminDescription">Description: {product.description}</p>
        <p className="adminPrice">Price: {product.price}</p>
        <p className="adminFormat">Format: {product.format}</p>
        <p className="adminGenre">Genre: {product.genre}</p>
        <p className="adminInventory">Inventory: {product.inventory}</p>
        <p className="adminPhoto">Photo: {product.photo}</p>
        <p className="adminReleaseDate">Release Date: {product.release_date}</p>
        <p className="adminSpotify">Spotify: {product.spotif}</p>
        <p className="adminStaffPick">Staff Pick: {product.staffpick}</p>
        <p className="AdminId">Id: {product.id}</p>
        <button
          onClick={async () => {
            await destroyProduct(`${product.id}`);
            alert(`Product ${product.id} was deleted`);
            window.location.reload(false)
          }}
        >
          Delete
        </button>
        <ProductEdit product={product} />
      </div>
    );
  });
  // create form
  const handleOnChange = (event) => {
    const changed = event.target.id;
    console.log("This is Change: ", changed);
    if (changed == "createTitle") {
      setTitle(event.target.value);
      console.log(title, "title");
    }
    if (changed == "artist") {
      setArtist(event.target.value);
      console.log(artist, "artist");
    }
    if (changed == "description") {
      setDescription(event.target.value);
      console.log(description, "description");
    }
    if (changed == "releaseDate") {
      setReleaseDate(event.target.value);
      console.log(release_date, "releaseDate");
    }
    if (changed == "price") {
      setPrice(event.target.value);
      console.log(price, "price");
    }
    if (changed == "inventory") {
      setInventory(event.target.value);
      console.log(inventory, "inventory");
    }
    if (changed == "format") {
      setFormat(event.target.value);
      console.log(format, "format");
    }
    if (changed == "genre") {
      setGenre(event.target.value);
      console.log(genre, "genre");
    }
    if (changed == "photo") {
      setPhoto(event.target.value);
      console.log(photo, "photo");
    }
    if (changed == "newSpotify") {
      setSpotif(event.target.value);
      console.log(spotif, "spotif");
    }
    if (changed == "staffpick") {
      setStaffpick(event.target.value);
      console.log(staffpick, "staffpick");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const productInfo = await createProduct({
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
    });
    if (productInfo) {
      alert("NEW Product CREATED!");
    }
    setTitle("");
    setArtist("");
    setDescription("");
    setReleaseDate("");
    setPrice("0");
    setInventory("0");
    setFormat("");
    setGenre("");
    setPhoto("");
    setSpotif("");
    setStaffpick(false);
  };

  return (
    <div className="adminBody">
      <div className="newProductForm">
        <h4>New Product</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title: </label>
            <input
              id="createTitle"
              onChange={handleOnChange}
              placeholder="Title"
              value={title}
            />
          </div>

          <div>
            <label>Artist: </label>
            <input
              id="artist"
              onChange={handleOnChange}
              placeholder="Artist"
              value={artist}
            />
          </div>
          <div>
            <label>Description: </label>
            <input
              id="description"
              onChange={handleOnChange}
              placeholder="Description"
              value={description}
            />
          </div>
          <div>
            <label>Release Date: </label>
            <input
              id="releaseDate"
              onChange={handleOnChange}
              placeholder="Release Date"
              value={release_date}
            />
          </div>
          <div>
            <label>Price: </label>
            <input
              id="price"
              onChange={handleOnChange}
              placeholder="Price"
              value={price}
            />
          </div>
          <div>
            <label>Inventory: </label>
            <input
              id="inventory"
              onChange={handleOnChange}
              placeholder="Inventory"
              value={inventory}
            />
          </div>
          <div>
            <label>Format: </label>
            <input
              id="format"
              onChange={handleOnChange}
              placeholder="Format"
              value={format}
            />
          </div>
          <div>
            <label>Genre: </label>
            <input
              id="genre"
              onChange={handleOnChange}
              placeholder="Genre"
              value={genre}
            />
          </div>
          <div>
            <label>Photo: </label>
            <input
              id="photo"
              onChange={handleOnChange}
              placeholder="Photo Url"
              value={photo}
            />
          </div>
          <div>
            <label>Spotify: </label>
            <input
              id="newSpotify"
              onChange={handleOnChange}
              placeholder="Spodify Url"
              value={spotif}
            />
          </div>
          <div>
            <label>Staff Pick: </label>
            <input
              id="staffpick"
              onChange={handleOnChange}
              placeholder="Staff Pick"
              value={staffpick}
            />
          </div> <br></br>
          <button type="submit">CREATE NEW PRODUCT</button>
        </form>
      </div>
        <div className="allProducts">{displayProducts}</div>
    </div>
  );
};

export default AdminPage;
