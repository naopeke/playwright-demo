import { test, expect } from '@playwright/test';
import moment from 'moment';

test("calendar select date", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");
    
    const cookieConsentButton = page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
    if (await cookieConsentButton.isVisible()){
        await cookieConsentButton.click();
    }

    let date = "2024-09-29";
    // consoleで、document.getElementById("birthday").value の結果が "2024-09-29"
    await page.fill("#birthday", date);
    await page.waitForTimeout(3000);
})

test("calendar select date range", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");

    const cookieConsentButton = page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
    if (await cookieConsentButton.isVisible()){
        await cookieConsentButton.click();
    }


    await page.getByPlaceholder("Start date").click();

    const mmYY = page.locator('table.table-condensed th.datepicker-switch').nth(0);
    // const mmYY = page.locator("(//table[@class='table-condensed']//th[@class='datepicker-switch'])[1]")

    const prev = page.locator('table.table-condensed th.prev').nth(0);
    const next = page.locator('table.table-condensed th.next').nth(0);
    
    await prev.click();
    await page.click("//td[@class='day'][text()='5']"); //XPathのほうが確実
    //<td class="day" date-date="165430080000000">9<td>


    await page.waitForTimeout(3000);
})

test.only("calendar select date range 2 using Moment.js", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");

    const cookieConsentButton = page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
    if (await cookieConsentButton.isVisible()){
        await cookieConsentButton.click();
    }


    await page.getByPlaceholder("Start date").click();

    const mmYY = page.locator('table.table-condensed th.datepicker-switch').nth(0);
    // const mmYY = page.locator("(//table[@class='table-condensed']//th[@class='datepicker-switch'])[1]")

    const prev = page.locator('table.table-condensed th.prev').nth(0);
    const next = page.locator('table.table-condensed th.next').nth(0);
    
    let dateToSelect: string = "March 2023";

    const thisMonth = moment(dateToSelect, "MMMM YYYY").isBefore();//is before the present month
    console.log("this month: ", thisMonth);

    while(await mmYY.textContent() != dateToSelect){
        if (thisMonth){
            await prev.click();
        } else {
            await next.click();
        }

        await page.click("//td[@class='day'][text()='5']"); //XPathのほうが確実
    }

    await page.waitForTimeout(3000);
})