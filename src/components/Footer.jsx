import React from "react";
import { NavLink } from "react-router-dom";
import "./components_css/Footer.css"

const Footer = () => {

    return (
        <div id="footer">
            <div id="footerlinks">
                <NavLink to="/Contact" className="link">Contact us</NavLink>
            </div>
        </div>
    );
}

export default Footer;