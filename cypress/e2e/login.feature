#language: pt

Funcionalidade: Validação ao logar usuário

Contexto: Acessar página de login 
    Dado que acessei a página de login
    E tenho acesso aos dados de um usuário cadastrado
    
 
Cenário: Logar usuário com sucesso
    Quando coloco os dados do usuário nos inputs de login e senha
    E confirmo a operação
    Então o login deve ser realizado com suceso

 
Cenário: Não deve ser possível logar sem adicionar email
    Quando não coloco o email
    E coloco a senha
    E confirmo a operação
    Então deve aparecer uma mensagem abaixo do input email dizendo "Informe o e-mail"

 
Cenário: Não deve ser possível logar sem adicionar senha
    Quando coloco o email
    E não coloco a senha
    E confirmo a operação
    Então deve aparecer uma mensagem abaixo do input senha dizendo "Informe a senha"

 
Cenário: Não deve ser possível logar sem email e senha
    Quando não coloco o email
    E não coloco a senha
    E confirmo a operação
    Então deve aparecer uma mensagem abaixo do input email dizendo "Informe o e-mail"
    E deve aparecer uma mensagem abaixo do input senha dizendo "Informe a senha"


Cenário: Não deve ser possível logar com email errado
    Quando coloco o email errado
    E coloco a senha
    E confirmo a operação
    Então deve aparecer uma mensagem informando falha ao autenticar


Cenário: Não deve ser possível logar com a senha errada
    Quando coloco o email
    E coloco a senha errada
    E confirmo a operação
    Então deve aparecer uma mensagem informando falha ao autenticar

Cenário: Ao clicar no botão do aviso de falha de usuário, a janela de alerta deve fechar
    Quando faço um login com senha ou email incorretos
    Então deve aparecer uma mensagem informando falha ao autenticar
    Quando clico no botão de Ok
    Então a janela de alerta fecha 