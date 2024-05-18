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
let token;
let emailJaCadastrado;
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
  cadastro.typeNome();
});

When("informo um email válido", function () {
  cadastro.typeEmail();
});

When("informo uma senha válida", function () {
  password = cadastro.typeSenha();
  cadastro.apertarCadastrar();
});

Then("meu cadastro é criado com sucesso", function () {
  let objeto;
  cy.wait("@criarUsuario").then(function (resposta) {
    objeto = resposta;
    idNovoUsuario = resposta.response.body.id;
    email = resposta.response.body.email;
    cy.log(objeto);

    expect(resposta.response.body.active).to.equal(true);
    expect(resposta.response.body.type).to.equal(0);

    cy.contains("Sucesso").should("be.visible");
    cy.contains("Cadastro realizado!").should("be.visible");
  });
});

When("informo um email que já foi utilizado", function () {
  cy.log(emailJaCadastrado);

  cy.get(cadastro.inputEmail).type(emailJaCadastrado);
});

Given("que criei um usuário válido", function () {
  emailJaCadastrado = faker.internet.email();
  cy.log(emailJaCadastrado);

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

Then("aparece um aviso dizendo que o campo senha é obrigatório", function () {
  cadastro.apertarCadastrar();
  cy.contains("span", "Campo obrigatório").should("exist");
});

When("informo uma senha correta", function () {
  cadastro.typeSenhaPrincipal();
});

When("não informo a senha de confirmação", function () {});

When("aparece uma mensagem dizendo que {string}", function (mensagem) {
  cadastro.apertarCadastrar();
  cy.contains("span", mensagem).should("exist");
});

When("não informo nenhuma senha", function () {
  cadastro.apertarCadastrar();
});

Then(
  "aparecem dois avisos diferentes informando a necessidade de senha",
  function () {
    cy.contains("span", "Campo obrigatório").should("exist");
    cy.contains("span", "As senhas devem ser iguais.").should("exist");
  }
);

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
