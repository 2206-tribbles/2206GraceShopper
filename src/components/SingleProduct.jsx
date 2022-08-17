import React, { useState, useEffect } from "react";

const SingleProduct = ({ element }) => {

    return (
        <div id="singleproduct">
            <div>{element.title}</div>
            <div>{element.photo}</div>
            <div>{element.artist}</div>
            <div>{element.price}</div>
        </div>
    );
};

export default SingleProduct;