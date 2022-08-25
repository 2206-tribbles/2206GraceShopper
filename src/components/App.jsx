import React, { useState, useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import {
  Home,
  Header,
  Footer,
  Products,
  SingleProduct,
  MiniProduct,
  ProductDetails,
  Login,
  Register,
  Checkout,
  ContactForm,
  Cart,
  AdminPage,
  ProductEdit,
  AdminUsers,
  ProductDetailsEdit,
} from "./index";
import { getUserByToken, getCartByUserId, updateCart } from "../api_adapter";

const App = () => {
  // Grab the cart contents from local storage and store it in a cart state
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [cartId, setCartId] = useState(null);
  // Check to see if there is a token in the local storage
  useEffect(() => {
    const getUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const userInfo = await getUserByToken(token);
        setUser(userInfo);
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    const getCartContents = async () => {
      if (user.id) {
        // Grab cart from backend
        const _cart = await getCartByUserId(user.id);
        setCart(_cart);
        if (_cart.length > 0) {
          setCartId(_cart[0].cart_id);
        }
      } else {
        const _cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(_cart);
      }
    };
    getCartContents();
  }, [user]);

  // Every single time our cart state is changed, we want to update it in our local storage
  useEffect(() => {
    const saveCartContents = async () => {
      if (user.id && cart.length > 0) {
        // Update cart in backend
        const cart_id = await updateCart(user.id, cartId, cart);
        setCartId(cart_id);
      } else {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    };
    saveCartContents();
  }, [cart]);

  const deleteFromCart = async (productId) => {
    const cart_id = cart[0].cart_id;
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    const card_id = await updateCart(user.id, cartId, cart);
  };

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
        user={user}
        setUser={setUser}
        setCart={setCart}
        setCartId={setCartId}
      />
      <Routes>
        {/* <Route path="/" element={<Navigate replace to="/home" />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path="/ProductDetailsEdit" element={<ProductDetailsEdit />} />
        <Route path="/products" element={<Products user={user} />} />
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
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        {user.username === "Admin" ? (
          <Route path="/AdminPage" element={<AdminPage />} />
        ) : null}
        {user.username === "Admin" ? (
          <Route path="/AdminUsers" element={<AdminUsers />} />
        ) : null}
        <Route
          path="/checkout"
          element={
            <Checkout
              setCart={setCart}
              cart={cart}
              user={user}
              incrementQty={incrementQty}
              decrementQty={decrementQty}
              deleteFromCart={deleteFromCart}
            />
          }
        />

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
