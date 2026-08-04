import { Locator, Page, expect } from "@playwright/test";

export class Produtos {

    protected readonly page: Page
    protected readonly botaoAddToCart: Locator
    protected readonly botaoEmailAFriend: Locator
    protected readonly botaoAddToCompareList: Locator
    protected readonly quantidade: Locator

    constructor(page: Page){
        this.page = page
        this.botaoAddToCart = page.getByRole('button', {name: 'Add to Cart'})
        this.botaoAddToCompareList = page.getByRole('button', {name: 'Add to compare list'})
        this.botaoEmailAFriend = page.getByRole('button', {name: 'Email a friend'})
        this.quantidade = page.getByLabel('Qty')
    }

    async adicionaAoCarrinhoDeCompras(){
        await expect(this.botaoAddToCart).toBeVisible()
        await this.botaoAddToCart.click()
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