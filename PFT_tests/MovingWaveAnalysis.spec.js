const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/MovingWaveAnalysis.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  // Wait for p5 and MathJax to be potentially ready, though tests rely on DOM elements.
  // A small delay can help ensure rendering is complete.
  // await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);
});

test.describe('Amplitude Slider Control', () => {
  test('Amplitude Slider Control', async ({ page }) => {
    const slider = page.locator('#slider-amplitude');
    const valueDisplay = page.locator('#value-amplitude');
    const formulaDisplay = page.locator('#formula-display');

    // 1. Assert: The amplitude slider (#slider-amplitude) is visible.
    await expect(slider).toBeVisible();

    // 2. Assert: The slider's value is 1.5, and the adjacent value display (#value-amplitude) shows "1.5".
    await expect(slider).toHaveValue('1.5');
    await expect(valueDisplay).toHaveText(/^1\.50*$/);
    const initialFormulaText = await formulaDisplay.textContent();

    // 3. Action: Drag the amplitude slider to a new value, such as 1.0.
    await slider.fill('1');

    // 4. Assert: The value display updates to "1.0", and the formula in #formula-display changes. The wave on the canvas is redrawn with a smaller amplitude.
    await expect(valueDisplay).toHaveText(/^1\.00*$/);
    await expect(formulaDisplay).not.toHaveText(initialFormulaText);
    const midFormulaText = await formulaDisplay.textContent();

    // 5. Action: Drag the slider to its maximum value, 2.0.
    await slider.fill('2');

    // 6. Assert: The value display updates to "2.0", and both the formula and the canvas wave update accordingly.
    await expect(valueDisplay).toHaveText(/^2\.00*$/);
    await expect(formulaDisplay).not.toHaveText(midFormulaText);
  });
});

test.describe('Frequency Slider Control', () => {
  test('Frequency Slider Control', async ({ page }) => {
    const slider = page.locator('#slider-frequency');
    const valueDisplay = page.locator('#value-frequency');
    const formulaDisplay = page.locator('#formula-display');

    // 1. Assert: The frequency slider (#slider-frequency) is visible.
    await expect(slider).toBeVisible();

    // 2. Assert: The slider's value is 0.3, and the adjacent value display (#value-frequency) shows "0.3".
    await expect(slider).toHaveValue('0.3');
    await expect(valueDisplay).toHaveText(/^0\.30*$/);
    const initialFormulaText = await formulaDisplay.textContent();

    // 3. Action: Drag the frequency slider to a new value, such as 0.8.
    await slider.fill('0.8');

    // 4. Assert: The value display updates to "0.8", the formula in #formula-display changes, and the wave on the canvas is redrawn with more oscillations.
    await expect(valueDisplay).toHaveText(/^0\.80*$/);
    await expect(formulaDisplay).not.toHaveText(initialFormulaText);
    const midFormulaText = await formulaDisplay.textContent();

    // 5. Action: Drag the slider to its minimum value, 0.1.
    await slider.fill('0.1');

    // 6. Assert: The value display updates to "0.1", and both the formula and the canvas wave update to reflect the lower frequency.
    await expect(valueDisplay).toHaveText(/^0\.10*$/);
    await expect(formulaDisplay).not.toHaveText(midFormulaText);
  });
});

test.describe('Wavelength Slider Control', () => {
  test('Wavelength Slider Control', async ({ page }) => {
    const slider = page.locator('#slider-wavelength');
    const valueDisplay = page.locator('#value-wavelength');
    const formulaDisplay = page.locator('#formula-display');

    // 1. Assert: The wavelength slider (#slider-wavelength) is visible.
    await expect(slider).toBeVisible();

    // 2. Assert: The slider's value is 4.5, and the adjacent value display (#value-wavelength) shows "4.5".
    await expect(slider).toHaveValue('4.5');
    await expect(valueDisplay).toHaveText(/^4\.50*$/);
    const initialFormulaText = await formulaDisplay.textContent();

    // 3. Action: Drag the wavelength slider to a new value, such as 8.0.
    await slider.fill('8');

    // 4. Assert: The value display updates to "8.0", the formula in #formula-display changes, and the wave on the canvas is redrawn with a longer wavelength.
    await expect(valueDisplay).toHaveText(/^8\.00*$/);
    await expect(formulaDisplay).not.toHaveText(initialFormulaText);
    const midFormulaText = await formulaDisplay.textContent();

    // 5. Action: Drag the slider to its minimum value, 1.0.
    await slider.fill('1');

    // 6. Assert: The value display updates to "1.0", and both the formula and the canvas wave update to reflect the shorter wavelength.
    await expect(valueDisplay).toHaveText(/^1\.00*$/);
    await expect(formulaDisplay).not.toHaveText(midFormulaText);
  });
});

test.describe('Time Slider Control', () => {
  test('Time Slider Control', async ({ page }) => {
    const slider = page.locator('#slider-time');
    const valueDisplay = page.locator('#value-time');
    const formulaDisplay = page.locator('#formula-display');

    // 1. Assert: The time slider (#slider-time) is visible.
    await expect(slider).toBeVisible();

    // 2. Assert: The slider's value is 2.5, and the adjacent value display (#value-time) shows "2.5".
    await expect(slider).toHaveValue('2.5');
    await expect(valueDisplay).toHaveText(/^2\.50*$/);
    const initialFormulaText = await formulaDisplay.textContent();

    // 3. Action: Drag the time slider to a new value, such as 5.0.
    await slider.fill('5');

    // 4. Assert: The value display updates to "5.0", the formula in #formula-display changes, and the wave on the canvas shifts horizontally.
    await expect(valueDisplay).toHaveText(/^5\.00*$/);
    await expect(formulaDisplay).not.toHaveText(initialFormulaText);
    const midFormulaText = await formulaDisplay.textContent();

    // 5. Action: Drag the slider to its minimum value, 0.
    await slider.fill('0');

    // 6. Assert: The value display updates to "0", and both the formula and the canvas wave update to reflect the new time.
    await expect(valueDisplay).toHaveText('0');
    await expect(formulaDisplay).not.toHaveText(midFormulaText);
  });
});

test.describe('Initial Phase Dropdown Control', () => {
  test('Initial Phase Dropdown Control', async ({ page }) => {
    const dropdown = page.locator('#select-phase');
    const formulaDisplay = page.locator('#formula-display');

    // 1. Assert: The initial phase dropdown (#select-phase) is visible.
    await expect(dropdown).toBeVisible();

    // 2. Assert: The default selected option is -π/2. The formula display shows a sin function.
    await expect(dropdown).toHaveValue(String(-Math.PI / 2));
    await expect(formulaDisplay).toContainText('sin');

    // 3. Action: Select the "0" option from the dropdown.
    await dropdown.selectOption({ label: '0' });

    // 4. Assert: The formula display updates to a cos function, and the wave on the canvas is redrawn, shifted horizontally.
    await expect(formulaDisplay).toContainText('cos');
    await expect(formulaDisplay).not.toContainText('sin');
    await expect(formulaDisplay).not.toContainText('-A'); // Should be positive "A cos(...)"

    // 5. Action: Select the π option from the dropdown.
    await dropdown.selectOption({ label: 'π' });

    // 6. Assert: The formula display updates to a -cos function, and the wave on the canvas is redrawn again to reflect the new phase shift.
    await expect(formulaDisplay).toContainText('cos');
    await expect(formulaDisplay).toContainText('- '); // Check for "- A cos(...)" form
  });
});