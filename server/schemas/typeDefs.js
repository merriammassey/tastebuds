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
    event: [event]
  }

  type Event {
    _id: ID 
    name: String
    createdAt: String 
    username: String
    restaurant: []
  }
  type Restaurant {
    _id: ID
    restaurantId: String
    price: Float
    categories: String
    description: String
    title: String!
    image: String
    url: String
    rating: String
    phone" String
  }
  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    
    addUser(username: String!, email: String!, password: String!): Auth
    
    addEvent(
      _id: ID ,
      name: String,
      createdAt: String ,
      username: String,
      restaurant: []
    ): User
    
    addRestaurant(
      restaurantId: String,
      price: Float,
      categorie: String,
      description: String,
      title: String!,
      image: String,
      url: String,
      rating: String,
      phone" String
    ): Event
     
    addVote(resturant: ID!): User 

  }
`;

// export the typeDefs
module.exports = typeDefs;
