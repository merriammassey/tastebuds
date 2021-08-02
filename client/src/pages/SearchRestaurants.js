//import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import spinner from "../assets/spinner.gif";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Card,
  CardColumns,
  Spinner,
} from "react-bootstrap";
import { searchYelp } from "../utils/yelpAPI";
import "./style.css";
import Footer from "../components/Footer";

const SearchRestaurants = () => {
  //const [restaurantData, setRestaurantData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useStoreContext();

  // create state for holding returned yelp data
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  // create state for holding our search field data
  const [termInput, setTermInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  /* // create state to hold saved restaurant data
  const [savedRestaurantIds, setSavedRestaurantIds] = useState(
    getSavedRestaurantIds()
  ); */

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    // if (loading) return <img src={spinner} alt="loading" />;

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
        /*         key: restaurant.id,
         */ id: restaurant.id,
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

  //save selected restaurants to global state
  const tempArr = [];

  const addRestaurant = (event) => {
    const index = event.target.getAttribute("value");
    //console.log(event.target.getAttribute("value"));

    tempArr.push(searchedRestaurants[index]);
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
  //let googlemaps = `https://www.google.com/maps/search/?api=1&amp;query=${restaurant.name}`;

  return (
    <>
      {/* <Jumbotron fluid className="text-light bg-dark">
        <Container> */}
      <div id="searchform">
        <div id="searchformelements">
          <h1 style={{ color: "white" }}>Search for a restaurant to begin</h1>
        </div>
        <Form onSubmit={handleFormSubmit}>
          <Form.Row>
            <Col xs={12} md={8}>
              <div id="searchformelements">
                <Form.Control
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
              {/* <Link to="/restaurants"> */}
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
              {/* </Link> */}
            </Col>
          </Form.Row>
        </Form>
      </div>
      <Container id="restaurantCards">
        {loading ? <Spinner animation="border" variant="success" /> : null}

        <Row>
          <Col style={{ alignItems: "center" }}>
            {searchedRestaurants.map((restaurant, index) => {
              /* let google =
                "https: */ //www.google.com/maps/search/?api=1&amp;query="+{restaurant.name};
              return (
                <Card
                  // key={restaurant.id}
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
                      Price: {restaurant.price} <br />
                      {restaurant.location}, {restaurant.city}
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
                    {/*   <div
                      onClick={(event) => addRestaurant(event)}
                      value={index}
                      name={restaurant}
                    >
                      click to add to event
                    </div> */}
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
