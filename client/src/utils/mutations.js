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
  mutation addUser($username: String!, $email: String!, $password: String) {
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
  mutation addEvent(
    $title: String!
    $note: String
    $restaurants: [RestaurantInput]
  ) {
    addEvent(title: $title, note: $note, restaurants: $restaurants) {
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

export const ADD_VOTE = gql`
  mutation addVote($restaurantId: String, $eventId: ID) {
    addVote(restaurantId: $restaurantId, eventId: $eventId) {
      title
      note
      restaurants {
        name
        votes
      }
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($_id: String!) {
    deleteEvent(_id: $_id) {
      username
      _id
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
