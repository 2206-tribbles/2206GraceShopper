import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllProducts, } from "../api_adapter";
import "./components_css/Header.css";
import ProductDetails from "./ProductDetails";

const Header = (props) => {
  const [genres, setGenres] = useState([])
  const [formats, setFormats] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [selectedFormat, setSelectedFormat] = useState("all")
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate()  
  const userId = localStorage.getItem("userId");
  useEffect( () => {
       getAllProducts().then((products) => {
        const _genres = []
        const _formats = [] 
        products.forEach((product) => {
          if(!_genres.includes(product.genre)) _genres.push(product.genre)
          if(!_formats.includes(product.format)) _formats.push(product.format)
        } )
        setGenres(_genres)
        setFormats(_formats)
       })

    } ,[])
    const cart = props.cart;
      let totalProducts = 0;

      cart.forEach((product) => {
        totalProducts += product.quantity;
      });
     const handleNavigate = (pathname) => {
        navigate({pathname,search:`?genre=${selectedGenre}&format=${selectedFormat}&search=${searchValue}`})
     } 

    return (
        <header id="header">
            <NavLink to="/" className="link"><div id="title"><div className="capital">G</div>raceland <div className="capital">S</div>hopper</div></NavLink>
            <div id="controls">
                <div id="categories">
                <NavLink to="/Products" className="link">All products</NavLink>
                    <select name="genre" placeholder="Genre" onChange={(event)=>setSelectedGenre(event.target.value)}> 
                        <option value="all" className="dropdown">All Genres</option>
                        {genres.map((genre) => <option key={genre} value={genre} className="dropdown">{genre}</option>)}
                    </select>
                    <select name="format" placeholder="Format" onChange={(event)=>setSelectedFormat(event.target.value)}>
                        <option value="all" className="dropdown">All Formats</option>
                        {formats.map((format) => <option key={format} value={format} className="dropdown">{format}</option>)}
                    </select>
                    <button onClick={(event) => handleNavigate("/Products") }>Search</button>
                </div>
                <div id="searchbarcontainer">
                    <input onChange={(event) => setSearchValue(event.target.value)} name="search_products" type="text" placeholder="Search all products..." id="searchbar"></input>
                    <button onClick={(event) => handleNavigate("/Products") }>Search</button>
                </div>
                <div id="userlinks">
                    <NavLink to="/Login" className="link">Login/Register</NavLink>
                    {userId === "6" ? (
                  <NavLink to="/Admin">Admin</NavLink>
                  ): null}
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