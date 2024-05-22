#language: pt

Funcionalidade: Cadastrar usuários 

Contexto: O usuário deve ter acessado a página de cadastro
    Dado que acessei a funcionalidade de cadastro

@deletarUsuario @ignore
Cenário: cadastrar usuário com sucesso 
    Quando informo um nome válido
    E informo um email válido
    E informo uma senha válida
    Então meu cadastro é criado com sucesso 

@deletarUsuario @ignore
Cenário: Quando cadastrado, o usuário será do tipo 0
    Quando informo um nome válido
    E informo um email válido
    E informo uma senha válida
    Então meu usuário cadastrado é do tipo 0 

@deletarUsuarioJaCriado @ignore
Cenário: Não é possível cadastrar usuário com email repetido
    Dado que criei um usuário válido
    Quando informo um nome válido
    E informo um email que já foi utilizado
    E informo uma senha válida
    Então meu cadastro não é criado

@ignore
Cenário: Não deve ser possível criar usuário sem nome 
    E não informo um nome
    E informo um email válido
    E informo uma senha válida
    Então aparece uma mensagem de erro dizendo "Informe o nome"

@ignore
Cenário: Não deve ser possível criar um usuário sem email 
    Quando informo um nome válido
    E não informo um email 
    E informo uma senha válida
    Então aparece um aviso dizendo "Informe o e-mail"

@ignore
Cenário: Não deve ser possível criar usuário sem senha principal 
    Quando informo um nome válido
    E informo um email válido
    E não informo a senha
    Então aparece um aviso abaixo da senha dizendo "Informe a senha"
    E aparece um aviso abaixo da confirmação de senha dizendo "As senhas devem ser iguais."

@ignore
Cenário: Não deve ser possível criar usuário sem repetição de senha 
    Quando informo um nome válido
    E informo um email válido
    E informo uma senha correta
    E não informo a senha de confirmação 
    Então aparece uma mensagem dizendo "Informe a senha"

@ignore
Cenário: Não deve ser possível criar usuário sem nenhuma senha 
    Quando informo um nome válido
    E informo um email válido
    E não informo nenhuma senha
    Então aparecem dois avisos informando a necessidade de senha 

@ignore
@deletarUsuario 
Cenário: Deve ser possível criar senha de até 12 caracteres
    Quando informo um nome válido
    E informo um email válido
    E informo uma senha de 12 caracteres
    Então meu cadastro é criado com sucesso

@ignore
Cenário: Não deve ser possível criar senha a partir 13 caracteres
    Quando informo um nome válido
    E informo um email válido
    E informo uma senha com mais de 13 caracteres
    Então aparece uma mensagem "A senha deve ter no máximo 12 dígitos."

@ignore
Cenário: Não deve ser possível cadastrar usuário com senha com menos de 6 caracteres
    Quando informo um nome válido
    E informo um email válido
    E informo uma senha com 5 caracteres
    Então aparece um aviso dizendo que 'A senha deve ter pelo menos 6 dígitos.'

@deletarUsuario @ignore
Esquema do Cenário: É possível cadastrar usuário com qualquer nome
    Quando informo qualquer nome "<nomes>"
    E informo um email válido
    E informo uma senha válida
    Então meu cadastro é criado com sucesso

    Exemplos: 
    |nomes        |
    |*            |
    |1            |
    |1234         |
    |@            |
    |Ana          |
    |$abrina      |
    |Fulano_de_tal|


@ignore
Esquema do Cenário: Não deve ser possível cadastrar com emails inválidos
    Quando informo um nome válido 
    E informo um email inválido "<emailInvalido>"
    E informo uma senha válida
    Então deverá aparecer uma mensagem dizendo que houve falha no cadastro

    Exemplos: 
    |emailInvalido|
    |email        |
    |email@       |
    |@.com        |
    |email@gmail  |
    |@gmail       |
    |@gmail.com   |

@deletarUsuario
Cenário: Deve ser possível cadastrar um usuário com email de letras maiúsculas 
    Quando informo um nome válido
    E informo um email com letras maiúsculas
    E informo uma senha válida
    Então meu cadastro é criado com sucesso