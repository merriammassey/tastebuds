import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      username
      email
      events {
        _id
        createdAt
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
      createdAt
      restaurants {
        _id
        name
        rating
        url
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
