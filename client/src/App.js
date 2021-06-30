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
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Start Pages import //
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
// import SearchRestaurants from "../src/pages/SearchRestaurants";
// import SavedResturants from "../src/pages/SaveResturants";

require('dotenv').config({path: __dirname + '/.env'})

// End Pages import

function App() {
 
  const yelp = require("yelp-fusion");
  const apiKey = `${process.env.REACT_APP_YELP_KEY}`;
  const client = yelp.client(apiKey);
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          Nave bar to go here
          <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/about" component={About}/> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            {/* <Route exact path="/ideas" component= {SavedResturants} /> */}
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
