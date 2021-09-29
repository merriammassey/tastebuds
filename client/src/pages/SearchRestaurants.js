import React, { useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import { searchYelp } from "../utils/yelpAPI";
import "./style.css";
import Footer from "../components/Footer";
//import Typewriter from "typewriter-effect";
//import typing from "../utils/typing";

const SearchRestaurants = () => {
  //const type = type();
  //const [restaurantData, setRestaurantData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useStoreContext();

  // create state for holding returned yelp data
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  // create state for holding our search field data
  const [termInput, setTermInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  /* const typing = () => {
    return (
      <div>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString("coffee").start();
          }}
        />
      </div>
    );
  }; */
  const handleFormSubmit = async (event) => {
    setLoading(true);
    event.stopPropagation();
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
        id: restaurant.id,
        name: restaurant.name,
        rating: restaurant.rating,
        price: restaurant.price,
        location: restaurant.location.address1,
        city: restaurant.location.city,
        phone: restaurant.phone,
        image_url: restaurant.image_url,
        url: restaurant.url,
      }));
      //save all restaurants to state to conditinally render button in footer
      const saveYelpRestaurants = (restaurantData) => {
        dispatch({
          type: "UPDATE_YELP_RESTAURANTS",
          yelpRestaurants: restaurantData,
        });
      };
      saveYelpRestaurants(mappedRestaurantData);
      setSearchedRestaurants(mappedRestaurantData);
      setTermInput("");
      setLocationInput("");
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const tempArr = [];

  const addRestaurant = (event) => {
    //event.preventDefault();
    event.stopPropagation();
    const index = event.target.getAttribute("value");
    if (!tempArr.includes(index)) {
      tempArr.push(searchedRestaurants[index]);
    }
    console.log(tempArr);
    //save selected restaurants to global state
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
      {/*     <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString("coffee").start();
        }}
      /> */}
      {searchedRestaurants.length ? (
        <h3 style={{ color: "white" }}>Select a few venues</h3>
      ) : (
        <div id="searchform">
          <div id="searchformelements">
            <h1 style={{ color: "white" }}>Search for restaurants to begin</h1>
          </div>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <div id="searchformelements">
                  <Form.Control
                    id="keyword"
                    name="termInput"
                    value={termInput}
                    onChange={(e) => setTermInput(e.target.value)}
                    type="text"
                    size="lg"
                    placeholder="Keyword"
                  />
                  <br />

                  <Form.Control
                    name="locationInput"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    type="text"
                    size="lg"
                    placeholder="Location"
                  />
                  <br />
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div id="searchformelements">
                  <Button
                    id="searchbutton"
                    type="submit"
                    variant="success"
                    size="lg"
                  >
                    Search
                  </Button>
                </div>
              </Col>
            </Form.Row>
          </Form>
        </div>
      )}

      <Container id="restaurantCards">
        {loading ? <Spinner animation="border" variant="info" /> : null}

        <Row style={{ marginBottom: "100px" }}>
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
                      <a href={restaurant.url} target="_blank">
                        Read the reviews
                      </a>
                      <br />
                      Price: {restaurant.price ? restaurant.price : " n/a"}{" "}
                      <br />
                      {restaurant.location ? restaurant.location : null} <br />
                      {restaurant.city}
                      <br />
                      <a href="tel:{restaurant.phone}">
                        {restaurant.phone}
                      </a>{" "}
                      <br />
                    </Card.Text>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        onClick={(event) => addRestaurant(event)}
                        value={index}
                        name={restaurant}
                        type="checkbox"
                        label="Add to event"
                      />
                    </Form.Group>
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
