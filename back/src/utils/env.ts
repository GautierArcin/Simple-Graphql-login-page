import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });

const getAppSecret = (key: string): string => {
  if (typeof process.env[key] === "undefined") {
    if (process.env.NODE_ENV !== "developpement") {
      throw new Error("Secret key not defined in environnement variable");
    }
    return "PeopleVox";
  }
  return typeof process.env[key];
};

// We should do that, but we shouldn't have the secret key in the git commit history
export const APP_SECRET = getAppSecret("APP_SECRET");
