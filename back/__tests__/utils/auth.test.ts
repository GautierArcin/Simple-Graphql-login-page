import { TokenExpiredError } from "jsonwebtoken";
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

  const JWTTokenExpired =
    "Bearer " +
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMUBnbWFpbC5jb20iLCJpYXQiOjE2NjI2NjMxOTMsImV4cCI6MTY2MjY2NDk5M30.ox3t5KbdbnUH9Vu0jpnMcke3gigUh8_MwAtQnF_4bSQ";
  it("As long as secret key wasn't modified, we should be able to check for expired token", async () => {
    const error = await getError(async () => decodeAuthHeader(JWTTokenExpired));
    expect(error).toBeInstanceOf(TokenExpiredError);
  });

  const JSWTTokenStringOnly =
    "Bearer " +
    "eyJhbGciOiJIUzI1NiJ9.Z2F1dGE4MzJAZ21haWwuY29t.H1H0-RWjAvC9eQRvE2UWipG8YaJunCCdd2rsAc3dstU";
  it("As long as secret key wasn't modified, we should be able to decrypt a JWT key, and it should give an email", async () => {
    const error = await getError(async () =>
      decodeAuthHeader(JSWTTokenStringOnly)
    );
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toHaveProperty(
      "message",
      "JWT token should not be only a string"
    );
  });

  const JWTToken =
    "Bearer " +
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMUBnbWFpbC5jb20iLCJpYXQiOjE2NjI2NjU5MTV9.jWXoSt4KQj0TNgGKtwrYE-VIuDgSumkb_g57OzNsJT4";
  it("As long as secret key wasn't modified, we should be able to decrypt a JWT key, and it should give an email", async () => {
    const error = await getError(async () => decodeAuthHeader(JWTToken));
    expect(error).toBeInstanceOf(NoErrorThrownError);
    // We call it a second time, since we don't have an error
    expect(decodeAuthHeader(JWTToken)).toMatchObject({
      email: "hello1@gmail.com",
    });
  });
});
