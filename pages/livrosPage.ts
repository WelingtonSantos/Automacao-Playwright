import { Locator, Page, expect } from "@playwright/test";
import { Produtos } from "./produtosPage";

export class Livros extends Produtos {
    
    private readonly selecionaLivro: Locator

    constructor(page: Page){
        super(page)
        this.selecionaLivro = page.locator('.product-grid')
    }

    async selectionaLivro(nomeDoLivro: string){
        
        await expect(this.selecionaLivro.getByText(nomeDoLivro, {exact:true})).toBeVisible()
        await this.selecionaLivro.getByText(nomeDoLivro, {exact:true}).click()

    }
    
}