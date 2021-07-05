import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      event {
        _id
        name
        createdAt
        username
        notes
        restaurant
      }
    }
  }
`;

/* export const QUERY_RESTAURANTS = gql`
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
    }
  }
`;
 */
