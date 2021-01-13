import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { CatResolver } from "./resolvers/CatResolver";
import { DogResolver } from "./resolvers/DogResolver";
import { ProductResolver } from "./resolvers/ProductResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { OrderResolver } from "./resolvers/OrderResolver";
import { ItemResolver } from "./resolvers/ItemResolver";
import { schema } from "./typedefs";

const startServer = async () => {
    const app = express();

    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: [
            CatResolver,
            DogResolver,
            ProductResolver,
            UserResolver,
            OrderResolver,
            ItemResolver,
        ],
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
