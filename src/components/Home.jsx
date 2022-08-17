import React from "react";
import "./components_css/Home.css"

const Home = () => {

    return (
        <div id="home">
            <div id="staffpicks"><div className="divtitle">Staff picks</div></div>
            <div id="highlights"><div className="divtitle">Highlights</div></div>
            <div id="misc"><div className="divtitle">Misc</div></div>
        </div>
    );
}

export default Home;