const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/Analemmas.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  await page.waitForTimeout(500);
});

test.describe('Analemmas Demo', () => {

  test('Planet selection dropdown updates sliders and visualization', async ({ page }) => {
    // 1. Assert: The "select-planet" dropdown is visible.
    await expect(page.locator('#select-planet')).toBeVisible();

    // 2. Assert: The dropdown's default selected option is "-- choose orbit manually --".
    await expect(page.locator('#select-planet')).toHaveValue('manual');
    const initialCanvas = await page.locator('#analemma-canvas').screenshot();

    // 3. Action: Select "Earth" from the dropdown.
    await page.locator('#select-planet').selectOption('Earth');

    // 4. Assert: The `slider-tilt` value changes, the `checkbox-manual` becomes unchecked, the three orbital sliders are disabled, and the canvas visualization updates.
    await expect(page.locator('#slider-tilt')).toHaveValue('23.44');
    await expect(page.locator('#checkbox-manual')).not.toBeChecked();
    await expect(page.locator('#slider-tilt')).toBeDisabled();
    await expect(page.locator('#slider-equinox')).toBeDisabled();
    await expect(page.locator('#slider-eccentricity')).toBeDisabled();
    const earthCanvas = await page.locator('#analemma-canvas').screenshot();
    expect(earthCanvas).not.toEqual(initialCanvas);

    // 5. Action: Select "-- choose orbit manually --" from the dropdown.
    await page.locator('#select-planet').selectOption('manual');

    // 6. Assert: The `checkbox-manual` becomes checked, the orbital sliders are enabled, and the canvas visualization updates.
    await expect(page.locator('#checkbox-manual')).toBeChecked();
    await expect(page.locator('#slider-tilt')).toBeEnabled();
    await expect(page.locator('#slider-equinox')).toBeEnabled();
    await expect(page.locator('#slider-eccentricity')).toBeEnabled();
    const manualCanvas = await page.locator('#analemma-canvas').screenshot();
    expect(manualCanvas).not.toEqual(earthCanvas);
  });

  test('"choose orbit manually" checkbox toggles slider state', async ({ page }) => {
    // 1. Assert: The "checkbox-manual" checkbox is visible.
    await expect(page.locator('#checkbox-manual')).toBeVisible();

    // 2. Assert: The checkbox is checked by default and the three orbital sliders are enabled.
    await expect(page.locator('#checkbox-manual')).toBeChecked();
    await expect(page.locator('#slider-tilt')).toBeEnabled();
    await expect(page.locator('#slider-equinox')).toBeEnabled();
    await expect(page.locator('#slider-eccentricity')).toBeEnabled();
    
    // 3. Action: Select "Mars" from the planet dropdown, which unchecks the "choose orbit manually" checkbox.
    await page.locator('#select-planet').selectOption('Mars');
    const marsCanvas = await page.locator('#analemma-canvas').screenshot();

    // 4. Assert: The checkbox is now unchecked and the three sliders (`slider-tilt`, `slider-equinox`, `slider-eccentricity`) are disabled.
    await expect(page.locator('#checkbox-manual')).not.toBeChecked();
    await expect(page.locator('#slider-tilt')).toBeDisabled();
    await expect(page.locator('#slider-equinox')).toBeDisabled();
    await expect(page.locator('#slider-eccentricity')).toBeDisabled();

    // 5. Action: Check the "choose orbit manually" checkbox.
    await page.locator('#checkbox-manual').check();

    // 6. Assert: The three sliders are enabled, the `select-planet` dropdown is set to "-- choose orbit manually --", and the canvas visualization updates.
    await expect(page.locator('#slider-tilt')).toBeEnabled();
    await expect(page.locator('#slider-equinox')).toBeEnabled();
    await expect(page.locator('#slider-eccentricity')).toBeEnabled();
    await expect(page.locator('#select-planet')).toHaveValue('manual');
    const manualCanvas = await page.locator('#analemma-canvas').screenshot();
    expect(manualCanvas).not.toEqual(marsCanvas);
  });

  test('"axis angle relative to ecliptic" slider changes analemma height', async ({ page }) => {
    // 1. Assert: The "slider-tilt" is visible and enabled.
    await expect(page.locator('#slider-tilt')).toBeVisible();
    await expect(page.locator('#slider-tilt')).toBeEnabled();

    // 2. Assert: The slider's default value is 23.5.
    await expect(page.locator('#slider-tilt')).toHaveValue('23.5');
    const initialCanvas = await page.locator('#analemma-canvas').screenshot();
    
    // 3. Action: Drag the slider to a new value, such as 45.
    await page.locator('#slider-tilt').fill('45');

    // 4. Assert: The canvas visualization updates, showing a change in the analemma's shape.
    const canvasAfter45 = await page.locator('#analemma-canvas').screenshot();
    expect(canvasAfter45).not.toEqual(initialCanvas);
    
    // 5. Action: Drag the slider to its maximum value (90).
    await page.locator('#slider-tilt').fill('90');

    // 6. Assert: The canvas visualization updates again.
    const canvasAfter90 = await page.locator('#analemma-canvas').screenshot();
    expect(canvasAfter90).not.toEqual(canvasAfter45);
  });

  test('"spring equinox point" slider changes analemma orientation', async ({ page }) => {
    // 1. Assert: The "slider-equinox" is visible and enabled.
    await expect(page.locator('#slider-equinox')).toBeVisible();
    await expect(page.locator('#slider-equinox')).toBeEnabled();

    // 2. Assert: The slider's default value is 0.
    await expect(page.locator('#slider-equinox')).toHaveValue('0');
    const initialCanvas = await page.locator('#analemma-canvas').screenshot();

    // 3. Action: Drag the slider to a new value, such as 90.
    await page.locator('#slider-equinox').fill('90');

    // 4. Assert: The canvas visualization updates, showing a change in the analemma's orientation.
    const canvasAfter90 = await page.locator('#analemma-canvas').screenshot();
    expect(canvasAfter90).not.toEqual(initialCanvas);

    // 5. Action: Drag the slider to its minimum value (-180).
    await page.locator('#slider-equinox').fill('-180');

    // 6. Assert: The canvas visualization updates again.
    const canvasAfterNeg180 = await page.locator('#analemma-canvas').screenshot();
    expect(canvasAfterNeg180).not.toEqual(canvasAfter90);
  });

  test('"orbit eccentricity" slider changes analemma width and orbit shape', async ({ page }) => {
    // 1. Assert: The "slider-eccentricity" is visible and enabled.
    await expect(page.locator('#slider-eccentricity')).toBeVisible();
    await expect(page.locator('#slider-eccentricity')).toBeEnabled();

    // 2. Assert: The slider's default value is 0.1.
    await expect(page.locator('#slider-eccentricity')).toHaveValue('0.1');
    const initialCanvas = await page.locator('#analemma-canvas').screenshot();

    // 3. Action: Drag the slider to a higher value, such as 0.25.
    await page.locator('#slider-eccentricity').fill('0.25');

    // 4. Assert: The canvas visualization updates; both the analemma's width and the small orbit ellipse at the top change shape.
    const canvasAfter025 = await page.locator('#analemma-canvas').screenshot();
    expect(canvasAfter025).not.toEqual(initialCanvas);

    // 5. Action: Drag the slider to its minimum value (0).
    await page.locator('#slider-eccentricity').fill('0');

    // 6. Assert: The canvas visualization updates; the analemma figure becomes horizontally symmetrical and the orbit ellipse becomes a circle.
    const canvasAfter0 = await page.locator('#analemma-canvas').screenshot();
    expect(canvasAfter0).not.toEqual(canvasAfter025);
  });

  test('"show sun snapshots" checkbox toggles snapshot visibility', async ({ page }) => {
    // 1. Assert: The "checkbox-snapshots" is visible.
    await expect(page.locator('#checkbox-snapshots')).toBeVisible();

    // 2. Assert: The checkbox is checked by default, and discrete orange dots are visible on the canvas curve.
    await expect(page.locator('#checkbox-snapshots')).toBeChecked();
    const initialCanvas = await page.locator('#analemma-canvas').screenshot();
    
    // 3. Action: Uncheck the checkbox.
    await page.locator('#checkbox-snapshots').uncheck();

    // 4. Assert: The orange dots on the canvas disappear, while the continuous orange line remains.
    const noSnapshotsCanvas = await page.locator('#analemma-canvas').screenshot();
    expect(noSnapshotsCanvas).not.toEqual(initialCanvas);
    
    // 5. Action: Check the checkbox again.
    await page.locator('#checkbox-snapshots').check();

    // 6. Assert: The orange dots reappear on the canvas curve.
    const snapshotsCanvas = await page.locator('#analemma-canvas').screenshot();
    expect(snapshotsCanvas).toEqual(initialCanvas);
  });

  test('"show scales" checkbox toggles axis visibility', async ({ page }) => {
    // 1. Assert: The "checkbox-scales" is visible.
    await expect(page.locator('#checkbox-scales')).toBeVisible();

    // 2. Assert: The checkbox is checked by default, and axes with numerical labels are visible on the canvas.
    await expect(page.locator('#checkbox-scales')).toBeChecked();
    const initialCanvas = await page.locator('#analemma-canvas').screenshot();

    // 3. Action: Uncheck the checkbox.
    await page.locator('#checkbox-scales').uncheck();

    // 4. Assert: The axes, tick marks, and labels on the canvas disappear.
    const noScalesCanvas = await page.locator('#analemma-canvas').screenshot();
    expect(noScalesCanvas).not.toEqual(initialCanvas);
    
    // 5. Action: Check the checkbox again.
    await page.locator('#checkbox-scales').check();

    // 6. Assert: The axes, tick marks, and labels reappear on the canvas.
    const scalesCanvas = await page.locator('#analemma-canvas').screenshot();
    expect(scalesCanvas).toEqual(initialCanvas);
  });

});