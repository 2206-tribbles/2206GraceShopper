import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter, Route, Link, useParams } from "react-router-dom";

import { NavLink } from "react-router-dom";

import { createProduct, getProductById, getCartByUserId, createCart } from "../api_adapter";

const Admin = (props) => {
  // const params = useParams();
  // const productId = params.productId;
  // console.log("product Id", productId);
  // const [orderQuantity, setOrderQuantity] = useState(1);
  // const [product, setProduct] = useState({});
  // //get product
  // useEffect(() => {
  //   console.log("grabbing single product details...");
  //   const _product = async () => {
  //     const singleProduct = await getProductById(productId);
  //     setProduct(singleProduct);
  //   };
  //   _product();
  // }, [productId]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [release_date, setReleaseDate] = useState("0");
  const [price, setPrice] = useState("0");
  const [inventory, setInventory] = useState("0");
  const [format, setFormat] = useState("");
  const [genre, setGenre] = useState("");
  const [photo, setPhoto] = useState("");
  const [spotif, setSpotif] = useState("");
  const [staffpick, setStaffpick] = useState(false);


const handleOnChange = (event) => {
  const changed = event.target.id;
  console.log("This is Change: ",changed);
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
    staffpick
  }
  );
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
// console.log(productInfo, " productInfo");

return (<div>
  <div className="newProductForm">
    <div>New Product</div>
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
      </div>
      <button type="submit">CREATE NEW PRODUCT</button>
    </form>
  </div>
  {/* <div className="product">
  <div className="album_spotif">
    <div className="album_info">
  <div className="product_title">{product.title}</div>
      <div className="photo_info">
        <img className="product_photo" src={product.photo} />
      </div>
      <div className="product_artist">
        <div>{product.artist}</div>
      </div>
      <div className="main_info">
        <div>Release Date: {product.release_date}</div>
        <div className="product_description">
          Description: {product.description}
        </div>
        <div className="format_genre">
          <div>Genre: {product.genre}</div>
          <div>Format: {product.format}</div>
        </div>
      </div>
      <div className="storeInfo">
        <div>{product.inventory} in stock</div>
        <div>{product.price}</div>
      </div>
    </div>
  </div>
</div> */}
</div>
);
};

export default Admin;