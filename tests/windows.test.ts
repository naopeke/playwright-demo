import { test, expect } from '@playwright/test';

test("Interact with multiple tabs", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo")

    const cookieConsentButton = page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
    if (await cookieConsentButton.isVisible()){
        await cookieConsentButton.click();
    }

    //Promise は、非同期処理が完了した後に、次の処理を実行できるようにするためのJavaScriptの仕組み
    //Promise.all が使われている理由は、同時に複数の非同期処理を実行し、それらが全て完了するのを待つためです。
    const [newWindow] = await Promise.all([
        page.waitForEvent("popup"),
        page.click("'Follow On Twitter'")
    ]);

    console.log(newWindow.url());
    // newWindow.fill("", "")も可能
})


test.only("Multiple window modal", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo")

    console.log(page.url());

    const cookieConsentButton = page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
    if (await cookieConsentButton.isVisible()){
        await cookieConsentButton.click();
    }

    //Promise は、非同期処理が完了した後に、次の処理を実行できるようにするためのJavaScriptの仕組み
    //Promise.all が使われている理由は、同時に複数の非同期処理を実行し、それらが全て完了するのを待つためです。
    const [multiPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.click("#followboth")
    ]);

    await multiPage.waitForLoadState();

    const pages = multiPage.context().pages();
    console.log('No. of tabs:', pages.length);

    pages.forEach(tab =>{
        console.log(tab.url())
    })

    // await pages[1].fill("", "nao");
})