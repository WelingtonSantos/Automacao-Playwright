import { Locator, Page, expect } from "@playwright/test";
import { Header } from "./headerPage";
import { Step } from "../helpers/test-step-decorator";

export class Login extends Header{

    private readonly emailLocator: Locator
    private readonly passwordLocator: Locator
    private readonly rememberMe: Locator
    private readonly botaoLogin: Locator
    private readonly erroMessage: Locator

    constructor(page: Page){
        super(page)
        this.emailLocator = page.locator('input[name="Email"]')
        this.passwordLocator = page.locator('input[name="Password"]')
        this.rememberMe = page.getByRole('checkbox', { name: /remember/i })
        this.botaoLogin = page.getByRole('button', {name: "Log in"})
        this.erroMessage = page.locator('.message-error')
    
    }

    /**
     * Função que valida a mensagem de erro quando informada credenciais inválidas
     * @param email - String - email invalido
     * @param password - String password invalido
     * @param rememberMe - Boolean true or false
     */
    @Step
    async realizaLoginInvalido(email: string, password: string, rememberMe: boolean){
        await expect(this.emailLocator).toBeVisible()
        await this.emailLocator.fill(email)
        await expect(this.passwordLocator).toBeVisible()
        await this.passwordLocator.fill(password)
        if(rememberMe){
            await this.rememberMe.check({ force: true })
        }
        await this.botaoLogin.click()
        await expect(this.erroMessage).toContainText('Login was unsuccessful. Please correct the errors and try again.')       
    }

    /**
     * Esse método faz login com sucesso
     * @param email 
     * @param password 
     * @param rememberMe 
     */
    @Step
    async realizarLoginComSucesso(email: string, password: string, rememberMe: boolean){

        await expect(this.emailLocator).toBeVisible()
        await this.emailLocator.fill(email)
        await expect(this.passwordLocator).toBeVisible()
        await this.passwordLocator.fill(password)
        if(rememberMe)
            await this.rememberMe.check({ force: true })

        await this.botaoLogin.click()
        await this.validaLoginComSucessoComBaseNoBotaoLogOut()
    }
}