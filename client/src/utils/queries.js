import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      username
      email
      events {
        title
        note
        restaurants {
          name
          votes
        }
      }
    }
  }
`;

export const GET_EVENT = gql`
  query event($id: ID) {
    event(_id: $id) {
      title
      note
      restaurants {
        _id
        name
        rating
        image_url
        price
        location
        city
        phone
        votes
      }
    }
  }
`;
