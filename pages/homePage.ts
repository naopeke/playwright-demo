import { Page } from "@playwright/test";

export default class HomePage {
    constructor(public page: Page){}

    async clickOnSpecialHotMenu(){
        const navigationPromise = this.page.waitForURL("https://ecommerce-playground.lambdatest.io/index.php?route=product/special");
        await this.page.click("(//span[contains(text(),'Special')]/../..)[2]");
        await navigationPromise;
    }
}