import React from "react";
import "./App.css";
import {
  //ApolloClient,
  //InMemoryCache,
  ApolloProvider,
  //useQuery,
  //gql,
} from "@apollo/client";
//import { createHttpLink } from "apollo-link-http";
//import { setContext } from "apollo-link-context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StoreProvider } from "./utils/GlobalState";
// Start Pages import //
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import Event from "../src/pages/Event";
import Dashboard from "../src/pages/Dashboard";
import ViewEvent from "../src/pages/ViewEvent";

//import SearchedRestaurants from "../src/pages/SearchedRestaurants";
import AppNavBar from "../src/components/Navbar";
// import SavedResturants from "../src/pages/SaveResturants";
import "bootstrap/dist/css/bootstrap.min.css";
require("dotenv").config({ path: __dirname + "/.env" });

// End Pages import

function App() {
  const yelp = require("yelp-fusion");
  const apiKey = `${process.env.REACT_APP_YELP_KEY}`;
  const client = yelp.client(apiKey);
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <AppNavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route exact path="/about" component={About}/> */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/event" component={Event} />
              <Route exact path="/viewevent" component={ViewEvent} />

              {/*               <Route
                exact
                path="/restaurants"
                component={SearchedRestaurants}
              /> */}
            </Switch>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
