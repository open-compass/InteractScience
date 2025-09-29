const { test, expect } = require('@playwright/test');

test.describe('Multicomponent Distillation Column', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/MulticomponentDistillationColumn.html');

  test('Initial plot of benzene mole fraction for a step in reflux ratio at stage 5', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/MulticomponentDistillationColumn-1.png', fullPage: true });
  });

  test('Plot of benzene mole fraction for a step in reboil ratio at stage 5', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#step-reboil').click();
    await page.screenshot({ path: './snapshots/MulticomponentDistillationColumn-2.png', fullPage: true });
  });

  test('Plot of toluene mole fraction for a positive step in reflux ratio at stage 8', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#step-percent').fill('0.3');
    await page.locator('#stage-8').click();
    await page.locator('#comp-toluene').click();
    await page.screenshot({ path: './snapshots/MulticomponentDistillationColumn-3.png', fullPage: true });
  });

  test('Plot of p-xylene mole fraction for a step in reboil ratio at stage 6', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#step-reboil').click();
    await page.locator('#step-percent').fill('-0.4');
    await page.locator('#stage-6').click();
    await page.locator('#comp-pxylene').click();
    await page.screenshot({ path: './snapshots/MulticomponentDistillationColumn-4.png', fullPage: true });
  });
});