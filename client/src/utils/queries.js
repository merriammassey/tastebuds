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
        }
      }
    }
  }
`;
