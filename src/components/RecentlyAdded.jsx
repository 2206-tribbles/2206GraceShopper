import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllProducts } from "../api_adapter";
import MiniProduct from "./MiniProduct";
import "./components_css/RecentlyAdded.css"

const RecentlyAdded = () => {
    const [allProducts, setAllProducts] = useState([]);
    const { search } = useLocation();
    const query = React.useMemo(() => new URLSearchParams(search), [search]);

    useEffect(() => {
        const allProducts = async () => {
            const allProducts = await getAllProducts();
            const products = allProducts.filter(
                (product) =>
                    (product.id > allProducts.length - 8)
            );
            setAllProducts(products);
        };
        allProducts();
    }, [query]);

    return (
        <div id="recentlyAdded">
            <div className="divtitle">Recently Added</div>
            <div className="recentlyAddedContainer">
                <section className="products_gallery">
                    {allProducts.map((element) => {
                        return <MiniProduct element={element} />;
                    })}
                </section>
            </div>
        </div>
    )
}

export default RecentlyAdded;