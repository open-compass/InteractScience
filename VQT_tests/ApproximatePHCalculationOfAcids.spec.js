const { test, expect } = require('@playwright/test');

test.describe('Approximate pH Calculation of Acids', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ApproximatePHCalculationOfAcids.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for a key element rendered by MathJax to ensure the page is fully loaded and stable before testing.
    // await page.waitForSelector('#formula-strong .mjx-char', { state: 'visible' });
  });

  test('Initial state with C_a = 0.1 and pK_a = 1.2', async ({ page }) => {
    await page.locator('#slider-logCa').fill('-1');
    await page.locator('#slider-pka').fill('1.2');
    await page.screenshot({ path: './snapshots/ApproximatePHCalculationOfAcids-1.png', fullPage: true });
  });

  test('State with increased pH and minimum pK_a', async ({ page }) => {
    await page.locator('#slider-logCa').fill('-2');
    await page.locator('#slider-pka').fill('-4');
    await page.screenshot({ path: './snapshots/ApproximatePHCalculationOfAcids-2.png', fullPage: true });
  });

  test('State with low pH and pK_a = 1.0', async ({ page }) => {
    await page.locator('#slider-logCa').fill('-0.5');
    await page.locator('#slider-pka').fill('1');
    await page.screenshot({ path: './snapshots/ApproximatePHCalculationOfAcids-3.png', fullPage: true });
  });

  test('State with low pH and high pK_a', async ({ page }) => {
    await page.locator('#slider-logCa').fill('-0.5');
    await page.locator('#slider-pka').fill('5.5');
    await page.screenshot({ path: './snapshots/ApproximatePHCalculationOfAcids-4.png', fullPage: true });
  });
});