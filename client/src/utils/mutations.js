import { gql } from "graphql-tag";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      user {
        _id
        username
        email
        restaurantCount
        savedRestaurant {
          # _id
          categories
          url
          rating
          price
          location
          phone
        }
      }
      token
    }
  }
`;

export const SAVE_RESTAURANT = gql`
  mutation saveRestaurant($input: savedRestaurant!) {
    saveRestaurant(input: $input) {
      _id
      username
      email
      restaurantCount
      savedRestaurants {
        # _id
        categories
        url
        rating
        price
        location
        phone
      }
    }
  }
`;

export const REMOVE_RESTAURANT = gql`
  mutation removeRestaurant($restaurantId: ID!) {
    removeRestaurant(restaurantId: $restaurantId) {
      _id
      username
      email
      restaurantCount
      savedRestaurants {
        # _id
        categories
        url
        rating
        price
        location
        phone
      }
    }
  }
`;
