#language: pt

Funcionalidade: Gerenciar conta

Contexto: o usuário deve ter acesso à sua página de informações
    Dado que entrei no perfil do meu usuário já cadastrado
    E estou na página do gerenciamento de contas

@deletarUsuario @ignore
Cenário: Dever ser possível alterar nome
    Quando altero o nome cadastrado
    E confirmo a operação 
    # Então terei um novo nome cadastrado
    Então terei minhas informações atualizadas

@deletarUsuarioModificado @ignore
Cenário: Deve ser possível alterar senha
    Quando clico no botão de alterar senha
    E altero a senha cadastrada
    E confirmo a operação
    Então terei minhas informações atualizadas

@deletarUsuarioModificado @ignore
Cenário: Deve ser possível alterar nome e senha ao mesmo tempo
    Quando altero o nome cadastrado
    Quando clico no botão de alterar senha
    E altero a senha cadastrada
    E confirmo a operação
    Então terei minhas informações atualizadas

@deletarUsuario @ignore
Cenário: Não deve ser possível alterar o email
    Quando tento alterar o email cadastrado
    Então não é possível alterá-lo

@ignore
Cenário: Não deve ser possível alterar senha sem clicar no botão
    Quando tento alterar minha senha sem clicar no botão
    Então não é possível alterá-la

@ignore
Cenário: Não deve ser possível alterar senha para que ela tenha mais de 12 caracteres
    Quando clico no botão de alterar senha
    E altero a senha cadastrada para que tenha 13 caracteres
    E confirmo a operação
    Então a senha não é alterada

@deletarUsuario @ignore
Cenário: Não deve ser possível alterar senha para que ela tenha menos de 6 caracteres
    Quando clico no botão de alterar senha
    E altero a senha cadastrada para que ela tenha 5 caracteres
    E confirmo a operação
    Então aparece uma mensagem embaixo dos inputs de senha "A senha deve ter pelo menos 6 dígitos"

@deletarUsuario @ignore
Cenário: O usuário deve conseguir cancelar uma operação de mudar senha
    Quando clico no botão de alterar senha
    E começo a alterar a senha
    Quando clico no botão de cancelar
    Então a operação é cancelada
    # E a senha antiga retorna 

Cenário: Usuário administrador deve conseguir mudar informações de outros usuários
    Dado que meu usuário tem perfil de administrador
    Quando acesso uma conta de terceiro
    E mudo alguma informação
    Então as alterações são feitas