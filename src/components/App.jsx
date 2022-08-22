import React, { useState, useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import {
  Home,
  Header,
  Footer,
  Products,
  SingleProduct,
  ProductDetails,
  Login,
  Register,
  Checkout,
} from "./index";
import { getUserByToken } from "../api_adapter";

const App = () => {
  // Grab the cart contents from local storage and store it in a cart state
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  // Check to see if there is a token in the local storage
  useEffect(() => {
    const getUserInfo = async () => {
    const token = localStorage.getItem("token")
    if (token) {
      const userInfo = await getUserByToken(token)
      setUser(userInfo)
    }
   }
   getUserInfo();
  }, [])

  useEffect(() => {
    const _cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(_cart);
  }, []);

  // Every single time our cart state is changed, we want to update it in our local storage
  useEffect(() => {
    console.log("updating cart....");
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const deleteFromCart = (productId) => {
    const updatedCart = cart.filter(product => product.id !== productId)
    setCart(updatedCart);
  }
  
  const addToCart = (product) => {
    // If product already exists in cart
    if (cart.some((_product) => _product.id === product.id)) {
      const _product = cart.find((_product) => _product.id === product.id);
      if (_product.quantity < _product.inventory) {
        const updatedCart = cart.map((_product) => {
          if (_product.id === product.id) {
            return {
              ..._product,
              quantity: _product.quantity + 1,
            };
          }
          return _product;
        });
        setCart(updatedCart);
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const incrementQty = (productId) => {
    // Find that product with the productId inside our cart state and then update its quantity
    const _product = cart.find((_product) => _product.id === productId);
    if (_product.id === productId && _product.quantity < _product.inventory) {
      const updatedCart = cart.map((_product) => {
        if (_product.id === productId) {
          return {
            ..._product,
            quantity: _product.quantity + 1,
          };
        }
        return _product;
      });
      setCart(updatedCart);
    }
  };

  const decrementQty = (productId) => {
    // Find that product with the productId inside our cart state and then update its quantity
    const _product = cart.find((_product) => _product.id === productId);
    if (_product.id === productId && _product.quantity > 1) {
      const updatedCart = cart.map((_product) => {
        if (_product.id === productId) {
          return {
            ..._product,
            quantity: _product.quantity - 1,
          };
        }
        return _product;
      });
      setCart(updatedCart);
    }
  };
  return (
    <>
      <Header 
       cart={cart}
      />
      <Routes>
        {/* <Route path="/" element={<Navigate replace to="/home" />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products/:productId"
          element={
            <ProductDetails
              cart={cart}
              addToCart={addToCart}
              incrementQty={incrementQty}
              decrementQty={decrementQty}
              deleteFromCart={deleteFromCart}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout cart={cart} user={user} />} />
        {/* <Route path="
            path="/profile"
            element={
              <Profile
                setMessageFlag={setMessageFlag}
                setSinglePost={setSinglePost}
                singlePost={singlePost}
              />
            }
          />
          <Route path="/routines" element={<Routines user={user}/>} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivityMod />} /> */}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
