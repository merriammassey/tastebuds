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
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Start Pages import //
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
// End Pages import
import SearchRestaurants2 from "../src/pages/SearchRestaurants2";

function App() {
  const yelp = require("yelp-fusion");
  const apiKey =
    "LhPwa5pQMDo4DVNiUSePZ5L0Ge_Qof4n3cXJNWdfW1kw0-O6PzbebTK78f-nuEcNACakrZSDWLYYBxi-gAj7Yk7zSazSRnIXn7QOtV0KEkV7ca9F2djgWWzF-gjWYHYx";
  const client = yelp.client(apiKey);
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/about" component={About}/> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
