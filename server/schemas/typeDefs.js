// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
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
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    events(username: String): [Event]
    event(_id: ID!): Event
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addEvent(eventName: String!): User
    addRestaurant(
      EventId: ID!
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
  }
`;

// export the typeDefs
module.exports = typeDefs;
