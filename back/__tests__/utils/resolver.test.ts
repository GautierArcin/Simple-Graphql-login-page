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

const USER = { email: "peopleVox@gmail.com", password: "fdsfdsfds" };
// const token =
//   "eyJhbGciOiJIUzI1NiJ9.cGVvcGxlVm94QGdtYWlsLmNvbQ.fvPmiWvjTI6a6xpwX0NOFvN9b2jGJBLypxKqJ3KGb-o";
describe("Testing resolver buisness logic", () => {
  describe("Testing signup", () => {
    it("We should not be able to signup if email is invalid", async () => {
      const error = await getError(async () =>
        signupResolver("InvalidEmail", USER.password)
      );
      // check that the returned error wasn't that no error was thrown
      expect(error).not.toBeInstanceOf(NoErrorThrownError);
      expect(error).toHaveProperty("message", "Invalid mail");
    });

    it("We should be able to signup otherwhise", async () => {
      const error = await getError(async () =>
        signupResolver(USER.email, USER.password)
      );
      // check that the returned error wasn't that no error was thrown
      expect(error).toBeInstanceOf(NoErrorThrownError);
      expect(getUser(USER.email)).toBeDefined();
    });

    it("We should not be able to signup twice", async () => {
      const error = await getError(async () =>
        signupResolver(USER.email, USER.password)
      );
      // check that the returned error wasn't that no error was thrown
      expect(error).toBeInstanceOf(NoErrorThrownError);

      const error2 = await getError(async () =>
        signupResolver(USER.email, USER.password)
      );
      // check that the returned error wasn't that no error was thrown
      expect(error2).not.toBeInstanceOf(NoErrorThrownError);
      expect(error2).toHaveProperty("message", "User already registred");
    });
  });

  describe("Testing login", () => {
    it("If we don't add USER, it should send that USER is undefined", async () => {
      const error = await getError(async () =>
        loginResolver(USER.email, USER.password)
      );
      // check that the returned error wasn't that no error was thrown
      expect(error).not.toBeInstanceOf(NoErrorThrownError);
      expect(error).toHaveProperty("message", "User undefined");
    });
    it("We should not be able to login with wrong password", async () => {
      setUser(USER.email, USER.password);

      const error = await getError(async () =>
        loginResolver(USER.email, "notExistingPassword")
      );
      // check that the returned error wasn't that no error was thrown
      expect(error).not.toBeInstanceOf(NoErrorThrownError);
      expect(error).toHaveProperty("message", "Invalid password");
    });
  });
});
