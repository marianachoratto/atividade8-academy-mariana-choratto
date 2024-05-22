import {
  Given,
  When,
  Then,
  After,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";
import { ContaUsuario } from "../pages/conta";
import { LoginUsuario } from "../pages/loginUsuario";

let login = new LoginUsuario();
let pgConta = new ContaUsuario();
let nome;
let email;
let password;
let novaSenha;

After({ tags: "@deletarUsuario" }, function () {
  cy.deletarUsuario(email, password, idNovoUsuario);
});

After({ tags: "@deletarUsuarioModificado" }, function () {
  cy.deletarUsuario(email, novaSenha, idNovoUsuario);
});

Given("que entrei no perfil do meu usuário já cadastrado", function () {
  cy.cadastrarUsuario().then(function (resposta) {
    idNovoUsuario = resposta.id;
    nome = resposta.nome;
    email = resposta.email;
    password = resposta.password;

    cy.intercept("GET", `api/users/${idNovoUsuario}`).as("getInfoUsuario");
  });
});

Given("estou na página do gerenciamento de contas", function () {
  cy.visit("login");
  login.escreverEmail(email);
  login.escreverSenha(password);
  login.apertarLogin();
  cy.wait("@getInfoUsuario");

  cy.visit("account");
});

Then("o nome cadastrado deve estar correto", function () {
  cy.get(pgConta.inputName).invoke("val").should("equal", nome);
});

Then("o email deve estar correto", function () {
  cy.get(pgConta.inputEmail).invoke("val").should("equal", email);
});

Then("o usuário deve ser do tipo comum", function () {
  cy.get(pgConta.usuarioComum).invoke("text").should("equal", "Comum");
});

When("altero o nome cadastrado", function () {
  cy.get(pgConta.inputName).clear();
  pgConta.typeNome();
});

When("confirmo a operação", function () {
  pgConta.clickSalvar();
});

Then("terei minhas informações atualizadas", function () {
  cy.contains("h3", "Sucesso").should("exist");
  cy.contains("p", "Informações atualizadas!").should("exist");
});

When("clico no botão de alterar senha", function () {
  pgConta.clickAlterarSenha();
});

When("altero a senha cadastrada", function () {
  novaSenha = pgConta.typeSenhas();
});

When("tento alterar o email cadastrado", function () {});

Then("não é possível alterá-lo", function () {
  cy.get(pgConta.inputEmail).should("be.disabled");
});

When("tento alterar minha senha sem clicar no botão", function () {});

Then("não é possível alterá-la", function () {
  cy.get(pgConta.inputSenha).should("be.disabled");
});

When("altero a senha cadastrada para que tenha 13 caracteres", function () {
  cy.get(pgConta.inputSenha).clear();
  cy.get(pgConta.inputSenha).type("1234567890112");
  cy.get(pgConta.inputConfirmarSenha).clear();
  cy.get(pgConta.inputConfirmarSenha).type("1234567890112");
});

Then("a senha não é alterada", function () {
  cy.contains("h3", "Ocorreu um erro");
  cy.contains("p", "Não foi possível atualizar os dados.");
});

When("altero a senha cadastrada para que ela tenha 5 caracteres", function () {
  cy.get(pgConta.inputSenha).clear();
  cy.get(pgConta.inputSenha).type("12345");
  cy.get(pgConta.inputConfirmarSenha).clear();
  cy.get(pgConta.inputConfirmarSenha).type("12345");
});

Then(
  "aparece uma mensagem embaixo dos inputs de senha {string}",
  function (mensagem) {
    cy.contains("span", mensagem).should("exist");

    expect(pgConta.inputError).to.have.length.at.least(2);
  }
);

When("começo a alterar a senha", function () {
  cy.get(pgConta.inputSenha).clear();
  cy.get(pgConta.inputSenha).type("12345");
});

When("clico no botão de cancelar", function () {
  cy.get(pgConta.buttonCacelar).click();
});

Then("a operação é cancelada", function () {
  cy.get(pgConta.inputSenha).should("be.disabled");
});

Given("que sou um usuário do tipo comum", function () {
  cy.get(pgConta.tipoUsuario);
  cy.contains("option", "Comum").should("exist");
});

Then("não deve ser possível alterar o tipo da conta", function () {
  cy.get(pgConta.tipoUsuario).should("be.disabled");
});

When("passo um valor para senha", function () {
  cy.get(pgConta.inputSenha).clear();
  cy.get(pgConta.inputSenha).type("123456");
});

When("passo outro valor para a senha de confirmação", function () {
  cy.get(pgConta.inputConfirmarSenha).clear();
  cy.get(pgConta.inputConfirmarSenha).type("abcdefgh");
});

Then("aparece a mensagem {string}", function (mensagem) {
  cy.contains("span", mensagem).should("exist");
});

When("apago o valor nome", function () {
  cy.get(pgConta.inputName).clear();
});

Then("abaixo do input nome aparece a mensagem {string}", function (mensagem) {
  cy.contains("span", mensagem).should("exist");
});

When("volto à página de perfil", function () {
  cy.get(pgConta.anchorPerfil).click();
});

When("aperto logout", function () {
  cy.get(pgConta.anchorLogout).click();
});

Then("sou direcionado para a página inicial", function () {
  cy.url().should(
    "equal",
    "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/"
  );
});

Then("não há mais o link para o perfil do usuário", function () {
  cy.get(pgConta.anchorPerfil).should("not.exist");
});

When("apago as senhas cadastradas", function () {
  cy.get(pgConta.inputSenha).clear();
  cy.get(pgConta.inputConfirmarSenha).clear();
});

When("entro na página de perfil do usuário", function () {
  cy.intercept("GET", "api/users/review/all", {
    statusCode: 200,
    fixture: "filmes.json",
  }).as("filmesAdicionados");
  cy.get(pgConta.anchorPerfil).click();
  cy.wait("@filmesAdicionados");
});

Then("vejo os filmes que já avaliei", function () {
  cy.contains("Harry Potter").should("exist");
  cy.contains("Anatomia de uma Queda").should("exist");
  cy.contains("Openheimer").should("exist");
});
