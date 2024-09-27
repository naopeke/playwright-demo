import { expect, test } from "@playwright/test";
import RegisterPage from "../pages/registerPage";
import LoginPage from "../pages/loginPage";
import HomePage from "../pages/homePage";
import SpecialHotPage from "../pages/specialHotPage";

const email = "cayoso4147@skrak.com";
const password = "123456";

test("Register test_01", async ({ page, baseURL })=>{

    const register = new RegisterPage(page);
    await page.goto(`${baseURL}route=account/register`);
    await register.enterFirstName("Pepe");
    await register.enterLastName("Lopez");
    await register.enterEmail(email);
    await register.enterTelephone("1234567890");
    await register.enterPassword(password);
    await register.enterConfirmPassword(password);
    expect (await register.isSubscribeChecked()).toBe(true);
    await register.clickTermAndCondition();
    await register.clickContinueToRegister();
})