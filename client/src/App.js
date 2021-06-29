import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { getHeaders } from "./auth";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import SearchRestaurants from "../src/pages/SearchRestaurants";
function App() {
  const yelp = require("yelp-fusion");
  const apiKey =
    "LhPwa5pQMDo4DVNiUSePZ5L0Ge_Qof4n3cXJNWdfW1kw0-O6PzbebTK78f-nuEcNACakrZSDWLYYBxi-gAj7Yk7zSazSRnIXn7QOtV0KEkV7ca9F2djgWWzF-gjWYHYx";
  const client = yelp.client(apiKey);
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <div id="homephoto">
            <div id="welcome">
              <p>Welcome to TasteBuds</p>
              <SearchRestaurants />
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </div>
          </div>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
