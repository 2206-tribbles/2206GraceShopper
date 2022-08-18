import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../api_adapter";
import "./components_css/ProductDetails.css";

const ProductDetails = () => {
  const params = useParams();
  const productId = params.productId;
  console.log("product Id", productId);

  const [product, setProduct] = useState({});

  useEffect(() => {
    const _product = async () => {
      const singleProduct = await getProductById(productId);
      setProduct(singleProduct);
    };
    _product();
  }, []);

  return (
    <div className="page">
      <div className="product">
        <div className="photo_info">
          <div className="product_title">{product.title}</div>
          <img className="product_photo" src={product.photo} />
        </div>
        <div className="product_artist"><div>{product.artist}</div></div>
        <div className="main_info">
          <div>Release Date: {product.release_date}</div>
          <div className="product_description">Description: {product.description}</div>
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
  );
};

export default ProductDetails;
