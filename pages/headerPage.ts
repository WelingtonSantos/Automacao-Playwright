import { Locator, Page, expect } from "@playwright/test";

/**
 * Essa classe tem os links contidos no header da página
 */

export class Header {
    protected readonly page: Page
    protected readonly registro: Locator
    protected readonly login: Locator
    protected readonly listaDeDesejos: Locator
    protected readonly books: Locator


    constructor(page: Page){
        this.page = page
        this.registro = this.page.getByRole('listitem').filter({hasText: "Register"})
        this.login = this.page.getByRole('listitem').filter({hasText: "Log in"})
        this.listaDeDesejos = this.page.getByRole('listitem').filter({hasText: /Wishilit/i})
        this.books = page.locator('.header-menu').getByRole('listitem').getByText('Books', {exact:true})

    }

    /**
     * Acessa o formulário de registro
     */
    async accessarPaginaDeRegistro(){
        await this.registro.click()
    }

    /**
     * Acessa a lista de desejos
     */
    async acessarListaDeDesejos(){
        await this.listaDeDesejos.click()
    }

    /**
     * Acessa o formulário de login
     */
    async acessarPaginaDeLogin(){
        await this.login.click()
    }

    async accesarLivrosDisponiveis(){
        await expect(this.books).toBeVisible()
        await this.books.click()
    }

    async validaLoginComSucessoComBaseNoBotaoLogOut(){
        await expect(this.page.locator('.header-links').getByRole('listitem').getByText('Log out')).toBeVisible()
    }

    async logOut(){
        await expect(this.page.locator('.header-links').getByRole('listitem').getByText('Log out')).toBeVisible()
        await this.page.locator('.header-links').getByRole('listitem').getByText('Log out').click()
    }

}