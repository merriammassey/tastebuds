//import React, { useState } from "react";
const axios = require("axios").default;

//** added query
export const searchYelp = (locationInput, termInput) => {
  //const locationInput = "phoenix";
  console.log("location received");
  //const locationSearched = "phoenix";
  //UI feedback to tell the user when we are retrieving infromation from the API
  //this.setState({ loading: true });

  //using a proxy server cors-anywhere to get rid of the CROS probblem
  //SUPER HOT TIP: passing the location variable, which equals to the user's input (see below). Instead of grabbbing the entire API, it will only retrieve the restaurants that are closed to the lcoation information we entered. This makes the lodading wayyyyyyy faster.
  //** added return
  return axios
    .get(
      `${"https://fierce-sea-59597.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?location=${locationInput}`,
      {
        //required authorization format from API
        headers: {
          //to get the API from the .env file use process.env.{variable name}
          Authorization: `Bearer LhPwa5pQMDo4DVNiUSePZ5L0Ge_Qof4n3cXJNWdfW1kw0-O6PzbebTK78f-nuEcNACakrZSDWLYYBxi-gAj7Yk7zSazSRnIXn7QOtV0KEkV7ca9F2djgWWzF-gjWYHYx`,
          //Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
          //Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        },
        //option params passed to API call to retrieve only breakfast and lunch spots
        params: {
          categories: `${termInput}`,
        },
      }
    )
    .then((res) => {
      //  console.log(res.data.businesses);
      return res.data.businesses;
      //change the state of App to reflect on the result we are given from the API
      //at the same time, setting the loading state to false
      //this.setState({ results: res.data.businesses, loading: false });
    })
    .catch((err) => {
      //fire the errorState message if there is no information return from the API
      /* this.setState({
        errorState: `Sorry we coudln't find information related to the location you search, do you want to try something else?`,
        loading: false,
      }); */
    });
  //return res.data.business;
};
