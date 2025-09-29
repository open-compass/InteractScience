const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ApplyingGraphicsFiltersUsingConvolution.html');

test.describe('Applying Graphics Filters Using Convolution', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Default state with letter \'a\' and shadow filter', async ({ page }) => {
    await page.screenshot({ path: './snapshots/ApplyingGraphicsFiltersUsingConvolution-1.png', fullPage: true });
  });

  test('Letter \'m\' with the default shadow filter', async ({ page }) => {
    await page.locator('#input-letter').fill('m');
    await page.screenshot({ path: './snapshots/ApplyingGraphicsFiltersUsingConvolution-2.png', fullPage: true });
  });

  test('Low-resolution letter \'j\' with minimum blur filter', async ({ page }) => {
    await page.locator('#slider-convolver').fill('1');
    await page.locator('#slider-image-size').fill('10');
    await page.locator('#input-letter').fill('j');
    await page.locator('#radio-blur').click();
    await page.screenshot({ path: './snapshots/ApplyingGraphicsFiltersUsingConvolution-3.png', fullPage: true });
  });

  test('High-resolution letter \'d\' with a strong shadow filter', async ({ page }) => {
    await page.locator('#slider-convolver').fill('4');
    await page.locator('#slider-image-size').fill('34');
    await page.locator('#input-letter').fill('d');
    await page.locator('#radio-shadow').click();
    await page.screenshot({ path: './snapshots/ApplyingGraphicsFiltersUsingConvolution-4.png', fullPage: true });
  });

});