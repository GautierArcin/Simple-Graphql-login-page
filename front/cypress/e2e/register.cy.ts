describe("Register", () => {
  describe("Form checking", () => {
    it("We should have an helper label on email if the email is invalid", () => {
      cy.wait(500) // Wait for github actions   
      cy.visit("localhost:3000/signup");

      // Default values should give an error on password
      cy.get("input[name=email]")
        .type("{selectAll}")
        .type("testEmailWithoutAt.com")
        .type("{enter}");
      cy.get("p[id=email-helper-text]").should(
        "have.text",
        "Enter a valid email"
      );
    });
    it("We should have an helper label on password if the password is invalid", () => {
      cy.visit("localhost:3000/signup");

      // Default values should give an error on password
      cy.get("input[name=password]").type("{enter}");
      cy.get("p[id=password-helper-text]").should(
        "have.text",
        "Password should contain at least 8 characters"
      );
    });
  });
  describe("Signup", () => {
    it("We should be able to sign up a new account", () => {
      cy.visit("localhost:3000/signup");

      // Default values should give an error on password
      cy.get("input[name=email]")
        .type("{selectAll}")
        .type("peopleVox1234@example.com")
        .type("{enter}");

      cy.get("input[name=password]")
        .type("{selectAll}")
        .type("password")
        .type("{enter}");

      cy.location("pathname").should("include", "/");
    });

    it("We should not be able to sign up the same account twice", () => {
      cy.visit("localhost:3000/signup");

      // Default values should give an error on password
      cy.get("input[name=email]")
        .type("{selectAll}")
        .type("peopleVox1234@example.com")
        .type("{enter}");

      cy.get("input[name=password]")
        .type("{selectAll}")
        .type("password")
        .type("{enter}");

      cy.location("pathname").should("include", "/signup");

      cy.get("p[id=error-apollo]").should(
        "have.text",
        "User already registred"
      );
    });
  });
});
