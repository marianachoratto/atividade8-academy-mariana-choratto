import { faker } from "@faker-js/faker";

export class CadastroUsuario {
  inputName = '[name="name"]';
  inputEmail = '[name="email"]';
  inputSenha = '[name="password"]';
  inputConfirmarSenha = '[name="confirmPassword"]';
  buttonCadastrar = '[type="submit"]';

  typeNome() {
    let nome = "faker " + faker.person.firstName();

    cy.get(this.inputName).type(nome);
  }

  typeEmail() {
    let email = faker.internet.email();
    cy.get(this.inputEmail).type(email);
  }

  typeSenha() {
    let senha = faker.internet.password(6);
    cy.get(this.inputSenha).type(senha);
    cy.get(this.inputConfirmarSenha).type(senha);
    return senha;
  }

  apertarCadastrar() {
    cy.get(this.buttonCadastrar).eq(1).click();
  }
}
