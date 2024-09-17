import { expect, test, chromium } from '@playwright/test';
import { log } from 'console';

/**
 * Single Input Field
 */
test("Interaction with inputs", async ({ page }) => {
    //ブラウザページをナビゲート
    await page.goto("https://www.lambdatest.com/selenium-playground/simple-form-demo");
    
    //locatorはページ内の要素を操作するためのプレースホルダー
    const messageInput = page.locator("input#user-message");
    
    //スクロール
    await messageInput.scrollIntoViewIfNeeded();
    
    //選択した要素のplaceholder属性の値を取得し、awaitで結果を待ってから、結果をコンソールに出力
    console.log(await messageInput.getAttribute("placeholder"));
    
    //expectでアサーション（検証）。勉強用でリアルタイムで使用しないのでawaitは不要。
    //messageInput 要素が placeholder 属性に "Please enter your Message" という値を持つことを確認
    expect(messageInput).toHaveAttribute("placeholder", "Please enter your Message");
    console.log('Before entering data:' + await messageInput.inputValue());

    // await messageInput.type("Hello World"); //Deprecated
    await messageInput.fill("Hello World");
    console.log('After entering data:' + await messageInput.inputValue());
})


/**
 * Two Input Fields
 */
test("Sum", async ({ page })=> {
    await page.goto("https://www.lambdatest.com/selenium-playground/simple-form-demo");
    const sum1Input = page.locator("#sum1");
    const sum2Input = page.locator("#sum2");
    const getSumBtn = page.locator("form#gettotal>button");


    let num1 = 121;
    let num2 = 546;
    await sum1Input.fill("" + num1); // string
    await sum2Input.fill("" + num2); // string

    await getSumBtn.click(); // クリックアクション完了を待つ
    
    const result = page.locator("#addmessage");
    console.log(await result.textContent()); // await重要
    let expectedResult = num1 + num2;
    expect(result).toHaveText("" + expectedResult);
})


/**
 * Single Checkbox Demo
 */
//onlyをつけると、同じファイル内であっても、このテストだけ
test.only("Checkbox", async ({ page }) => {
    
    try {
        await page.goto("https://www.lambdatest.com/selenium-playground/checkbox-demo");
    
        // クッキー同意ボタンが見える場合、クリックしてバナーを閉じる
        const cookieConsentButton = page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
        if (await cookieConsentButton.isVisible()){
            await cookieConsentButton.click();
        }
    
        const singleCheckbox =  page.locator("#isAgeSelected");
        //デフォルトはチェックなし
        await expect (singleCheckbox).not.toBeChecked();
        //チェックする
        await singleCheckbox.check();
        //チェック済み
        await expect (singleCheckbox).toBeChecked();

    } catch (err){
        console.error('Error occured', err);
        throw err;
    }

})