const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ViewOfTheMoonFromEarth.html');

test.describe('View of the Moon from Earth', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Time Slider Control', async ({ page }) => {
    // 1. Assert: The time slider (#slider-time) is visible.
    await expect(page.locator('#slider-time')).toBeVisible();

    // 2. Assert: The slider's value is 0 and the time display (#display-time) shows "0 d 0 h".
    await expect(page.locator('#slider-time')).toHaveValue('0');
    await expect(page.locator('#display-time')).toHaveText('0 d 0 h');
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 3. Action: Drag the slider to a non-zero position, for example, the middle of its range.
    await page.locator('#slider-time').fill('336'); // 14 days

    // 4. Assert: The display-time text updates to a new value (e.g., "14 d 0 h"), and the Moon's position on the canvas changes.
    await expect(page.locator('#display-time')).toHaveText('14 d 0 h');
    await expect(page.locator('#main-canvas')).not.toHaveScreenshot(initialCanvas);
    const midCanvas = await page.locator('#main-canvas').screenshot();

    // 5. Action: Drag the slider to its maximum value.
    await page.locator('#slider-time').fill('672'); // 28 days

    // 6. Assert: The display-time text updates to its maximum value (e.g., "28 d 0 h"), and the canvas visualization updates accordingly.
    await expect(page.locator('#display-time')).toHaveText('28 d 0 h');
    await expect(page.locator('#main-canvas')).not.toHaveScreenshot(midCanvas);
  });

  test('Play/Pause Animation Button', async ({ page }) => {
    // 1. Assert: The play/pause button (#btn-play-pause) is visible.
    await expect(page.locator('#btn-play-pause')).toBeVisible();

    // 2. Assert: The button's text content is ▶.
    await expect(page.locator('#btn-play-pause')).toHaveText('▶');

    // 3. Action: Click the play/pause button.
    await page.locator('#btn-play-pause').click();

    // 4. Assert: The button's text changes to ❚❚, and the time slider's value begins to increase automatically, causing the canvas to animate.
    await expect(page.locator('#btn-play-pause')).toHaveText('❚❚');
    const initialValue = await page.locator('#slider-time').inputValue();
    await page.waitForTimeout(500); // Wait for animation to progress
    const playingValue = await page.locator('#slider-time').inputValue();
    expect(Number(playingValue)).toBeGreaterThan(Number(initialValue));

    // 5. Action: Click the play/pause button again.
    await page.locator('#btn-play-pause').click();

    // 6. Assert: The button's text changes back to ▶, and the time slider and canvas animation stop.
    await expect(page.locator('#btn-play-pause')).toHaveText('▶');
    const pausedValue = await page.locator('#slider-time').inputValue();
    await page.waitForTimeout(500); // Wait to see if animation continues
    const finalValue = await page.locator('#slider-time').inputValue();
    expect(finalValue).toBe(pausedValue);
  });

  test('Step Back Button', async ({ page }) => {
    // 1. Assert: The step back button (#btn-step-back) is visible.
    await expect(page.locator('#btn-step-back')).toBeVisible();

    // 2. Assert: The time display (#display-time) shows "0 d 0 h".
    await expect(page.locator('#display-time')).toHaveText('0 d 0 h');

    // 3. Action: Click the "Step Forward" button three times, then click the step back button once.
    await page.locator('#btn-step-forward').click();
    await page.locator('#btn-step-forward').click();
    await page.locator('#btn-step-forward').click();
    await expect(page.locator('#display-time')).toHaveText('0 d 3 h');
    const canvasAfterForward = await page.locator('#main-canvas').screenshot();
    await page.locator('#btn-step-back').click();

    // 4. Assert: The time display updates to a smaller value (e.g., from "0 d 3 h" to "0 d 2 h"), and the canvas visualization changes.
    await expect(page.locator('#display-time')).toHaveText('0 d 2 h');
    await expect(page.locator('#main-canvas')).not.toHaveScreenshot(canvasAfterForward);

    // 5. Action: Click the step back button until the time is 0, then click it again.
    await page.locator('#btn-step-back').click(); // 0 d 1 h
    await page.locator('#btn-step-back').click(); // 0 d 0 h
    await expect(page.locator('#display-time')).toHaveText('0 d 0 h');
    const canvasAtZero = await page.locator('#main-canvas').screenshot();
    await page.locator('#btn-step-back').click(); // Click again at 0

    // 6. Assert: The time display remains at "0 d 0 h", and the canvas does not change.
    await expect(page.locator('#display-time')).toHaveText('0 d 0 h');
    await expect(page.locator('#main-canvas')).toHaveScreenshot(canvasAtZero);
  });

  test('Reset Button', async ({ page }) => {
    // 1. Assert: The reset button (#btn-reset) is visible.
    await expect(page.locator('#btn-reset')).toBeVisible();

    // 2. Assert: The time slider is at position 0.
    await expect(page.locator('#slider-time')).toHaveValue('0');
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 3. Action: Move the time slider to a non-zero value.
    await page.locator('#slider-time').fill('200');

    // 4. Assert: The time display shows a value greater than "0 d 0 h", and the visualization is not in its initial state.
    await expect(page.locator('#display-time')).not.toHaveText('0 d 0 h');
    await expect(page.locator('#main-canvas')).not.toHaveScreenshot(initialCanvas);

    // 5. Action: Click the reset button (#btn-reset).
    await page.locator('#btn-reset').click();

    // 6. Assert: The time slider returns to position 0, the time display shows "0 d 0 h", and the canvas resets to its initial state.
    await expect(page.locator('#slider-time')).toHaveValue('0');
    await expect(page.locator('#display-time')).toHaveText('0 d 0 h');
    await expect(page.locator('#main-canvas')).toHaveScreenshot(initialCanvas);
  });

  test('Step Forward Button', async ({ page }) => {
    // 1. Assert: The step forward button (#btn-step-forward) is visible.
    await expect(page.locator('#btn-step-forward')).toBeVisible();

    // 2. Assert: The time display (#display-time) shows "0 d 0 h".
    await expect(page.locator('#display-time')).toHaveText('0 d 0 h');
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 3. Action: Click the step forward button.
    await page.locator('#btn-step-forward').click();

    // 4. Assert: The time display updates to a new value (e.g., "0 d 1 h"), the time slider position moves, and the canvas visualization changes.
    await expect(page.locator('#display-time')).toHaveText('0 d 1 h');
    await expect(page.locator('#slider-time')).toHaveValue('1');
    await expect(page.locator('#main-canvas')).not.toHaveScreenshot(initialCanvas);

    // 5. Action: Click the step forward button until the time slider reaches its maximum value.
    await page.locator('#slider-time').fill('671');
    await page.locator('#btn-step-forward').click();

    // 6. Assert: The time display shows the maximum time, and further clicks on the button do not change the time or visualization.
    await expect(page.locator('#display-time')).toHaveText('28 d 0 h');
    const maxCanvas = await page.locator('#main-canvas').screenshot();
    await page.locator('#btn-step-forward').click();
    await expect(page.locator('#display-time')).toHaveText('28 d 0 h');
    await expect(page.locator('#main-canvas')).toHaveScreenshot(maxCanvas);
  });

  test("Moon's Rotation Period Selector", async ({ page }) => {
    // 1. Assert: The "half" button (#btn-rot-half) is visible.
    await expect(page.locator('#btn-rot-half')).toBeVisible();
    await page.locator('#slider-time').fill('168'); // Set time to 7 days for rotation to be visible
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 2. Assert: The "normal" button (#btn-rot-normal) has an active state/class by default.
    await expect(page.locator('#btn-rot-normal')).toHaveClass(/active/);

    // 3. Action: Click the "half" button (#btn-rot-half).
    await page.locator('#btn-rot-half').click();

    // 4. Assert: The "half" button gains the active state, the "normal" button loses it, and the Moon's rotation on the canvas changes.
    await expect(page.locator('#btn-rot-half')).toHaveClass(/active/);
    await expect(page.locator('#btn-rot-normal')).not.toHaveClass(/active/);
    await expect(page.locator('#main-canvas')).not.toHaveScreenshot(initialCanvas);
    const halfRotCanvas = await page.locator('#main-canvas').screenshot();

    // 5. Action: Click the "no rotation" button (#btn-rot-none).
    await page.locator('#btn-rot-none').click();

    // 6. Assert: The "no rotation" button gains the active state, the "half" button loses it, and the Moon's orientation on the canvas changes again.
    await expect(page.locator('#btn-rot-none')).toHaveClass(/active/);
    await expect(page.locator('#btn-rot-half')).not.toHaveClass(/active/);
    await expect(page.locator('#main-canvas')).not.toHaveScreenshot(halfRotCanvas);
  });

  test('Day/Night Checkbox', async ({ page }) => {
    // 1. Assert: The "day/night" checkbox (#check-day-night) is visible.
    await expect(page.locator('#check-day-night')).toBeVisible();
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 2. Assert: The checkbox is unchecked by default.
    await expect(page.locator('#check-day-night')).not.toBeChecked();

    // 3. Action: Click the checkbox to check it.
    await page.locator('#check-day-night').check();

    // 4. Assert: The checkbox is now checked, and a day/night terminator appears on the Earth and Moon in the canvas.
    await expect(page.locator('#check-day-night')).toBeChecked();
    await expect(page.locator('#main-canvas')).not.toHaveScreenshot(initialCanvas);

    // 5. Action: Click the checkbox again to uncheck it.
    await page.locator('#check-day-night').uncheck();

    // 6. Assert: The checkbox is now unchecked, and the day/night terminator disappears from the canvas.
    await expect(page.locator('#check-day-night')).not.toBeChecked();
    await expect(page.locator('#main-canvas')).toHaveScreenshot(initialCanvas);
  });

  test('Near Side of the Moon Checkbox', async ({ page }) => {
    // 1. Assert: The "near side of the Moon" checkbox (#check-near-side) is visible.
    await expect(page.locator('#check-near-side')).toBeVisible();
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 2. Assert: The checkbox is checked by default.
    await expect(page.locator('#check-near-side')).toBeChecked();

    // 3. Action: Click the checkbox to uncheck it.
    await page.locator('#check-near-side').uncheck();

    // 4. Assert: The checkbox is now unchecked, and the green arc and magenta stick figure on the Moon disappear.
    await expect(page.locator('#check-near-side')).not.toBeChecked();
    await expect(page.locator('#main-canvas')).not.toHaveScreenshot(initialCanvas);

    // 5. Action: Click the checkbox again to re-check it.
    await page.locator('#check-near-side').check();

    // 6. Assert: The checkbox is now checked, and the green arc and magenta stick figure on the Moon reappear.
    await expect(page.locator('#check-near-side')).toBeChecked();
    await expect(page.locator('#main-canvas')).toHaveScreenshot(initialCanvas);
  });

  test('Earth-Moon Line Checkbox', async ({ page }) => {
    // 1. Assert: The "Earth-Moon line" checkbox (#check-earth-moon-line) is visible.
    await expect(page.locator('#check-earth-moon-line')).toBeVisible();
    await page.locator('#slider-time').fill('100'); // move moon so line is visible
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 2. Assert: The checkbox is checked by default.
    await expect(page.locator('#check-earth-moon-line')).toBeChecked();

    // 3. Action: Click the checkbox to uncheck it.
    await page.locator('#check-earth-moon-line').uncheck();

    // 4. Assert: The checkbox is now unchecked, and the dashed line between the Earth and Moon disappears.
    await expect(page.locator('#check-earth-moon-line')).not.toBeChecked();
    await expect(page.locator('#main-canvas')).not.toHaveScreenshot(initialCanvas);

    // 5. Action: Click the checkbox again to re-check it.
    await page.locator('#check-earth-moon-line').check();

    // 6. Assert: The checkbox is now checked, and the dashed line between the Earth and Moon reappears.
    await expect(page.locator('#check-earth-moon-line')).toBeChecked();
    await expect(page.locator('#main-canvas')).toHaveScreenshot(initialCanvas);
  });

  test('The Moon Only Checkbox', async ({ page }) => {
    // 1. Assert: The "the Moon only" checkbox (#check-moon-only) is visible.
    await expect(page.locator('#check-moon-only')).toBeVisible();
    const initialCanvas = await page.locator('#main-canvas').screenshot();

    // 2. Assert: The checkbox is unchecked by default.
    await expect(page.locator('#check-moon-only')).not.toBeChecked();

    // 3. Action: Click the checkbox to check it.
    await page.locator('#check-moon-only').check();

    // 4. Assert: The checkbox is now checked, the Earth disappears, and the Moon is shown centered on the canvas.
    await expect(page.locator('#check-moon-only')).toBeChecked();
    await expect(page.locator('#main-canvas')).not.toHaveScreenshot(initialCanvas);

    // 5. Action: Click the checkbox again to uncheck it.
    await page.locator('#check-moon-only').uncheck();

    // 6. Assert: The checkbox is now unchecked, the Earth reappears, and the simulation returns to the standard orbital view.
    await expect(page.locator('#check-moon-only')).not.toBeChecked();
    await expect(page.locator('#main-canvas')).toHaveScreenshot(initialCanvas);
  });
});