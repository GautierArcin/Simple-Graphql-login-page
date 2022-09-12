import { setUser, getUser } from "../database/database";
import { validateEmail } from "./utils";

import * as jwt from "jsonwebtoken";
import { APP_SECRET } from "../utils/env";

export const loginResolver = (email: string, password: string): string => {
  // If we get an undefined, email is not registred in LRU
  const localPassword = getUser(email);

  // User is not registred
  if (localPassword === undefined) {
    throw new Error("User undefined");
  }

  // User is registred but password does not correspond
  if (localPassword !== password) {
    throw new Error("Invalid password");
  }

  // Otherwhise, user is good, we get token
  // Usually, we need to use an index, unique to each user
  // Because it's just a very simple exercice, and that we don't
  // accord any consideration to security, we use
  // email instead
  const token = jwt.sign({ email }, APP_SECRET, {
    expiresIn: "30m",
  });
  return token;
};

export const signupResolver = (email: string, password: string): string => {
  // If we get an undefined, email is not registred in LRU
  const localPassword = getUser(email);

  // Checking if email is valid
  if (!validateEmail(email)) {
    throw new Error("Invalid mail");
  }

  // User is already registred
  if (localPassword !== undefined) {
    throw new Error("User already registred");
  }

  // Adding user to LRU
  setUser(email, password);

  const token = jwt.sign({ email }, APP_SECRET, {
    expiresIn: "30m",
  });
  return token;
};
