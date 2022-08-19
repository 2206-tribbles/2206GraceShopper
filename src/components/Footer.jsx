import React from "react";
import { NavLink } from "react-router-dom";
import "./components_css/Footer.css"

const Footer = () => {

    return (
        <footer id="footer">
            <div id="footerlinks">
                <NavLink to="/Contact" className="link">Contact us</NavLink>
            </div>
        </footer>
    );
}

export default Footer;