import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./components_css/SingleProduct.css";

const SingleProduct = ({ element }) => {
  return (
    <Link className="product" to={`/products/${element.id}`}>
      <br></br>
      <div className = "title">{element.title}</div> 
      <img className="product_photo" src={element.photo} />
      <div className="bottom_text">
        <div className = "artist">{element.artist}</div>
      <div className = "price">${element.price}</div>
      </div>
    </Link>
  );
};

export default SingleProduct;
