const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.applyMiddleware({ app });

  try {
    await mongoose.connect(
      "mongodb+srv://tedusername:tedpassword@bobaful-test-1.0retk.mongodb.net/test?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (err) {
    console.log(err);
  }

  app.listen({ port: 4000 }, () => {
    console.log("Server ready at localhost:4000/graphql");
  });
};

startServer();
