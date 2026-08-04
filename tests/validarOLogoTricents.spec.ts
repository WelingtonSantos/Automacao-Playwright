import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { Header } from '../pages/headerPage';
import { Login } from '../pages/loginPage';
import { RegistroDeNovoUsuario } from '../pages/registroPage';
import { Livros } from '../pages/livrosPage';
import { EmailAFriend } from '../pages/emailFriendPage';


test.beforeEach(async({page}) => {
     await page.goto(process.env.BASE_URL!)     
})


test('Validar logo da Tricents e realizar login invalido', async({page}) => {

    const basePage = new BasePage(page)
    const headerLink = new Header(page)
    const realizarLoginInvalido = new Login(page)
    await basePage.validaOCarregamentoDaPagina()
    await headerLink.acessarPaginaDeLogin()
    await realizarLoginInvalido.realizaLoginInvalido('teste@test.com', 'password', true)

})

test('Realizar o cadastro de um novo usuario com email inválido', async({page}) => {

    const basePage = new BasePage(page)
    const navegaPara = new Header(page)
    const novoRegistro = new RegistroDeNovoUsuario(page)

    await basePage.validaOCarregamentoDaPagina()
    await navegaPara.accessarPaginaDeRegistro()
    await novoRegistro.realizarCadastroDeUsuario('Female', 'Welington', 'Santos', 'email@teste.com', 'w1234567@', 'w1234567@')
    await novoRegistro.validarMensagemDeEmailInvalido()
})

test.fail('Acessar a pagina de livros e adiocionar a lista de desejos', async({page}) => {

    const basePage = new BasePage(page)
    const navegaPara = new Header(page)
    const livro = new Livros(page)
    const enviaParaEmail = new EmailAFriend(page)

    await basePage.validaOCarregamentoDaPagina()
    await navegaPara.accesarLivrosDisponiveis()
    await livro.selectionaLivro('Computing and Internet')
    await livro.enviaParaAmigoViaEmail()
    await enviaParaEmail.validaTitulo()
    await enviaParaEmail.preencheDadosParaEnvio('amigo@teste.com', 'meuemail@teste.com', 'Livro bom')

})

test('Login com sucesso', async({page}) => {
    //Login com sucesso 
    const basePage = new BasePage(page)
    const login = new Login(page)

    await basePage.validaOCarregamentoDaPagina()
    await login.acessarPaginaDeLogin()
    await login.realizarLoginComSucesso(process.env.USER_EMAIL!, process.env.USER_PASSWORD!, true)
    
})

test('Envia sugestão de livro para um amigo', async({page}) => {
    //Login com sucesso 
    const basePage = new BasePage(page)
    const login = new Login(page)
    const livro = new Livros(page)
    const enviaParaEmail = new EmailAFriend(page)

    await basePage.validaOCarregamentoDaPagina()
    await login.acessarPaginaDeLogin()
    await login.realizarLoginComSucesso(process.env.USER_EMAIL!, process.env.USER_PASSWORD!, true)
    await login.accesarLivrosDisponiveis()
    await livro.selectionaLivro(process.env.LIVRO_DESEJADO!)
    await livro.enviaParaAmigoViaEmail()
    await enviaParaEmail.validaTitulo()
    await enviaParaEmail.preencheDadosParaEnvio('amigo@teste.com', process.env.USER_EMAIL!, 'Esse livro é muito bom')
    await enviaParaEmail.validaEmailEnviadoComSucesso()

})