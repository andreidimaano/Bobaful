import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { ProductResolver } from "./resolvers/ProductResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { OrderResolver } from "./resolvers/OrderResolver";
import { ItemResolver } from "./resolvers/ItemResolver";
import { schema } from "./typedefs";
import { mongoUrl } from "./constants";
import session from "express-session";
import connectMongo from "connect-mongo";

const MongoStore = connectMongo(session);

const startServer = async () => {
  const app = express();
  app.use(
    session({
      name: "qid",
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: false, // change if needed during production
      },
      saveUninitialized: false,
      secret: "qwjfpoqwjfqpowjfqpowijfa", // change in environment variables when in production
      resave: false,
    })
  );

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: [ProductResolver, UserResolver, OrderResolver, ItemResolver],
    context: ({ req, res }) => ({ req, res }),
  });

  server.applyMiddleware({ app });

  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
  }

  app.listen({ port: 4000 }, () => {
    console.log("Server ready at localhost:4000/graphql");
  });
};

startServer();
