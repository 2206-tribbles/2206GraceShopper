import React from "react";
import { NavLink } from "react-router-dom";
import "./components_css/Header.css"

const Header = () => {

    return (
        <div id="header">
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
                    <NavLink to="/Cart" className="link">Cart</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Header;