import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation SIGNUP($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;
