import { test, expect } from "@playwright/test"

test("Interact with frames 1", async({ page }) =>{
    await page.goto("https://letcode.in/frame");
    const allframes = page.frames();
    console.log("No.of frame: " + allframes.length);

    const myFrame = page.frame("firstFr");
    // "?." nullの場合は停止 if(myFrame != null)のこと
    await myFrame?.fill("input[name='fname']","nao"); 
    await myFrame?.fill("input[name='lname']", "peke");

    expect(await myFrame?.locator("p.title.has-text-info").textContent()).toContain("You have entered");

    await page.waitForTimeout(3000);
})


test("Interact with frames 2", async({ page }) =>{
    await page.goto("https://letcode.in/frame");
    const allframes = page.frames();
    console.log("No.of frame: " + allframes.length);

    const myFrame = page.frameLocator("#firstFr");
    await myFrame.locator("input[name='fname']").fill("nao");
    await myFrame.locator("input[name='lname']").fill("peke");

    await page.waitForTimeout(3000);
})


test("Nested frames", async({ page }) => {
    await page.goto("https://letcode.in/frame");
    const allframes = page.frames();
    console.log("No.of frame: " + allframes.length);

    const frame = page.frameLocator("#firstFr");
    const innerFrame = frame.frameLocator("iframe[src='innerFrame']");
    await innerFrame.locator("input[name = 'email']").fill("naopeke@test.com");
})