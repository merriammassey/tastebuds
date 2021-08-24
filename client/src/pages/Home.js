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
            <h3 style={{ color: "white", shadowSize: 5 }}>
              Welcome to TasteBuds
            </h3>
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
