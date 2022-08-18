import React, { useState, useEffect } from "react";
import { getAllProducts } from "../api_adapter";
import SingleProduct from "./SingleProduct";
import "./components_css/Products.css"
// import { NavLink } from "react-router-dom";


const Products = ({

}) => {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const allProducts = async () => {
          const products = await getAllProducts()
          setAllProducts(products)

        }
        allProducts();
        
    }, []) 
    
    return (
        <>
            <section className="products_gallery">
                {allProducts.map((element) => {
                    return <SingleProduct element={element} />;
                })}
            </section>
        </>
    );
};

export default Products;