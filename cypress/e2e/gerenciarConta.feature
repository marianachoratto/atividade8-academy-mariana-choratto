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

@deletarUsuarioModificado
Cenário: Deve ser possível alterar senha
    Quando clico no botão de alterar senha
    E altero a senha cadastrada
    E confirmo a operação
    Então terei minhas informações atualizadas