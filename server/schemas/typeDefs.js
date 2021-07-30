// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Query {
    me: User
    event(_id: ID!): Event
    restaurant(_id: ID!, restaurantId: String): [Restaurant]
    voted(restaurantId: ID): Voted
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    events: [Event]
  }

  input UserInput {
    _id: ID!
    username: String!
    email: String!
  }

  type Event {
    _id: String
    title: String
    note: String
    restaurants: [Restaurant]
  }

  type Restaurant {
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
    votes: [User]
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

  type Voted {
    restaurant: Restaurant
    votes: [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addEvent(title: String!, note: String, restaurants: [RestaurantInput]): User
    addVotes(_id: ID!, restaurantId: String): Event
    addVoted(restaurantId: ID, votes: UserInput): Voted
  }
`;

// export the typeDefs
module.exports = typeDefs;
