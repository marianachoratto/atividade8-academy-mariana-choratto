import {
  Given,
  When,
  Then,
  After,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";
import { CadastroUsuario } from "../pages/cadastrarUsuario";
let cadastro = new CadastroUsuario();
let idNovoUsuario;
let email;
let password;
let token;
const apiUrl = "https://raromdb-3c39614e42d4.herokuapp.com/";

After({ tags: "@deletarUsuario" }, function () {
  cy.deletarUsuario(email, password, idNovoUsuario, token);
});

Given("que acessei a funcionalidade de cadastro", function () {
  cy.visit("register");
  cy.intercept("POST", "/api/users").as("criarUsuario");
});

When("informo um nome válido", function () {
  cadastro.typeNome();
});

When("informo um email válido", function () {
  cadastro.typeEmail();
});

When("informo uma senha válida", function () {
  password = cadastro.typeSenha();
  cy.log(password);
  cadastro.apertarCadastrar();
});

Then("meu cadastro é criado com sucesso", function () {
  cy.wait("@criarUsuario").then(function (resposta) {
    idNovoUsuario = resposta.response.body.id;
    email = resposta.response.body.email;

    cy.log(idNovoUsuario);
    cy.log(email);
    cy.log(password);
  });
  cy.contains("Sucesso").should("be.visible");
  cy.contains("Cadastro realizado!").should("be.visible");
});
