// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Query {
    me: User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    events: [Event]
  }
  type Event {
    title: String
    note: String
    restaurants: [Restaurant]
  }

  type Restaurant {
    id: String
    name: String!
    rating: String
    price: String
    location: String
    city: String
    phone: String
    image_url: String
    url: String
    votes: Int
  }

  input RestaurantInput {
    id: String
    name: String!
    rating: String
    price: String
    location: String
    city: String
    phone: String
    image_url: String
    url: String
    votes: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addEvent(title: String!, note: String, restaurants: [RestaurantInput]): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
