import { ApolloServer } from "apollo-server-express";
import express from "express";
// import mongoose from "mongoose";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Product } from "./entities/Product";
import { ProductResolver } from "./resolvers/ProductResolver";

const startServer = async () => {
  const connection = await createConnection({
      type: "mongodb",
      url: "mongodb+srv://andreiusername:andreipassword@cluster0-shard-00-02.ex6mj.mongodb.net/test?retryWrites=true&w=majority",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      authSource: 'admin',
      entities: [Product]
  });

  await connection.runMigrations();

  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver],
      validate: false,
    }),
  });

  server.applyMiddleware({ app });

  // try {
  //   await mongoose.connect(
  //     "mongodb+srv://tedusername:tedpassword@bobaful-test-1.0retk.mongodb.net/test?retryWrites=true&w=majority",
  //     {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     }
  //   );
  // } catch (err) {
  //   console.log(err);
  // }

  app.listen({ port: 4000 }, () => {
    console.log("Server ready at localhost:4000/graphql");
  });
};

startServer();
