import React, { useState, useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { Home, Header, Footer, Products, SingleProduct, ProductDetails, Login, Register, Cart } from "./index";

const App = () => {

    return (<>
        <Header />
         <Routes>
          {/* <Route path="/" element={<Navigate replace to="/home" />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetails/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
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
      </>);
};

export default App;