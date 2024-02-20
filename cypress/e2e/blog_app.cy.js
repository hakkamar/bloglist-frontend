describe("Blog App", function () {
  beforeEach(function () {
    cy.visit("");
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    //cy.request("POST", "http://localhost:3003/api/testing/reset");

    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    //cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
  });

  it("front page can be opened", function () {
    cy.contains("Blogs");
    cy.contains("Blogi appi ( FullStackOpen harjoitus ), Hakkis 2/2024");
  });

  it("login form can be found", function () {
    cy.contains("login");
  });

  it("user can login", function () {
    cy.contains("login");

    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.get("#login-button").click();

    cy.contains("Matti Luukkainen logged in");
  });

  it("login fails with wrong password", function () {
    cy.contains("login");
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "invalid username or password")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    //cy.get("html").should("not.contain", "Matti Luukkainen logged in");
    cy.contains("Matti Luukkainen logged in").should("not.exist");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });

      cy.contains("Matti Luukkainen logged in");
      cy.contains("logout");
      cy.contains("login").should("not.exist");
    });

    it("a new Blog can be created", function () {
      cy.contains("new blog").click();

      cy.get("#title").type("a Blog created by cypress");
      cy.get("#author").type("a Blog created by cypress");
      cy.get("#url").type("a Blog created by cypress");
      cy.get("#create-button").click();

      cy.get(".messu")
        .should("contain", "a Blog created by cypress")
        .and("not.have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "color", "rgb(0, 128, 0)")
        .and("have.css", "border-style", "solid");
    });

    describe("and a Blog exists", function () {
      beforeEach(function () {
        cy.contains("new blog").click();

        cy.createBlog({
          title: "another Blog created by cypress",
          author: "another Blog created by cypress",
          url: "another Blog created by cypress",
        });
        cy.get("html").should("contain", "another Blog created by cypress");
      });

      it("Blog exists, for real...", function () {
        cy.contains(
          "another Blog created by cypress by another Blog created by cypress"
        );
      });

      it("it can be liked", function () {
        cy.contains("view").click();
        cy.contains("likes: 0");
        cy.contains("Like").click();
        cy.get(".messu")
          .should("contain", "another Blog created by cypress")
          .and("not.have.css", "color", "rgb(255, 0, 0)")
          .and("have.css", "color", "rgb(0, 128, 0)")
          .and("have.css", "border-style", "solid");
        cy.contains("likes: 1");
      });

      it("one who has added the Blog can see remove button", function () {
        cy.contains("view").click();
        cy.contains("Remove blog");
      });

      it("one who has added the Blog can remove blog", function () {
        cy.contains("view").click();
        cy.contains("Like");
        cy.contains("Remove blog").click();

        cy.contains("Like").should("not.exist");
      });

      it("many blogs orderd by likes ", function () {
        cy.createBlog({
          title: "Nr. 2 Blog created by cypress",
          author: "Nr. 2 Blog created by cypress",
          url: "Nr. 2 Blog created by cypress",
        });

        cy.contains("view").click();
        cy.contains("view").click();

        cy.get(".blog")
          .eq(0)
          .should("contain", "another Blog created by cypress");

        cy.contains("likes: 0").contains("Like").as("ekaLike");
        cy.get("@ekaLike").click();

        cy.contains("likes: 0").contains("Like").as("tokaLike");
        cy.get("@tokaLike").click();

        cy.get("button").then((buttons) => {
          //console.log("number of buttons", buttons.length);
          //console.log(buttons, (i) => buttons(i));
          cy.wrap(buttons[8]).click();
        });
        cy.get(".blog")
          .eq(0)
          .should("contain", "Nr. 2 Blog created by cypress");
      });
    });
  });
});
