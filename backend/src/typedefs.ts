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

  input DeleteProductArguments {
    productId: ID!
  }

  input ItemArguments {
    quantity: Int!
    product: ID!
    price: Float!
    ounces: Int!
  }

  input DeleteItemArguments {
    itemId: ID!
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

  input DeleteOrderArguments {
    orderId: ID!
  }

  input UserArguments {
    name: String!
    email: String!
    phone: String!
    password: String!
    orders: [ID!]
    cart: [ID!]
  }

  input updateCartArguments {
    userId: ID!
    itemId: ID!
  }

  input DeleteUserArguments {
    userId: ID!
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
    cart: [Item!]
  }

  type AuthenticationError {
    field: String!
    message: String!
  }

  type UserResponse {
    errors: [AuthenticationError!]
    user: User
  }

  type Query {
    products: [Product!]!
    items: [Item!]!
    orders: [Order!]!
    users: [User!]!
    me: User
    getCurrCart: [Item!]
  }

  type Mutation {
    createProduct(args: ProductArguments): Product!
    updateProduct(args: UpdateProductArguments): Boolean!
    deleteProduct(args: DeleteProductArguments): Boolean!
    deleteAllProducts: Boolean!
    createItem(args: ItemArguments): Item!
    deleteItem(args: DeleteItemArguments): Boolean!
    deleteAllItems: Boolean!
    createOrder(args: OrderArguments): Order!
    updateOrder(args: UpdateOrderArguments): Boolean!
    deleteOrder(args: DeleteOrderArguments): Boolean!
    deleteAllOrders: Boolean!
    createUser(args: UserArguments): UserResponse!
    login(email: String!, password: String!): UserResponse!
    logout: Boolean!
    updateCart(args: updateCartArguments): Boolean!
    deleteAllUsers: Boolean!
    deleteUser(args: DeleteUserArguments): Boolean!
  }
`;
