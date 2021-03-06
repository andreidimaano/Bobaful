import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { ProductResolver } from "./resolvers/ProductResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { OrderResolver } from "./resolvers/OrderResolver";
import { ItemResolver } from "./resolvers/ItemResolver";
import { schema } from "./typedefs";
import { mongoUrl, cookieName, secret } from "./constants";
import session from "express-session";
import connectMongo from "connect-mongo";
import cors from "cors";

const MongoStore = connectMongo(session);

const startServer = async () => {
  const app = express();
  // Cors
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  // Express session cookies
  app.use(
    session({
      name: cookieName,
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
      secret: secret,
      resave: false,
    })
  );

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: [ProductResolver, UserResolver, OrderResolver, ItemResolver],
    context: ({ req, res }) => ({ req, res }),
  });

  server.applyMiddleware({
    app,
    cors: false,
  });

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
