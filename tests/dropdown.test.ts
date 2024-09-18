import { test, expect } from '@playwright/test';

test("dropdown single select", async ({ page }) =>{
    page.goto("https://lambdatest.com/selenium-playground/select-dropdown-demo");

    const cookieConsentButton = page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
    if (await cookieConsentButton.isVisible()){
        await cookieConsentButton.click();
    }

    await page.selectOption("#select-demo", {
        // label: "Tuesday" 
        // value: "Tuesday" // <option value="1">Tuesday</option>だとlabel:"Tuesday" value:"1"
        index: 5
    })

    //UIの変化を待つ: ドロップダウンの選択後に、何らかの処理（アニメーションやデータの更新）が行われる場合、これを待つために使用します。
    //デバッグ目的: テストを実行中に状態を確認したり、UIの変化を観察したりするために、一時的に待機することがあります。
    //安定性: 非同期処理が完了するまで待たずに次のステップに進むと、テストが失敗する可能性があるため、確実に次の操作が成功するようにするために使われることがあります。
    // await page.waitForTimeout(3000);
    await page.waitForSelector("#select-demo");
})


test("dropdown multiple select", async ({ page }) =>{
    page.goto("https://lambdatest.com/selenium-playground/select-dropdown-demo");

    const cookieConsentButton = page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
    if (await cookieConsentButton.isVisible()){
        await cookieConsentButton.click();
    }

    await page.selectOption("#multi-select", [{
        label: "Texas"
    },{
        index: 2
    },{
        value: "Washington"
    }])

    //waitForSelectorを使用し、特定の要素が表示されるのを待つなど、条件を指定して待機する方法が好ましい
    await page.waitForSelector("#multi-select");
})


test.only(" Jquery single select", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo");

    const cookieConsentButton = page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
    if (await cookieConsentButton.isVisible()){
        await cookieConsentButton.click();
    }

    await page.click("#country+span");
    // オプションを選択
    await page.locator("ul#select2-country-results li.select2-results__option", { hasText: "Japan"}).click();
    // UIが更新されるまで待機
    await page.waitForTimeout(3000);
    // 選択されたオプションがマッチするか
    const selectedValue = await page.locator("#select2-country-container").innerText();
    console.log(selectedValue);

    expect(selectedValue.trim()).toBe("Japan");
    })