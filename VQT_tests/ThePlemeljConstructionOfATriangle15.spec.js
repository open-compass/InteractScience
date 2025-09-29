const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ThePlemeljConstructionOfATriangle15.html');

test.describe('The Plemelj Construction of a Triangle', () => {
  test('Initial state with default parameters and verification enabled', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/ThePlemeljConstructionOfATriangle15-1.png', fullPage: true });
  });

  test('Construction at step 2 with modified parameters and verification disabled', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-c').fill('5');
    await page.locator('#slider-h_C').fill('2.8');
    await page.locator('#step2').click();
    await page.locator('#check-verification').uncheck();
    await page.locator('#slider-plot-range').fill('1.37');
    await page.screenshot({ path: './snapshots/ThePlemeljConstructionOfATriangle15-2.png', fullPage: true });
  });

  test('Construction advanced to step 3, showing point B', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-c').fill('5');
    await page.locator('#slider-h_C').fill('2.8');
    await page.locator('#slider-plot-range').fill('1.37');
    await page.locator('#check-verification').uncheck();
    await page.locator('#step3').click();
    await page.screenshot({ path: './snapshots/ThePlemeljConstructionOfATriangle15-3.png', fullPage: true });
  });

  test('Construction completed at step 5 with verification disabled', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-c').fill('5');
    await page.locator('#slider-h_C').fill('2.8');
    await page.locator('#slider-plot-range').fill('1.37');
    await page.locator('#check-verification').uncheck();
    await page.locator('#step5').click();
    await page.screenshot({ path: './snapshots/ThePlemeljConstructionOfATriangle15-4.png', fullPage: true });
  });
});