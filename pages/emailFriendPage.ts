import { Locator, Page, expect } from "@playwright/test";
import { Step } from "../helpers/test-step-decorator";

export class EmailAFriend {

    readonly page: Page
    readonly emailFriendPage: Locator
    readonly friendsEmail: Locator
    readonly personalEmail: Locator
    readonly personalMessage: Locator
    readonly botaoEnviar: Locator

    constructor(page: Page){
        this.page = page
        this.emailFriendPage = page.locator('.center-2')
        this.friendsEmail = page.locator('#FriendEmail')
        this.personalEmail = page.locator('#YourEmailAddress')
        this.personalMessage = page.locator('#PersonalMessage')
        this.botaoEnviar = page.getByRole('button', {name: 'Send email'})


    }

    @Step
    async validaTitulo(){
        const titulo = await this.emailFriendPage.locator('.page-title').textContent()
        console.log(titulo)

    }

    /**
     * Esse método preenche os dados e faz envio para o amigo escolhido
     * @param friendEmail  - Email do Amigo
     * @param personalEmail - Email pessoal
     * @param personalMessage - Mensagem para o maigo
     */
    @Step
    async preencheDadosParaEnvio(friendEmail: string, personalEmail: string, personalMessage: string){

        await this.friendsEmail.fill(friendEmail)
        await this.personalEmail.fill(personalEmail)
        await this.personalMessage.fill(personalMessage)
        await this.botaoEnviar.click()
    }
    @Step
    async validaEmailEnviadoComSucesso(){
        const titulo =  await this.emailFriendPage.locator('.title h2').textContent()
        expect(titulo).toContain(process.env.LIVRO_DESEJADO!)
        await expect(this.emailFriendPage.locator('.result')).toContainText('Your message has been sent.')
    }

}