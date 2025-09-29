const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/BifurcationInABiochemicalReactor.html');

test.describe('BifurcationInABiochemicalReactor', () => {
  test('Initial state with Monod model and bifurcation diagram', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/BifurcationInABiochemicalReactor-1.png', fullPage: true });
  });

  test('Substrate Inhibition model with parameters set for bistability', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#btn-si').click();
    await page.locator('#slider-umax').fill('0.53');
    await page.locator('#slider-ds').fill('0.3');
    await page.screenshot({ path: './snapshots/BifurcationInABiochemicalReactor-2.png', fullPage: true });
  });

  test('Substrate Inhibition model with a low dilution rate', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#btn-si').click();
    await page.locator('#slider-umax').fill('0.53');
    await page.locator('#slider-ds').fill('0.16');
    await page.screenshot({ path: './snapshots/BifurcationInABiochemicalReactor-3.png', fullPage: true });
  });

  test('Nontrivial steady state view for the Substrate Inhibition model', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#btn-si').click();
    await page.locator('#btn-nontrivial').click();
    await page.locator('#slider-umax').fill('0.53');
    await page.locator('#slider-ds').fill('0.3');
    await page.screenshot({ path: './snapshots/BifurcationInABiochemicalReactor-4.png', fullPage: true });
  });
});