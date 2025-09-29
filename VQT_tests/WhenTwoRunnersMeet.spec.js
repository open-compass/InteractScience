const { test, expect } = require('@playwright/test');

test.describe('WhenTwoRunnersMeet', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/WhenTwoRunnersMeet.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with default parameters showing intersection', async ({ page }) => {
    await page.locator('#btn-reset').click();
    await page.screenshot({ path: './snapshots/WhenTwoRunnersMeet-1.png', fullPage: true });
  });

  test('State after adjusting velocities for both runners', async ({ page }) => {
    await page.locator('#slider-v1').fill('5.15');
    await page.locator('#slider-v2').fill('12.38');
    await page.screenshot({ path: './snapshots/WhenTwoRunnersMeet-2.png', fullPage: true });
  });

  test('State showing no intersection within the time frame', async ({ page }) => {
    await page.locator('#slider-v1').fill('9.25');
    await page.locator('#slider-v2').fill('5');
    await page.screenshot({ path: './snapshots/WhenTwoRunnersMeet-3.png', fullPage: true });
  });

  test('State with custom positions and velocities showing intersection', async ({ page }) => {
    await page.locator('#slider-x1').fill('840');
    await page.locator('#slider-v1').fill('-2.95');
    await page.locator('#slider-x2').fill('110');
    await page.locator('#slider-v2').fill('2.46');
    await page.screenshot({ path: './snapshots/WhenTwoRunnersMeet-4.png', fullPage: true });
  });
});