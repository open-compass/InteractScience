const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/DwarfPlanets.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  // Wait for the canvas to be potentially rendered by JS
  // await page.waitForSelector('#3d-canvas');
  await page.waitForTimeout(500);
});

test.describe('Dwarf Planet Selector', () => {
  test('Dwarf Planet Selector Button Group', async ({ page }) => {
    // 1. Assert: The dwarf planet button container #dwarf-planet-selector is visible.
    await expect(page.locator('#dwarf-planet-selector')).toBeVisible();

    // 2. Assert: The "Pluto" button has the `active` class, and the red orbit path corresponds to Pluto's orbit.
    await expect(page.locator('button[data-planet="Pluto"]')).toHaveClass('active');
    // We'll use snapshots to verify the visual state of the orbit path.
    await expect(page.locator('#3d-canvas')).toHaveScreenshot('pluto-orbit.png', { maxDiffPixelRatio: 0.1 });

    // 3. Action: Click the "Eris" button.
    await page.locator('button[data-planet="Eris"]').click();

    // 4. Assert: The "Eris" button now has the `active` class, the "Pluto" button does not, and the red orbit path in the 3D canvas has visibly changed.
    await expect(page.locator('button[data-planet="Eris"]')).toHaveClass('active');
    await expect(page.locator('button[data-planet="Pluto"]')).not.toHaveClass('active');
    await expect(page.locator('#3d-canvas')).toHaveScreenshot('eris-orbit.png', { maxDiffPixelRatio: 0.1 });

    // 5. Action: Click the "Ceres" button.
    await page.locator('button[data-planet="Ceres"]').click();

    // 6. Assert: The "Ceres" button now has the `active` class, the "Eris" button does not, and the red orbit path has changed again.
    await expect(page.locator('button[data-planet="Ceres"]')).toHaveClass('active');
    await expect(page.locator('button[data-planet="Eris"]')).not.toHaveClass('active');
    await expect(page.locator('#3d-canvas')).toHaveScreenshot('ceres-orbit.png', { maxDiffPixelRatio: 0.1 });
  });
});

test.describe('Time Slider', () => {
  test('Time Slider Control', async ({ page }) => {
    // 1. Assert: The time slider #time-slider is visible.
    await expect(page.locator('#time-slider')).toBeVisible();

    // 2. Assert: The slider's value is set to `2922` and the #date-display shows "Tue 1 Jan 2008 00:00:00".
    await expect(page.locator('#time-slider')).toHaveValue('2922');
    await expect(page.locator('#date-display')).toHaveText('Tue 1 Jan 2008 00:00:00');
    const initialCanvas = await page.locator('#3d-canvas').screenshot();

    // 3. Action: Drag the slider handle to the right, to approximately the midpoint.
    await page.locator('#time-slider').fill('55000');

    // 4. Assert: The slider's value has increased, the date in #date-display has updated, and the positions of the planets in the 3D canvas have changed.
    await expect(page.locator('#time-slider')).toHaveValue('55000');
    await expect(page.locator('#date-display')).not.toHaveText('Tue 1 Jan 2008 00:00:00');
    const midpointCanvas = await page.locator('#3d-canvas').screenshot();
    expect(midpointCanvas).not.toEqual(initialCanvas);

    // 5. Action: Drag the slider handle to its maximum position (far right).
    await page.locator('#time-slider').fill('110000');

    // 6. Assert: The slider's value is now `110000`, the #date-display shows a date far in the future, and the planet positions have updated.
    await expect(page.locator('#time-slider')).toHaveValue('110000');
    // Check that the date has changed from the midpoint step
    const midpointDateText = await page.locator('#date-display').textContent();
    await expect(page.locator('#date-display')).not.toHaveText(midpointDateText);
    const maxCanvas = await page.locator('#3d-canvas').screenshot();
    expect(maxCanvas).not.toEqual(midpointCanvas);
  });
});

test.describe('Play/Pause Button', () => {
  test('Play/Pause Animation Button', async ({ page }) => {
    // 1. Assert: The play/pause button #play-pause-button is visible.
    await expect(page.locator('#play-pause-button')).toBeVisible();

    // 2. Assert: The button's text content is "▶".
    await expect(page.locator('#play-pause-button')).toHaveText('▶');
    const initialSliderValue = await page.locator('#time-slider').inputValue();

    // 3. Action: Click the play/pause button.
    await page.locator('#play-pause-button').click();

    // 4. Assert: The button's text content changes to "⏸", and the #time-slider value begins to change, causing the date display and planet positions to animate.
    await expect(page.locator('#play-pause-button')).toHaveText('⏸');
    // Poll until the slider value changes, confirming animation has started.
    await expect(async () => {
      const currentSliderValue = await page.locator('#time-slider').inputValue();
      expect(currentSliderValue).not.toBe(initialSliderValue);
    }).toPass({ timeout: 1000 }); // Wait up to 1s for the value to change.

    // 5. Action: Click the play/pause button again.
    await page.locator('#play-pause-button').click();

    // 6. Assert: The button's text content changes back to "▶", and the animation of the slider, date display, and planet positions stops.
    await expect(page.locator('#play-pause-button')).toHaveText('▶');
    const pausedSliderValue = await page.locator('#time-slider').inputValue();
    // Wait a moment to ensure the animation has indeed stopped.
    await page.waitForTimeout(500);
    const finalSliderValue = await page.locator('#time-slider').inputValue();
    expect(finalSliderValue).toBe(pausedSliderValue);
  });
});