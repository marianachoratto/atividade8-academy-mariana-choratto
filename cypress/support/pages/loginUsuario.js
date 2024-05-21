import { faker } from "@faker-js/faker";

export class LoginUsuario {
  inputEmail = '[name="email"]';
  inputSenha = '[name="password"]';
  buttonLogin = ".login-button";
  buttonOk = "button";
  divAlerta = ".modal-overlay";

  apertarLogin() {
    cy.get(this.buttonLogin).click();
  }

  escreverEmail(email) {
    cy.get(this.inputEmail).type(email);
  }

  escreverSenha(senha) {
    cy.get(this.inputSenha).type(senha);
  }

  escreverEmailAutomatico() {
    let email = faker.internet.email();
    cy.get(this.inputEmail).type(email);
  }

  escreverSenhaAutomatico() {
    let senha = faker.internet.password(6);
    cy.get(this.inputSenha).type(senha);
  }
}
