import { validateEmail } from "../../src/utils/utils";

describe("Testing validation of mail", () => {
  it("E-mail should not match regex", () => {
    expect(validateEmail("")).toBeFalsy();
    expect(validateEmail("peoplevoxgmail.com")).toBeFalsy();
    expect(validateEmail("peoplevox@gmailcom")).toBeFalsy();
  });
  it("E-mail should match regex", () => {
    expect(validateEmail("peoplevox@gmail.com")).toBeTruthy();
  });
});
