import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter, Route, Link, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { updateProduct } from "../api_adapter";


const ProductEdit = ({product}) => {
    const [showEdit, setShowEdit] = useState(false);
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

    const handleSubmit2 = async (event) => {
        event.preventDefault();
       await updateProduct(
          product.id,
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
        )
        setShowEdit(false);
      }
      
  return (
     <div>
<button onClick={ async () => {
        setShowEdit(true)
      }}>
        Edit</button>
     {showEdit ? <div className="">
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
          
          <button className="" type="submit" onClick={() => {
            window.location.reload(false)
          }}>
            Submit
          </button>
        </form>
        <button
          className=""
          onClick={() => {
              setShowEdit(false);
          }}
        >
          Cancel Edit
        </button>
      </div> :null }
    </div>
  )};

export default ProductEdit;
