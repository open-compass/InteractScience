const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/TheEquationOfTimeForASundial.html');

test.describe('Equation of Time Controls', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('"Angle relative to ecliptic" slider control', async ({ page }) => {
    // 1. Assert: The slider with id `slider-angle` and its value display `value-angle` are visible.
    const slider = page.locator('#slider-angle');
    const valueDisplay = page.locator('#value-angle');
    await expect(slider).toBeVisible();
    await expect(valueDisplay).toBeVisible();

    // 2. Assert: The slider's value is `23.45`, and the `value-angle` span displays "23.45".
    await expect(slider).toHaveValue('23.45');
    await expect(valueDisplay).toHaveText(/^23\.450*$/);

    const plotCanvas = page.locator('#plot-canvas');
    const initialPlotSnapshot = await plotCanvas.screenshot();

    // 3. Action: Drag the slider to a new value, for example, `45`.
    await slider.fill('45');

    // 4. Assert: The `value-angle` span updates to display "45", and the plot on `plot-canvas` is redrawn.
    await expect(valueDisplay).toHaveText('45');
    await expect(plotCanvas.screenshot()).resolves.not.toEqual(initialPlotSnapshot);

    const midPlotSnapshot = await plotCanvas.screenshot();

    // 5. Action: Drag the slider to its minimum value, `0`.
    await slider.fill('0');

    // 6. Assert: The `value-angle` span updates to display "0", and the plot on `plot-canvas` is redrawn.
    await expect(valueDisplay).toHaveText('0');
    await expect(plotCanvas.screenshot()).resolves.not.toEqual(midPlotSnapshot);
  });

  test('"Longitude of periapsis" slider control', async ({ page }) => {
    // 1. Assert: The slider with id `slider-longitude` and its value display `value-longitude` are visible.
    const slider = page.locator('#slider-longitude');
    const valueDisplay = page.locator('#value-longitude');
    await expect(slider).toBeVisible();
    await expect(valueDisplay).toBeVisible();

    // 2. Assert: The slider's value is `102.95`, and the `value-longitude` span displays "102.95".
    await expect(slider).toHaveValue('102.95');
    await expect(valueDisplay).toHaveText(/^102\.950*$/);

    const orbitCanvas = page.locator('#orbit-canvas');
    const plotCanvas = page.locator('#plot-canvas');
    const initialOrbitSnapshot = await orbitCanvas.screenshot();
    const initialPlotSnapshot = await plotCanvas.screenshot();

    // 3. Action: Drag the slider to a new value, for example, `180`.
    await slider.fill('180');

    // 4. Assert: The `value-longitude` span updates to display "180", and both the `orbit-canvas` and `plot-canvas` are redrawn.
    await expect(valueDisplay).toHaveText('180');
    await expect(orbitCanvas.screenshot()).resolves.not.toEqual(initialOrbitSnapshot);
    await expect(plotCanvas.screenshot()).resolves.not.toEqual(initialPlotSnapshot);

    const midOrbitSnapshot = await orbitCanvas.screenshot();
    const midPlotSnapshot = await plotCanvas.screenshot();

    // 5. Action: Drag the slider to its maximum value, `360`.
    await slider.fill('360');

    // 6. Assert: The `value-longitude` span updates to display "360", and both canvases are redrawn.
    await expect(valueDisplay).toHaveText('360');
    await expect(orbitCanvas.screenshot()).resolves.not.toEqual(midOrbitSnapshot);
    await expect(plotCanvas.screenshot()).resolves.not.toEqual(midPlotSnapshot);
  });

  test('"Orbit eccentricity" slider control', async ({ page }) => {
    // 1. Assert: The slider with id `slider-eccentricity` and its value display `value-eccentricity` are visible.
    const slider = page.locator('#slider-eccentricity');
    const valueDisplay = page.locator('#value-eccentricity');
    await expect(slider).toBeVisible();
    await expect(valueDisplay).toBeVisible();

    // 2. Assert: The slider's value is `0.016722`, and the `value-eccentricity` span displays "0.016722".
    await expect(slider).toHaveValue('0.016722');
    await expect(valueDisplay).toHaveText(/^0\.0167220*$/);
    
    const orbitCanvas = page.locator('#orbit-canvas');
    const plotCanvas = page.locator('#plot-canvas');
    const initialOrbitSnapshot = await orbitCanvas.screenshot();
    const initialPlotSnapshot = await plotCanvas.screenshot();

    // 3. Action: Drag the slider to a new value, for example, `0.5`.
    await slider.fill('0.5');

    // 4. Assert: The `value-eccentricity` span updates to display "0.5", and both the `orbit-canvas` and `plot-canvas` are redrawn.
    await expect(valueDisplay).toHaveText(/^0\.50*$/);
    await expect(orbitCanvas.screenshot()).resolves.not.toEqual(initialOrbitSnapshot);
    await expect(plotCanvas.screenshot()).resolves.not.toEqual(initialPlotSnapshot);

    const midOrbitSnapshot = await orbitCanvas.screenshot();
    const midPlotSnapshot = await plotCanvas.screenshot();

    // 5. Action: Drag the slider to its maximum value, `0.99`.
    await slider.fill('0.99');

    // 6. Assert: The `value-eccentricity` span updates to display "0.99", and both canvases are redrawn.
    await expect(valueDisplay).toHaveText(/^0\.990*$/);
    await expect(orbitCanvas.screenshot()).resolves.not.toEqual(midOrbitSnapshot);
    await expect(plotCanvas.screenshot()).resolves.not.toEqual(midPlotSnapshot);
  });
});