import {
  Given,
  When,
  Then,
  After,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";
import { CadastroUsuario } from "../pages/cadastrarUsuario";
import { faker } from "@faker-js/faker";
let cadastro = new CadastroUsuario();
let idNovoUsuario;
let email;
let password;
let emailJaCadastrado;
let nomeCadastrado;
let emailCadastrado;
const apiUrl = "https://raromdb-3c39614e42d4.herokuapp.com/";

After({ tags: "@deletarUsuario" }, function () {
  cy.deletarUsuario(email, password, idNovoUsuario);
});

After({ tags: "@deletarUsuarioJaCriado" }, function () {
  cy.deletarUsuario(emailJaCadastrado, "123456", idNovoUsuario);
});

Given("que acessei a funcionalidade de cadastro", function () {
  cy.visit("register");
  cy.intercept("POST", "/api/users").as("criarUsuario");
});

When("informo um nome válido", function () {
  nomeCadastrado = cadastro.typeNome();
});

When("informo um email válido", function () {
  emailCadastrado = cadastro.typeEmail();
});

When("informo uma senha válida", function () {
  password = cadastro.typeSenha();
  cadastro.apertarCadastrar();
});

Then("meu cadastro é criado com sucesso!", function () {
  cy.wait("@criarUsuario").then(function (resposta) {
    let objeto = resposta.response;
    idNovoUsuario = resposta.response.body.id;
    email = resposta.response.body.email;

    expect(objeto.body.active).to.equal(true);
    expect(objeto.body.type).to.equal(0);
    expect(objeto.body.name).to.equal(nomeCadastrado);
    expect(objeto.body.email).to.equal(emailCadastrado);

    cy.contains("Sucesso").should("be.visible");
    cy.contains("Cadastro realizado!").should("be.visible");
  });
});

Then("meu cadastro é criado com sucesso", function () {
  cy.wait("@criarUsuario").then(function (resposta) {
    let objeto = resposta.response;
    idNovoUsuario = resposta.response.body.id;
    email = resposta.response.body.email;

    expect(objeto.body.active).to.equal(true);
    expect(objeto.body.type).to.equal(0);

    cy.contains("Sucesso").should("be.visible");
    cy.contains("Cadastro realizado!").should("be.visible");
  });
});

When("informo um email que já foi utilizado", function () {
  cy.get(cadastro.inputEmail).type(emailJaCadastrado);
});

Given("que criei um usuário válido", function () {
  emailJaCadastrado = faker.internet.email();

  cy.request({
    method: "POST",
    url: apiUrl + "api/users",
    body: {
      name: "Usuario Mockado",
      email: emailJaCadastrado,
      password: "123456",
    },
  }).then(function (resposta) {
    idNovoUsuario = resposta.body.id;
  });
});

Then("meu cadastro não é criado", function () {
  cy.wait("@criarUsuario").then(function () {
    cy.contains("Falha no cadastro.").should("be.visible");
    cy.contains("E-mail já cadastrado. Utilize outro e-mail").should(
      "be.visible"
    );
  });
});

When("não informo um nome", function () {});

Then("aparece uma mensagem de erro dizendo {string}", function (mensagem) {
  cy.contains("span", mensagem).should("exist");
});

When("não informo um email", function () {});

Then("aparece um aviso dizendo {string}", function (mensagem) {
  cy.contains("span", mensagem).should("exist");
});

When("não informo a senha", function () {
  cadastro.typeSenhaDeConfirmação();
});

When("aparece um aviso abaixo da senha dizendo {string}", function (mensagem1) {
  cadastro.apertarCadastrar();
  cy.contains("span", mensagem1);
});

When(
  "aparece um aviso abaixo da confirmação de senha dizendo {string}",
  function (mensagem2) {
    cy.contains("span", mensagem2);
  }
);

When("informo uma senha correta", function () {
  cadastro.typeSenhaPrincipal();
});

When("não informo a senha de confirmação", function () {});

When("aparece uma mensagem dizendo {string}", function (mensagem) {
  cadastro.apertarCadastrar();
  cy.contains("span", mensagem).should("exist");
});

When("não informo nenhuma senha", function () {
  cadastro.apertarCadastrar();
});

Then("aparecem dois avisos informando a necessidade de senha", function () {
  cy.contains("span", "Informe a senha").should("exist");
  expect(cadastro.inputError).to.have.length.at.least(2);
});

Then("aparece uma mensagem {string}", function (mensagem) {
  cy.contains("span", mensagem).should("exist");
});

When("informo uma senha de 12 caracteres", function () {
  password = cadastro.typeSenha12Caracteres();
  cadastro.apertarCadastrar();
});

When("informo uma senha com mais de 13 caracteres", function () {
  novaSenha = "1234567891011";
  cy.get(cadastro.inputSenha).type(novaSenha);
  cy.get(cadastro.inputConfirmarSenha).type(novaSenha);
  cadastro.apertarCadastrar();
});

Then("o cadastro não é criado", function () {
  cy.wait("@criarUsuario").then(function () {
    cy.contains("Falha no cadastro.").should("be.visible");
    cy.contains("Não foi possível cadastrar o usuário.").should("be.visible");
  });
});

Then("meu usuário cadastrado é do tipo 0", function () {
  cy.wait("@criarUsuario").then(function (resposta) {
    objeto = resposta;
    idNovoUsuario = resposta.response.body.id;
    email = resposta.response.body.email;

    expect(resposta.response.body.active).to.equal(true);
    expect(resposta.response.body.type).to.equal(0);

    cy.contains("Sucesso").should("be.visible");
    cy.contains("Cadastro realizado!").should("be.visible");
  });
});

When("informo uma senha com 5 caracteres", function () {
  const senha5carcteres = "12345";
  cy.get(cadastro.inputSenha).type(senha5carcteres);
  cy.get(cadastro.inputConfirmarSenha).type(senha5carcteres);
  cadastro.apertarCadastrar();
});

Then("aparece um aviso dizendo que {string}", function (mensagem) {
  cy.contains("span", mensagem).should("exist");
});

When("informo qualquer nome {string}", function (nomes) {
  cy.get(cadastro.inputName).type(nomes);
});

When("informo um email inválido {string}", function (emailInvalido) {
  cy.get(cadastro.inputEmail).type(emailInvalido);
});

Then(
  "deverá aparecer uma mensagem dizendo que houve falha no cadastro",
  function () {
    cy.wait("@criarUsuario").then(function () {
      cy.contains("Falha no cadastro.").should("be.visible");
      cy.contains("Não foi possível cadastrar o usuário.").should("be.visible");
    });
  }
);

When("informo um email com letras maiúsculas", function () {
  cadastro.typeEmailMaiusculo();
});
