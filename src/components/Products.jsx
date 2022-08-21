import React, { useState, useEffect } from "react";
import { getAllProducts } from "../api_adapter";
import SingleProduct from "./SingleProduct";
import "./components_css/Products.css";
import { useLocation } from "react-router-dom";
// import { NavLink } from "react-router-dom";

const Products = ({}) => {
  const [allProducts, setAllProducts] = useState([]);
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search),[search]);
  useEffect(() => {
    const allProducts = async () => {
      const allProducts = await getAllProducts();
      const selectedGenre = query.get("genre") || "all";
      const selectedFormat = query.get("format") || "all";
      const searchValue = query.get("search")?.toLowerCase() || "";
      const products = allProducts.filter(
        (product) =>
        (product.title.toLowerCase().includes(searchValue) ||
        product.artist.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue) ||
        product.price.toLowerCase().includes(searchValue)) &&
        
        (product.genre === selectedGenre ||
          selectedGenre === "all") &&
         (product.format === selectedFormat ||
          selectedFormat === "all")
      );
      setAllProducts(products);
    };
    allProducts();
  }, [query]);

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
