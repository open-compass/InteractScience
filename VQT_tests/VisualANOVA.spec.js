const { test, expect } = require('@playwright/test');

test.describe('VisualANOVA', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/VisualANOVA.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Default state with all means at 0 and standard deviations at 1', async ({ page }) => {
    await page.locator('#slider-mean-w').fill('0');
    await page.locator('#slider-mean-x').fill('0');
    await page.locator('#slider-mean-y').fill('0');
    await page.locator('#slider-mean-z').fill('0');
    await page.locator('#slider-sd-w').fill('1');
    await page.locator('#slider-sd-x').fill('1');
    await page.locator('#slider-sd-y').fill('1');
    await page.locator('#slider-sd-z').fill('1');
    await page.screenshot({ path: './snapshots/VisualANOVA-1.png', fullPage: true });
  });

  test('Separated group means creating a high F-ratio', async ({ page }) => {
    await page.locator('#slider-mean-w').fill('5');
    await page.locator('#slider-mean-x').fill('5');
    await page.locator('#slider-mean-y').fill('-4');
    await page.locator('#slider-mean-z').fill('-4');
    await page.locator('#slider-sd-x').fill('2');
    await page.locator('#slider-sd-y').fill('2');
    await page.locator('#slider-sd-z').fill('2');
    await page.screenshot({ path: './snapshots/VisualANOVA-2.png', fullPage: true });
  });

  test('Zero means with varied standard deviations', async ({ page }) => {
    await page.locator('#slider-sd-x').fill('4');
    await page.locator('#slider-sd-y').fill('2.5');
    await page.locator('#slider-sd-z').fill('3.5');
    await page.screenshot({ path: './snapshots/VisualANOVA-3.png', fullPage: true });
  });

  test('Similar group means with high standard deviations creating a low F-ratio', async ({ page }) => {
    await page.locator('#slider-mean-w').fill('3.4');
    await page.locator('#slider-mean-x').fill('4.4');
    await page.locator('#slider-mean-y').fill('4.2');
    await page.locator('#slider-mean-z').fill('3.8');
    await page.locator('#slider-sd-x').fill('5.5');
    await page.locator('#slider-sd-y').fill('5.5');
    await page.locator('#slider-sd-z').fill('5.5');
    await page.screenshot({ path: './snapshots/VisualANOVA-4.png', fullPage: true });
  });
});