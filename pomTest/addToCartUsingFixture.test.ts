import { expect, test } from "../base/pomFixture";
import RegisterPage from "../pages/registerPage";
import LoginPage from "../pages/loginPage";
import HomePage from "../pages/homePage";
import SpecialHotPage from "../pages/specialHotPage";

const email = "cayoso4147@skrak.com";
const password = "123456";

test.describe("Page Object Model", async () =>{

    test("Register test_01", async ({ page, baseURL, registerPage})=>{
    
        // const register = new RegisterPage(page);
        await page.goto(`${baseURL}route=account/register`);
        await registerPage.enterFirstName("Pepe");
        await registerPage.enterLastName("Lopez");
        await registerPage.enterEmail(email);
        await registerPage.enterTelephone("1234567890");
        await registerPage.enterPassword(password);
        await registerPage.enterConfirmPassword(password);
        expect (await registerPage.isSubscribeChecked()).toBe(true); //toBeChecked() is depricated
        await registerPage.clickTermAndCondition();
        await registerPage.clickContinueToRegister();
    })
    
    
    test("Login test_02", async ({ page, baseURL, loginPage })=>{
        // const login = new LoginPage(page);
        await page.goto(`${baseURL}route=account/login`);
        await loginPage.enterEmail(email);
        await loginPage.enterPassword(password);
        await loginPage.clickLoginBtn();
        expect(await page.title()).toBe("My Account");
    })
    
    
    test("Add to cart test_03", async ({ page, baseURL, loginPage, homePage, specialPage }) =>{
        // const login = new LoginPage(page);
        // const homePage = new HomePage(page);
        // const special = new SpecialHotPage(page);
        await page.goto(`${baseURL}route=account/login`);
        await loginPage.login(email, password);
        await homePage.clickOnSpecialHotMenu();
        await specialPage.chooseTablets();
        await specialPage.addFirstProductToTheCart();
        const isCartVisible = await specialPage.isToastVisible();
        expect(isCartVisible).toBeVisible();
    })

})
