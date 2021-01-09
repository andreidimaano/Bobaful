import { gql } from "apollo-server-express";

const schema = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Cat {
    id: ID!
    name: String!
  }

  type Query {
    cats: [Cat!]!
  }

  type Mutation {
    createCat(name: String!): Cat!
  }
`;

export = schema;
