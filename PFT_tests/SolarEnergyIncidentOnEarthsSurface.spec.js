const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/SolarEnergyIncidentOnEarthsSurface.html');

test.describe('Interactive Components', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly charts to be rendered
    // await page.waitForSelector('#plot-instant .plot-container.plotly');
    // await page.waitForSelector('#plot-cumulative .plot-container.plotly');
    await page.waitForTimeout(500);
  });

  test('Season Slider Control', async ({ page }) => {
    // 1. Assert: The "season" slider (#slider-season) is visible on the page.
    await expect(page.locator('#slider-season')).toBeVisible();

    // 2. Assert: The slider's value is 0 and its corresponding numeric display (#value-season) shows "0".
    await expect(page.locator('#slider-season')).toHaveValue('0');
    await expect(page.locator('#value-season')).toHaveText('0');

    // Capture initial plot shapes
    const initialInstantPlotD = await page.locator('#plot-instant .traces .trace:first-child path').getAttribute('d');
    const initialCumulativePlotD = await page.locator('#plot-cumulative .traces .trace:first-child path').getAttribute('d');

    // 3. Action: Drag the "season" slider to the middle of its range (e.g., a value of 0.5).
    await page.locator('#slider-season').fill('0.5');

    // 4. Assert: The numeric display #value-season updates, the lighting on the 3D globe changes, and the shape of the curves on both plots is modified.
    await expect(page.locator('#value-season')).toHaveText(/^0\.50*$/);
    const midInstantPlotD = await page.locator('#plot-instant .traces .trace:first-child path').getAttribute('d');
    const midCumulativePlotD = await page.locator('#plot-cumulative .traces .trace:first-child path').getAttribute('d');
    expect(midInstantPlotD).not.toEqual(initialInstantPlotD);
    expect(midCumulativePlotD).not.toEqual(initialCumulativePlotD);

    // 5. Action: Drag the "season" slider to its maximum value (1).
    await page.locator('#slider-season').fill('1');

    // 6. Assert: The numeric display #value-season shows "1", and both the globe's lighting and the plot curves update again.
    await expect(page.locator('#value-season')).toHaveText('1');
    const maxInstantPlotD = await page.locator('#plot-instant .traces .trace:first-child path').getAttribute('d');
    const maxCumulativePlotD = await page.locator('#plot-cumulative .traces .trace:first-child path').getAttribute('d');
    expect(maxInstantPlotD).not.toEqual(midInstantPlotD);
    expect(maxCumulativePlotD).not.toEqual(midCumulativePlotD);
  });

  test('Latitude Slider Control', async ({ page }) => {
    // 1. Assert: The "latitude" slider (#slider-latitude) is visible on the page.
    await expect(page.locator('#slider-latitude')).toBeVisible();

    // 2. Assert: The slider's value is 51.4789 and its numeric display (#value-latitude) shows "51.4789".
    await expect(page.locator('#slider-latitude')).toHaveValue('51.4789');
    await expect(page.locator('#value-latitude')).toHaveText(/^51\.47890*$/);

    // Capture initial plot shapes for the 'latitude' curve (trace 2)
    const initialInstantPlotD = await page.locator('#plot-instant .traces .trace:nth-child(2) path').getAttribute('d');
    const initialCumulativePlotD = await page.locator('#plot-cumulative .traces .trace:nth-child(2) path').getAttribute('d');

    // 3. Action: Drag the "latitude" slider to a new value (e.g., 23.5).
    await page.locator('#slider-latitude').fill('23.5');

    // 4. Assert: The numeric display #value-latitude updates, the position of the dashed blue latitude line on the globe changes, and the black "latitude" curve on both plots is redrawn.
    await expect(page.locator('#value-latitude')).toHaveText(/^23\.50*$/);
    const newInstantPlotD = await page.locator('#plot-instant .traces .trace:nth-child(2) path').getAttribute('d');
    const newCumulativePlotD = await page.locator('#plot-cumulative .traces .trace:nth-child(2) path').getAttribute('d');
    expect(newInstantPlotD).not.toEqual(initialInstantPlotD);
    expect(newCumulativePlotD).not.toEqual(initialCumulativePlotD);

    // 5. Action: Drag the "latitude" slider to its minimum value (0).
    await page.locator('#slider-latitude').fill('0');

    // 6. Assert: The numeric display #value-latitude shows "0", the dashed latitude line on the globe moves to the equator, and the black curve on the plots now overlaps the red "equator" curve.
    await expect(page.locator('#value-latitude')).toHaveText('0');
    // Get d attributes for equator (trace 1, red) and latitude (trace 2, black)
    const equatorInstantD = await page.locator('#plot-instant .traces .trace:nth-child(1) path').getAttribute('d');
    const latitudeInstantD = await page.locator('#plot-instant .traces .trace:nth-child(2) path').getAttribute('d');
    const equatorCumulativeD = await page.locator('#plot-cumulative .traces .trace:nth-child(1) path').getAttribute('d');
    const latitudeCumulativeD = await page.locator('#plot-cumulative .traces .trace:nth-child(2) path').getAttribute('d');
    expect(latitudeInstantD).toEqual(equatorInstantD);
    expect(latitudeCumulativeD).toEqual(equatorCumulativeD);
  });

  test('Time of Day Slider Control', async ({ page }) => {
    // 1. Assert: The "time of day" slider (#slider-time) is visible on the page.
    await expect(page.locator('#slider-time')).toBeVisible();

    // 2. Assert: The slider's value is 12 and its numeric display (#value-time) shows "12".
    await expect(page.locator('#slider-time')).toHaveValue('12');
    await expect(page.locator('#value-time')).toHaveText('12');

    // Capture initial marker position. The marker is the 4th trace, which contains a single point.
    const markerLocator = page.locator('#plot-instant .traces g.trace.scatter:nth-child(4) g.points path');
    const initialMarkerTransform = await markerLocator.getAttribute('transform');

    // 3. Action: Drag the "time of day" slider to a new value (e.g., 6).
    await page.locator('#slider-time').fill('6');

    // 4. Assert: The numeric display #value-time updates, the 3D globe rotates on its axis, and the black marker on the instantaneous energy plot moves to a new position along the "latitude" curve.
    await expect(page.locator('#value-time')).toHaveText('6');
    const newMarkerTransform = await markerLocator.getAttribute('transform');
    expect(newMarkerTransform).not.toEqual(initialMarkerTransform);

    // 5. Action: Drag the "time of day" slider to its maximum value (24).
    await page.locator('#slider-time').fill('24');

    // 6. Assert: The numeric display #value-time shows "24", the globe completes its rotation, and the black marker on the plot moves to the far right end of the x-axis.
    await expect(page.locator('#value-time')).toHaveText('24');
    const finalMarkerTransform = await markerLocator.getAttribute('transform');
    expect(finalMarkerTransform).not.toEqual(newMarkerTransform);
  });
});