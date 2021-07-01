import React from "react";
import SearchRestaurants from "./SearchRestaurants";
import "../App.css";

const Home = () => {
  return (
    <div>
      <header>
        <div id="homephoto">
          <div id="welcome">
            <p style={{ color: "white" }}>Welcome to TasteBuds</p>
            <SearchRestaurants />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
