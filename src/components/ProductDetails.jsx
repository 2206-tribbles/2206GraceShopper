import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById, getCartByUserId, createCart } from "../api_adapter";
import MyCart from "./MyCart";
import "./components_css/ProductDetails.css";

const ProductDetails = (props) => {
  const cart = props.cart;
  const params = useParams();
  const productId = params.productId;
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [product, setProduct] = useState({});
  //get product
  useEffect(() => {
    const _product = async () => {
      const singleProduct = await getProductById(productId);
      setProduct(singleProduct);
    };
    _product();
  }, [productId]);
  //changing quantity

  // function subQuantity() {
  //   btnAdd.addEventListener("click", (event) => {
  //     event.preventDefault();
  //     const currentValue = Number(inputField.value);
  //     inputField.value = currentValue + 1;
  //   });
  // }
  // function addQuantity() {
  //   btnSubtract.addEventListener("click", (event) => {
  //     event.preventDefault();
  //     const currentValue = Number(inputField.value);
  //     inputField.value = currentValue - 1;
  //   });
  // }
  // function buttonHandler(userId) {
  //   const cartId = getCartByUserId(userId);

  //   if (cartId === undefined) {
  //     createCart(userId);
  //   }
  //   console.log("cartId: ", cartId);
  //   return cartId;
  // }

  return (
    <div className="page">
      <div className="productPage">
        <div class="album_spotif">
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
          <div className="spotifContainer">
            <iframe
              className="spotif"
              border-radius="12px"
              src={product.spotif}
              width="95%"
              height="550"
              frameBorder="0"
              allowFullScreen=""
            ></iframe>
          </div>
        </div>
        <button className="addPtdBtn" onClick={() => props.addToCart(product)}>
          Add to Cart
        </button>
      </div>
      <MyCart
        cart={cart}
        incrementQty={props.incrementQty}
        decrementQty={props.decrementQty}
        deleteFromCart={props.deleteFromCart}
      />
    </div>
  );
};

export default ProductDetails;
