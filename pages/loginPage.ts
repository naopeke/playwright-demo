import { Page } from "@playwright/test";

export default class LoginPage {
    constructor(public page: Page){
        
    }

    async enterEmail(email: string){
        this.page.locator("#input-email").fill(email);
    }

    async enterPassword(password: string){
        this.page.locator("#input-password").fill(password);
    }

    async clickLoginBtn(){
        await this.page.click("//input[@value='Login']");
    }
}