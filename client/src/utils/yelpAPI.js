//all from sample.js except line 22...export this
"use strict";

const yelp = require("yelp-fusion");

const apiKey =
  "LhPwa5pQMDo4DVNiUSePZ5L0Ge_Qof4n3cXJNWdfW1kw0-O6PzbebTK78f-nuEcNACakrZSDWLYYBxi-gAj7Yk7zSazSRnIXn7QOtV0KEkV7ca9F2djgWWzF-gjWYHYx";

const searchRequest = {
  term: "Four Barrel Coffee",
  location: "san francisco, ca",
};

const client = yelp.client(apiKey);

client
  .search(searchRequest)
  .then((response) => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
    //added this
    return prettyJson;
  })
  .catch((e) => {
    console.log(e);
  });
