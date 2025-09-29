const { test, expect } = require('@playwright/test');

test.describe('DiauxicBehaviorOfYeastInAFedBatchReactor', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/DiauxicBehaviorOfYeastInAFedBatchReactor.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with default parameters and "fed batch" plots', async ({ page }) => {
    await page.screenshot({ path: './snapshots/DiauxicBehaviorOfYeastInAFedBatchReactor-1.png', fullPage: true });
  });

  test('Plots showing the effect of high enzyme control and maximum feed rate', async ({ page }) => {
    await page.locator('#slider-enzyme-control').fill('3');
    await page.locator('#slider-feed-rate').fill('2');
    await page.screenshot({ path: './snapshots/DiauxicBehaviorOfYeastInAFedBatchReactor-2.png', fullPage: true });
  });

  test('Plots showing the effect of an increased fraction of respiring biomass and feed rate', async ({ page }) => {
    await page.locator('#slider-alpha-max').fill('0.6');
    await page.locator('#slider-feed-rate').fill('0.3');
    await page.screenshot({ path: './snapshots/DiauxicBehaviorOfYeastInAFedBatchReactor-3.png', fullPage: true });
  });

  test('Alpha plot view with high biomass fraction and adjusted feed time', async ({ page }) => {
    await page.locator('#slider-alpha-max').fill('0.8');
    await page.locator('#slider-feed-time').fill('39');
    await page.locator('#select-plot').selectOption('α');
    await page.screenshot({ path: './snapshots/DiauxicBehaviorOfYeastInAFedBatchReactor-4.png', fullPage: true });
  });
});