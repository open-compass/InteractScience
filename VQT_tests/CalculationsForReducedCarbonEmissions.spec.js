const { test, expect } = require('@playwright/test');

test.describe('CalculationsForReducedCarbonEmissions', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/CalculationsForReducedCarbonEmissions.html');

  test('Initial view showing individual emissions with a 2040 climate neutral goal', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/CalculationsForReducedCarbonEmissions-1.png', fullPage: true });
  });

  test('Individual emissions view after setting climate neutral goal to 2030 and increasing compensation', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#btn-neutral-2030').click();
    await page.locator('#slider-constant-compensation').fill('35.36');
    await page.screenshot({ path: './snapshots/CalculationsForReducedCarbonEmissions-2.png', fullPage: true });
  });

  test('Compensation costs view based on the settings from the previous state', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#btn-neutral-2030').click();
    await page.locator('#slider-constant-compensation').fill('35.36');
    await page.locator('#type-costs').click();
    await page.screenshot({ path: './snapshots/CalculationsForReducedCarbonEmissions-3.png', fullPage: true });
  });

  test('Population-level emissions view using default parameter settings', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#scale-population').click();
    await page.screenshot({ path: './snapshots/CalculationsForReducedCarbonEmissions-4.png', fullPage: true });
  });
});