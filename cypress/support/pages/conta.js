import { faker } from "@faker-js/faker";

export class ContaUsuario {
  anchorPerfil = '[href="/profile"]';
  anchorLogout = '[href="/logout"]';
  inputName = '[name="name"]';
  inputSenha = '[name="password"]';
  inputConfirmarSenha = '[name="confirmPassword"]';
  inputEmail = '[name="email"]';
  inputError = ".input-error";
  buttonAlterarSenha = ".account-password-button";
  buttonSalvar = ".account-save-button";
  buttonCacelar = ".account-password-button-cancel";
  tipoUsuario = '[name="type"]';
  usuarioComum = '[value="0"]';

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
