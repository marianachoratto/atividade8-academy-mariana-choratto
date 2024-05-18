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

@deletarUsuarioJaCriado 
Cenário: Não é possível cadastrar usuário com email repetido
    Dado que criei um usuário válido
    Quando informo um nome válido
    E informo um email que já foi utilizado
    E informo uma senha válida
    Então meu cadastro não é criado


Cenário: Não deve ser possível criar usuário sem nome
    E não informo um nome
    E informo um email válido
    E informo uma senha válida
    Então aparece uma mensagem de erro dizendo "Informe o nome"


Cenário: Não deve ser possível criar um usuário sem email 
    Quando informo um nome válido
    E não informo um email 
    E informo uma senha válida
    Então aparece um aviso dizendo "Informe o e-mail"


Cenário: Não deve ser possível criar usuário sem senha principal 
    Quando informo um nome válido
    E informo um email válido
    E não informo a senha
    Então aparece um aviso dizendo que o campo senha é obrigatório


Cenário: Não deve ser possível criar usuário sem repetição de senha 
    Quando informo um nome válido
    E informo um email válido
    E informo uma senha correta
    E não informo a senha de confirmação 
    Então aparece uma mensagem dizendo que "As senhas devem ser iguais."


Cenário: Não deve ser possível criar usuário sem nenhuma senha 
    Quando informo um nome válido
    E informo um email válido
    E não informo nenhuma senha
    Então aparecem dois avisos diferentes informando a necessidade de senha 

@deletarUsuario 
Cenário: Deve ser possível criar senha de até 12 caracteres
    Quando informo um nome válido
    E informo um email válido
    E informo uma senha de 12 caracteres
    Então meu cadastro é criado com sucesso

Cenário: Não deve ser possível criar senha de até 13 caracteres
    Quando informo um nome válido
    E informo um email válido
    E informo uma senha com mais de 13 caracteres
    Então o cadastro não é criado