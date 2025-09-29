const { test, expect } = require('@playwright/test');

test.describe('TheEarthAsSeenFromTheMoon', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/TheEarthAsSeenFromTheMoon.html');

  test('Initial state of the simulation', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/TheEarthAsSeenFromTheMoon-1.png', fullPage: true });
  });

  test('View with adjusted Sun-Earth angle and zodiac rotation', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-sun-earth-angle').fill('4.8');
    await page.locator('#slider-zodiac').fill('1.27');
    await page.screenshot({ path: './snapshots/TheEarthAsSeenFromTheMoon-2.png', fullPage: true });
  });

  test('View after advancing time to 81.15 days', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-time').fill('81.15');
    await page.locator('#slider-nodal-angle').fill('0.09');
    await page.locator('#slider-zodiac').fill('0.35');
    await page.screenshot({ path: './snapshots/TheEarthAsSeenFromTheMoon-3.png', fullPage: true });
  });

  test('View showing a lunar eclipse', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-time').fill('95.55');
    await page.locator('#slider-nodal-angle').fill('0.04');
    await page.locator('#slider-zodiac').fill('0.9');
    await page.screenshot({ path: './snapshots/TheEarthAsSeenFromTheMoon-4.png', fullPage: true });
  });
});