import { Locator, Page, expect } from "@playwright/test";

export class Produtos {

    protected readonly page: Page
    protected readonly botaoAddToCart: Locator
    protected readonly botaoEmailAFriend: Locator
    protected readonly botaoAddToCompareList: Locator
    protected readonly quantidade: Locator
    protected readonly notificacaoDeSucesso: Locator

    constructor(page: Page){
        this.page = page
        this.botaoAddToCart = page.getByRole('button', {name: 'Add to Cart'}).first()
        this.botaoAddToCompareList = page.getByRole('button', {name: 'Add to compare list'})
        this.botaoEmailAFriend = page.getByRole('button', {name: 'Email a friend'})
        this.quantidade = page.getByLabel('Qty')
        this.notificacaoDeSucesso = page.locator('#bar-notification')

    }

    async adicionaAoCarrinhoDeCompras(){
        await expect(this.botaoAddToCart).toBeVisible()
        await this.botaoAddToCart.click()
        await expect(this.notificacaoDeSucesso).toHaveText('The product has been added to your shopping cart')
    }

    async adicionaAListaDeComparacao(){
        await expect(this.botaoAddToCompareList).toBeVisible()
        await this.botaoAddToCompareList.click()

    }
    async enviaParaAmigoViaEmail(){
        await expect(this.botaoEmailAFriend).toBeVisible()
        await this.botaoEmailAFriend.click()
    }

    async adicionaQuantidade(quantidade: string){
        await expect(this.quantidade).toBeVisible()
        await this.quantidade.fill(quantidade)

    }
}