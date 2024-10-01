import { Page } from "@playwright/test";

export default class LoginPage {
    constructor(public page: Page){
        
    }

    async enterEmail(email: string){
        await this.page.locator("#input-email").fill(email);
    }

    async enterPassword(password: string){
        await this.page.locator("#input-password").fill(password);
    }

    async clickLoginBtn(){
        // await Promise.all([
        //     this.page.waitForNavigation(); // depricated
        // ])

        const navigationPromise = this.page.waitForURL("https://ecommerce-playground.lambdatest.io/index.php?route=account/account")
        await this.page.click("body.account-login:nth-child(2) div.mz-pure-container:nth-child(1) div.mz-pure-pusher-container:nth-child(5) div.container.content.pb-5:nth-child(2) div.row:nth-child(2) div.col-md-9 div.row div.col-lg-6:nth-child(2) div.card.mb-4 div.card-body.p-4 form:nth-child(3) > input.btn.btn-primary:nth-child(3)");
        await navigationPromise;
    }
}