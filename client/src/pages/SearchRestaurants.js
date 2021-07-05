//import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";

import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import { searchYelp } from "../utils/yelpAPI";

import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import "./style.css";
import Footer from "../components/Footer";

const SearchRestaurants = () => {
  const [state, dispatch] = useStoreContext();
  const { restaurants } = state;
  //const { data: restaurantData } = useQuery(QUERY_RESTAURANTS);

  // create state for holding returned yelp data
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  // create state for holding our search field data
  const [termInput, setTermInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [eventRestaurants, setEventRestaurants] = useState([]);

  /* // create state to hold saved restaurant data
  const [savedRestaurantIds, setSavedRestaurantIds] = useState(
    getSavedRestaurantIds()
  ); */

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
      console.log(restaurantData);

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
      setSearchedRestaurants(mappedRestaurantData);
      setTermInput("");
      setLocationInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const tempArr = [];

  const addRestaurant = (event) => {
    const index = event.target.getAttribute("value");
    console.log(event.target.getAttribute("value"));

    tempArr.push(searchedRestaurants[index]);
    console.log(tempArr);
    //global state
    const saveRestaurantData = (restaurantData) => {
      dispatch({
        type: "UPDATE_SEARCHED_RESTAURANTS",
        currentRestaurants: restaurantData, //just id in UPDATE_CURRENT_CATEGORY action in 22.1.6
      });
    };
    saveRestaurantData(tempArr);
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
            {searchedRestaurants.map((restaurant, index) => {
              return (
                <Card
                  key={restaurant.id}
                  index={index}
                  style={{ width: "35rem" }}
                >
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
                    <div
                      onClick={(event) => addRestaurant(event)}
                      value={index}
                      name={restaurant}
                    >
                      click to add to event
                    </div>
                    {/*                     <Button variant="primary">Add to event</Button>
                     */}{" "}
                  </Card.Body>
                  <br />
                  <br />
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
