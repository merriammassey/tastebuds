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
import { useParams } from "react-router-dom";

const SearchedRestaurants = () => {
  //const [searchedRestaurants] = useState();
  const { searchedRestaurants } = useParams();
  return (
    <div id="homephoto">
      <div id="welcome">
        <Container>
          <h2>
            {searchedRestaurants.length
              ? `Viewing ${searchedRestaurants.length} results:`
              : " "}
          </h2>
          <CardColumns>
            {searchedRestaurants.map((restaurant) => {
              return (
                <Card key={restaurant.id} border="dark">
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
      </div>
    </div>
  );
};

export default SearchedRestaurants;
