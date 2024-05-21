import { faker } from "@faker-js/faker";

export class ContaUsuario {
  anchorPerfil = '[href="/profile"]';
  inputName = '[name="name"]';
  buttonSalvar = ".account-save-button";
  inputSenha = '[name="password"]';
  inputConfirmarSenha = '[name="confirmPassword"]';
  inputEmail = '[name="email"]';
  buttonAlterarSenha = ".account-password-button";
  inputError = ".input-error";
  buttonCacelar = ".account-password-button-cancel";
  tipoUsuario = '[name="type"]';

  typeNome() {
    let nome = "faker " + faker.person.firstName();
    cy.get(this.inputName).type(nome);
  }

  clickSalvar() {
    cy.get(this.buttonSalvar).click();
  }

  typeSenhas() {
    let senha = faker.internet.password(6);
    cy.get(this.inputSenha).clear();
    cy.get(this.inputSenha).type(senha);
    cy.get(this.inputConfirmarSenha).clear();
    cy.get(this.inputConfirmarSenha).type(senha);
    return senha;
  }

  clickAlterarSenha() {
    cy.get(this.buttonAlterarSenha).click();
  }
}
