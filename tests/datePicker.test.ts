import { test, expect } from '@playwright/test';

test("calendar", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");
    
})