const { test, expect } = require('@playwright/test');

test.describe('SphericalSeismicWaves', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SphericalSeismicWaves.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Top-down view of combined P and S-waves after a short time', async ({ page }) => {
    await page.locator('#time-slider').evaluate((node, value) => {
        node.value = value;
        node.dispatchEvent(new Event('input', { bubbles: true }));
    }, 3.5);
    await page.screenshot({ path: './snapshots/SphericalSeismicWaves-1.png', fullPage: true });
  });

  test('Top-down view of concentric waves with S-wave direction set to \'z\'', async ({ page }) => {
    await page.locator('#s-wave-dir-z-button').click();
    await page.locator('#time-slider').evaluate((node, value) => {
        node.value = value;
        node.dispatchEvent(new Event('input', { bubbles: true }));
    }, 8.0);
    await page.screenshot({ path: './snapshots/SphericalSeismicWaves-2.png', fullPage: true });
  });

  test('Top-down view of combined P and S-waves after a longer time', async ({ page }) => {
    await page.locator('#time-slider').evaluate((node, value) => {
        node.value = value;
        node.dispatchEvent(new Event('input', { bubbles: true }));
    }, 15.0);
    await page.screenshot({ path: './snapshots/SphericalSeismicWaves-3.png', fullPage: true });
  });

  test('Default perspective view of the fully propagated spiral waves', async ({ page }) => {
    await page.locator('#time-slider').evaluate((node, value) => {
        node.value = value;
        node.dispatchEvent(new Event('input', { bubbles: true }));
    }, 15.0);
    await page.locator('#viewpoint-default-button').click();
    await page.screenshot({ path: './snapshots/SphericalSeismicWaves-4.png', fullPage: true });
  });
});