import { expect, test } from "../base/pomFixture";
import * as data from "../test-data/addToCart-test-data.json"

// const email = "cayoso4147@skrak.com";
// const password = "123456";

// test.use({
//     browserName: "firefox"
// })

test.describe("Page Object Model", async () =>{

    test("Register test_01", async ({ page, baseURL, registerPage})=>{
        await page.goto(`${baseURL}route=account/register`);
        await registerPage.enterFirstName(data.firstname);
        await registerPage.enterLastName(data.lastname);
        await registerPage.enterEmail(data.email);
        await registerPage.enterTelephone(data.phone_number);
        await registerPage.enterPassword(data.password);
        await registerPage.enterConfirmPassword(data.password);
        expect (await registerPage.isSubscribeChecked()).toBe(true); //toBeChecked() is depricated
        await registerPage.clickTermAndCondition();
        await registerPage.clickContinueToRegister();
    })
    
    
    test("Login test_02", async ({ page, baseURL, loginPage })=>{
        await page.goto(`${baseURL}route=account/login`);
        await loginPage.enterEmail(data.email);
        await loginPage.enterPassword(data.password);
        await loginPage.clickLoginBtn();
        expect(await page.title()).toBe("My Account");
    })
    
    
    test("Add to cart test_03", async ({ page, baseURL, loginPage, homePage, specialPage }) =>{
        await page.goto(`${baseURL}route=account/login`);
        await loginPage.login(data.email, data.password);
        await homePage.clickOnSpecialHotMenu();
        await specialPage.chooseTablets();
        await specialPage.addFirstProductToTheCart();
        const isCartVisible = await specialPage.isToastVisible();
        expect(isCartVisible).toBeVisible();
    })

})
