import { decodeAuthHeader } from "./utils/auth";
import { Request } from "express";

export interface Context {
  email?: string;
}

export const context = ({ req }: { req: Request }): Context => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;

  return {
    email: token?.email,
  };
};
