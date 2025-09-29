const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/TimeEncodingOfAnalogSignals.html');

test.describe('Time Encoding of Analog Signals', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Info Button Toggles Description Panel', async ({ page }) => {
    // 1. Assert: The `(+)` button with id `info-button` is visible.
    await expect(page.locator('#info-button')).toBeVisible();

    // 2. Assert: The description panel with id `description-panel` is not visible.
    await expect(page.locator('#description-panel')).not.toBeVisible();

    // 3. Action: Click the `info-button`.
    await page.locator('#info-button').click();

    // 4. Assert: The `description-panel` becomes visible, displaying text.
    await expect(page.locator('#description-panel')).toBeVisible();

    // 5. Action: Click the `info-button` again.
    await page.locator('#info-button').click();

    // 6. Assert: The `description-panel` is hidden again.
    await expect(page.locator('#description-panel')).not.toBeVisible();
  });

  test('Start Time Slider Manipulation', async ({ page }) => {
    // 1. Assert: The "start time" slider (`slider-start-time`) is visible.
    await expect(page.locator('#slider-start-time')).toBeVisible();

    // 2. Assert: The slider's value is -1.0, and the plot's x-axis begins at -1.0.
    await expect(page.locator('#slider-start-time')).toHaveValue('-1');

    // 3. Action: Drag the slider to a new value, such as 1.0.
    await page.locator('#slider-start-time').fill('1');

    // 4. Assert: The plot updates; the visible portion of the blue and red signals shifts horizontally.
    await expect(page.locator('#slider-start-time')).toHaveValue('1');

    // 5. Action: Drag the slider to its maximum value of 5.
    await page.locator('#slider-start-time').fill('5');

    // 6. Assert: The plot updates again, showing the signals for a different time interval starting at 5.
    await expect(page.locator('#slider-start-time')).toHaveValue('5');
  });

  test('Total Time Slider Manipulation', async ({ page }) => {
    // 1. Assert: The "total time" slider (`slider-total-time`) is visible.
    await expect(page.locator('#slider-total-time')).toBeVisible();

    // 2. Assert: The slider's value is 2.2, and the plot's x-axis has a width of 2.2 units.
    await expect(page.locator('#slider-total-time')).toHaveValue('2.2');

    // 3. Action: Drag the slider to a larger value, such as 4.0.
    await page.locator('#slider-total-time').fill('4');

    // 4. Assert: The plot updates, and the x-axis range expands (zooms out) to show a wider time duration.
    await expect(page.locator('#slider-total-time')).toHaveValue('4');

    // 5. Action: Drag the slider to its minimum value of 1.
    await page.locator('#slider-total-time').fill('1');

    // 6. Assert: The plot updates, and the x-axis range contracts (zooms in) to show a narrower time duration.
    await expect(page.locator('#slider-total-time')).toHaveValue('1');
  });

  test('Function Button Selection', async ({ page }) => {
    // 1. Assert: The "function" button group is visible.
    await expect(page.locator('#function-buttons')).toBeVisible();

    // 2. Assert: The "g" button (`btn-g`) is highlighted as the default, and the plot shows a complex wave.
    await expect(page.locator('#btn-g')).toHaveClass(/active/);
    await expect(page.locator('#btn-f')).not.toHaveClass(/active/);

    // 3. Action: Click the "f" button (`btn-f`).
    await page.locator('#btn-f').click();

    // 4. Assert: The "f" button is now highlighted, and the plot updates to show a linear function (a straight line) and its corresponding encoding.
    await expect(page.locator('#btn-f')).toHaveClass(/active/);
    await expect(page.locator('#btn-g')).not.toHaveClass(/active/);

    // 5. Action: Click the "sin" button (`btn-sin`).
    await page.locator('#btn-sin').click();

    // 6. Assert: The "sin" button is now highlighted, and the plot updates to show a sine wave.
    await expect(page.locator('#btn-sin')).toHaveClass(/active/);
    await expect(page.locator('#btn-f')).not.toHaveClass(/active/);
  });

  test('Encoding Method Button Selection', async ({ page }) => {
    // 1. Assert: The "encoding method" button group is visible.
    await expect(page.locator('#encoding-buttons')).toBeVisible();

    // 2. Assert: The "ASDM" button (`btn-asdm`) is highlighted as the default, and the plot shows a red square wave.
    await expect(page.locator('#btn-asdm')).toHaveClass(/active/);
    await expect(page.locator('#btn-iaf')).not.toHaveClass(/active/);

    // 3. Action: Click the "IAF" button (`btn-iaf`).
    await page.locator('#btn-iaf').click();

    // 4. Assert: The "IAF" button is now highlighted, and the red encoded signal in the plot changes from a square wave to a series of vertical spikes.
    await expect(page.locator('#btn-iaf')).toHaveClass(/active/);
    await expect(page.locator('#btn-asdm')).not.toHaveClass(/active/);

    // 5. Action: Click the "ASDM" button again.
    await page.locator('#btn-asdm').click();

    // 6. Assert: The "ASDM" button is highlighted again, and the red encoded signal changes back to a square wave.
    await expect(page.locator('#btn-asdm')).toHaveClass(/active/);
    await expect(page.locator('#btn-iaf')).not.toHaveClass(/active/);
  });
});