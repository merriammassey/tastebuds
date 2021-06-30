import React from "react";
import SearchRestaurants from "./SearchRestaurants";
import "../App.css";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div id="homephoto">
          <Navbar />
          <div id="welcome">
            <p>Welcome to TasteBuds</p>
            <SearchRestaurants />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
