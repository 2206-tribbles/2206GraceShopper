import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllProducts } from "../backend/db/products"

const Products = ({

}) => {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        getAllProducts().then(
            (response) => {
                setAllProducts(response.data.Products)
            }
        )
    })


    return (
        <>
            <div id="productspage">
                {allProducts.map((element) => {
                    return <SingleProduct element={element} />;
                })}
            </div>
        </>
    );
};

export default Products;