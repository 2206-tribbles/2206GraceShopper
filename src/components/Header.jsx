import React from "react";
import { NavLink } from "react-router-dom";
import "./components_css/Header.css"

const Header = (props) => {
    const cart = props.cart;
      let totalProducts = 0;

      cart.forEach((product) => {
        totalProducts += product.quantity;
      });
      
      

    return (
        <header id="header">
            <NavLink to="/" className="link"><div id="title"><div className="capital">G</div>raceland <div className="capital">S</div>hopper</div></NavLink>
            <div id="controls">
                <div id="categories">
                <NavLink to="/Products" className="link">All products</NavLink>
                    <select name="genre" placeholder="Genre"><option value="all" className="dropdown">Genre</option></select>
                    <select name="format" placeholder="Format"><option value="all" className="dropdown">Format</option></select>
                    <button>Search</button>
                </div>
                <div id="searchbarcontainer">
                    <input name="search_products" type="text" placeholder="Search all products..." id="searchbar"></input>
                    <button>Search</button>
                </div>
                <div id="userlinks">
                    <NavLink to="/Login" className="link">Login/Register</NavLink>
                    <NavLink to="/Cart" className="link cartLink">
                        <img className="cartIcon" src="/pics/cart.png"/>
                        <span className="productNumber">{totalProducts}</span> 
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default Header;