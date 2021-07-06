import React from "react";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
  gql,
} from "@apollo/client";
//import { createHttpLink } from "apollo-link-http";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StoreProvider } from "./utils/GlobalState";
// Start Pages import //
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import Event from "../src/pages/Event";
import Dashboard from "../src/pages/Dashboard";
import ViewEvent from "../src/pages/ViewEvent";
import AppNavBar from "../src/components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
require("dotenv").config({ path: __dirname + "/.env" });
// End Pages import

const httpLink = createHttpLink({
  uri: "/graphql",
});

//function to add token to httpLink
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

//establish connection to back end servier's graphql endpoint
const client = new ApolloClient({
  //establish new link to gql server...combine autLink and httpLink so every request retrieves token and sets request headers before amking the request to API
  link: authLink.concat(httpLink),
  //instantiate a new cache object
  cache: new InMemoryCache(),
});

function App() {
  /* const yelp = require("yelp-fusion");
  const apiKey = `${process.env.REACT_APP_YELP_KEY}`;
  const yelpclient = yelp.client(apiKey); */
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
            </Switch>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
