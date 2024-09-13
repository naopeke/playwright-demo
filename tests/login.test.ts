import { chromium, test } from "@playwright/test";

test("Login test demo", async () => {

    // chromium.launch() によってChromiumブラウザが非表示のヘッドレスモードで起動されます。
    // await を使って、ブラウザが起動するまで待機します。
    const browser = await chromium.launch();
    // const browser = await chrimium.launch({
    //     headless: false
    // })
    
    // browser.newContext() は、新しいブラウザコンテキストを作成します。コンテキストは、独自のブラウザセッションを持ち、クッキーやローカルストレージなどのデータが他のコンテキストと分離されています。これにより、同じブラウザの中で複数のユーザーセッションをシミュレートできます。
    // await により、コンテキストの作成が完了するまで処理を待ちます。
    const context = await browser.newContext();

    // 新しく作成したブラウザコンテキスト (context) 内に、新しいページ（タブ） を開き、そのページオブジェクトを page 変数に格納しています。この page オブジェクトを使うことで、Webページにアクセスしたり、ユーザーの操作をシミュレートすることができます。
    // await を使うことで、ページが作成されるまで処理を一時停止します。
    const page = await context.newPage();

    // サイトへ行く
    await page.goto("https://ecommerce-playground.lambdatest.io/");
    
    // inspect => My accountがサイト内に３つあるため、copy XPath
    await page.hover("//a[@class='icon-left both nav-link dropdown-toggle']//div[@class='info']//span[@class='title'][contains(text(),'My account')]")
    
    // Loginボタンをクリック
    // await page.click("text=Login");
    await page.click("'Login'"); //上と同じ

    // ログインフォーム入力 CSS Selector
    await page.fill("input[name='email']", "poke@poke.com");
    await page.fill("input[name='password']", "password");

    //　ログインボタン押下 CSS Selector
    await page.click("input[value='Login']");

    await page.waitForTimeout(5000);



    // 新しいブラウザコンテキスト作成 こうするとログイン状態は保存されていない。同時にテストしたい場合は新しいブラウザコンテキストを作成するとよい
    const newContext = await browser.newContext();

    // ログイン後、プロフィール画面へ行くか確認
    const newPage = await context.newPage();
    newPage.goto("");

    await newPage.waitForTimeout(5000);
})