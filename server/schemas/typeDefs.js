// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Query {
    me: User
    event(_id: ID): Event
    vote(_id: ID): Vote
    restaurant(eventId: ID!, _id: ID): Event
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    events: [Event]
  }
  type Event {
    _id: String
    title: String
    note: String
    restaurants: [Restaurant]
    votes: [Vote]
  }

  type Vote {
    _id: ID
    restaurantId: String
    points: [String]
  }

  input VoteInput {
    restaurantId: String
    points: [String]
  }

  type Restaurant {
    _id: ID!
    id: String
    name: String
    rating: Float
    price: String
    location: String
    city: String
    phone: String
    image_url: String
    url: String
    votes: [String]
  }
  input RestaurantInput {
    _id: ID
    id: String
    name: String!
    rating: Float
    price: String
    location: String
    city: String
    phone: String
    image_url: String
    url: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addEvent(
      title: String!
      note: String
      restaurants: [RestaurantInput]
      votes: [VoteInput]
    ): User
    addVote(restaurantId: String, points: [String]): Vote
  }
`;

// export the typeDefs
module.exports = typeDefs;
