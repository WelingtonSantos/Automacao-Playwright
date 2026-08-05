import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { Step } from "../helpers/test-step-decorator";

/**
 * Essa classe tem os links contidos no header da página
 */

export class Header extends BasePage{

    protected readonly registro: Locator
    protected readonly login: Locator
    protected readonly listaDeDesejos: Locator
    protected readonly books: Locator
    protected readonly carrinhoDeCompras: Locator


    constructor(page: Page){
        super(page)
        this.registro = this.page.getByRole('listitem').filter({hasText: "Register"})
        this.login = this.page.getByRole('listitem').filter({hasText: "Log in"})
        this.listaDeDesejos = this.page.getByRole('listitem').filter({hasText: /Wishilit/i})
        this.books = page.locator('.header-menu').getByRole('listitem').getByText('Books', {exact:true})
        this.carrinhoDeCompras = page.locator('#topcartlink')

    }

    /**
     * Acessa o formulário de registro
     */
    @Step
    async accessarPaginaDeRegistro(){
        await this.registro.click()
    }

    /**
     * Acessa a lista de desejos
     */
    @Step
    async acessarListaDeDesejos(){
        await this.listaDeDesejos.click()
    }

    /**
     * Acessa o formulário de login
     */
    @Step
    async acessarPaginaDeLogin(){
        await this.login.click()
    }

    @Step
    async accesarLivrosDisponiveis(){
        await expect(this.books).toBeVisible()
        await this.books.click()
    }

    @Step
    async validaLoginComSucessoComBaseNoBotaoLogOut(){
        await expect(this.page.locator('.header-links').getByRole('listitem').getByText('Log out')).toBeVisible()
    }

    @Step
    async logOut(){
        await expect(this.page.locator('.header-links').getByRole('listitem').getByText('Log out')).toBeVisible()
        await this.page.locator('.header-links').getByRole('listitem').getByText('Log out').click()
    }

    @Step
    async acessaCarrinhoDeCompras(){
        await this.carrinhoDeCompras.click()
    }

}