import * as jwt from "jsonwebtoken";

import { AuthTokenPayload } from "../../types/token";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });

// We should do that, but we shouldn't have the secret key in the git commit history
export const APP_SECRET = process.env.APP_SECRET || " ";

if (typeof process.env.APP_SECRET === "undefined") {
  throw new Error("Secret key not difined in environnement variable");
}

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new Error("No token found");
  }

  const decodedToken = jwt.verify(token, APP_SECRET);

  if (typeof decodedToken === "string") {
    throw new Error("JWT token should not be only a string");
  }

  return decodedToken;
}
