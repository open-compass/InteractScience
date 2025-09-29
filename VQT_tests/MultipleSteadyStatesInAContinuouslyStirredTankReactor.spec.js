const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/MultipleSteadyStatesInAContinuouslyStirredTankReactor.html');

test.describe('MultipleSteadyStatesInAContinuouslyStirredTankReactor', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with default parameters', async ({ page }) => {
    await page.screenshot({ path: './snapshots/MultipleSteadyStatesInAContinuouslyStirredTankReactor-1.png', fullPage: true });
  });

  test('State with modified heat transfer, reverse reaction factor, and feed temperature', async ({ page }) => {
    await page.locator('#slider-ua').fill('8');
    await page.locator('#slider-kr0').fill('9');
    await page.locator('#slider-tf').fill('310');
    await page.screenshot({ path: './snapshots/MultipleSteadyStatesInAContinuouslyStirredTankReactor-2.png', fullPage: true });
  });

  test('State with high heat transfer, low reverse reaction, and high residence time', async ({ page }) => {
    await page.locator('#slider-ua').fill('15.5');
    await page.locator('#slider-kr0').fill('0');
    await page.locator('#slider-tf').fill('270');
    await page.locator('#slider-tau').fill('1000');
    await page.screenshot({ path: './snapshots/MultipleSteadyStatesInAContinuouslyStirredTankReactor-3.png', fullPage: true });
  });

  test('State with high heat transfer, moderate reverse reaction, and low residence time', async ({ page }) => {
    await page.locator('#slider-ua').fill('15.5');
    await page.locator('#slider-kr0').fill('4');
    await page.locator('#slider-tf').fill('295');
    await page.locator('#slider-tau').fill('250');
    await page.screenshot({ path: './snapshots/MultipleSteadyStatesInAContinuouslyStirredTankReactor-4.png', fullPage: true });
  });

});