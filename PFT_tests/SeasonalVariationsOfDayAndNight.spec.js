const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SeasonalVariationsOfDayAndNight.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  await page.waitForTimeout(500);
});

test.describe('Component Tests', () => {

  test('Date Slider Control', async ({ page }) => {
    // 1. Assert: The `slider-date` component is visible.
    await expect(page.locator('#slider-date')).toBeVisible();

    // 2. Assert: The slider's value is 79 and its corresponding label `label-date` displays "March 20".
    await expect(page.locator('#slider-date')).toHaveValue('79');
    await expect(page.locator('#label-date')).toHaveText('March 20');

    const dayLengthReadout = page.locator('#readout-day-length');
    const initialDayLength = await dayLengthReadout.textContent();

    // 3. Action: Drag the `slider-date` to a new value, such as 315.
    await page.locator('#slider-date').fill('315');

    // 4. Assert: The `label-date` updates to "November 11", and the `readout-day-length` value changes. The Sun's path arc in the visualization is redrawn.
    await expect(page.locator('#label-date')).toHaveText('November 11');
    await expect(dayLengthReadout).not.toHaveText(initialDayLength);

    const midDayLength = await dayLengthReadout.textContent();

    // 5. Action: Drag the `slider-date` to its maximum value (365).
    await page.locator('#slider-date').fill('365');

    // 6. Assert: The `label-date` and `readout-day-length` values update, and the visualization changes accordingly.
    await expect(page.locator('#label-date')).not.toHaveText('November 11'); // Exact text depends on implementation
    await expect(dayLengthReadout).not.toHaveText(midDayLength);
  });

  test('Latitude Slider Control', async ({ page }) => {
    // 1. Assert: The `slider-latitude` component is visible.
    await expect(page.locator('#slider-latitude')).toBeVisible();

    // 2. Assert: The slider's value is 45 and its corresponding label `label-latitude` displays "45°".
    await expect(page.locator('#slider-latitude')).toHaveValue('45');
    await expect(page.locator('#label-latitude')).toHaveText('45°');

    const dayLengthReadout = page.locator('#readout-day-length');
    const initialDayLength = await dayLengthReadout.textContent();

    // 3. Action: Drag the `slider-latitude` to a new value, such as 0.
    await page.locator('#slider-latitude').fill('0');

    // 4. Assert: The `label-latitude` updates to "0°", the `readout-day-length` value changes, and the tilt of the Sun's path in the visualization is updated.
    await expect(page.locator('#label-latitude')).toHaveText('0°');
    await expect(dayLengthReadout).not.toHaveText(initialDayLength);

    // 5. Action: Drag the `slider-latitude` to its minimum value (-90).
    await page.locator('#slider-latitude').fill('-90');

    // 6. Assert: The `label-latitude` updates to "-90°", the readout values update, and the visualization changes.
    await expect(page.locator('#label-latitude')).toHaveText('-90°');
    await expect(dayLengthReadout).not.toHaveText(await dayLengthReadout.textContent());
  });

  test('Solar Time Slider Control', async ({ page }) => {
    // 1. Assert: The `slider-time` component is visible.
    await expect(page.locator('#slider-time')).toBeVisible();

    // 2. Assert: The slider's value is 12 and its corresponding label `label-time` displays "12:00".
    await expect(page.locator('#slider-time')).toHaveValue('12');
    await expect(page.locator('#label-time')).toHaveText('12:00');

    const dayLengthReadout = page.locator('#readout-day-length');
    const initialDayLength = await dayLengthReadout.textContent();

    // 3. Action: Drag the `slider-time` to a new value, such as 18.5.
    await page.locator('#slider-time').fill('18.5');

    // 4. Assert: The `label-time` updates to "18:30", and the Sun model moves to a new position along its path in the visualization. The `readout-day-length` value does not change.
    await expect(page.locator('#label-time')).toHaveText('18:30');
    await expect(dayLengthReadout).toHaveText(initialDayLength);

    // 5. Action: Drag the `slider-time` to its maximum value (24).
    await page.locator('#slider-time').fill('24');

    // 6. Assert: The `label-time` updates to "24:00", and the Sun's position in the visualization updates.
    await expect(page.locator('#label-time')).toHaveText('24:00');
  });

  test('View Selector Dropdown', async ({ page }) => {
    // 1. Assert: The `select-view` dropdown is visible.
    await expect(page.locator('#select-view')).toBeVisible();

    // 2. Assert: The default selected option is "ground", and the "ground" view options (`#options-ground`) are visible.
    await expect(page.locator('#select-view')).toHaveValue('ground');
    await expect(page.locator('#options-ground')).toBeVisible();
    await expect(page.locator('#options-space')).not.toBeVisible();

    // 3. Action: Change the `select-view` dropdown selection to "space".
    await page.locator('#select-view').selectOption('space');

    // 4. Assert: The main visualization switches to the "space" view, and the options container now shows "space" view options (`#options-space`).
    await expect(page.locator('#options-space')).toBeVisible();
    await expect(page.locator('#options-ground')).not.toBeVisible();

    // 5. Action: Change the `select-view` dropdown selection back to "ground".
    await page.locator('#select-view').selectOption('ground');

    // 6. Assert: The visualization switches back to the "ground" view, and the "ground" view options (`#options-ground`) become visible again.
    await expect(page.locator('#options-ground')).toBeVisible();
    await expect(page.locator('#options-space')).not.toBeVisible();
  });

  test('"Sun path" Checkbox (Ground View)', async ({ page }) => {
    // 1. Assert: The `check-sun-path` checkbox is visible.
    await expect(page.locator('#check-sun-path')).toBeVisible();

    // 2. Assert: The checkbox is `checked` by default, and the yellow sun path line is visible in the visualization.
    await expect(page.locator('#check-sun-path')).toBeChecked();

    // 3. Action: Uncheck the `check-sun-path` checkbox.
    await page.locator('#check-sun-path').uncheck();

    // 4. Assert: The sun path line disappears from the visualization.
    await expect(page.locator('#check-sun-path')).not.toBeChecked();

    // 5. Action: Check the `check-sun-path` checkbox again.
    await page.locator('#check-sun-path').check();

    // 6. Assert: The sun path line reappears in the visualization.
    await expect(page.locator('#check-sun-path')).toBeChecked();
  });

  test('"constellations (day)" Checkbox (Ground View)', async ({ page }) => {
    // 1. Assert: The `check-constellations-day` checkbox is visible.
    await expect(page.locator('#check-constellations-day')).toBeVisible();

    // 2. Assert: The checkbox is `unchecked` by default, and no constellations are visible.
    await expect(page.locator('#check-constellations-day')).not.toBeChecked();

    // 3. Action: Check the `check-constellations-day` checkbox.
    await page.locator('#check-constellations-day').check();

    // 4. Assert: Constellation lines appear in the visualization.
    await expect(page.locator('#check-constellations-day')).toBeChecked();

    // 5. Action: Uncheck the `check-constellations-day` checkbox.
    await page.locator('#check-constellations-day').uncheck();

    // 6. Assert: The constellation lines disappear from the visualization.
    await expect(page.locator('#check-constellations-day')).not.toBeChecked();
  });

  test('"stationary Earth" Checkbox (Space View)', async ({ page }) => {
    // 1. Action: Select "space" from the view dropdown. Assert: The `check-stationary-earth` checkbox is visible.
    await page.locator('#select-view').selectOption('space');
    await expect(page.locator('#check-stationary-earth')).toBeVisible();

    // 2. Assert: The checkbox is `unchecked` by default.
    await expect(page.locator('#check-stationary-earth')).not.toBeChecked();

    // 3. Action: Check the `check-stationary-earth` checkbox.
    await page.locator('#check-stationary-earth').check();

    // 4. Assert: The checkbox is now `checked`, and moving the `slider-time` no longer causes the Earth model to rotate.
    await expect(page.locator('#check-stationary-earth')).toBeChecked();

    // 5. Action: Uncheck the `check-stationary-earth` checkbox.
    await page.locator('#check-stationary-earth').uncheck();

    // 6. Assert: The checkbox is now `unchecked`, and moving the `slider-time` again causes the Earth model to rotate.
    await expect(page.locator('#check-stationary-earth')).not.toBeChecked();
  });

  test('"constellations" Checkbox (Space View)', async ({ page }) => {
    // 1. Action: Select "space" from the view dropdown. Assert: The `check-constellations` checkbox is visible.
    await page.locator('#select-view').selectOption('space');
    await expect(page.locator('#check-constellations')).toBeVisible();

    // 2. Assert: The checkbox is `checked` by default, and constellation lines are visible around the Earth model.
    await expect(page.locator('#check-constellations')).toBeChecked();

    // 3. Action: Uncheck the `check-constellations` checkbox.
    await page.locator('#check-constellations').uncheck();

    // 4. Assert: The constellation lines disappear from the visualization.
    await expect(page.locator('#check-constellations')).not.toBeChecked();

    // 5. Action: Check the `check-constellations` checkbox again.
    await page.locator('#check-constellations').check();

    // 6. Assert: The constellation lines reappear in the visualization.
    await expect(page.locator('#check-constellations')).toBeChecked();
  });

  test('"day/night division" Checkbox (Space View)', async ({ page }) => {
    // 1. Action: Select "space" from the view dropdown. Assert: The `check-day-night-division` checkbox is visible.
    await page.locator('#select-view').selectOption('space');
    await expect(page.locator('#check-day-night-division')).toBeVisible();

    // 2. Assert: The checkbox is `checked` by default, and the day/night terminator plane is visible.
    await expect(page.locator('#check-day-night-division')).toBeChecked();

    // 3. Action: Uncheck the `check-day-night-division` checkbox.
    await page.locator('#check-day-night-division').uncheck();

    // 4. Assert: The terminator plane disappears from the visualization.
    await expect(page.locator('#check-day-night-division')).not.toBeChecked();

    // 5. Action: Check the `check-day-night-division` checkbox again.
    await page.locator('#check-day-night-division').check();

    // 6. Assert: The terminator plane reappears in the visualization.
    await expect(page.locator('#check-day-night-division')).toBeChecked();
  });

  test('"day/night on parallel" Checkbox (Space View)', async ({ page }) => {
    // 1. Action: Select "space" from the view dropdown. Assert: The `check-day-night-parallel` checkbox is visible.
    await page.locator('#select-view').selectOption('space');
    await expect(page.locator('#check-day-night-parallel')).toBeVisible();

    // 2. Assert: The checkbox is `checked` by default, and a highlighted line segment is visible on the latitude parallel.
    await expect(page.locator('#check-day-night-parallel')).toBeChecked();

    // 3. Action: Uncheck the `check-day-night-parallel` checkbox.
    await page.locator('#check-day-night-parallel').uncheck();

    // 4. Assert: The highlighted line segment disappears from the visualization.
    await expect(page.locator('#check-day-night-parallel')).not.toBeChecked();

    // 5. Action: Check the `check-day-night-parallel` checkbox again.
    await page.locator('#check-day-night-parallel').check();

    // 6. Assert: The highlighted line segment reappears in the visualization.
    await expect(page.locator('#check-day-night-parallel')).toBeChecked();
  });

});