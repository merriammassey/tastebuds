import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { getMe, deleteRestaurant } from '../utils/API';
import Auth from '../utils/auth';
import { removeRestaurantId } from '../utils/localStorage';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { REMOVE_RESTAURANT } from '../utils/mutations';


const SavedRestaurants = () => {

  const { loading, data} = useQuery(GET_ME);
  const [removeRestaurant, {error}] = useMutation(REMOVE_Restaurant);

  const userData = data?.me || [];

  // create function that accepts the Restaurant's mongo _id value as param and deletes the Restaurant from the database
  const handleDeleteRestaurant = async (RestaurantId) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // const response = await deleteRestaurant(RestaurantId, token);
      const {data} = await removeRestaurant({
        variables: { RestaurantId }
      });

      // upon success, remove Restaurant's id from localStorage
      removeRestaurantId(RestaurantId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved Restaurants!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedRestaurants.length
            ? `Viewing ${userData.savedRestaurants.length} saved ${userData.savedRestaurants.length === 1 ? 'Restaurant' : 'Restaurants'}:`
            : 'You have no saved restaurants!'}
        </h2>
        <CardColumns>
        {userData.savedRestaurants?.map((restaurant) => {
            return (
              <Card key={restaurant.restaurantId} border='dark'>
                {restaurant.image ? <Card.Img src={restaurant.image} alt={`The cover for ${restaurant.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{restaurant.title}</Card.Title>
                  <p className='small'>Authors: {restaurant.authors}</p>
                  <Card.Text>{restaurant.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteRestaurant(restaurant.restaurantId)}>
                    Delete this Restaurant!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedRestaurants;