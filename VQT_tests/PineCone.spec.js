const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/PineCone.html');

test.describe('PineCone Visualization Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Pine cone with 6-sided base polygons at default settings', async ({ page }) => {
    await page.getByLabel('6', { exact: true }).click();
    await page.screenshot({ path: './snapshots/PineCone-1.png', fullPage: true });
  });

  test('Pine cone with 9-sided base polygons at default settings', async ({ page }) => {
    await page.getByLabel('9', { exact: true }).click();
    await page.screenshot({ path: './snapshots/PineCone-2.png', fullPage: true });
  });

  test('Pine cone with 6-sided polygons and maximum angular advance', async ({ page }) => {
    await page.getByLabel('6', { exact: true }).click();

    const slider = page.locator('#slider-angle');
    const boundingBox = await slider.boundingBox();
    await page.mouse.move(boundingBox.x, boundingBox.y + boundingBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(boundingBox.x + boundingBox.width, boundingBox.y + boundingBox.height / 2);
    await page.mouse.up();

    await page.screenshot({ path: './snapshots/PineCone-3.png', fullPage: true });
  });

  test('Conical pine cone with maximum units and 6-sided polygons', async ({ page }) => {
    await page.getByLabel('6', { exact: true }).click();

    const unitsSlider = page.locator('#slider-units');
    const unitsBox = await unitsSlider.boundingBox();
    await page.mouse.move(unitsBox.x, unitsBox.y + unitsBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(unitsBox.x + unitsBox.width, unitsBox.y + unitsBox.height / 2);
    await page.mouse.up();

    const conicalSlider = page.locator('#slider-conical');
    const conicalBox = await conicalSlider.boundingBox();
    await page.mouse.move(conicalBox.x, conicalBox.y + conicalBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(conicalBox.x + conicalBox.width / 2, conicalBox.y + conicalBox.height / 2);
    await page.mouse.up();

    await page.screenshot({ path: './snapshots/PineCone-4.png', fullPage: true });
  });
});