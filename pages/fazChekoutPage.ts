import { Locator, Page, expect } from "@playwright/test";
import { Step } from "../helpers/test-step-decorator";

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
    //BillingNewAddress_CountryId
    async preencherEnderecoDeCobranca(){
        await this.checkoutPage.getByLabel('select').selectOption('New Address')
        await this.checkoutPage.locator('#BillingNewAddress_CountryId').selectOption('Brazil')
        await this.checkoutPage.locator('#BillingNewAddress_City').fill('São Paulo')
        await this.checkoutPage.locator('#BillingNewAddress_Address1').fill('Rua João tese da Silva')
        await this.checkoutPage.locator('#BillingNewAddress_ZipPostalCode').fill('0299090')
        await this.checkoutPage.locator('#BillingNewAddress_PhoneNumber').fill('11982323223')
        await this.checkoutPage.getByRole('button', {name: 'Continue'}).click()
        
    }


    @Step
    async enderecoRetiradaRecebimento(retiraNaLoja: boolean){

        if(retiraNaLoja){
            await this.checkoutPage.locator('#checkout-step-shipping #PickUpInStore').check({force: true})
            
        }
        else{
            await this.checkoutPage.locator('#checkout-step-shipping').getByRole('button', {name: 'Continue'}).click()
        }
        
    }

    @Step
    async metodoDeEntrega(){
        await this.checkoutPage.locator('#opc-shipping_method #shippingoption_1').check({force: true})
        await this.checkoutPage.locator('#shipping-method-buttons-container').getByRole('button', {name: 'Continue'}).click()
    }

    @Step
    async metodoDePagamento(){
        await this.checkoutPage.locator('#co-payment-method-form').getByRole('radio', {name: 'Check / Money Order (5.00)'}).check({force: true})
        await this.checkoutPage.locator('#payment-method-buttons-container').getByRole('button', {name: 'Continue'}).click()
    }

    @Step
    async informacaoDePagamento(){
        
        // Localiza o bloco de pagamento e valida se contém o nome da empresa
        await expect(this.checkoutPage.locator('#checkout-payment-info-load .info'))
            .toContainText('Tricentis GmbH');


        await this.checkoutPage.locator('#payment-info-buttons-container').getByRole('button', {name: 'Continue'}).click()

    }



}