import { gql } from "apollo-server-express";

export const schema = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  input ProductArguments{
    name: String!
    fanFav: Boolean
    chefFav: Boolean
    price: Float!
    ounces: Int!
    description: String!
  }

  type Cat {
    id: ID!
    name: String!
  }

  type Dog {
    id: ID!
    name: String!
  }

  type Product {
    id: ID!
    name: String!
    fanFav: Boolean
    chefFav: Boolean
    price: Float!
    ounces: Int!
    description: String!
  }

  type Query {
    cats: [Cat!]!
    dogs: [Dog!]!
    products: [Product!]!
  }

  type Mutation {
    createCat(name: String!): Cat!
    createDog(name: String!): Dog!
    createProduct(args: ProductArguments): Product!
    deleteAllProducts: Boolean!
  }
`;

