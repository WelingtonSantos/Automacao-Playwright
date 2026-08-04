import { Locator, Page, expect } from "@playwright/test";
import { Login } from "./loginPage";

export class BasePage {
    
    private readonly page: Page
    private readonly registro: Locator
    private readonly login: Locator

    constructor(page: Page){
        this.page = page
        this.registro =  this.page.getByRole('listitem').filter({hasText: "Register"})
        this.login =  this.page.getByRole('listitem').filter({hasText: "Log in"})
    }

    /**
     * Esse método valida o logo do tricentis shopping e garante que a página está carregada
     */
    async validaOCarregamentoDaPagina(){
        const logo = this.page.getByRole('img', { name: 'Tricentis Demo Web Shop' });
        await expect(logo).toBeVisible();
        await expect(logo).toHaveAttribute('src', '/Themes/DefaultClean/Content/images/logo.png');
    }


}