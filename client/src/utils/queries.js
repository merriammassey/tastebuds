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
    }
  }
`;
