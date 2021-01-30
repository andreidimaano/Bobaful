import { gql } from "apollo-server-express";

export const schema = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  input ProductArguments {
    name: String!
    fanFav: Boolean
    chefFav: Boolean
    description: String!
  }

  input UpdateProductArguments {
    name: String
    id: ID
    fanFav: Boolean
    chefFav: Boolean
    description: String
  }

  input ItemArguments {
    quantity: Int!
    product: ID!
    price: Float!
    ounces: Int!
  }

  input OrderArguments {
    items: [ID!]!
    totalPrice: Float!
    user: ID!
  }

  input UpdateOrderArguments {
    orderId: ID
    userId: String
    items: [ItemArguments]
    quantity: Int
    itemId: ID
  }

  input UserArguments {
    name: String!
    email: String!
    phone: String!
    password: String!
    orders: [ID!]
  }

  type Product {
    id: ID!
    name: String!
    fanFav: Boolean
    chefFav: Boolean
    description: String!
  }

  type Item {
    id: ID!
    quantity: Int!
    product: Product!
    price: Float!
    ounces: Int!
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
    orders: [Order!]!
  }

  type Query {
    products: [Product!]!
    items: [Item!]!
    orders: [Order!]!
    users: [User!]!
  }

  type Mutation {
    createProduct(args: ProductArguments): Product!
    updateProduct(args: UpdateProductArguments): Boolean!
    deleteAllProducts: Boolean!
    createItem(args: ItemArguments): Item!
    deleteAllItems: Boolean!
    createOrder(args: OrderArguments): Order!
    updateOrder(args: UpdateOrderArguments): Boolean!
    deleteAllOrders: Boolean!
    createUser(args: UserArguments): User!
    login(email: String!, password: String!): User!
    deleteAllUsers: Boolean!
  }
`;
