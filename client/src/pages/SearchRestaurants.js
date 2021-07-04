//import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Row,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import { searchYelp } from "../utils/yelpAPI";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_SEARCHED_RESTAURANTS } from "../utils/actions";
import { QUERY_RESTAURANTS } from "../utils/queries";
import { useQuery } from "@apollo/client";
//import Auth from "../utils/auth";
//import { searchRestaurants } from "../utils/API";
//import { saveBookIds, getSavedBookIds } from "../utils/localStorage";
//import mutation and useMutation
//import { SAVE_BOOK } from "../utils/mutations";
//import { useMutation } from "@apollo/client";
//  const user = data?.me || data?.user || {};
import "./style.css";

const SearchRestaurants = () => {
  //GLOBAL STATE VARIABLES
  /* const [state, dispatch] = useStoreContext;
  const { restaurants } = state;
  const { data: restaurantData } = useQuery(QUERY_RESTAURANTS); */
  //END GLOBAL STATE VARIABLES

  // create state for holding returned yelp data
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  // create state for holding our search field data
  const [termInput, setTermInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  // create state to hold saved restaurant values
  //const [savedRestaurants, setSavedRestaurants] = useState(getSavedRestaurants());

  //const [saveRestaurant, { error }] = useMutation(SAVE_RESTAURANT);

  // set up useEffect hook to save `savedRestaurants` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  //useEffect(() => {
  // return () => saveRestaurants(savedRestaurants);
  //});

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //console.log(locationInput);
    if (!locationInput) {
      //add modal
      console.log("please enter a location");
      return false;
    }
    try {
      const restaurantData = await searchYelp(locationInput, termInput);
      //console.log(response);
      /* if (!response.ok) {
        throw new Error("something went wrong!");
      } */

      //const { items } = await response.json();
      //console.log(response);
      //const results = response.jsonBody.businesses;
      //console.log(results);
      /* const restaurantData = response.map((restaurant, index) => ({
        key: index,
        name: restaurant.name,
        categories: restaurant.categories.title,
        url: restaurant.url,
        rating: restaurant.rating,
        price: restaurant.price,
        location: restaurant.location.display_address,
        phone: restaurant.display_phone,
        image_url: restaurant.image_url,
      })); */

      console.log(restaurantData);
      setSearchedRestaurants(restaurantData);
      setTermInput("");
      setLocationInput("");
    } catch (err) {
      console.error(err);
    }
  };

  /* //SAVE RESTAURANT DATA IN GLOBAL STATE use this funciton instead of click handler in 22.1.6
  const saveRestaurantData = (restaurantData) => {
    dispatch({
      type: UPDATE_SEARCHED_RESTAURANTS,
      currentRestaurants: [restaurantData], //just id in UPDATE_CURRENT_CATEGORY action in 22.1.6
    });
  };
  saveRestaurantData(restaurantData);
  //END GLOBAL STATE UPDATE

  //restaurantData will be undefined on load, but useEffect will run when state changes in this component
  useEffect(() => {
    // if restaurantData exists or has changed from the response of useQuery, then run dispatch()
    if (restaurantData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_SEARCHED_RESTAURANTS,
        restaurants: restaurantData.restaurants,
      });
    }
  }, [restaurantData, dispatch]);
 */
  //updated to use save book mutation instead of api savebook function
  // create function to handle saving a book to our database
  /*  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      //const response = await saveBook(bookToSave, token);
      await saveBook({
        variables: {
          authors: bookToSave.authors,
          description: bookToSave.description,
          title: bookToSave.title,
          bookId: bookToSave.bookId,
          image: bookToSave.image,
        },
      });
      //if (!response.ok) {
      //throw new Error("something went wrong!");
      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  }; */

  return (
    <>
      {/* <Jumbotron fluid className="text-light bg-dark">
        <Container> */}
      <div>
        <h1 style={{ color: "white" }}>Search for a restaurant to begin</h1>
        <Form onSubmit={handleFormSubmit}>
          <Form.Row>
            <Col xs={12} md={8}>
              <Form.Control
                name="termInput"
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                type="text"
                size="lg"
                placeholder="Restaurant name or keyword"
              />
              <Form.Control
                name="locationInput"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                type="text"
                size="lg"
                placeholder="Location"
              />
            </Col>
            <Col xs={12} md={4}>
              {/* <Link to="/restaurants"> */}
              <Button type="submit" variant="success" size="lg">
                Search
              </Button>
              {/* </Link> */}
            </Col>
          </Form.Row>
        </Form>
        {/*   <Container>
          <h2>
            {searchedRestaurants.length
              ? `Viewing ${searchedRestaurants.length} results:`
              : "Search for a book to begin"}
          </h2>
          <CardColumns>
            {searchedRestaurants.map((restaurant) => {
              return (
                <Card key={restaurant.name} border="dark">
                  {restaurant.image ? (
                    <Card.Img
                      src={restaurant.name}
                      alt={`The cover for ${restaurant.name}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{restaurant.name}</Card.Title>
                    <p className="small">Authors:</p>
                    <Card.Text>{restaurant.name}</Card.Text>
                    {/* {Auth.loggedIn() && (
                      
                    )} *
                  </Card.Body>
                </Card>
              );
            })}
          </CardColumns>
        </Container> */}

        {/*      </Container>
      </Jumbotron> */}
      </div>
      <Container id="restaurantCards">
        <Row>
          <Col style={{ alignItems: "center" }}>
            {searchedRestaurants.map((restaurant) => {
              return (
                <Card key={restaurant.id} style={{ width: "35rem" }}>
                  <Card.Img
                    variant="left"
                    width={"250"}
                    height={"250"}
                    src={restaurant.image_url}
                  />
                  <Card.Body>
                    <Card.Title>{restaurant.name}</Card.Title>
                    <Card.Text>
                      Rating: {restaurant.rating} <br />
                      Price: {restaurant.price} <br />
                      {restaurant.location.address1}, {restaurant.location.city}{" "}
                      <br />
                      {restaurant.phone} <br />
                      <a href={restaurant.url}>Website</a>
                    </Card.Text>
                    <Button variant="primary">Add to event</Button>
                  </Card.Body>
                </Card>
                /* const restaurantData = response.map((restaurant, index) => ({
                  key: index,
                  name: restaurant.name,
                  categories: restaurant.categories.title,
                  url: restaurant.url,
                  rating: restaurant.rating,
                  price: restaurant.price,
                  location: restaurant.location.display_address,
                  phone: restaurant.display_phone,
                  image_url: restaurant.image_url?.thumbnail || "",
                })); */
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SearchRestaurants;
