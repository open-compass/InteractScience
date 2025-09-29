const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/OpacityExplorer2D.html');

test.describe('Opacity Explorer 2D', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Opacity 1 Slider Control', async ({ page }) => {
    const slider = page.locator('#slider-opacity1');

    // 1. Assert: The opacity slider with id `slider-opacity1` is visible.
    await expect(slider).toBeVisible();

    // 2. Assert: The value of `slider-opacity1` is 0.7.
    await expect(slider).toHaveValue('0.7');

    // 3. Action: Drag the `slider-opacity1` handle to the left, setting its value to 0.2.
    // 4. Assert: The canvas is redrawn, and the visual transparency of circle "1" increases.
    await slider.fill('0.2');
    await expect(slider).toHaveValue('0.2');

    // 5. Action: Drag the `slider-opacity1` handle to its maximum position (value 1).
    // 6. Assert: The canvas is redrawn, and circle "1" appears fully opaque.
    await slider.fill('1');
    await expect(slider).toHaveValue('1');
  });

  test('Layering Order Control Buttons', async ({ page }) => {
    const layeringDisplay = page.locator('#layering-display');
    const btnNext = page.locator('#btn-layer-next');
    const btnPrev = page.locator('#btn-layer-prev');

    // 1. Assert: The layering display `layering-display` and its associated next/previous buttons (`btn-layer-next`/`btn-layer-prev`) are visible.
    await expect(layeringDisplay).toBeVisible();
    await expect(btnNext).toBeVisible();
    await expect(btnPrev).toBeVisible();

    // 2. Assert: The text content of `layering-display` is "1, 2, 3, 4".
    await expect(layeringDisplay).toHaveText('1, 2, 3, 4');

    // 3. Action: Click the `btn-layer-next` button.
    // 4. Assert: The text content of `layering-display` changes to "4, 3, 2, 1" and the canvas is redrawn, showing a new stacking order.
    await btnNext.click();
    await expect(layeringDisplay).toHaveText('4, 3, 2, 1');

    // 5. Action: Click the `btn-layer-prev` button twice.
    // 6. Assert: The text content of `layering-display` changes to "3, 1, 4, 2" due to wrap-around behavior, and the canvas is redrawn.
    await btnPrev.click();
    await btnPrev.click();
    await expect(layeringDisplay).toHaveText('3, 1, 4, 2');
  });

  test('Color 1 Picker Control', async ({ page }) => {
    const colorPicker = page.locator('#color-picker1');

    // 1. Assert: The color picker with id `color-picker1` is visible.
    await expect(colorPicker).toBeVisible();

    // 2. Assert: The value of `color-picker1` is "#00ff00".
    await expect(colorPicker).toHaveValue('#00ff00');

    // 3. Action: Change the value of `color-picker1` to a new color, "#ff00ff" (magenta).
    // 4. Assert: The canvas is redrawn, and the base color of circle "1" changes.
    await colorPicker.fill('#ff00ff');
    await expect(colorPicker).toHaveValue('#ff00ff');

    // 5. Action: Change the value of `color-picker1` to another color, "#ffff00" (yellow).
    // 6. Assert: The canvas is redrawn, and the base color of circle "1" changes again.
    await colorPicker.fill('#ffff00');
    await expect(colorPicker).toHaveValue('#ffff00');
  });

  test('Global Reset Button', async ({ page }) => {
    const resetButton = page.locator('#btn-reset');
    const slider1 = page.locator('#slider-opacity1');
    const layeringDisplay = page.locator('#layering-display');
    const btnLayerNext = page.locator('#btn-layer-next');

    // 1. Assert: The reset button with id `btn-reset` is visible.
    await expect(resetButton).toBeVisible();

    // 2. Assert: The value of `slider-opacity1` is 0.7 and the text of `layering-display` is "1, 2, 3, 4".
    await expect(slider1).toHaveValue('0.7');
    await expect(layeringDisplay).toHaveText('1, 2, 3, 4');

    // 3. Action: Set `slider-opacity1` to 0.1 and click `btn-layer-next` to change the layering to "4, 3, 2, 1".
    await slider1.fill('0.1');
    await btnLayerNext.click();

    // 4. Assert: The value of `slider-opacity1` is now 0.1, the `layering-display` text is "4, 3, 2, 1", and the canvas has been updated.
    await expect(slider1).toHaveValue('0.1');
    await expect(layeringDisplay).toHaveText('4, 3, 2, 1');

    // 5. Action: Click the `btn-reset` button.
    await resetButton.click();

    // 6. Assert: The value of `slider-opacity1` returns to 0.7, the `layering-display` text returns to "1, 2, 3, 4", and the canvas is redrawn to its initial state.
    await expect(slider1).toHaveValue('0.7');
    await expect(layeringDisplay).toHaveText('1, 2, 3, 4');
  });
});