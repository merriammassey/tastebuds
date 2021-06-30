import logo from "./logo.svg";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const getHeaders = require("./auth");
const createHttpLink = require("apollo-link-http").createHttpLink;
const setContext = require("apollo-link-context").setContext;

// Start Pages import //
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
// End Pages import 


// const client = new ApolloClient({
//   uri: "https://48p1r2roz4.sse.codesandbox.io",
//   cache: new InMemoryCache(),
// });

const httpLink = createHttpLink({
  uri: "https://api.yelp.com/v3/graphql",
  fetch: fetch,
  //credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  const authHeaders = getHeaders();
  // return the headers to the context so httpLink can read them
  return {
    headers: authHeaders,
  };
});

//set up client
//concat http link with apollo auth
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// /* const EXCHANGE_RATES = gql`
//   query GetExchangeRates {
//     rates(currency: "USD") {
//       currency
//       rate
//     }
//   }
// `; */

const RESTAURANT_SEARCH = gql`
  {
    business(id: "garaje-san-francisco") {
      name
      id
      alias
      rating
      url
    }
  }
`;

// /* function ExchangeRates() {
//   const { loading, error, data } = useQuery(EXCHANGE_RATES);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

//   return data.rates.map(({ currency, rate }) => (
//     <div key={currency}>
//       <p>
//         {currency}: {rate}
//       </p>
//     </div>
//   ));
// } */

function RestaurantSearch() {
  console.log("hello yelp");
  const { loading, data, error } = useQuery(RESTAURANT_SEARCH);
  const restaurantData = data?.business || {};
  console.log(restaurantData);
  if (loading) return <p>Loading...</p>;
  //if (error) return <p>Error :(</p>;
  console.log(error);

  return (
    <div key={restaurantData.name}>
      <p>{restaurantData.name}</p>
    </div>
  );
}



function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <div>
        Nave bar to go here 
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
