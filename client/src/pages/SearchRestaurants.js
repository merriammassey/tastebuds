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

//import Auth from "../utils/auth";
//import { searchRestaurants } from "../utils/API";
//import { saveBookIds, getSavedBookIds } from "../utils/localStorage";
//import mutation and useMutation
//import { SAVE_BOOK } from "../utils/mutations";
//import { useMutation } from "@apollo/client";
//  const user = data?.me || data?.user || {};

const searchRestaurants = () => {
  "use strict";

  const yelp = require("yelp-fusion");

  // Place holder for Yelp Fusion's API Key. Grab them
  // from https://www.yelp.com/developers/v3/manage_app
  const apiKey =
    "LhPwa5pQMDo4DVNiUSePZ5L0Ge_Qof4n3cXJNWdfW1kw0-O6PzbebTK78f-nuEcNACakrZSDWLYYBxi-gAj7Yk7zSazSRnIXn7QOtV0KEkV7ca9F2djgWWzF-gjWYHYx";

  const searchRequest = {
    term: "Four Barrel Coffee",
    location: "san francisco, ca",
  };

  const client = yelp.client(apiKey);

  client
    .search(searchRequest)
    .then((response) => {
      const firstResult = response.jsonBody.businesses[0];
      const prettyJson = JSON.stringify(firstResult, null, 4);
      console.log(prettyJson);
      return prettyJson;
    })
    .catch((e) => {
      console.log(e);
    });
};

const SearchRestaurants = () => {
  // create state for holding returned google api data
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  // create state for holding our search field data
  const [termInput, setTermInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  // create state to hold saved bookId values
  //const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  //const [saveBook, { error }] = useMutation(SAVE_BOOK);

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  //useEffect(() => {
  // return () => saveBookIds(savedBookIds);
  //});

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!termInput || !locationInput) {
      return false;
    }
    try {
      const response = await searchRestaurants(termInput, locationInput);
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const { items } = await response.json();
      const restaurantData = items.map((restaurant) => ({
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
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedRestaurants.length
            ? `Viewing ${searchedRestaurants.length} results:`
            : " "}
        </h2>
        <CardColumns>
          {searchedRestaurants.map((restaurant) => {
            return (
              <Card key={restaurant.name} border="dark">
                {restaurant.image_url ? (
                  <Card.Img
                    src={restaurant.image_url}
                    alt={`A picture of ${restaurant.name}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{restaurant.name}</Card.Title>
                  <p className="small">{restaurant.categories} </p>
                  <Card.Text>{restaurant.rating}</Card.Text>
                  {/*                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some(
                        (savedBookId) => savedBookId === book.bookId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveBook(book.bookId)}
                    >
                      {savedBookIds?.some(
                        (savedBookId) => savedBookId === book.bookId
                      )
                        ? "This book has already been saved!"
                        : "Save this Book!"}
                    </Button>
                  )} */}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchRestaurants;
