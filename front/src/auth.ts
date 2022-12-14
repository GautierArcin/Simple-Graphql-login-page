import { AUTH } from "./constants";

type decodedToken = {
  email: string;
  iat: number;
  exp: number;
};

export const isAuthenticated = () => {
  // Check whether the current time is past the
  // access token's expiry time
  const accessToken = localStorage.getItem(AUTH.token);
  if (!accessToken) {
    return false;
  }
  const token: decodedToken = JSON.parse(atob(accessToken.split(".")[1]));

  const epochTS = Math.round(new Date().getTime() / 1000);
  console.log(epochTS < token.exp);

  return epochTS < token.exp;
};
