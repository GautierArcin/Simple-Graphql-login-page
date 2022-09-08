import { getUser, setUser } from "../src/database/database";
import { afterEachHelperJest, beforeEachHelperJest } from "./helperFunction";

beforeEach(() => {
  beforeEachHelperJest();
});

afterEach(() => {
  afterEachHelperJest();
});

const userToAdd = { email: "test@peopleVox.com", password: "123456" };
describe("Testing database", () => {
  describe("Testing adding user", () => {
    it("User should not be present before addition", () => {
      expect(getUser(userToAdd.email)).toBeUndefined();
    });
    it("We should be able to add User, and return should be its non-hashed password", () => {
      setUser(userToAdd.email, userToAdd.password);
      expect(getUser(userToAdd.email)).toBeDefined();
    });
    it("User should still be removed after the clear of the database (before/after each)", () => {
      expect(getUser(userToAdd.email)).toBeUndefined();
    });
  });
});
