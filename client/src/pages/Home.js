import React, { useState } from "react";
import SearchRestaurants from "./SearchRestaurants";
import "../App.css";

const Home = () => {
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  return (
    <div>
      <header>
        <div id="homephoto">
          <div id="welcome">
            <p style={{ color: "white" }}>Welcome to TasteBuds</p>
            <SearchRestaurants
              selectedRestaurants={selectedRestaurants}
              setSelectedRestaurants={setSelectedRestaurants}
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
