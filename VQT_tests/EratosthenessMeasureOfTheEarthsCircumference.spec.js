const { test, expect } = require('@playwright/test');

test.describe("Eratosthenes's Measure of the Earth's Circumference", () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/EratosthenessMeasureOfTheEarthsCircumference.html');

  test('Initial view with default post angle', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/EratosthenessMeasureOfTheEarthsCircumference-1.png', fullPage: true });
  });

  test('Post angle set to 7° in the full Earth view', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-post-angle').fill('30');
    await page.locator('#slider-post-angle').fill('7');
    await page.screenshot({ path: './snapshots/EratosthenessMeasureOfTheEarthsCircumference-2.png', fullPage: true });
  });

  test('Zoomed-in view with post angle at 50.1°', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-post-angle').fill('50.1');
    await page.locator('#checkbox-zoom').check();
    await page.screenshot({ path: './snapshots/EratosthenessMeasureOfTheEarthsCircumference-3.png', fullPage: true });
  });

  test('Full view with post angle at 59.9°', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-post-angle').fill('59.9');
    await page.locator('#checkbox-zoom').uncheck();
    await page.screenshot({ path: './snapshots/EratosthenessMeasureOfTheEarthsCircumference-4.png', fullPage: true });
  });
});