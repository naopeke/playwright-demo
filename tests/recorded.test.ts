import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');
  await page.getByRole('button', { name: ' My account' }).click();
  await page.getByPlaceholder('E-Mail Address').click();
  await page.getByPlaceholder('E-Mail Address').fill('koushik350@gmail.com');
  await page.getByPlaceholder('E-Mail Address').click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Pass123$');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: ' Edit your account' }).click();
  await page.getByPlaceholder('Last Name').click();
  await page.getByPlaceholder('Last Name').fill('Chatterjee');
  await page.getByPlaceholder('Last Name').click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: ' My account' }).click();
});