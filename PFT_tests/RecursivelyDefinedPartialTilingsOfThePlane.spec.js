const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/RecursivelyDefinedPartialTilingsOfThePlane.html');

test.describe('Recursively Defined Partial Tilings of the Plane', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the p5.js canvas to be rendered and avoid race conditions
    // await page.waitForSelector('#canvas-container canvas');
    await page.waitForTimeout(500);
  });

  test('“Steps” number input', async ({ page }) => {
    // 1. Assert: The number input with id `input-steps` is visible.
    await expect(page.locator('#input-steps')).toBeVisible();

    // 2. Assert: The value of the input is `2` by default.
    await expect(page.locator('#input-steps')).toHaveValue('2');
    await expect(page.locator('#canvas-container')).toHaveScreenshot('steps-input-default-2.png');

    // 3. Action: Change the value of the number input to `4`.
    await page.locator('#input-steps').fill('4');

    // 4. Assert: The canvas visualization updates to show a more detailed pattern.
    await expect(page.locator('#canvas-container')).toHaveScreenshot('steps-input-value-4.png');

    // 5. Action: Change the value of the number input to the minimum value, `0`.
    await page.locator('#input-steps').fill('0');

    // 6. Assert: The canvas visualization updates to show the base hexagon shape.
    await expect(page.locator('#canvas-container')).toHaveScreenshot('steps-input-value-0.png');
  });

  test('“Zoom” checkbox', async ({ page }) => {
    // 1. Assert: The checkbox with id `checkbox-zoom` is visible.
    await expect(page.locator('#checkbox-zoom')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default.
    await expect(page.locator('#checkbox-zoom')).not.toBeChecked();
    await expect(page.locator('#canvas-container')).toHaveScreenshot('zoom-checkbox-unchecked.png');

    // 3. Action: Click the checkbox to check it.
    await page.locator('#checkbox-zoom').check();

    // 4. Assert: The canvas visualization is redrawn and appears significantly scaled up (zoomed in).
    await expect(page.locator('#canvas-container')).toHaveScreenshot('zoom-checkbox-checked.png');

    // 5. Action: Click the checkbox again to uncheck it.
    await page.locator('#checkbox-zoom').uncheck();

    // 6. Assert: The canvas visualization is redrawn and returns to the default scaled-out view.
    await expect(page.locator('#canvas-container')).toHaveScreenshot('zoom-checkbox-unchecked.png');
  });

  test('“Color” dropdown select', async ({ page }) => {
    // 1. Assert: The dropdown select with id `select-color` is visible.
    await expect(page.locator('#select-color')).toBeVisible();

    // 2. Assert: The selected option has the value `DarkRainbow` by default.
    await expect(page.locator('#select-color')).toHaveValue('DarkRainbow');
    await expect(page.locator('#canvas-container')).toHaveScreenshot('color-select-darkrainbow.png');

    // 3. Action: Select the `RustTones` option from the dropdown.
    await page.locator('#select-color').selectOption('RustTones');

    // 4. Assert: The colors of the tiles on the canvas change.
    await expect(page.locator('#canvas-container')).toHaveScreenshot('color-select-rusttones.png');

    // 5. Action: Select the `Grays` option from the dropdown.
    await page.locator('#select-color').selectOption('Grays');

    // 6. Assert: The colors of the tiles on the canvas change again.
    await expect(page.locator('#canvas-container')).toHaveScreenshot('color-select-grays.png');
  });
});