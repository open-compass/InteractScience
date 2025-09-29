const { test, expect } = require('@playwright/test');

test.describe('Single Component Fugacity', () => {
  let fileUrl;

  test.beforeEach(async ({ page }) => {
    fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SingleComponentFugacity.html');
    await page.goto(fileUrl);
  });

  test('Default view showing fugacity vs. temperature at 0.08 bar', async ({ page }) => {
    await page.locator('#slider-pressure').fill('0.08');
    await page.screenshot({ path: './snapshots/SingleComponentFugacity-1.png', fullPage: true });
  });

  test('Fugacity vs. pressure plot at 475 K with high pressure enabled', async ({ page }) => {
    await page.locator('#select-plot').selectOption('vs_press');
    await page.screenshot({ path: './snapshots/SingleComponentFugacity-2.png', fullPage: true });
  });

  test('Fugacity vs. temperature plot at a lower pressure of 0.03 bar', async ({ page }) => {
    await page.locator('#select-plot').selectOption('vs_temp');
    await page.locator('#slider-pressure').fill('0.03');
    await page.screenshot({ path: './snapshots/SingleComponentFugacity-3.png', fullPage: true });
  });

  test('Fugacity vs. pressure plot at a higher temperature of 483 K', async ({ page }) => {
    await page.locator('#select-plot').selectOption('vs_press');
    await page.locator('#slider-temperature').fill('483');
    await page.screenshot({ path: './snapshots/SingleComponentFugacity-4.png', fullPage: true });
  });
});