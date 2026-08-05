import { Locator, Page, expect } from "@playwright/test";

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

    async validaAndamento(){
        await expect(this.orderProgress.getByRole('listitem').filter({has: this.page.locator('.active-step')}).getByText('Cart')).toBeVisible()
    }

    async validaProdutoNoCarrinho(){
        expect (this.produtoNoCarrinho.getByRole('cell', {name: process.env.LIVRO_DESEJADO!})).toBeTruthy()
    }

    async concordaComOsTermosEClicaNoBotaoCheckout(){
        await this.termosDeServico.check({force:true})
        await this.botaoCheckOut.click()
    }

    
}