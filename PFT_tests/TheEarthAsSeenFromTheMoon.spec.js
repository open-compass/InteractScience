const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/TheEarthAsSeenFromTheMoon.html');

test.describe('The Earth As Seen From The Moon UI', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the page to be fully loaded, especially if MathJax is rendering
    // await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);
  });

  test('View Form Button Group Interaction', async ({ page }) => {
    // 1. Assert: The "land" button (`btn-land`) and "space" button (`btn-space`) are visible.
    await expect(page.locator('#btn-land')).toBeVisible();
    await expect(page.locator('#btn-space')).toBeVisible();

    // 2. Assert: The "land" button has the `active` class and the 3D canvas shows the view from the lunar surface.
    await expect(page.locator('#btn-land')).toHaveClass('active');

    // 3. Action: Click the "space" button.
    await page.locator('#btn-space').click();

    // 4. Assert: The "space" button gains the `active` class, the "land" button loses it, and the 3D canvas camera moves to an overview of the Sun-Earth-Moon system.
    await expect(page.locator('#btn-space')).toHaveClass('active');
    await expect(page.locator('#btn-land')).not.toHaveClass(/active/);

    // 5. Action: Click the "land" button.
    await page.locator('#btn-land').click();

    // 6. Assert: The "land" button regains the `active` class and the 3D canvas returns to the lunar surface view.
    await expect(page.locator('#btn-land')).toHaveClass('active');
  });

  test('Time Slider Control', async ({ page }) => {
    // 1. Assert: The time slider (`slider-time`) is visible.
    await expect(page.locator('#slider-time')).toBeVisible();

    // 2. Assert: The slider's value is 0 and its value label (`slider-time-value`) displays "0".
    await expect(page.locator('#slider-time')).toHaveValue('0');
    await expect(page.locator('#slider-time-value')).toHaveText('0');

    // 3. Action: Drag the slider to approximately the middle of its range.
    await page.locator('#slider-time').fill('50');

    // 4. Assert: The value label updates to a non-zero number, and the Earth's phase in the canvas changes.
    await expect(page.locator('#slider-time-value')).toHaveText(/^50\.000*$/);

    // 5. Action: Drag the slider to its maximum value (100).
    await page.locator('#slider-time').fill('100');

    // 6. Assert: The value label updates to "100.00" and the Earth's phase in the canvas changes again.
    await expect(page.locator('#slider-time-value')).toHaveText(/^100\.000*$/);
  });

  test('Time Play/Pause Button', async ({ page }) => {
    // 1. Assert: The time play button (`btn-time-play`) is visible.
    await expect(page.locator('#btn-time-play')).toBeVisible();

    // 2. Assert: The time slider's value is initially 0 and is not changing.
    const initialValue = await page.locator('#slider-time').inputValue();
    await expect(initialValue).toBe('0');

    // 3. Action: Click the time play button.
    await page.locator('#btn-time-play').click();

    // 4. Assert: The time slider's value begins to increase automatically, its label updates continuously, and the Earth is animated in the canvas.
    await page.waitForTimeout(200); // Wait for animation to start
    const valueAfterPlay = await page.locator('#slider-time').inputValue();
    expect(parseFloat(valueAfterPlay)).toBeGreaterThan(parseFloat(initialValue));

    // 5. Action: Click the time play button again.
    await page.locator('#btn-time-play').click();

    // 6. Assert: The time slider's value stops changing and the animation in the canvas pauses.
    const pausedValue = await page.locator('#slider-time').inputValue();
    await page.waitForTimeout(200); // Wait to see if value changes
    const valueAfterPause = await page.locator('#slider-time').inputValue();
    await expect(valueAfterPause).toBe(pausedValue);
  });

  test('Nodal Angle Slider Control', async ({ page }) => {
    // 1. Assert: The nodal angle slider (`slider-nodal-angle`) is visible.
    await expect(page.locator('#slider-nodal-angle')).toBeVisible();

    // 2. Assert: The slider's value is 0 and its value label (`slider-nodal-angle-value`) displays "0".
    await expect(page.locator('#slider-nodal-angle')).toHaveValue('0');
    await expect(page.locator('#slider-nodal-angle-value')).toHaveText('0');

    // 3. Action: Drag the slider to a new position.
    await page.locator('#slider-nodal-angle').fill('3.14');

    // 4. Assert: The value label updates to a non-zero number, and the apparent orbital plane of the Earth in the canvas is tilted.
    await expect(page.locator('#slider-nodal-angle-value')).toHaveText(/^3\.140*$/);

    // 5. Action: Drag the slider back to its minimum value (0).
    await page.locator('#slider-nodal-angle').fill('0');

    // 6. Assert: The value label updates to "0.00", and the orbital plane in the canvas returns to its original orientation.
    await expect(page.locator('#slider-nodal-angle-value')).toHaveText(/^0\.000*$/);
  });

  test('Sun-Earth Angle Slider Control', async ({ page }) => {
    // 1. Assert: The Sun-Earth angle slider (`slider-sun-earth-angle`) is visible.
    await expect(page.locator('#slider-sun-earth-angle')).toBeVisible();

    // 2. Assert: The slider's value is at its default (approx 1.571), and its value label (`slider-sun-earth-angle-value`) displays a rendered "π/2".
    await expect(page.locator('#slider-sun-earth-angle')).toHaveValue('1.571');
    await expect(page.locator('#slider-sun-earth-angle-value')).toContainText('π/2');

    // 3. Action: Drag the slider to a new position.
    await page.locator('#slider-sun-earth-angle').fill('4.80');

    // 4. Assert: The value label updates to a numerical value (e.g., "4.80"), and the lighting on the Earth in the canvas changes, indicating a new phase.
    await expect(page.locator('#slider-sun-earth-angle-value')).toHaveText(/^4\.800*$/);

    // 5. Action: Drag the slider to its maximum value.
    await page.locator('#slider-sun-earth-angle').fill('6.283');

    // 6. Assert: The value label updates (e.g., "6.28"), and the lighting on the Earth changes again.
    await expect(page.locator('#slider-sun-earth-angle-value')).toHaveText(/^6\.280*$/);
  });

  test('Zodiac Slider Control', async ({ page }) => {
    // 1. Assert: The zodiac slider (`slider-zodiac`) is visible.
    await expect(page.locator('#slider-zodiac')).toBeVisible();

    // 2. Assert: The slider's value is 0 and its value label (`slider-zodiac-value`) displays "0".
    await expect(page.locator('#slider-zodiac')).toHaveValue('0');
    await expect(page.locator('#slider-zodiac-value')).toHaveText('0');

    // 3. Action: Drag the slider to a new position.
    await page.locator('#slider-zodiac').fill('3.14');

    // 4. Assert: The value label updates to a non-zero number, and the background constellations in the canvas rotate.
    await expect(page.locator('#slider-zodiac-value')).toHaveText(/^3\.140*$/);

    // 5. Action: Drag the slider back to its minimum value (0).
    await page.locator('#slider-zodiac').fill('0');

    // 6. Assert: The value label updates to "0.00", and the constellations rotate back to their initial position.
    await expect(page.locator('#slider-zodiac-value')).toHaveText(/^0\.000*$/);
  });

  test('Zodiac Play/Pause Button', async ({ page }) => {
    // 1. Assert: The zodiac play button (`btn-zodiac-play`) is visible.
    await expect(page.locator('#btn-zodiac-play')).toBeVisible();

    // 2. Assert: The zodiac slider's value is initially 0 and is not changing.
    const initialValue = await page.locator('#slider-zodiac').inputValue();
    await expect(initialValue).toBe('0');

    // 3. Action: Click the zodiac play button.
    await page.locator('#btn-zodiac-play').click();

    // 4. Assert: The zodiac slider's value begins to increase automatically, its label updates continuously, and the constellations are animated in the canvas.
    await page.waitForTimeout(200); // Wait for animation to start
    const valueAfterPlay = await page.locator('#slider-zodiac').inputValue();
    expect(parseFloat(valueAfterPlay)).toBeGreaterThan(parseFloat(initialValue));

    // 5. Action: Click the zodiac play button again.
    await page.locator('#btn-zodiac-play').click();

    // 6. Assert: The zodiac slider's value stops changing and the animation in the canvas pauses.
    const pausedValue = await page.locator('#slider-zodiac').inputValue();
    await page.waitForTimeout(200); // Wait to see if value changes
    const valueAfterPause = await page.locator('#slider-zodiac').inputValue();
    await expect(valueAfterPause).toBe(pausedValue);
  });

  test('Constellations Visibility Checkbox', async ({ page }) => {
    // 1. Assert: The "constellations" checkbox (`checkbox-constellations`) is visible.
    await expect(page.locator('#checkbox-constellations')).toBeVisible();

    // 2. Assert: The checkbox is checked by default, and the constellations are visible in the canvas.
    await expect(page.locator('#checkbox-constellations')).toBeChecked();

    // 3. Action: Uncheck the checkbox.
    await page.locator('#checkbox-constellations').uncheck();

    // 4. Assert: The constellation stars and lines disappear from the canvas.
    await expect(page.locator('#checkbox-constellations')).not.toBeChecked();

    // 5. Action: Check the checkbox again.
    await page.locator('#checkbox-constellations').check();

    // 6. Assert: The constellations reappear in the canvas.
    await expect(page.locator('#checkbox-constellations')).toBeChecked();
  });

  test('Realistic Size Checkbox', async ({ page }) => {
    // 1. Assert: The "realistic size" checkbox (`checkbox-realistic-size`) is visible.
    await expect(page.locator('#checkbox-realistic-size')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default, and the Earth appears at an enlarged size in the canvas.
    await expect(page.locator('#checkbox-realistic-size')).not.toBeChecked();

    // 3. Action: Check the checkbox.
    await page.locator('#checkbox-realistic-size').check();

    // 4. Assert: The size of the Earth model in the canvas decreases.
    await expect(page.locator('#checkbox-realistic-size')).toBeChecked();

    // 5. Action: Uncheck the checkbox again.
    await page.locator('#checkbox-realistic-size').uncheck();

    // 6. Assert: The size of the Earth model increases, returning to its original enlarged state.
    await expect(page.locator('#checkbox-realistic-size')).not.toBeChecked();
  });
});