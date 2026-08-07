import { Locator, Page, expect } from "@playwright/test";
import { Step } from "../helpers/test-step-decorator";

export class Carrinho {

    private readonly page: Page
    private readonly orderProgress: Locator
    private readonly produtoNoCarrinho: Locator
    private readonly termosDeServico: Locator
    private readonly botaoCheckOut: Locator
    

    constructor(page: Page){
        this.page = page
        this.orderProgress = page.locator('.center-1')
        this.produtoNoCarrinho = page.getByRole('table')
        this.termosDeServico = page.locator('#termsofservice')
        this.botaoCheckOut = page.getByRole('button', {name: 'Checkout'})

    }

    /**
     * Esse método ainda está melhorado, a ideia e validar os status
     */
    @Step
    async validaAndamento(){
        await expect(this.orderProgress.getByRole('listitem').filter({has: this.page.locator('.active-step')}).getByText('Cart')).toBeVisible()
    }
    /**
     * Valida se produto que foi adicionado é o mesmo que está no carrinho, com base no arquivo env
     */
    @Step
    async validaProdutoNoCarrinho(){
        expect (this.produtoNoCarrinho.getByRole('cell', {name: process.env.LIVRO_DESEJADO!})).toBeTruthy()
    }

    /**
     * Concorda com termos selecionando o checkbox e clica no botão checkout
     */
    @Step
    async concordaComOsTermosEClicaNoBotaoCheckout(){
        await this.termosDeServico.check({force:true})
        await this.botaoCheckOut.click()
    }

    
}