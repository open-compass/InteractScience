const { test, expect } = require('@playwright/test');

test.describe('Arrhenius Versus Exponential Model For Chemical Reactions', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ArrheniusVersusExponentialModelForChemicalReactions.html');

  test('Initial state with default Arrhenius model settings', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/ArrheniusVersusExponentialModelForChemicalReactions-1.png', fullPage: true });
  });

  test('Arrhenius model with increased data points and adjusted \'b\' and \'a\' parameters', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-n').fill('8');
    await page.locator('#slider-b').fill('200');
    await page.locator('#slider-a').fill('3000');
    await page.screenshot({ path: './snapshots/ArrheniusVersusExponentialModelForChemicalReactions-2.png', fullPage: true });
  });

  test('Arrhenius model with \'b\' parameter increased to 300', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-b').fill('300');
    await page.screenshot({ path: './snapshots/ArrheniusVersusExponentialModelForChemicalReactions-3.png', fullPage: true });
  });

  test('Switched to exponential data generation model with adjusted parameters', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#btn-exponential').click();
    await page.locator('#slider-n').fill('6');
    await page.locator('#slider-tref').fill('30');
    await page.locator('#slider-c').fill('0.05');
    await page.locator('#slider-b').fill('273.16');
    await page.locator('#slider-a').fill('4000');
    await page.screenshot({ path: './snapshots/ArrheniusVersusExponentialModelForChemicalReactions-4.png', fullPage: true });
  });
});