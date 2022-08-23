import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter, Route, Link, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getAllUsers } from "../api_adapter";


const AdminUsers = () => {
        const [allUsers, setAllUsers] =useState([])
      
        useEffect(() => {
          getAllUsers()
            .then((users) => {
              setAllUsers(users);
            })  
            .catch((error) => {
              console.error(error, "Something broke");
            });
        }, []);
        console.log(allUsers, "line14")
      
        // const displayProducts = allProducts.map((product, index) => {
        //   const id = product.id;
        //   console.log(id, "line33")
        //   return (
        //     <div>
        //       <h4 className="adminTitle">Title: {product.title}</h4>
        //       <p className="adminArtist">Artist: {product.artist}</p>
        //       <p className="adminDescription">Description: {product.description}</p>
        //       <p className="adminPrice">Price: {product.price}</p>
        //       <p className="adminFormat">Format: {product.format}</p>
        //       <p className="adminGenre">Genre: {product.genre}</p>
        //       <p className="adminInventory">Inventory: {product.inventory}</p>
        //       <p className="adminPhoto">Photo: {product.photo}</p>
        //       <p className="adminReleaseDate">Release Date: {product.release_date}</p>
        //       <p className="adminSpotify">Spotify: {product.spotif}</p>
        //       <p className="adminStaffPick">Staff Pick: {product.staffpick}</p>
        //       <p className="AdminId">Id: {product.id}</p>
        //       <button>Edit</button><button onClick={async () => {
        //        await destroyProduct(`${product.id}`)
        //        alert(`Product ${product.id} was deleted`)
        //       }}>Delete</button>
        //     </div>
        //   )
        // })
    }
 
export default AdminUsers;