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


test("Upload files", async ({ page }) => {
    await page.goto("https://blueimp.github.io/jQuery-File-Upload/");
    await page.setInputFiles("//input[@type='file']",["uploadItems/pikachu.jpg", "uploadItems/kodakku.jpeg"]);
})


test.only("Selected Upload", async ({ page }) => {
    await page.goto("https://blueimp.github.io/jQuery-File-Upload/");

    //Promise.allを使用して、2つの非同期操作を並行して実行します。
    const [uploadFiles] = await Promise.all([
        //ファイル選択ダイアログが表示されるのを待ちます。
        page.waitForEvent("filechooser"),
        //ファイル選択ボタンをクリックします
        page.click("//input[@type='file']")
    ])

    //uploadFiles.isMultiple()メソッドを使って、選択されたファイルが複数選択可能かどうかを確認し、その結果をコンソールに出力します。
    const isMultiple = uploadFiles.isMultiple();
    console.log(isMultiple);

    //setFilesメソッドを使って、実際にアップロードするファイルを指定します。
    uploadFiles.setFiles(["uploadItems/pikachu.jpg", "uploadItems/kodakku.jpeg"]);
    
})