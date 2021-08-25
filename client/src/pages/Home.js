import React, { useState } from "react";
import SearchRestaurants from "./SearchRestaurants";
import "../App.css";
import logo from "../assets/images/tblogo.png";

const Home = () => {
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  return (
    <div>
      <header>
        <div id="homephoto">
          <div id="welcome">
            <h3 style={{ color: "white", shadowSize: 5 }}>
              {" "}
              {/*               <img src={logo} id="logo" alt="logo" className="logoLarge" />
               */}
              Welcome to <br /> <span id="t">Taste</span>
              <span id="b">Buds</span>{" "}
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
