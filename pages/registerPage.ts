import { expect, Page } from "@playwright/test";

export default class RegisterPage {

    constructor(public page: Page){

    }
    
    async enterFirstName(firstname: string){
        await this.page.locator("#input-firstname").fill(firstname);
    }

    async enterLastName(lastname: string){
        await this.page.locator("#input-lastname").fill(lastname);
    }

    async enterEmail(email: string){
        await this.page.locator("#input-email").fill(email);
    }

    async enterTelephone(phone: string){
        await this.page.locator("#input-telephone").fill(phone);
    }

    
    async enterPassword(password: string){
        await this.page.locator("#input-password").fill(password);
    }

    async enterConfirmPassword(confirm: string){
        await this.page.locator("#input-confirm").fill(confirm);
    }

    async isSubscribeChecked(){
        return await this.page.locator("#input-newsletter-no").isChecked();
    }

    async clickTermAndCondition(){
        await this.page.click("//label[@for='input-agree']");
    }

    async clickContinueToRegister(){
        // If the email is not registered yet
        // const navigationPromise = this.page.waitForURL("https://ecommerce-playground.lambdatest.io/index.php?route=account/success"); //
        //await this.page.click("//input[@value='Continue']");
        //await navigationPromise;
        
        // If the email is already registered
        await this.page.click("//input[@value='Continue']");
        const warning = this.page.getByText("Warning: E-Mail Address is already registered!")
        await expect(warning).toBeVisible();
    }
}