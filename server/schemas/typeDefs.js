// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Query {
    me: User
    users: [User]
    user: User
    event: Event
    events: [Event]
  }

  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Event {
    _id: ID
    title: String
    createdAt: String
    username: String
    notes: String
  }

  type Restaurant {
    id: String
    name: String
    rating: String
    price: String
    location: String
    city: String
    phone: String
    image_url: String
    url: String
  }

  input RestaurantInput {
    id: String
    name: String
    rating: String
    price: String
    location: String
    city: String
    phone: String
    image_url: String
    url: String
  }

  type Vote {
    _id: ID
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addEvent(title: String, notes: String): User
    removeRestaurant(restaurantId: String!): Event
    addVote(restaurant: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
