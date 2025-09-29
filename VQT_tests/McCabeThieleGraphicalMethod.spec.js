const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/McCabeThieleGraphicalMethod.html');

test.describe('McCabe-Thiele Graphical Method Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for p5.js canvas to be rendered, as it can be asynchronous.
    // await page.waitForSelector('#canvas-container canvas');
  });

  test('Default parameter values resulting in 8 stages', async ({ page }) => {
    await page.screenshot({ path: './snapshots/McCabeThieleGraphicalMethod-1.png', fullPage: true });
  });

  test('Increased relative volatility reducing the number of stages to 5', async ({ page }) => {
    const volatilitySlider = page.locator('#slider-volatility');
    await volatilitySlider.fill('7.8');
    await page.screenshot({ path: './snapshots/McCabeThieleGraphicalMethod-2.png', fullPage: true });
  });

  test('Relative volatility reset to its default value, restoring the stage count to 8', async ({ page }) => {
    const volatilitySlider = page.locator('#slider-volatility');
    await volatilitySlider.fill('2.5');
    await page.screenshot({ path: './snapshots/McCabeThieleGraphicalMethod-3.png', fullPage: true });
  });

  test('Decreased feed quality resulting in 6 stages', async ({ page }) => {
    const feedQualitySlider = page.locator('#slider-feed-quality');
    await feedQualitySlider.fill('0.5');
    await page.screenshot({ path: './snapshots/McCabeThieleGraphicalMethod-4.png', fullPage: true });
  });
});