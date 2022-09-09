// Note: Il faudrait utiliser les types du cache, mais le
// typing de lru-cache ne semble pas inclus dans la bibliothèque ( ??? )
// Et le stub des types est déprécié
// c.f. https://www.npmjs.com/package/@types/lru-cache

// eslint-disable-next-line @typescript-eslint/no-var-requires
const LRU = require("lru-cache");
// import LRU from "lru-cache";

// Setting up cache
const options = {
  max: 500,
};
const userCache = new LRU(options);

// Setting up function to access database
export const getUser: (arg0: string) => string = (email: string) =>
  userCache.get(email);

export const setUser: (arg0: string, arg1: string) => void = (
  email: string,
  password: string
) => userCache.set(email, password);

// Setting default user for E2E testing purpose
setUser("E2Etesting@example.com", "test123456");

// Function only for testing purpose
export const clearCache = () => {
  // Note: I was stuck there for something like 20 min
  // Because we should use deprecetaed "reset" instead of "clear" :c
  // https://www.npmjs.com/package/lru-cache
  userCache.reset();
};
