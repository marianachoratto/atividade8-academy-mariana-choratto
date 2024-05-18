// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("deletarUsuario", (email, password, idNovoUsuario) => {
  const apiUrl = "https://raromdb-3c39614e42d4.herokuapp.com/";

  return cy
    .request({
      method: "POST",
      url: apiUrl + "api/auth/login",
      body: {
        email: email,
        password: password,
      },
    })
    .then(function (resposta) {
      token = resposta.body.accessToken;

      cy.request({
        method: "PATCH",
        url: apiUrl + "api/users/admin",
        auth: {
          bearer: token,
        },
      });
    })
    .then(function (resposta) {
      cy.request({
        method: "DELETE",
        url: apiUrl + `api/users/${idNovoUsuario}`,
        auth: {
          bearer: token,
        },
      });
    });
});
