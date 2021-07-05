// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs

// queries are how we preform get request and ask for data 
// mutations are how we preform post put and delete 
// type defs define the data 
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
    event: [Event]
  }

  type Event {
    _id: ID
    name: String
    createdAt: String
    username: String
    notes: String
    restaurant: [Restaurant]
  }

  type Restaurant {
    _id: ID
    restaurantId: String
    key: Int
    name: String!
    url: String
    price: Float
    rating: String
    address1: String
    city: String
    phone: String
    image_url: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth

    addRestaurant(
      restaurantId: String
      price: Float
      categories: String
      description: String
      title: String!
      image: String
      url: String
      rating: String
      phone: String
    ): Event

    removeRestaurant(restaurantId: String!): Event

    addVote(restaurant: ID!): User

    addEvent(name: String, note: String): User
  }
`;

// export the typeDefs
module.exports = typeDefs;

// add back to mutation
// addEvent(
//   _id: ID,
//   name: String,
//   createdAt: String,
//   username: String,
//   restaurant: [Restaurant]
// ): User
