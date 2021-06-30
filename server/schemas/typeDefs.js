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
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    saveBook(
      bookId: String
      authors: [String]
      description: String
      title: String!
      image: String
      link: String
    ): User
    addUser(username: String!, email: String!, password: String!): Auth
    removeBook(bookId: String!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
