import React from "react";
import { Container, Card, CardColumns } from "react-bootstrap";

const SearchedRestaurants = (searchedRestaurants) => {
  return (
    <div id="homephoto">
      <div id="welcome">
        <Container>
          <h2>
            {/* {state.currentRestaurants.length
              ? `Viewing ${state.currentRestaurants.length} results:`
              : " "}
          </h2>
          <CardColumns>
            {state.currentRestaurants.map((restaurant) => { */}

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
