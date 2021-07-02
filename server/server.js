const express = require("express");
const path = require("path");
const db = require("./config/connections");
const { typeDefs, resolvers } = require("./schemas");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  //make every request perform an auth check; pass updated req object to resolvers as context
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }
  

  
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
  

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      //log where we can go to test our GQL API // to see built in apollo test npm run watch
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
  
  module.exports=db;
  
