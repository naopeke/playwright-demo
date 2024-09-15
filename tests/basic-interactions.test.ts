import { expect, test } from '@playwright/test';

test("", async ({page}) => {
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
    console.log(await messageInput.inputValue());

    // await messageInput.type("Hello World"); //Deprecated
    await messageInput.fill("Hello World");
})