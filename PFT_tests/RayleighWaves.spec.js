const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/RayleighWaves.html');

test.describe('Rayleigh Waves Interactive Visualization', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the p5.js canvas to be present, indicating the sketch has likely initialized
    // await page.waitForSelector('#canvas-container canvas');
    await page.waitForTimeout(500);
  });

  test('Time Slider Control', async ({ page }) => {
    const timeSlider = page.locator('#slider-time');
    const timeValue = page.locator('#value-time');

    // 1. Assert: The time slider and its value display are visible.
    await expect(timeSlider).toBeVisible();
    await expect(timeValue).toBeVisible();

    // 2. Assert: The slider's initial value is `7.0`, and the value display is actively changing.
    await expect(timeSlider).toHaveValue('7.0');
    const initialTimeText = await timeValue.textContent();
    // Wait for a short moment to see if the animation updates the value
    await page.waitForTimeout(200); 
    const laterTimeText = await timeValue.textContent();
    expect(initialTimeText).not.toBe(laterTimeText);

    // 3. Action: Drag the time slider to the middle of its range (approximately 12.5).
    await timeSlider.fill('12.5');

    // 4. Assert: The slider's value and the value display update, animation is paused.
    await expect(timeSlider).toHaveValue('12.5');
    await expect(timeValue).toHaveText(/^12\.500*$/);
    // Verify animation is paused by checking that the value is now static
    const pausedTimeText = await timeValue.textContent();
    await page.waitForTimeout(200);
    await expect(timeValue).toHaveText(pausedTimeText);

    // 5. Action: Drag the slider to its maximum value (25.0).
    await timeSlider.fill('25');

    // 6. Assert: The slider's value is `25.0`, the value display shows "25.00".
    await expect(timeSlider).toHaveValue('25.0');
    await expect(timeValue).toHaveText(/^25\.000*$/);
  });

  test('Wavelength Slider Control', async ({ page }) => {
    const wavelengthSlider = page.locator('#slider-wavelength');
    const wavelengthValue = page.locator('#value-wavelength');

    // 1. Assert: The wavelength slider and its value display are visible.
    await expect(wavelengthSlider).toBeVisible();
    await expect(wavelengthValue).toBeVisible();

    // 2. Assert: The slider's value is `4.0`, and the value display shows "4.00".
    await expect(wavelengthSlider).toHaveValue('4.0');
    await expect(wavelengthValue).toHaveText(/^4\.000*$/);

    // 3. Action: Drag the wavelength slider to a new value, such as 6.0.
    await wavelengthSlider.fill('6');

    // 4. Assert: The slider's value is `6.0`, the value display shows "6.00".
    await expect(wavelengthSlider).toHaveValue('6.0');
    await expect(wavelengthValue).toHaveText(/^6\.000*$/);

    // 5. Action: Drag the slider to its minimum value (1.0).
    await wavelengthSlider.fill('1');

    // 6. Assert: The slider's value is `1.0`, the value display shows "1.00".
    await expect(wavelengthSlider).toHaveValue('1.0');
    await expect(wavelengthValue).toHaveText(/^1\.000*$/);
  });

  test('Longitudinal Amplitude Slider Control', async ({ page }) => {
    const longAmpSlider = page.locator('#slider-longitudinal-amplitude');
    const longAmpValue = page.locator('#value-longitudinal-amplitude');

    // 1. Assert: The longitudinal amplitude slider and its value display are visible.
    await expect(longAmpSlider).toBeVisible();
    await expect(longAmpValue).toBeVisible();

    // 2. Assert: The slider's value is `2.0`, and the value display shows "2.00".
    await expect(longAmpSlider).toHaveValue('2.0');
    await expect(longAmpValue).toHaveText(/^2\.000*$/);

    // 3. Action: Drag the slider to a new value, such as 0.5.
    await longAmpSlider.fill('0.5');

    // 4. Assert: The slider's value is `0.5`, the value display shows "0.50".
    await expect(longAmpSlider).toHaveValue('0.5');
    await expect(longAmpValue).toHaveText(/^0\.500*$/);

    // 5. Action: Drag the slider to its maximum value (3.0).
    await longAmpSlider.fill('3');

    // 6. Assert: The slider's value is `3.0`, the value display shows "3.00".
    await expect(longAmpSlider).toHaveValue('3.0');
    await expect(longAmpValue).toHaveText(/^3\.000*$/);
  });

  test('Latitudinal Amplitude Slider Control', async ({ page }) => {
    const latAmpSlider = page.locator('#slider-latitudinal-amplitude');
    const latAmpValue = page.locator('#value-latitudinal-amplitude');

    // 1. Assert: The latitudinal amplitude slider and its value display are visible.
    await expect(latAmpSlider).toBeVisible();
    await expect(latAmpValue).toBeVisible();

    // 2. Assert: The slider's value is `1.0`, and the value display shows "1.00".
    await expect(latAmpSlider).toHaveValue('1.0');
    await expect(latAmpValue).toHaveText(/^1\.000*$/);

    // 3. Action: Drag the slider to a new value, such as 2.5.
    await latAmpSlider.fill('2.5');

    // 4. Assert: The slider's value is `2.5`, the value display shows "2.50".
    await expect(latAmpSlider).toHaveValue('2.5');
    await expect(latAmpValue).toHaveText(/^2\.500*$/);

    // 5. Action: Drag the slider to its minimum value (0).
    await latAmpSlider.fill('0');

    // 6. Assert: The slider's value is `0`, the value display shows "0.00".
    await expect(latAmpSlider).toHaveValue('0');
    await expect(latAmpValue).toHaveText(/^0\.000*$/);
  });

});