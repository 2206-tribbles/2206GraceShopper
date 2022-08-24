import React from "react";
import StaffPicks from "./StaffPicks";
import RecentlyAdded from "./RecentlyAdded";
import MusicNews from "./MusicNews";
import "./components_css/Home.css"

const Home = () => {

    return (
        <div id="home">
            <div>
                <StaffPicks />
            </div>
            <div id="misc">
                <MusicNews />
            </div>
            <div>
                <RecentlyAdded />
            </div>
        </div>
    );
}

export default Home;