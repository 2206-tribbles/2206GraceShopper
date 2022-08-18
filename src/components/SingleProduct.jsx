import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./components_css/SingleProduct.css";

const SingleProduct = ({ element }) => {
  return (
    <Link className="product" to={`/products/${element.id}`}>
      <div>{element.title}</div>
      <img className="product_photo" src={element.photo} />
      <div>{element.artist}</div>
      <div>{element.price}</div>
    </Link>
  );
};

export default SingleProduct;
