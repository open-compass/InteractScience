const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/BlockOnAFrictionlessInclinedPlane.html');

test.describe('BlockOnAFrictionlessInclinedPlane Tests', () => {

  test('Initial state with slope at 30 degrees', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-angle').fill('30');
    await page.screenshot({ path: './snapshots/BlockOnAFrictionlessInclinedPlane-1.png', fullPage: true });
  });

  test('State after increasing the slope to 60 degrees', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-angle').fill('60');
    await page.screenshot({ path: './snapshots/BlockOnAFrictionlessInclinedPlane-2.png', fullPage: true });
  });

  test('Block paused mid-slide on the 60-degree slope', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-angle').fill('60');
    await page.locator('#btn-play').click();
    // Wait for the animation to proceed approximately halfway.
    await page.waitForTimeout(500); 
    await page.locator('#btn-pause').click();
    await page.screenshot({ path: './snapshots/BlockOnAFrictionlessInclinedPlane-3.png', fullPage: true });
  });

  test('State after decreasing the slope to 17 degrees', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-angle').fill('17');
    await page.screenshot({ path: './snapshots/BlockOnAFrictionlessInclinedPlane-4.png', fullPage: true });
  });

});