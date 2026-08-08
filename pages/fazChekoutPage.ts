import { Locator, Page, expect } from "@playwright/test";
import { Step } from "../helpers/test-step-decorator";


/**
 * Classe checkout contem as funcionalidade para realizar/confirmar o cadastro de endereço
 * Método de entrega 
 * Tipo de pagamento
 * E confirmar as informações
 */
export class Checkout {

    private readonly page: Page
    private readonly checkoutPage: Locator
    private readonly billingAdress: Locator


    constructor(page: Page){
        this.page = page
        this.checkoutPage = page.locator('.checkout-page')
        this.billingAdress = page.getByRole('listitem').locator('#opc-billing')

    }

    @Step
    /**
     * Preenche endereço de cobrança (Ajustar para receber via parametros)
     */
    async preencherEnderecoDeCobranca(){
        await this.checkoutPage.getByLabel('select').selectOption('New Address')
        await this.checkoutPage.locator('#BillingNewAddress_CountryId').selectOption('Brazil')
        await this.checkoutPage.locator('#BillingNewAddress_City').fill('São Paulo')
        await this.checkoutPage.locator('#BillingNewAddress_Address1').fill('Rua João tese da Silva')
        await this.checkoutPage.locator('#BillingNewAddress_ZipPostalCode').fill('0299090')
        await this.checkoutPage.locator('#BillingNewAddress_PhoneNumber').fill('11982323223')
        await this.checkoutPage.getByRole('button', {name: 'Continue'}).click()
        
    }

    /**
     * Esse método recebe um boolean true ou false, caso seja true ele seleciona a opção de retirar na loja
     * Caso false ele assume o endereço cadastrado como local de recebimento do produto
     * @param retiraNaLoja - True or False
     */
    @Step
    async enderecoRetiradaRecebimento(retiraNaLoja: boolean){

        if(retiraNaLoja){
            await this.checkoutPage.locator('#checkout-step-shipping #PickUpInStore').check({force: true})
            
        }
        else{
            await this.checkoutPage.locator('#checkout-step-shipping').getByRole('button', {name: 'Continue'}).click()
        }
        
    }

    /**
     * Esse método seleciona o tipo de envio que o cliente pode escolher, para esse caso por default vai selecionar 
     * a entrega padrão (Melhorar para receber via paramtro a opção e fazer o metodo dinamico)
     */
    @Step
    async metodoDeEntrega(){
        await this.checkoutPage.locator('#opc-shipping_method #shippingoption_1').check({force: true})
        await this.checkoutPage.locator('#shipping-method-buttons-container').getByRole('button', {name: 'Continue'}).click()
    }

    /**
     * Esse método seleciona o tipo de pagamento selecionando o checkbox, para esse caso está selecionando uma opção default
     * (Melhorar para tornar a seleçao dinamica e recebendo via parametro)
     */
    @Step
    async metodoDePagamento(){
        await this.checkoutPage.locator('#co-payment-method-form').getByRole('radio', {name: 'Check / Money Order (5.00)'}).check({force: true})
        await this.checkoutPage.locator('#payment-method-buttons-container').getByRole('button', {name: 'Continue'}).click()
    }

    /**
     * Esse método valida as informação apresentadas após os preenchimentos
     * (Melhorar a validação do texto apresentado - para esse caso a validação simples da mensagem já garate o andamento correto do fluxo)
     */
    @Step
    async informacaoDePagamento(){
        
        // Localiza o bloco de pagamento e valida se contém o nome da empresa
        await expect(this.checkoutPage.locator('#checkout-payment-info-load .info'))
            .toContainText('Tricentis GmbH');


        await this.checkoutPage.locator('#payment-info-buttons-container').getByRole('button', {name: 'Continue'}).click()

    }

    /**
     * Obtem dados do produto
     */
    @Step
    async obterDadosDoProduto(nomeProduto: string) {
        // 1. Localiza a linha específica (tr) que contém o nome do seu produto
        const linhaProduto = this.page
            .locator('tr.cart-item-row')
            .filter({ hasText: nomeProduto });

        // 2. Mapeia os seletores das colunas a partir daquela linha específica
        const precoText = await linhaProduto.locator('.product-unit-price').innerText();
        const quantidadeText = await linhaProduto.locator('.qty span:not(.td-title)').innerText();
        const totalText = await linhaProduto.locator('.product-subtotal').innerText();

        await this.checkoutPage.locator('#confirm-order-buttons-container').getByRole('button', {name: 'Confirm'}).click()

        // 3. Retorna os dados limpos (convertidos para número onde necessário)
        return {
            nome: nomeProduto,
            preco: parseFloat(precoText),
            quantidade: parseInt(quantidadeText, 10),
            total: parseFloat(totalText)
        };

    }

    /**
     * Corfirmar a Ordem
     */
    @Step
    async confirmaOrdem(){
        await this.checkoutPage.locator('#confirm-order-buttons-container').getByRole('button', {name: 'Confirm'}).click()
        await expect(this.checkoutPage.locator('.order-completed')).toContainText('Your order has been successfully processed!')
        await this.checkoutPage.getByRole('button', {name: 'Continue'}).click()
    }



}