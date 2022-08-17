import React from "react";
import { NavLink } from "react-router-dom";
import "./components_css/Header.css"

const Header = () => {

    return (
        <div id="header">
            <div id="title">Grace Shopper</div>
            <div id="controls">
                <div id="categories">
                    <select name="genre" placeholder="Genre"><option value="all" class="dropdown">Genre</option></select>
                    <select name="format" placeholder="Format"><option value="all" class="dropdown">Format</option></select>
                    <button>Search</button>
                </div>
                <div id="searchbarcontainer">
                    <input name="search_products" type="text" placeholder="Search all products..." id="searchbar"></input>
                    <button>Search</button>
                </div>
                <div id="userlinks">
                    <NavLink to="/Login" className="link">Login</NavLink>
                    <NavLink to="/Register" className="link">Register</NavLink>
                    <NavLink to="/Cart" className="link">Cart</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Header;