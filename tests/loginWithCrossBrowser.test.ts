import { chromium, test, ConnectOptions } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

// LambdaTest capabilities
const capabilities = {
    browserName: "Chrome", // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    browserVersion: "latest",
    "LT:Options": {
      platform: "Windows 10",
      build: "Playwright TS Build",
      name: "Playwright Test",
      user: process.env.LT_USERNAME,
      accessKey: process.env.LT_ACCESS_KEY,
      network: true,
      video: true,
      console: true,
      tunnel: false, // Add tunnel configuration if testing locally hosted webpage
      tunnelName: "", // Optional
      geoLocation: '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
    },
  };

test("Login test demo", async () => {

    const browser = await chromium.connect(
        `wss://cdp.lambdatest.com/playwright?capabilities=
        ${encodeURIComponent(JSON.stringify(capabilities)
        )}`,
      );
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