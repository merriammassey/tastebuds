//import React, { useState, useEffect } from "react";
import React, { useState } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import { searchYelp } from "../utils/yelpAPI";
import { Link } from "react-router-dom";

//import Auth from "../utils/auth";
//import { searchRestaurants } from "../utils/API";
//import { saveBookIds, getSavedBookIds } from "../utils/localStorage";
//import mutation and useMutation
//import { SAVE_BOOK } from "../utils/mutations";
//import { useMutation } from "@apollo/client";
//  const user = data?.me || data?.user || {};

const SearchRestaurants = () => {
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
      const response = await searchYelp(locationInput, termInput);
      //console.log(response);
      /* if (!response.ok) {
        throw new Error("something went wrong!");
      } */

      //const { items } = await response.json();
      console.log(response);
      const restaurantData = response.map((restaurant, index) => ({
        key: index,
        name: restaurant.name,
        categories: restaurant.categories.title,
        url: restaurant.url,
        rating: restaurant.rating,
        price: restaurant.price,
        location: restaurant.location.display_address,
        phone: restaurant.display_phone,
        image_url: restaurant.image_url?.thumbnail || "",
      }));
      setSearchedRestaurants(restaurantData);
      setTermInput("");
      setLocationInput("");
    } catch (err) {
      console.error(err);
    }
  };
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
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for a restaurant to begin</h1>
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
                <Link to="/restaurants">
                  <Button type="submit" variant="success" size="lg">
                    Submit Search
                  </Button>
                </Link>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>
    </>
  );
};

export default SearchRestaurants;
