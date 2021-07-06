import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent($title: String!, $note: String) {
    addEvent(title: $title, note: $note) {
      user
      event
    }
  }
`;

export const SAVE_RESTAURANT = gql`
  mutation saveRestaurant(
    $id: String!
    $name: String!
    $rating: String
    $price: String
    $location: String
    $city: String
    $phone: String
    $image_url: String
    $url: String
  ) {
    saveRestaurant(
      id: $id
      name: $name
      rating: $rating
      price: $price
      location: $location
      city: $city
      phone: $phone
      image_url: $image_url
      url: $url
    ) {
      event
      savedRestaurants {
        id
        name
        rating
        price
        location
        city
        phone
        image_url
        url
      }
    }
  }
`;

/* export const SAVE_EVENT = gql`
  mutation saveEvent(
    $id: String!
    $name: String!
    $restaurants: [Restaurant]
    $notes: String
  ) {
    saveEvent(
      id: $id
      name: $name
      restaurants: $[Restaurants]
      notes: $notes
    ) {
      user
      event
      savedRestaurants {
        id
        name
        rating
        price
        location
        city
        phone
        image_url
        url
      }
    }
  }
`; */
