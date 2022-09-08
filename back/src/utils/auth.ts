import * as jwt from "jsonwebtoken";

export const APP_SECRET = "PeopleVox";

export interface AuthTokenPayload {
  email: string;
}

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new Error("No token found");
  }

  const email = jwt.verify(token, APP_SECRET) as string;
  return { email };
}
