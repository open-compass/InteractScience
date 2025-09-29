const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/PinchCompositionVersusRefluxRatioForABenzeneEthylenediamineM.html');

test.describe('Pinch Composition Versus Reflux Ratio For A Benzene-Ethylenediamine Mixture', () => {

  test('Initial state with distillate composition at 0.84', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/PinchCompositionVersusRefluxRatioForABenzeneEthylenediamineM-1.png', fullPage: true });
  });

  test('Plot with distillate composition at 0.99, showing a tangent pinch point', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-xD').fill('0.99');
    await page.screenshot({ path: './snapshots/PinchCompositionVersusRefluxRatioForABenzeneEthylenediamineM-2.png', fullPage: true });
  });

  test('Plot with distillate composition at 0.92, showing a tangent pinch point at a lower value', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-xD').fill('0.92');
    await page.screenshot({ path: './snapshots/PinchCompositionVersusRefluxRatioForABenzeneEthylenediamineM-3.png', fullPage: true });
  });

  test('Plot with distillate composition returned to 0.84, with the tangent pinch point disappearing', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-xD').fill('0.84');
    await page.screenshot({ path: './snapshots/PinchCompositionVersusRefluxRatioForABenzeneEthylenediamineM-4.png', fullPage: true });
  });

});