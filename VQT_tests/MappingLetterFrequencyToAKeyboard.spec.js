const { test, expect } = require('@playwright/test');
const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/MappingLetterFrequencyToAKeyboard.html');

test.describe('Mapping Letter Frequency To A Keyboard', () => {

  test('3D QWERTY keyboard view for the default text', async ({ page }) => {
    await page.goto(fileUrl);
    // Action: Wait for the application to load. It will display the 2D distribution plot by default.
    // Action: Click the "keyboard 3D" button.
    await page.locator('#btn-plot-3d').click();
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/MappingLetterFrequencyToAKeyboard-1.png', fullPage: true });
  });

  test('2D letter frequency distribution for the default text', async ({ page }) => {
    await page.goto(fileUrl);
    // Action: Click the "keyboard 3D" button.
    await page.locator('#btn-plot-3d').click();
    // Action: Click the "distribution 2D" button.
    await page.locator('#btn-plot-2d').click();
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/MappingLetterFrequencyToAKeyboard-2.png', fullPage: true });
  });

  test('3D Dvorak keyboard view for the default text', async ({ page }) => {
    await page.goto(fileUrl);
    // Action: Click the "keyboard 3D" button.
    await page.locator('#btn-plot-3d').click();
    // Action: Click the "Dvorak" button.
    await page.locator('#btn-keyboard-dvorak').click();
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/MappingLetterFrequencyToAKeyboard-3.png', fullPage: true });
  });

  test('Return to 3D QWERTY keyboard view', async ({ page }) => {
    await page.goto(fileUrl);
    // Action: Click the "keyboard 3D" button.
    await page.locator('#btn-plot-3d').click();
    // Action: Click the "Dvorak" button.
    await page.locator('#btn-keyboard-dvorak').click();
    // Action: Click the "QWERTY" button.
    await page.locator('#btn-keyboard-qwerty').click();
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/MappingLetterFrequencyToAKeyboard-4.png', fullPage: true });
  });

});