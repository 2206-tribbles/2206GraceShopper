import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter, Route, Link, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ProductEdit } from "./index";

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
    console.log(product, "line 62")
    return (
      <div>
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
        {/* <button onClick={ async () => {
        setShowEdit(true)
        console.log(showEdit, "line79")
      }}>
        Edit</button> */}
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
        
        
        {/* <button onClick={ async () => {
          setShowEdit(true)
        }}>
          Edit</button>
        <button
          onClick={async () => {
            await destroyProduct(`${product.id}`);
            alert(`Product ${product.id} was deleted`);
            window.location.reload(false)
          }}
        >
          Delete
        </button>
        {showEdit ? (
        <div className="">
          <h1>Edit Album</h1>
          <form className="" onSubmit={handleSubmit2}>
            <h2>Title:</h2>
            <input
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              placeholder={`${product.title}`}
            ></input>
            <h2>Artist:</h2>
            <input
              value={artist}
              onChange={(event) => {
                setArtist(event.target.value);
              }}
              placeholder={`${product.artist}`}
            ></input>
            <h2>Description:</h2>
            <input
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              placeholder={`${product.description}`}
            ></input>
            <h2>Release Date:</h2>
            <input
              value={release_date}
              onChange={(event) => {
                setReleaseDate(event.target.value);
              }}
              placeholder={`${product.release_date}`}
            ></input>
            <h2>Price:</h2>
            <input
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              placeholder={`${product.price}`}
            ></input>
            <h2>Inventory:</h2>
            <input
              value={inventory}
              onChange={(event) => {
                setInventory(event.target.value);
              }}
              placeholder={`${product.inventory}`}
            ></input>
            <h2>Format: </h2>
            <input
              value={format}
              onChange={(event) => {
                setFormat(event.target.value);
              }}
           placeholder={`${product.format}`}
           ></input>
            <h2>Genre:</h2>
            <input
              value={genre}
              onChange={(event) => {
                setGenre(event.target.value);
              }}
           placeholder={`${product.genre}`}
           ></input>
            <h2>Photo:</h2>
            <input
              value={photo}
              onChange={(event) => {
                setPhoto(event.target.value);
              }}
           placeholder={`${product.photo}`}
           ></input>
            <h2>Spotify:</h2>
            <input
              value={spotif}
              onChange={(event) => {
                setSpotif(event.target.value);
              }}
           placeholder={`${product.spotif}`}
           ></input>
            
            <h2>Staff Pick:</h2>
            <input
            className=""
              checked={staffpick}
              onChange={(event) => {
                setStaffpick(event.target.value);
              }}
           placeholder={`${product.staffpick}`}
           ></input>
            
            <button className="" type="submit">
              Submit
            </button>
          </form>
          <button
            className=""
            onClick={() => {
              setShowCreate(false);
            }}
          >
            Cancel Edit
          </button>
        </div>
      ) : null} */}
      </div>
    );
  });
  // console.log(products, "line 33")
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
  // console.log(productInfo, " productInfo");

  return (
    <div>
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
        <div>{displayProducts}</div>
      </div>
    </div>
  );
};

export default AdminPage;
