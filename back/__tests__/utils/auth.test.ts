import { decodeAuthHeader } from "../../src/utils/auth";
import {
  afterEachHelperJest,
  beforeEachHelperJest,
  getError,
  NoErrorThrownError,
} from "./../helperFunction";

beforeEach(() => {
  beforeEachHelperJest();
});

afterEach(() => {
  afterEachHelperJest();
});

describe("Testing Authentification", () => {
  it("If there is no header or it doesn't contains berear, we should except an error thrown", async () => {
    const error = await getError(async () => decodeAuthHeader(""));
    // check that the returned error wasn't that no error was thrown
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toHaveProperty("message", "No token found");
  });

  it("An unvalid jwst token should send back an undefined email", async () => {
    const error = await getError(async () => decodeAuthHeader("Hello world"));
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toHaveProperty("message", "jwt malformed");
  });

  const JWSTToken =
    "Bearer " +
    "eyJhbGciOiJIUzI1NiJ9.cGVvcGxlVm94QGdtYWlsLmNvbQ.fvPmiWvjTI6a6xpwX0NOFvN9b2jGJBLypxKqJ3KGb-o";
  it("As long as secret key wasn't modified, we should be able to decrypt an JWST key, and it should gives an email", async () => {
    const error = await getError(async () => decodeAuthHeader(JWSTToken));
    expect(error).toBeInstanceOf(NoErrorThrownError);
    // We call it a second time, since we don't have an error
    expect(decodeAuthHeader(JWSTToken)).toMatchObject({
      email: "peopleVox@gmail.com",
    });
  });
});
