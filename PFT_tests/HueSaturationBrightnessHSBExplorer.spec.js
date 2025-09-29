const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/HueSaturationBrightnessHSBExplorer.html');

test.describe('HSB Color Explorer', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for p5.js to potentially finish its first draw cycle.
    // A small arbitrary delay can help ensure canvases are drawn.
    await page.waitForTimeout(500);
  });

  test('Hue Slider Control', async ({ page }) => {
    // 1. Assert: The hue slider (`#slider-hue`) is visible.
    await expect(page.locator('#slider-hue')).toBeVisible();

    // 2. Assert: The slider's value is `0` and its corresponding text display (`#value-hue`) shows "0".
    await expect(page.locator('#slider-hue')).toHaveValue('0');
    await expect(page.locator('#value-hue')).toHaveText('0');
    
    const initialArrowStyle = await page.locator('#arrow-hue').getAttribute('style');
    const initialVizScreenshot = await page.locator('#visualization-container').screenshot();

    // 3. Action: Drag the hue slider to a new value, such as `0.3`.
    await page.locator('#slider-hue').fill('0.3');

    // 4. Assert: The `#value-hue` text updates, the `#arrow-hue` moves, and the saturation, brightness, and result color bars change color.
    await expect(page.locator('#value-hue')).toHaveText(/^0\.30*$/);
    const newArrowStyle = await page.locator('#arrow-hue').getAttribute('style');
    expect(newArrowStyle).not.toEqual(initialArrowStyle);
    const newVizScreenshot = await page.locator('#visualization-container').screenshot();
    expect(newVizScreenshot).not.toEqual(initialVizScreenshot);

    // 5. Action: Drag the hue slider to its maximum value, `1`.
    await page.locator('#slider-hue').fill('1');

    // 6. Assert: The `#value-hue` text shows `1`, the `#arrow-hue` is at the far right, and the color bars update again.
    await expect(page.locator('#value-hue')).toHaveText('1');
    const finalArrowStyle = await page.locator('#arrow-hue').getAttribute('style');
    expect(finalArrowStyle).not.toEqual(newArrowStyle);
    const finalVizScreenshot = await page.locator('#visualization-container').screenshot();
    expect(finalVizScreenshot).not.toEqual(newVizScreenshot);
  });

  test('Saturation Slider Control', async ({ page }) => {
    // 1. Assert: The saturation slider (`#slider-saturation`) is visible.
    await expect(page.locator('#slider-saturation')).toBeVisible();

    // 2. Assert: The slider's value is `0.5` and its corresponding text display (`#value-saturation`) shows "0.5".
    await expect(page.locator('#slider-saturation')).toHaveValue('0.5');
    await expect(page.locator('#value-saturation')).toHaveText(/^0\.50*$/);

    const initialArrowStyle = await page.locator('#arrow-saturation').getAttribute('style');
    const initialVizScreenshot = await page.locator('#visualization-container').screenshot();

    // 3. Action: Drag the saturation slider to a new value, such as `0.8`.
    await page.locator('#slider-saturation').fill('0.8');

    // 4. Assert: The `#value-saturation` text updates, the `#arrow-saturation` moves, and the brightness and result color bars change color.
    await expect(page.locator('#value-saturation')).toHaveText(/^0\.80*$/);
    const newArrowStyle = await page.locator('#arrow-saturation').getAttribute('style');
    expect(newArrowStyle).not.toEqual(initialArrowStyle);
    const newVizScreenshot = await page.locator('#visualization-container').screenshot();
    expect(newVizScreenshot).not.toEqual(initialVizScreenshot);

    // 5. Action: Drag the saturation slider to its minimum value, `0`.
    await page.locator('#slider-saturation').fill('0');

    // 6. Assert: The `#value-saturation` text shows `0`, the `#arrow-saturation` is at the far left, and the result bar becomes a shade of gray.
    await expect(page.locator('#value-saturation')).toHaveText('0');
    const finalArrowStyle = await page.locator('#arrow-saturation').getAttribute('style');
    expect(finalArrowStyle).not.toEqual(newArrowStyle);
    const finalVizScreenshot = await page.locator('#visualization-container').screenshot();
    expect(finalVizScreenshot).not.toEqual(newVizScreenshot);
  });

  test('Brightness Slider Control', async ({ page }) => {
    // 1. Assert: The brightness slider (`#slider-brightness`) is visible.
    await expect(page.locator('#slider-brightness')).toBeVisible();

    // 2. Assert: The slider's value is `1` and its corresponding text display (`#value-brightness`) shows "1".
    await expect(page.locator('#slider-brightness')).toHaveValue('1');
    await expect(page.locator('#value-brightness')).toHaveText('1');
    
    const initialArrowStyle = await page.locator('#arrow-brightness').getAttribute('style');
    const initialVizScreenshot = await page.locator('#visualization-container').screenshot();

    // 3. Action: Drag the brightness slider to a new value, such as `0.4`.
    await page.locator('#slider-brightness').fill('0.4');

    // 4. Assert: The `#value-brightness` text updates, the `#arrow-brightness` moves, and the saturation and result color bars change color.
    await expect(page.locator('#value-brightness')).toHaveText(/^0\.40*$/);
    const newArrowStyle = await page.locator('#arrow-brightness').getAttribute('style');
    expect(newArrowStyle).not.toEqual(initialArrowStyle);
    const newVizScreenshot = await page.locator('#visualization-container').screenshot();
    expect(newVizScreenshot).not.toEqual(initialVizScreenshot);

    // 5. Action: Drag the brightness slider to its minimum value, `0`.
    await page.locator('#slider-brightness').fill('0');

    // 6. Assert: The `#value-brightness` text shows `0`, the `#arrow-brightness` is at the far left, and the result bar becomes black.
    await expect(page.locator('#value-brightness')).toHaveText('0');
    const finalArrowStyle = await page.locator('#arrow-brightness').getAttribute('style');
    expect(finalArrowStyle).not.toEqual(newArrowStyle);
    const finalVizScreenshot = await page.locator('#visualization-container').screenshot();
    expect(finalVizScreenshot).not.toEqual(newVizScreenshot);
  });

  test('Reset Button Functionality', async ({ page }) => {
    // 1. Assert: The reset button (`#btn-reset`) is visible.
    await expect(page.locator('#btn-reset')).toBeVisible();

    // 2. Assert: The hue, saturation, and brightness sliders are at their default values (`0`, `0.5`, `1`).
    await expect(page.locator('#slider-hue')).toHaveValue('0');
    await expect(page.locator('#slider-saturation')).toHaveValue('0.5');
    await expect(page.locator('#slider-brightness')).toHaveValue('1');
    
    const initialArrowHueStyle = await page.locator('#arrow-hue').getAttribute('style');
    const initialArrowSatStyle = await page.locator('#arrow-saturation').getAttribute('style');
    const initialArrowBriStyle = await page.locator('#arrow-brightness').getAttribute('style');
    const initialScreenshot = await page.locator('#app-container').screenshot();

    // 3. Action: Change the values of all three sliders to non-default values, then click the reset button.
    await page.locator('#slider-hue').fill('0.3');
    await page.locator('#slider-saturation').fill('0.8');
    await page.locator('#slider-brightness').fill('0.4');
    await page.locator('#btn-reset').click();

    // 4. Assert: All sliders, value displays (`#value-*`), and arrow positions (`#arrow-*`) return to their initial default states.
    await expect(page.locator('#slider-hue')).toHaveValue('0');
    await expect(page.locator('#value-hue')).toHaveText('0');
    await expect(page.locator('#slider-saturation')).toHaveValue('0.5');
    await expect(page.locator('#value-saturation')).toHaveText(/^0\.50*$/);
    await expect(page.locator('#slider-brightness')).toHaveValue('1');
    await expect(page.locator('#value-brightness')).toHaveText('1');

    await expect(page.locator('#arrow-hue')).toHaveAttribute('style', initialArrowHueStyle);
    await expect(page.locator('#arrow-saturation')).toHaveAttribute('style', initialArrowSatStyle);
    await expect(page.locator('#arrow-brightness')).toHaveAttribute('style', initialArrowBriStyle);
    
    const afterResetScreenshot = await page.locator('#app-container').screenshot();
    expect(afterResetScreenshot).toEqual(initialScreenshot);

    // 5. Action: Click the reset button again.
    const screenshotBeforeSecondClick = await page.locator('#app-container').screenshot();
    await page.locator('#btn-reset').click();

    // 6. Assert: The UI remains unchanged, with all controls and visualizations in their default state.
    const screenshotAfterSecondClick = await page.locator('#app-container').screenshot();
    expect(screenshotAfterSecondClick).toEqual(screenshotBeforeSecondClick);
  });

});