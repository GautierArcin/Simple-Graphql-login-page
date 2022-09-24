describe("Login", () => {
  describe("Form checking", () => {
    it("We should have an helper label on email if the email is invalid", () => {
      cy.wait(500) // Wait for githyb actions
      cy.visit("localhost:3000/login");

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
      cy.visit("localhost:3000/login");

      // Default values should give an error on password
      cy.get("input[name=password]").type("{enter}");
      cy.get("p[id=password-helper-text]").should(
        "have.text",
        "Password should contain at least 8 characters"
      );
    });
  });
  describe("Login", () => {
    it("We should not be able to log an unexistant account", () => {
      cy.visit("localhost:3000/login");

      // Default values should give an error on password
      cy.get("input[name=email]")
        .type("{selectAll}")
        .type("peopleVox1234@example.com")
        .type("{enter}");

      cy.get("input[name=password]")
        .type("{selectAll}")
        .type("password")
        .type("{enter}");

      cy.get("p[id=error-apollo]").should("have.text", "User undefined");
    });

    it("We should not be able to log with the wrong password", () => {
      cy.visit("localhost:3000/login");

      // Default values should give an error on password
      cy.get("input[name=email]")
        .type("{selectAll}")
        .type("E2Etesting@example.com")
        .type("{enter}");

      cy.get("input[name=password]")
        .type("{selectAll}")
        .type("wrongpassword")
        .type("{enter}");

      cy.get("p[id=error-apollo]").should("have.text", "Invalid password");
    });

    it("We should be able to log with the right password and than log-out", () => {
      cy.visit("localhost:3000/login");

      // Default values should give an error on password
      cy.get("input[name=email]")
        .type("{selectAll}")
        .type("E2Etesting@example.com")
        .type("{enter}");

      cy.get("input[name=password]")
        .type("{selectAll}")
        .type("test123456")
        .type("{enter}");

      // We're logged in
      cy.get("h2[id=welcome-text]")
        .should("have.text", "Bienvenue E2Etesting@example.com ! ")
        .should(() => {
          expect(localStorage.getItem("access_token")).not.to.be.null;
        });

      // cy.wait(1000);

      // cy.assert.isNotNull(localStorage.getItem("access_token"), "Local");

      cy.get("button[id=log-out]").click();
      cy.location("pathname")
        .should("include", "/login")
        .should(() => {
          expect(localStorage.getItem("access_token")).to.be.null;
        });
    });
  });
});
