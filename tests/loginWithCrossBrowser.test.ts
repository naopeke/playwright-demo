import { chromium, test } from "@playwright/test";

test("Login test demo", async () => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://ecommerce-playground.lambdatest.io/");
    await page.hover("//a[@class='icon-left both nav-link dropdown-toggle']//div[@class='info']//span[@class='title'][contains(text(),'My account')]")
    await page.click("'Login'");
    await page.fill("input[name='email']", "koushik350@gmail.com");
    await page.fill("input[name='password']", "Pass123$");
    await page.click("input[value='Login']");

    await page.close();
    await context.close();
    await browser.close();
})