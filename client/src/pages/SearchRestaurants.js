//import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
//import { Link } from "react-router-dom";
//global state imports
//import { useStoreContext } from "../utils/GlobalState";
//import { UPDATE_SEARCHED_RESTAURANTS } from "../utils/actions";
//import { QUERY_RESTAURANTS } from "../utils/queries";
import { searchYelp } from "../utils/yelpAPI";

import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import {
  saveRestaurantIds,
  getSavedRestaurantIds,
} from "../utils/localStorage";
import { SAVE_RESTAURANT } from "../utils/mutations";
import "./style.css";
import Footer from "../components/Footer";
const SearchRestaurants = () => {
  //GLOBAL STATE VARIABLES
  /* const [state, dispatch] = useStoreContext;
  const { restaurants } = state;
  const { data: restaurantData } = useQuery(QUERY_RESTAURANTS);  */
  //END GLOBAL STATE VARIABLES

  // create state for holding returned yelp data
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  // create state for holding our search field data
  const [termInput, setTermInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  // create state to hold saved restaurant data
  const [savedRestaurantIds, setSavedRestaurantIds] = useState(
    getSavedRestaurantIds()
  );

  //const [saveRestaurant, { error }] = useMutation(SAVE_RESTAURANT);

  // set up useEffect hook to save `savedRestaurants` data to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveRestaurantIds(savedRestaurantIds);
  });
  //added for restaurant data
  useEffect(() => {
    return () => saveRestaurantData(savedRestaurantData);
  });

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
      const mappedRestaurantData = restaurantData.map((restaurant, index) => ({
        key: restaurant.id,
        id: restaurant.id,
        name: restaurant.name,
        //categories: restaurant.categories.title,
        rating: restaurant.rating,
        price: restaurant.price,
        location: restaurant.location.address1,
        city: restaurant.location.city,
        phone: restaurant.phone,
        image_url: restaurant.image_url,
        url: restaurant.url,
      }));

      console.log(restaurantData);
      setSearchedRestaurants(mappedRestaurantData);
      setTermInput("");
      setLocationInput("");
    } catch (err) {
      console.error(err);
    }
  };

  //SAVE RESTAURANT DATA IN GLOBAL STATE use this funciton instead of click handler in 22.1.6
  /* const saveRestaurantData = (restaurantData) => {
    dispatch({
      type: UPDATE_SEARCHED_RESTAURANTS,
      currentRestaurants: [restaurantData], //just id in UPDATE_CURRENT_CATEGORY action in 22.1.6
    });
  };
  saveRestaurantData(restaurantData); */
  //END GLOBAL STATE UPDATE

  //restaurantData will be undefined on load, but useEffect will run when state changes in this component
  /* useEffect(() => {
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
  const handleSaveRestaurant = async (restaurantId) => {
    const restaurantToSave = searchedRestaurants.find(
      (restaurant) => restaurant.id === id
    );
    // get token
    //MOVE THIS TO ANOTHER PLACE?
    /* const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    } */
    try {
      //const response = await saveBook(bookToSave, token);
      await saveRestaurant({
        variables: {
          id: restaurantToSave.id,
          name: restaurantToSave.name,
          //categories: restaurantToSave.categories.title,
          rating: restaurantToSave.rating,
          price: restaurantToSave.price,
          location: restaurantToSave.location,
          city: restaurantToSave.city,
          phone: restaurantToSave.phone,
          image_url: restaurantToSave.image_url,
          url: restaurantToSave.url,
        },
      });
      //if (!response.ok) {
      //throw new Error("something went wrong!");
      // if book successfully saves to user's account, save book id to state
      setSavedRestaurantIds([...savedRestaurantIds, restaurantToSave.id]);
    } catch (err) {
      console.error(err);
    }
  };

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
                Submit Search
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
                      {restaurant.location}, {restaurant.city} <br />
                      {restaurant.phone} <br />
                      <a href={restaurant.url}>Website</a>
                    </Card.Text>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Add to event" />
                    </Form.Group>
                    {/*                     <Button variant="primary">Add to event</Button>
                     */}{" "}
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default SearchRestaurants;
