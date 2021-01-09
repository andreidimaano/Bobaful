import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import typeDefs from "./typedefs";
import resolvers from "./resolvers";

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
