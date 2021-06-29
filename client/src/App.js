import logo from "./logo.svg";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
const getHeaders = require("./auth");
const createHttpLink = require("apollo-link-http").createHttpLink;
const setContext = require("apollo-link-context").setContext;

/* const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache(),
}); */

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

/* const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`; */

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

/* function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
} */

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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome to TasteBuds.</p>
          <RestaurantSearch />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
