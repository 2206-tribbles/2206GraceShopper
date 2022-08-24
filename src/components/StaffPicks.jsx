import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllProducts } from "../api_adapter";
import MiniProduct from "./MiniProduct";
import "./components_css/StaffPicks.css"

const StaffPicks = () => {
    const [allProducts, setAllProducts] = useState([]);
    const { search } = useLocation();
    const query = React.useMemo(() => new URLSearchParams(search), [search]);

    useEffect(() => {
        const allProducts = async () => {
            const allProducts = await getAllProducts();
            const products = allProducts.filter(
                (product) =>
                    (product.staffpick === true)
            );
            setAllProducts(products);
        };
        allProducts();
    }, [query]);

    return (
        <div id="staffpicks">
            <div className="divtitle">Staff picks</div>
            <div className="staffPicksContainer">
                <section className="products_gallery">
                    {allProducts.map((element) => {
                        return <MiniProduct element={element} />;
                    })}
                </section>
            </div>
        </div>
    )
}

export default StaffPicks;