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
