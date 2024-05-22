import {
  Given,
  When,
  Then,
  After,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";
import { LoginUsuario } from "../pages/loginUsuario";
let login = new LoginUsuario();

let nome;
let email;
let password;
let idNovoUsuario;

After(function () {
  cy.deletarUsuario(email, password, idNovoUsuario);
});

Then("que acessei a página de login", function () {
  cy.visit("login");
});

Then("tenho acesso aos dados de um usuário cadastrado", function () {
  cy.intercept("POST", "api/auth/login").as("logar");

  cy.cadastrarUsuario().then(function (resposta) {
    idNovoUsuario = resposta.id;
    nome = resposta.nome;
    email = resposta.email;
    password = resposta.password;

    cy.intercept("GET", `api/users/${idNovoUsuario}`).as("getInfoUsuario");
  });
});

When("coloco os dados do usuário nos inputs de login e senha", function () {
  login.escreverEmail(email);
  login.escreverSenha(password);
});

When("confirmo a operação", function () {
  login.apertarLogin();
});

Then("o login deve ser realizado com suceso", function () {
  cy.wait("@logar").then(function (resposta) {
    let status = resposta.response.statusCode;

    cy.url().should(
      "equal",
      "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/"
    );
    expect(status).to.equal(200);
    expect(resposta.response.body).to.have.property("accessToken");
  });

  cy.wait("@getInfoUsuario").then(function (resposta) {
    let respostaGet = resposta.response;
    expect(respostaGet.statusCode).to.equal(200);
    expect(respostaGet.body.name).to.equal(nome);
    expect(respostaGet.body.id).to.equal(idNovoUsuario);
    expect(respostaGet.body.email).to.equal(email);
    expect(respostaGet.body.active).to.equal(true);
    expect(respostaGet.body.type).to.equal(0);
    expect(respostaGet.statusMessage).to.equal("OK");
  });
});

When("não coloco o email", function () {});

When("coloco a senha", function () {
  login.escreverSenha(password);
});

Then(
  "deve aparecer uma mensagem abaixo do input email dizendo {string}",
  function (mensagem) {
    cy.contains("span", mensagem).should("exist");
  }
);

When("coloco o email", function () {
  login.escreverEmail(email);
});

When("não coloco a senha", function () {});

Then(
  "deve aparecer uma mensagem abaixo do input senha dizendo {string}",
  function (mensagem) {
    cy.contains("span", mensagem).should("exist");
  }
);

When("coloco o email errado", function () {
  login.escreverEmailAutomatico();
});

Then("deve aparecer uma mensagem informando falha ao autenticar", function () {
  cy.wait("@logar").then(function (resposta) {
    let objeto = resposta.response;
    expect(objeto.statusCode).to.equal(401);
    expect(objeto.body.error).to.equal("Unauthorized");
    expect(objeto.body.message).to.equal("Invalid username or password.");
    cy.contains("h3", "Falha ao autenticar").should("exist");
    cy.contains("p", "Usuário ou senha inválidos.").should("exist");
  });
});

When("coloco a senha errada", function () {
  login.escreverSenhaAutomatico();
});

When("faço um login com senha ou email incorretos", function () {
  login.escreverEmail(email);
  login.escreverSenhaAutomatico();
  login.apertarLogin();
});

When("clico no botão de Ok", function () {
  cy.get(login.buttonOk).eq(2).click();
});

Then("a janela de alerta fecha", function () {
  cy.get(login.divAlerta).should("not.exist");
});

When("coloco o email em letras maiúsculas", function () {
  login.escreverEmail(email);
});

Then(
  "tenho acesso aos dados de um usuário cadastrado com email em letra maiúscula",
  function () {
    cy.intercept("POST", "api/auth/login").as("logar");
    cy.cadastrarUsuarioEmMaiusculo().then(function (resposta) {
      idNovoUsuario = resposta.id;
      nome = resposta.nome;
      email = resposta.email;
      password = resposta.password;

      cy.intercept("GET", `api/users/${idNovoUsuario}`).as("getInfoUsuario");
    });
  }
);
