const { test, expect } = require('@playwright/test');

test.describe('SolarTimeCalculator', () => {
  let fileUrl;

  test.beforeAll(() => {
    fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SolarTimeCalculator.html');
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the canvas elements to be potentially rendered by p5.js
    // await page.waitForSelector('#local-clock-canvas');
    // await page.waitForSelector('#solar-clock-canvas');
  });

  test('Initial state showing December 7th', async ({ page }) => {
    // Action: Set the value of the "date" slider to 340.
    await page.locator('#date-slider').fill('340');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SolarTimeCalculator-1.png', fullPage: true });
  });

  test('Date set to August 4th', async ({ page }) => {
    // Action: Set the value of the "date" slider to 215.
    await page.locator('#date-slider').fill('215');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SolarTimeCalculator-2.png', fullPage: true });
  });

  test('Date set to January 27th', async ({ page }) => {
    // Action: Set the value of the "date" slider to 26.
    await page.locator('#date-slider').fill('26');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SolarTimeCalculator-3.png', fullPage: true });
  });

  test('Date set to November 29th', async ({ page }) => {
    // Action: Set the value of the "date" slider to 332.
    await page.locator('#date-slider').fill('332');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SolarTimeCalculator-4.png', fullPage: true });
  });
});