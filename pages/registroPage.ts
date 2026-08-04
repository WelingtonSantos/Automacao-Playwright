import { Locator, Page, expect } from "@playwright/test";

/**
 * Essa classe contém os métodos para realizar um novo cadastro de usuaŕio na plataforma
 */
export class RegistroDeNovoUsuario {

    private readonly page: Page
    private readonly genderMale: Locator
    private readonly genderFemale: Locator
    private readonly firstName: Locator
    private readonly lastName: Locator
    private readonly email: Locator
    private readonly senha: Locator
    private readonly confirmaSenha: Locator
    private readonly botaoRegistrar: Locator

    constructor(page: Page){
        this.page = page
        this.genderMale = page.locator('input[value="M"]')
        this.genderFemale = page.locator('input[value="F"]')
        this.firstName = page.locator('#FirstName')
        this.lastName = page.locator('#LastName')
        this.email = page.locator('input[name="Email"]')
        this.senha = page.locator('#Password')
        this.confirmaSenha = page.locator('#ConfirmPassword')
        this.botaoRegistrar = page.getByRole('button', {name: 'Register'})
        
    }

    async realizarCadastroDeUsuario(gender: string, firstName: string, lastName: string, email: string, senha: string, confirmaSenha: string){

        await this.selecionaGenero(gender)
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.email.fill(email)
        await this.senhaEConfirmaSenha(senha, confirmaSenha)

    }

    private async selecionaGenero(genero: string){

        if(genero == 'Male')
            await this.genderMale.check({force:true})
        else
            await this.genderFemale.check({force:true})
    }

    private async senhaEConfirmaSenha(senha: string, confirmaSenha: string){

        await this.senha.fill(senha)
        await this.confirmaSenha.fill(confirmaSenha)
        await this.botaoRegistrar.click()
    }

    async validarMensagemDeEmailInvalido(){
        const mensagemDeErro =  await this.page.locator('.message-error').textContent()
        expect(mensagemDeErro).toContain('The specified email already exists')
    }
}