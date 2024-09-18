import test, { expect } from "@playwright/test";

/**
 * JavaScript Alerts
 */
test("handling alerts", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
    
    // アラートのダイアログイベントをリスンし、アラートを受け入れる
    page.on("dialog", async (alert) => {
        const text = alert.message(); //Promiseがないのでawait不要
        console.log(text);
        await alert.accept();
    })
    // "Click Me"と書かれた１つめ（index:0)のボタン
    const button =  page.getByText("Click Me").nth(0);
    await button.click();
    // await page.locator("button:has-text('Click Me')").nth(0).click(); //古いバージョン
})


/**
 * Confirm box
 */
test("confirm box", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
    
    const cookieConsentButton = page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
    if (await cookieConsentButton.isVisible()){
        await cookieConsentButton.click();
    }

    // アラートのダイアログイベントをリスンし、アラートを受け入れる
    page.on("dialog", async (alert) => {
        const text = alert.message(); //Promiseがないのでawait不要
        console.log(text);
        await alert.dismiss();
    })
    // "Click Me"と書かれた2つめ（index:1)のボタン
    await page.getByText("Click Me").nth(1).click();
    expect(page.locator("#confirm-demo")).toContainText("You pressed Cancel!");
    // toHaveTextは完全一致　toContainTextは部分一致
})


/**
 * Prompt box
 */
test("prompt box", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");

    const cookieConsentButton = page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
    if (await cookieConsentButton.isVisible()){
        await cookieConsentButton.click();
    }

    //page.on("dialog", callback) ページでダイアログ（アラートalert()、確認confirm()、プロンプトprompt()など）が発生するたびに呼び出されるリスナーを設定
    page.on("dialog", async(alert) => {
        const text = alert.defaultValue();
        console.log(text);
        await alert.accept("nao");
    })

    await page.getByText("Click Me").nth(2).click();
    await expect(page.locator("#prompt-demo")).toContainText("nao");
})


/**
 * Bootstrap Modal
 */
test.only("bootstrap modal", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-modal-demo");

    const cookieConsentButton = page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
    if (await cookieConsentButton.isVisible()){
        await cookieConsentButton.click();
    }

    await page.click("//button[@data-target='#myModal']");
    await page.click("(//button[@data-dismiss='modal']/following-sibling::button)[1]");  
})