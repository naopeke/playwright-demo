import { expect, Page } from "@playwright/test";

export default class SpecialHotPage {
    constructor(public page: Page){}

    async chooseTablets(){
        await this.page.click("//a[normalize-space(text())='Tablets (75)']");
        await expect(this.page).toHaveTitle("Tablets");
    }

    async addFirstProductToTheCart(){
        await this.page.hover("//div[@class='image']/a",{
            strict: false
        });
        await this.page.locator("(//button[@title='Add to Cart'])").nth(0).click();
    }

    async isToastVisible() {
        const toast = this.page.getByText("View Cart");
        await toast.waitFor({state: "visible"});
        return toast;
    }
}