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
  Cart,
} from "./index";

const App = () => {
  // Grab the cart contents from local storage and store it in a cart state
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const _cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(_cart);
  }, []);
  
  const addToCart = (product) => {
    // If product already exists in cart
    if (cart.some((_product) => _product.id === product.id)) {
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
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    // Make sure to update local storage
    localStorage.setItem("cart", JSON.stringify(cart));
  };

   const incrementQty = (productId) => {
      // Find that product with the productId inside our cart state and then update its quantity
      const updatedCart = cart.map((_product) => {
        if (_product.id === productId  && _product.quantity < _product.inventory ) {
          return {
            ..._product,
            quantity: _product.quantity + 1,
          };
        }
        return _product;
      });
      setCart(updatedCart);
     // Make sure to update local storage
     localStorage.setItem("cart", JSON.stringify(cart));
   }

   const decrementQty = (productId) => {
    // Find that product with the productId inside our cart state and then update its quantity
    const updatedCart = cart.map((_product) => {
      if (_product.id === productId && _product.quantity > 1) {
        return {
          ..._product,
          quantity: _product.quantity - 1,
        };
      }
      return _product;
    });
    setCart(updatedCart);
   // Make sure to update local storage
   localStorage.setItem("cart", JSON.stringify(cart));
 }



  return (
    <>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Navigate replace to="/home" />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products/:productId"
          element={<ProductDetails cart={cart} addToCart={addToCart} 
          incrementQty={incrementQty} decrementQty={decrementQty} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
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
