import React from "react";
import "./components_css/MusicNews.css"

const MusicNews = () => {

    return (
        <div id="MusicNews">
            <div className="divTitle">Music News</div>
            <div className="MusicNewsContainer">
                <div className="StoryContainer">
                    <div className="Story">
                        <div className="Title">Upcoming Concerts in Chicago</div>
                        <div className="Date">8/24/2022</div>
                        <div className="Body">
                            <div className="upcomingRow">
                                <div className="upcomingBand">Alice in Chains</div>
                                <div className="upcomingVenue">Hollywood Casino Ampitheatre</div>
                                <div className="upcomingDate">5:30 PM, August 24, 2022</div>
                                <div className="upcomingPrice">$25.00</div>
                            </div>
                            <div className="upcomingRow">
                                <div className="upcomingBand">Blondie</div>
                                <div className="upcomingVenue">The Chicago Theatre</div>
                                <div className="upcomingDate">8:00 PM, August 27, 2022</div>
                                <div className="upcomingPrice">$73.00</div>
                            </div>
                            <div className="upcomingRow">
                                <div className="upcomingBand">Soft Cell</div>
                                <div className="upcomingVenue">House of Blues Chicago</div>
                                <div className="upcomingDate">7:00 PM, August 28, 2022</div>
                                <div className="upcomingPrice">$26.00</div>
                            </div>
                            <div className="upcomingRow">
                                <div className="upcomingBand">Cheap Trick</div>
                                <div className="upcomingVenue">Genesee Theatre</div>
                                <div className="upcomingDate">7:00 PM, September 10, 2022</div>
                                <div className="upcomingPrice">$45.00</div>
                            </div>
                            <div className="upcomingRow">
                                <div className="upcomingBand">Roxy Music</div>
                                <div className="upcomingVenue">United Center</div>
                                <div className="upcomingDate">8:00 PM, September 19, 2022</div>
                                <div className="upcomingPrice">$85.00</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="StoryContainer">
                    <div className="Story">
                        <div className="Title">Today in Music</div>
                        <div className="Date">8/24/2022</div>
                        <div className="Body">
                            <div className="StoryWithPhoto">
                                <img className="StoryPhoto" src="/pics/Prince.bmp" />
                                <div className="PhotoText">On August 24th, 1979, Prince released his first major hit single, I Wanna Be Your Lover, which would go on to be included on his second album, the self-titled Prince.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicNews;