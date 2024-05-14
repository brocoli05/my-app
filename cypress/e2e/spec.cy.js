describe("empty spec", () => {
  it("passes", () => {
    cy.visit("https://my-app-omega-roan-51.vercel.app/");
  });
});

describe("login / logout flow specification", () => {
  it("Test 1 Protected Route /search", () => {
    cy.visit("https://my-app-omega-roan-51.vercel.app/search")
      .url()
      .should("include", "https://my-app-omega-roan-51.vercel.app/login");
  });

  it("Test 2 Rejecting Invalid Users", () => {
    cy.visit("https://my-app-omega-roan-51.vercel.app/login")
      .get('input[id="userName"]')
      .type("!!!")
      .type("{enter}")
      .url()
      .should("include", "https://my-app-omega-roan-51.vercel.app/login");
  });

  it("Test 3 Granting Access to Valid Users", () => {
    cy.visit("https://my-app-omega-roan-51.vercel.app/login")
      .get('input[id="userName"]')
      .type("abc")
      .get("#password")
      .type("abc")
      .type("{enter}")
      .url()
      .should("include", "https://my-app-omega-roan-51.vercel.app/favourites");
  });
});
