import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllProducts, getUserByToken } from "../api_adapter";
import "./components_css/Header.css";
import ProductDetails from "./ProductDetails";

const Header = (props) => {
  const user = props.user;
  const [genres, setGenres] = useState([]);
  const [formats, setFormats] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts().then((products) => {
      const _genres = [];
      const _formats = [];
      products.forEach((product) => {
        if (!_genres.includes(product.genre)) _genres.push(product.genre);
        if (!_formats.includes(product.format)) _formats.push(product.format);
      });
      setGenres(_genres);
      setFormats(_formats);
    });
  }, []);


  const cart = props.cart;
  let totalProducts = 0;

  cart.forEach((product) => {
    totalProducts += product.quantity;
  });
  const handleNavigate = (pathname) => {
    navigate({
      pathname,
      search: `?genre=${selectedGenre}&format=${selectedFormat}&search=${searchValue}`,
    });
  };

  const navigateToCheckout = () => {
    navigate("/checkout");
  };

 

  const calculateSubtotal = () => {
    let totalPrice = 0;

    cart.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    runningTotal = totalPrice;
    return totalPrice;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    props.setUser({})
    props.setCart([]);
    props.setCartId(null);
    // 
    navigate("/");
  }

  return (
    <header id="header">
      <div className="titleBar">
        <NavLink to="/" className="link">
          <div id="title">
            <div className="capital">G</div>raceland{" "}
            <div className="capital">S</div>hopper
          </div>
        </NavLink>
        {user.id ? (
          <div className="loggedInAs">
            <div>Logged in as {user.username}</div>
            <div>My stuff</div>
          </div>
        ) : (
          <div className="loggedInAs">Browsing as Guest</div>
        )}
        {user.username === "Admin" ? (
          <NavLink className="link" to="/AdminPage">Admin</NavLink>
        ) : null }
        {user.username === "Admin" ? (
          <NavLink className="link" to="/AdminUsers">Users</NavLink>
        ) : null }
      </div>
      <div id="controls">
        <div id="categories">
          <NavLink to="/Products" className="link">
            All products
          </NavLink>
          <select
            name="genre"
            placeholder="Genre"
            onChange={(event) => setSelectedGenre(event.target.value)}
          >
            <option value="all" className="dropdown">
              All Genres
            </option>
            {genres.map((genre) => (
              <option key={genre} value={genre} className="dropdown">
                {genre}
              </option>
            ))}
          </select>
          <select
            name="format"
            placeholder="Format"
            onChange={(event) => setSelectedFormat(event.target.value)}
          >
            <option value="all" className="dropdown">
              All Formats
            </option>
            {formats.map((format) => (
              <option key={format} value={format} className="dropdown">
                {format}
              </option>
            ))}
          </select>
          <button onClick={(event) => handleNavigate("/Products")}>
            Search
          </button>
        </div>
        <div id="searchbarcontainer">
          <input
            onChange={(event) => setSearchValue(event.target.value)}
            name="search_products"
            type="text"
            placeholder="Search all products..."
            id="searchbar"
          ></input>
          <button onClick={(event) => handleNavigate("/Products")}>
            Search
          </button>
        </div>
        <div id="userlinks">
          <NavLink to="/checkout" className="link cartLink">
            <img className="cartIcon" src="/pics/cart2.png" />
            <span className="productNumber">{totalProducts}</span>
          </NavLink>
          {user.id ? (
            <span className="link" onClick={handleLogout}>
              Logout
            </span>
          ) : (
            <NavLink to="/Login" className="link">
              Login/Register
            </NavLink>
          )}
          
        </div>
      </div>
    </header>
  );
};

export default Header;
