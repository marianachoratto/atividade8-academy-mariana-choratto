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

    // cy.log(idNovoUsuario);

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
