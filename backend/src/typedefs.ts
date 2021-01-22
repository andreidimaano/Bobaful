import { gql } from "apollo-server-express";

export const schema = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  input ProductArguments {
    name: String!
    fanFav: Boolean
    chefFav: Boolean
    price: Float!
    ounces: Int!
    description: String!
  }

  input ItemArguments {
    quantity: Int!
    product: ID!
  }

  input OrderArguments {
    items: [ID!]!
    totalPrice: Float!
    user: ID!
  }

  input UserArguments {
    name: String!
    email: String!
    phone: String!
    password: String!
    orders: [ID!]
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

  type Item {
    id: ID!
    quantity: Int!
    product: Product!
  }

  type Order {
    id: ID!
    items: [Item!]!
    totalPrice: Float!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    phone: String
    password: String!
    orders: [Order!]!
  }

  type Query {
    cats: [Cat!]!
    dogs: [Dog!]!
    products: [Product!]!
    items: [Item!]!
    orders: [Order!]!
    users: [User!]!
  }

  type Mutation {
    createCat(name: String!): Cat!
    createDog(name: String!): Dog!
    createProduct(args: ProductArguments): Product!
    deleteAllProducts: Boolean!
    createItem(args: ItemArguments): Item!
    deleteAllItems: Boolean!
    createOrder(args: OrderArguments): Order!
    deleteAllOrders: Boolean!
    createUser(args: UserArguments): User!
    deleteAllUsers: Boolean!
  }
`;
