import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  // retries: 2,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  reporter: [["dot"], ["json", {
    outputFile: "jsonReports/jsonReport.json"
  }], ["html", {
    open: "always" //neverにするとオープンにならない
  }]
  ],  
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /*リアルタイムでブラウザが開くようheadlessとactionTimeoutを追加*/
    headless: false,
    actionTimeout: 0,

    /*スクリーンショットやビデオが自動的にdataフォルダに保存され、HTMLに表示される*/
    screenshot: "on", //"only-on-failure"
    video: "on", // "retain-on-failure"
    launchOptions: {
      slowMo: 1000 // 表示スピードを遅くする
    },

    /* Base URL to use in actions like `await page.goto('/')`. */ 
    baseURL: 'https://ecommerce-playground.lambdatest.io/index.php?',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

  /* 実行するテストファイルを指定 npx playwright testで表示*/
  testMatch: ["tests/loginWithCrossBrowser.test.ts"],
});
