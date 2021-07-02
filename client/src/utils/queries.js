<<<<<<< HEAD
import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
=======
import { gql } from "@apollo/client";

export const QUERY_RESTAURANTS = gql`
  {
    restaurants {
      id
      name
      categories
      url
      rating
      price
      location
      phone
      image_url
>>>>>>> b6c2a3da8e4822274bf5cbe5bad5415212a4aaac
    }
  }
`;
