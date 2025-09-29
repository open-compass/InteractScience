const { test, expect } = require('@playwright/test');

test.describe('PlacingObjectsAtPredeterminedSetsOfPoints', () => {
  test.beforeEach(async ({ page }) => {
    const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/PlacingObjectsAtPredeterminedSetsOfPoints.html');
    await page.goto(fileUrl);
  });

  test('Cube with long, thin cones', async ({ page }) => {
    await page.locator('#btn-cube').click();

    const coneHeightSlider = page.locator('#slider-cone-height');
    await coneHeightSlider.fill('3.6');

    const coneBaseSlider = page.locator('#slider-cone-base');
    await coneBaseSlider.fill('0.15');

    const canvas = page.locator('#canvas-container canvas');
    const boundingBox = await canvas.boundingBox();
    if (boundingBox) {
      const startX = boundingBox.x + boundingBox.width / 2;
      const startY = boundingBox.y + boundingBox.height / 2;
      const endX = startX - 100;
      const endY = startY - 100;

      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(endX, endY);
      await page.mouse.up();
    }

    await page.screenshot({ path: './snapshots/PlacingObjectsAtPredeterminedSetsOfPoints-1.png', fullPage: true });
  });

  test('Dodecahedron with short, wide cones', async ({ page }) => {
    await page.locator('#btn-dodecahedron').click();

    const coneHeightSlider = page.locator('#slider-cone-height');
    await coneHeightSlider.fill('1.27');

    const coneBaseSlider = page.locator('#slider-cone-base');
    await coneBaseSlider.fill('0.4');

    await page.screenshot({ path: './snapshots/PlacingObjectsAtPredeterminedSetsOfPoints-2.png', fullPage: true });
  });

  test('Octahedron with large cones', async ({ page }) => {
    await page.locator('#btn-octahedron').click();

    const coneHeightSlider = page.locator('#slider-cone-height');
    await coneHeightSlider.fill('2.4');

    const coneBaseSlider = page.locator('#slider-cone-base');
    await coneBaseSlider.fill('0.7');

    await page.screenshot({ path: './snapshots/PlacingObjectsAtPredeterminedSetsOfPoints-3.png', fullPage: true });
  });

  test('Small Icosahedron with stubby cones', async ({ page }) => {
    await page.locator('#btn-icosahedron').click();

    const sphereDiameterSlider = page.locator('#slider-sphere-diameter');
    await sphereDiameterSlider.fill('0.75');

    const coneHeightSlider = page.locator('#slider-cone-height');
    await coneHeightSlider.fill('0.88');

    const coneBaseSlider = page.locator('#slider-cone-base');
    await coneBaseSlider.fill('0.43');

    await page.screenshot({ path: './snapshots/PlacingObjectsAtPredeterminedSetsOfPoints-4.png', fullPage: true });
  });
});