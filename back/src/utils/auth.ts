import * as jwt from "jsonwebtoken";

import { AuthTokenPayload } from "../../types/token";
import { APP_SECRET } from "./env";

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
