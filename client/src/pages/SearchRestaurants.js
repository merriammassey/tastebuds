import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveRestaurant, searchGoogleRestaurants } from '../utils/API';
import { saveRestaurantIds, getSavedRestaurantIds } from '../utils/localStorage';

import { SAVE_RESTAURANT } from '../utils/mutations';
import {useMutation} from '@apollo/react-hooks';

const SearchRestaurants = () => {
  // create state for holding returned google api data
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved RestaurantId values
  const [savedRestaurantIds, setSavedRestaurantIds] = useState(getSavedRestaurantIds());

  const [saveRestaurant, {error}] = useMutation(SAVE_RESTAURANT );


  // set up useEffect hook to save `savedRestaurantIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveRestaurantIds(savedRestaurantIds);
  });

  // create method to search for Restaurants and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleRestaurants(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const RestaurantData = items.map((Restaurant) => ({
        RestaurantId: Restaurant.id,
        authors: Restaurant.volumeInfo.authors || ['No author to display'],
        title: Restaurant.volumeInfo.title,
        description: Restaurant.volumeInfo.description,
        image: Restaurant.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedRestaurants(RestaurantData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a Restaurant to our database
  const handleSaveRestaurant = async (RestaurantId) => {
    // find the Restaurant in `searchedRestaurants` state by the matching id
    const RestaurantToSave = searchedRestaurants.find((Restaurant) => Restaurant.RestaurantId === RestaurantId);

 

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // const response = await saveRestaurant(RestaurantToSave, token);
      const {data} = await saveRestaurant({
        variables: { input: RestaurantToSave }
      });

      // if Restaurant successfully saves to user's account, save Restaurant id to state
      setSavedRestaurantIds([...savedRestaurantIds, RestaurantToSave.RestaurantId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Restaurants!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a Restaurant'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
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
            : 'Search for a Restaurant to begin'}
        </h2>
        <CardColumns>
          {searchedRestaurants.map((Restaurant) => {
            return (
              <Card key={Restaurant.RestaurantId} border='dark'>
                {Restaurant.image ? (
                  <Card.Img src={Restaurant.image} alt={`The cover for ${Restaurant.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{Restaurant.title}</Card.Title>
                  <p className='small'>Authors: {Restaurant.authors}</p>
                  <Card.Text>{Restaurant.description}</Card.Text>
                  {Auth.loggedIn() (true && (
                    <Button
                      disabled={savedRestaurantIds?.some((savedRestaurantId) => savedRestaurantId === Restaurant.RestaurantId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveRestaurant(Restaurant.RestaurantId)}>
                      {savedRestaurantIds?.some((savedRestaurantId) => savedRestaurantId === Restaurant.RestaurantId)
                        ? 'This Restaurant has already been saved!'
                        : 'Save this Restaurant!'}
                    </Button>
                  ))}
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
