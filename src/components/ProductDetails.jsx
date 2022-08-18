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
    <div className="product">
      <div>{product.title}</div>
      <img className="product_photo" src={product.photo} />
      <div>{product.artist}</div>
      <div>{product.price}</div>
    </div>
  );
};

export default ProductDetails;
