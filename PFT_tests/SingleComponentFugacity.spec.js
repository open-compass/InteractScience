const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SingleComponentFugacity.html');

test.describe('Single Component Fugacity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Plot Type Dropdown Functionality', async ({ page }) => {
    // 1. Assert: The dropdown `select-plot` is visible on page load.
    await expect(page.locator('#select-plot')).toBeVisible();

    // 2. Assert: The dropdown `select-plot` has a default selected value of "fugacity versus temperature". The pressure slider is visible, and the temperature slider is hidden.
    await expect(page.locator('#select-plot')).toHaveValue('vs_temp');
    await expect(page.locator('#control-group-pressure')).toBeVisible();
    await expect(page.locator('#control-group-temperature')).toBeHidden();

    // 3. Action: Change the dropdown `select-plot` selection to "fugacity versus pressure".
    await page.locator('#select-plot').selectOption('vs_press');

    // 4. Assert: The temperature slider (`control-group-temperature`) and high-pressure checkbox (`checkbox-container`) are now visible. The pressure slider (`control-group-pressure`) is hidden. The plot's x-axis label changes to "pressure (MPa)".
    await expect(page.locator('#control-group-temperature')).toBeVisible();
    await expect(page.locator('#checkbox-container')).toBeVisible();
    await expect(page.locator('#control-group-pressure')).toBeHidden();
    await expect(page.locator('#plot-container .xtitle')).toHaveText('pressure (MPa)');

    // 5. Action: Change the dropdown `select-plot` selection back to "fugacity versus temperature".
    await page.locator('#select-plot').selectOption('vs_temp');

    // 6. Assert: The pressure slider is visible again, and the temperature slider and high-pressure checkbox are hidden. The plot's x-axis label changes back to "temperature (°C)".
    await expect(page.locator('#control-group-pressure')).toBeVisible();
    await expect(page.locator('#control-group-temperature')).toBeHidden();
    await expect(page.locator('#checkbox-container')).toBeHidden();
    await expect(page.locator('#plot-container .xtitle')).toHaveText('temperature (°C)');
  });

  test('Pressure Slider Functionality', async ({ page }) => {
    // 1. Assert: The slider `slider-pressure` is visible on page load.
    await expect(page.locator('#slider-pressure')).toBeVisible();

    // 2. Assert: The slider `slider-pressure` has a default value of 0.08, and the `value-pressure` span displays "0.08".
    await expect(page.locator('#slider-pressure')).toHaveValue('0.08');
    await expect(page.locator('#value-pressure')).toHaveText(/^0\.080*$/);
    const initialMarkerPath = await page.locator('#plot-container .trace.scatter path').nth(4).getAttribute('d');

    // 3. Action: Drag the `slider-pressure` to a new value, such as 0.12.
    await page.locator('#slider-pressure').fill('0.12');

    // 4. Assert: The `value-pressure` span updates to "0.12", and the saturation point marker on the plot moves.
    await expect(page.locator('#value-pressure')).toHaveText(/^0\.120*$/);
    const newMarkerPath = await page.locator('#plot-container .trace.scatter path').nth(4).getAttribute('d');
    expect(newMarkerPath).not.toEqual(initialMarkerPath);

    // 5. Action: Drag the `slider-pressure` to its maximum value (0.20).
    await page.locator('#slider-pressure').fill('0.20');

    // 6. Assert: The `value-pressure` span updates to "0.20", and the saturation point marker on the plot moves to a new position.
    await expect(page.locator('#value-pressure')).toHaveText(/^0\.200*$/);
    const finalMarkerPath = await page.locator('#plot-container .trace.scatter path').nth(4).getAttribute('d');
    expect(finalMarkerPath).not.toEqual(newMarkerPath);
  });

  test('Temperature Slider Functionality', async ({ page }) => {
    // 1. Assert: The slider `slider-temperature` is not visible on page load.
    await expect(page.locator('#slider-temperature')).toBeHidden();

    // 2. Assert: After selecting "fugacity versus pressure" from the dropdown, the `slider-temperature` is visible with a default value of 475, and the `value-temperature` span displays "475".
    await page.locator('#select-plot').selectOption('vs_press');
    await expect(page.locator('#slider-temperature')).toBeVisible();
    await expect(page.locator('#slider-temperature')).toHaveValue('475');
    await expect(page.locator('#value-temperature')).toHaveText('475');
    const initialMarkerPath = await page.locator('#plot-container .trace.scatter path').nth(4).getAttribute('d');

    // 3. Action: Drag the `slider-temperature` to a new value, such as 480.
    await page.locator('#slider-temperature').fill('480');

    // 4. Assert: The `value-temperature` span updates to "480", and the saturation point marker on the plot moves.
    await expect(page.locator('#value-temperature')).toHaveText('480');
    const newMarkerPath = await page.locator('#plot-container .trace.scatter path').nth(4).getAttribute('d');
    expect(newMarkerPath).not.toEqual(initialMarkerPath);

    // 5. Action: Drag the `slider-temperature` to its minimum value (450).
    await page.locator('#slider-temperature').fill('450');

    // 6. Assert: The `value-temperature` span updates to "450", and the saturation point marker on the plot moves to a new position.
    await expect(page.locator('#value-temperature')).toHaveText('450');
    const finalMarkerPath = await page.locator('#plot-container .trace.scatter path').nth(4).getAttribute('d');
    expect(finalMarkerPath).not.toEqual(newMarkerPath);
  });

  test('"High pressure" Checkbox Functionality', async ({ page }) => {
    // 1. Assert: The checkbox `checkbox-high-pressure` is not visible on page load.
    await expect(page.locator('#checkbox-container')).toBeHidden();

    // 2. Assert: After selecting "fugacity versus pressure" from the dropdown, the checkbox is visible and is checked by default.
    await page.locator('#select-plot').selectOption('vs_press');
    await expect(page.locator('#checkbox-container')).toBeVisible();
    await expect(page.locator('#checkbox-high-pressure')).toBeChecked();
    const initialCurvePath = await page.locator('#plot-container .trace.scatter path').first().getAttribute('d');

    // 3. Action: Uncheck the `checkbox-high-pressure`.
    await page.locator('#checkbox-high-pressure').uncheck();

    // 4. Assert: The checkbox is now in an unchecked state, and the vapor fugacity curve (blue line) on the plot changes shape (becomes linear).
    await expect(page.locator('#checkbox-high-pressure')).not.toBeChecked();
    const newCurvePath = await page.locator('#plot-container .trace.scatter path').first().getAttribute('d');
    expect(newCurvePath).not.toEqual(initialCurvePath);

    // 5. Action: Check the `checkbox-high-pressure` again.
    await page.locator('#checkbox-high-pressure').check();

    // 6. Assert: The checkbox is now in a checked state, and the vapor fugacity curve on the plot changes shape again (becomes non-linear).
    await expect(page.locator('#checkbox-high-pressure')).toBeChecked();
    const finalCurvePath = await page.locator('#plot-container .trace.scatter path').first().getAttribute('d');
    expect(finalCurvePath).not.toEqual(newCurvePath);
    expect(finalCurvePath).toEqual(initialCurvePath);
  });
});