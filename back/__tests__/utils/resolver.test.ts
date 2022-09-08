import { loginResolver, signupResolver } from "../../src/utils/resolver";

import {
  afterEachHelperJest,
  beforeEachHelperJest,
  getError,
  NoErrorThrownError,
} from "./../helperFunction";

import { getUser, setUser } from "../../src/database/database";

beforeEach(() => {
  beforeEachHelperJest();
});

afterEach(() => {
  afterEachHelperJest();
});

const user = { email: "peopleVox@gmail.com", password: "fdsfdsfds" };
const token =
  "eyJhbGciOiJIUzI1NiJ9.cGVvcGxlVm94QGdtYWlsLmNvbQ.fvPmiWvjTI6a6xpwX0NOFvN9b2jGJBLypxKqJ3KGb-o";
describe("Testing resolver buisness logic", () => {
  describe("Testing signup", () => {
    it("We should not be able to signup if email is invalid", async () => {
      const error = await getError(async () =>
        signupResolver("fdsfds", user.password)
      );
      // check that the returned error wasn't that no error was thrown
      expect(error).not.toBeInstanceOf(NoErrorThrownError);
      expect(error).toHaveProperty("message", "Invalid mail");
    });

    it("We should be able to signup otherwhise", async () => {
      const error = await getError(async () =>
        signupResolver(user.email, user.password)
      );
      // check that the returned error wasn't that no error was thrown
      expect(error).toBeInstanceOf(NoErrorThrownError);
      expect(getUser(user.email)).toBeDefined();
    });

    it("We should be able to signup twice", async () => {
      const error = await getError(async () =>
        signupResolver(user.email, user.password)
      );
      // check that the returned error wasn't that no error was thrown
      expect(error).toBeInstanceOf(NoErrorThrownError);

      const error2 = await getError(async () =>
        signupResolver(user.email, user.password)
      );
      // check that the returned error wasn't that no error was thrown
      expect(error2).not.toBeInstanceOf(NoErrorThrownError);
      expect(error2).toHaveProperty("message", "User already registred");
    });
  });

  describe("Testing login", () => {
    it("If we don't add user, it should send that user is undefined", async () => {
      const error = await getError(async () =>
        loginResolver(user.email, user.password)
      );
      // check that the returned error wasn't that no error was thrown
      expect(error).not.toBeInstanceOf(NoErrorThrownError);
      expect(error).toHaveProperty("message", "User undefined");
    });
    it("We should not be able to login with wrong password", async () => {
      setUser(user.email, user.password);

      const error = await getError(async () =>
        loginResolver(user.email, "vdsfdssdq")
      );
      // check that the returned error wasn't that no error was thrown
      expect(error).not.toBeInstanceOf(NoErrorThrownError);
      expect(error).toHaveProperty("message", "Invalid password");
    });
    it("We should be able to login", async () => {
      setUser(user.email, user.password);

      const error = await getError(async () =>
        loginResolver(user.email, user.password)
      );
      // check that the returned error wasn't that no error was thrown
      expect(error).toBeInstanceOf(NoErrorThrownError);

      const token = loginResolver(user.email, user.password);
      expect(token).toMatch(token);
    });
  });
});
