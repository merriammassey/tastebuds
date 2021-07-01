import React, { useEffect } from "react";
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
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_SEARCHED_RESTAURANTS } from "../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_RESTAURANTS } from "../utils/queries";

const SearchedRestaurants = (searchedRestaurants) => {
  //const [searchedRestaurants] = useState();
  //const { searchedRestaurants } = useParams();

  //GLOBAL STATE VARIABLES
  /* const [state, dispatch] = useStoreContext;
  const { restaurants } = state;
  const { loading, restaurantData } = useQuery(QUERY_RESTAURANTS); */
  //END GLOBAL STATE VARIABLES

  //restaurantData will be undefined on load, but useEffect will run when state changes in this component
  /*   useEffect(() => {
    // if restaurantData exists or has changed from the response of useQuery, then run dispatch()
    if (restaurantData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_SEARCHED_RESTAURANTS,
        currentRestaurants: restaurantData.currentRestaurants,
      }); 
      //update indexeddb
            restaurantData.restaurants.forEach((restaurant) => {
        idbPromise("restaurants", "put", restaurant);
      });
      //if we lose internet connection, check if useQuery hook's loading return value exists and if not, pull from indexeddb
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_RESTAURANTS,
          restaurants: restaurants,
        });
      });
    }
  }, [restaurantData, loading, dispatch]); 
    }
  }, [restaurantData, dispatch]);*/

  //is this necessary? Don't need to filter restaurants
  /* function filterRestaurants() {
    if (!currentRestaurants) {
      return state.currentRestaurants;
    }

    //return state.products.filter(product => product.category._id === currentCategory);
  } */

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
