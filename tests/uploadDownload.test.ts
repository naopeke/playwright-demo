import { test } from "@playwright/test";

test("Download files", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo");

    const cookieConsentButton = page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
    await page.waitForSelector("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll", { state: 'visible' });
    if (await cookieConsentButton.isVisible()){
        await cookieConsentButton.click();
    }
    
    // テキストエリアをクリックしてフォーカスを当てる
    const textbox = page.locator("#textbox");
    await textbox.click();

    // キーを一つずつ押す
    await textbox.pressSequentially("Dale un like y subscribete");

    // ボタンが有効になるのを待つ
    await page.waitForSelector("#create:not([disabled])");
    
    // ボタンをクリック
    await page.click("#create");

    //方法１
    // const [download] = await Promise.all([
    //     page.waitForEvent("download"),
    //     page.click("#link-to-download")
    // ])

    // const path = await download.path();
    // console.log(path);


    //方法２
    // const download = await Promise.all([
    //     page.waitForEvent("download"),
    //     page.click("#link-to-download")
    // ])

    // const path = await download[0].path();
    // console.log(path);


    //　方法３suggestedFilename()を利用
    const download = await Promise.all([
        page.waitForEvent("download"),
        page.click("#link-to-download")
    ])

    const fileName = download[0].suggestedFilename();
    await download[0].saveAs(fileName);
})


test.only("Upload files", async ({ page }) => {
    await page.goto("https://blueimp.github.io/jQuery-File-Upload/");
    await page.setInputFiles("//input[@type='file']",["uploadItems/pikachu.jpg", "uploadItems/kodakku.jpeg"]);
})