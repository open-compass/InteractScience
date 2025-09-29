const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/MappingLetterFrequencyToAKeyboard.html');

test.describe('Mapping Letter Frequency to a Keyboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Text Selection Dropdown', async ({ page }) => {
    // 1. Assert: The dropdown with id `select-text` is visible.
    await expect(page.locator('#select-text')).toBeVisible();

    // 2. Assert: The dropdown's selected value is "To Be Or Not To Be".
    await expect(page.locator('#select-text')).toHaveValue('To Be Or Not To Be');

    const canvas = page.locator('#visualization-canvas');
    const initialScreenshot = await canvas.screenshot();

    // 3. Action: Select the option "The quick brown fox jumps over the lazy dog" from the dropdown.
    await page.locator('#select-text').selectOption('The quick brown fox jumps over the lazy dog');

    // 4. Assert: The visualization on the canvas changes, and the Y-axis scale is updated.
    await expect(canvas).not.toHaveScreenshot(initialScreenshot);

    // 5. Action: Select the initial option, "To Be Or Not To Be", from the dropdown.
    await page.locator('#select-text').selectOption('To Be Or Not To Be');

    // 6. Assert: The visualization on the canvas changes back to reflect the letter frequencies of the initial text.
    await expect(canvas).toHaveScreenshot(initialScreenshot);
  });

  test('Plot View Toggle Buttons', async ({ page }) => {
    // 1. Assert: The button with id `btn-plot-3d` is visible.
    await expect(page.locator('#btn-plot-3d')).toBeVisible();

    // 2. Assert: The button `btn-plot-3d` is inactive and `btn-plot-2d` is active.
    await expect(page.locator('#btn-plot-3d')).not.toHaveClass('active');
    await expect(page.locator('#btn-plot-2d')).toHaveClass('active');

    const canvas = page.locator('#visualization-canvas');
    const initialScreenshot = await canvas.screenshot();

    // 3. Action: Click the "keyboard 3D" button (`btn-plot-3d`).
    await page.locator('#btn-plot-3d').click();

    // 4. Assert: The button `btn-plot-3d` becomes active, `btn-plot-2d` becomes inactive, and the canvas displays a 3D keyboard visualization.
    await expect(page.locator('#btn-plot-3d')).toHaveClass('active');
    await expect(page.locator('#btn-plot-2d')).not.toHaveClass('active');
    await expect(canvas).not.toHaveScreenshot(initialScreenshot);

    // 5. Action: Click the "distribution 2D" button (`btn-plot-2d`).
    await page.locator('#btn-plot-2d').click();

    // 6. Assert: The button `btn-plot-2d` becomes active, `btn-plot-3d` becomes inactive, and the canvas displays a 2D bar chart visualization.
    await expect(page.locator('#btn-plot-2d')).toHaveClass('active');
    await expect(page.locator('#btn-plot-3d')).not.toHaveClass('active');
    await expect(canvas).toHaveScreenshot(initialScreenshot);
  });

  test('Keyboard Layout Toggle Buttons', async ({ page }) => {
    // 1. Assert: The button with id `btn-keyboard-dvorak` is visible.
    await expect(page.locator('#btn-keyboard-dvorak')).toBeVisible();

    // 2. Assert: The button `btn-keyboard-dvorak` is inactive and `btn-keyboard-qwerty` is active.
    await expect(page.locator('#btn-keyboard-dvorak')).not.toHaveClass('active');
    await expect(page.locator('#btn-keyboard-qwerty')).toHaveClass('active');

    // 3. Action: First, click the "keyboard 3D" button (`btn-plot-3d`). Then, click the "Dvorak" button (`btn-keyboard-dvorak`).
    await page.locator('#btn-plot-3d').click();
    const qwertyScreenshot = await page.locator('#visualization-canvas').screenshot();
    await page.locator('#btn-keyboard-dvorak').click();

    // 4. Assert: The button `btn-keyboard-dvorak` becomes active, `btn-keyboard-qwerty` becomes inactive, and the key layout in the 3D visualization changes.
    await expect(page.locator('#btn-keyboard-dvorak')).toHaveClass('active');
    await expect(page.locator('#btn-keyboard-qwerty')).not.toHaveClass('active');
    await expect(page.locator('#visualization-canvas')).not.toHaveScreenshot(qwertyScreenshot);

    // 5. Action: Click the "QWERTY" button (`btn-keyboard-qwerty`).
    await page.locator('#btn-keyboard-qwerty').click();

    // 6. Assert: The button `btn-keyboard-qwerty` becomes active, `btn-keyboard-dvorak` becomes inactive, and the key layout in the 3D visualization changes back to QWERTY.
    await expect(page.locator('#btn-keyboard-qwerty')).toHaveClass('active');
    await expect(page.locator('#btn-keyboard-dvorak')).not.toHaveClass('active');
    await expect(page.locator('#visualization-canvas')).toHaveScreenshot(qwertyScreenshot);
  });
});