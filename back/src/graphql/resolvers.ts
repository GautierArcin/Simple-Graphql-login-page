import {
  MutationLoginArgs,
  AuthPayload,
  MutationSignupArgs,
} from "../../types/gql-types";

import { loginResolver, signupResolver } from "../utils/resolver";

const resolvers = {
  Query: {
    whoAmI(_: unknown, __: unknown, context: { email: string }) {
      return context?.email;
    },
  },
  Mutation: {
    login(_: unknown, { email, password }: MutationLoginArgs): AuthPayload {
      const token = loginResolver(email, password);
      return { user: { email, password }, token };
    },
    signup(_: unknown, { email, password }: MutationSignupArgs): AuthPayload {
      const token = signupResolver(email, password);
      return { user: { email, password }, token };
    },
  },
};

export default resolvers;
