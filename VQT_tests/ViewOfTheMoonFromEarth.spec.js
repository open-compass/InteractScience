const { test, expect } = require('@playwright/test');

test.describe('View of the Moon from Earth', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ViewOfTheMoonFromEarth.html');

  test('Initial view of the simulation at time 0', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/ViewOfTheMoonFromEarth-1.png', fullPage: true });
  });

  test('View at 13 days 15 hours with day/night terminator', async ({ page }) => {
    await page.goto(fileUrl);
    // 13 days 15 hours = 13 * 24 + 15 = 327 hours
    await page.locator('#slider-time').fill('327');
    await page.locator('#check-day-night').click();
    await page.screenshot({ path: './snapshots/ViewOfTheMoonFromEarth-2.png', fullPage: true });
  });

  test('View at 13 days 15 hours with half rotational period', async ({ page }) => {
    await page.goto(fileUrl);
    // 13 days 15 hours = 13 * 24 + 15 = 327 hours
    await page.locator('#slider-time').fill('327');
    await page.locator('#btn-rot-half').click();
    await page.locator('#check-day-night').click();
    await page.screenshot({ path: './snapshots/ViewOfTheMoonFromEarth-3.png', fullPage: true });
  });

  test('View at 23 days 19 hours with no lunar rotation and fewer visual aids', async ({ page }) => {
    await page.goto(fileUrl);
    // 23 days 19 hours = 23 * 24 + 19 = 571 hours
    await page.locator('#slider-time').fill('571');
    await page.locator('#btn-rot-none').click();
    await page.locator('#check-day-night').click();
    await page.locator('#check-near-side').click();
    await page.locator('#check-earth-moon-line').click();
    await page.screenshot({ path: './snapshots/ViewOfTheMoonFromEarth-4.png', fullPage: true });
  });
});