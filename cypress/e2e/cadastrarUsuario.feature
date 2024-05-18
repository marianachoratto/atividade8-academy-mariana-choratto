#language: pt

Funcionalidade: Cadastrar usuários 

Contexto: O usuário deve ter acessado a página de cadastro
    Dado que acessei a funcionalidade de cadastro

@deletarUsuario
Cenário: cadastrar usuário com sucesso 
    Quando informo um nome válido
    E informo um email válido
    E informo uma senha válida
    Então meu cadastro é criado com sucesso 

