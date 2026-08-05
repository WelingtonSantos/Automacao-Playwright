import { test, expect } from '@playwright/test';
import { Login } from '../pages/loginPage';
import { Livros } from '../pages/livrosPage';
import { Carrinho } from '../pages/CarrinhoDeCompras';

test.describe('Fluxo de compra ponta a ponta', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.BASE_URL!)
    })

    test('Deve realizar o login, adicionar produto ao carrinho de compras e finalizar com o pagamento', async({page}) => {
        //Inicializa as páginas
        const realizaLogin = new Login(page)
        const produtoLivro = new Livros(page)
        const carrinho = new Carrinho(page)

        //Realizar o Login, essa classe herda funções de validação da pagina, e acesso a menus de BasePage e Header
        await realizaLogin.validaOCarregamentoDaPagina()
        await realizaLogin.acessarPaginaDeLogin()
        await realizaLogin.realizarLoginComSucesso(process.env.USER_EMAIL!, process.env.USER_PASSWORD!, true)
        await realizaLogin.accesarLivrosDisponiveis()

        //Seleciona produto, essa classe herda da classe produtos, a adição ao carrinho de compras comum nos produtos
        await produtoLivro.selectionaLivro(process.env.LIVRO_DESEJADO!)
        await produtoLivro.adicionaAoCarrinhoDeCompras()
        
        //Realizar login vai clicar no link de acessar o carrinho de compras por que herda da classe Header
        await realizaLogin.acessaCarrinhoDeCompras()

        //Valida o produto no carrinho com base no parametro do env - nesse caso livro
        await carrinho.validaProdutoNoCarrinho()
        await carrinho.concordaComOsTermosEClicaNoBotaoCheckout()

    });
})