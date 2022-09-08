import { gql } from "apollo-server";

export default gql`
  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
    email: String!
    password: String!
  }

  type Query {
    whoAmI: String
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    signup(email: String!, password: String!): AuthPayload!
  }
`;
