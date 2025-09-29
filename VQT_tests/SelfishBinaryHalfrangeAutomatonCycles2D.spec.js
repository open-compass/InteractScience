const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SelfishBinaryHalfrangeAutomatonCycles2D.html');

test.describe('SelfishBinaryHalfrangeAutomatonCycles2D', () => {
  test('Initial state with default parameters', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/SelfishBinaryHalfrangeAutomatonCycles2D-1.png', fullPage: true });
  });

  test('Automaton path with initialization value 22712', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-initialization').fill('22712');
    await page.screenshot({ path: './snapshots/SelfishBinaryHalfrangeAutomatonCycles2D-2.png', fullPage: true });
  });

  test('Visualization with cycle overlays enabled', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-initialization').fill('22712');
    await page.locator('#checkbox-cycle4').click();
    await page.locator('#checkbox-cycle2').click();
    await page.locator('#checkbox-cycle1').click();
    await page.screenshot({ path: './snapshots/SelfishBinaryHalfrangeAutomatonCycles2D-3.png', fullPage: true });
  });

  test('Visualization with "all map points" overlay enabled', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-initialization').fill('35359');
    await page.locator('#checkbox-all-points').click();
    await page.screenshot({ path: './snapshots/SelfishBinaryHalfrangeAutomatonCycles2D-4.png', fullPage: true });
  });
});