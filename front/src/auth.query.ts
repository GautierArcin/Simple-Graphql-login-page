import { gql } from "@apollo/client";

export const WHOAMI = gql`
  query whoAmI {
    whoAmI
  }
`;
