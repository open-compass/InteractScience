const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/MaxwellBlochEquationsForATwoLevelSystem.html');

test('Z-position Slider Control', async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly to render the initial plots
    // await page.waitForSelector('#plot-intensity svg');
    // await page.waitForSelector('#plot-population svg');
    // await page.waitForSelector('#plot-coherence svg');
    await page.waitForTimeout(500);

    // Locators
    const slider = page.locator('#slider-z');
    const label = page.locator('#label-z');
    const plotIds = ['#plot-intensity', '#plot-population', '#plot-coherence'];

    // 1. Assert: The range slider with ID `slider-z` is visible.
    await expect(slider).toBeVisible();

    // 2. Assert: The slider's value is 0, and the adjacent label with ID `label-z` displays "0.".
    await expect(slider).toHaveValue('0');
    await expect(label).toHaveText('0.');

    // 2. Assert: The blue dashed line in the plots is identical to the red solid line.
    const initialPaths = {};
    for (const id of plotIds) {
        const plot = page.locator(id);
        const redLinePath = await plot.locator('g.trace.scatter path.js-line').nth(0).getAttribute('d');
        const blueLinePath = await plot.locator('g.trace.scatter path.js-line').nth(1).getAttribute('d');
        expect(blueLinePath).toBe(redLinePath);
        initialPaths[id] = { blueLinePath };
    }
    const vlineLocator = page.locator('#plot-intensity .shapelayer path').nth(1);
    const initialVLinePath = await vlineLocator.getAttribute('d');


    // 3. Action: Drag the slider to a mid-range value (e.g., approximately 16).
    await slider.fill('16.3902');


    // 4. Assert: The `label-z` text updates to a new value (e.g., "16.3902").
    await expect(label).toHaveText(/^16\.39020*$/);

    // 4. Assert: The blue dashed line in all three plots changes shape and shifts horizontally.
    for (const id of plotIds) {
        const plot = page.locator(id);
        const midRangeBlueLinePath = await plot.locator('g.trace.scatter path.js-line').nth(1).getAttribute('d');
        expect(midRangeBlueLinePath).not.toBe(initialPaths[id].blueLinePath);
    }

    // 4. Assert: The second vertical dashed line moves to a new position on the x-axis.
    const midRangeVLinePath = await vlineLocator.getAttribute('d');
    expect(midRangeVLinePath).not.toBe(initialVLinePath);
    const midRangeBlueLinePathIntensity = await page.locator('#plot-intensity g.trace.scatter path.js-line').nth(1).getAttribute('d');

    // 4. Assert: The plot legend for the blue line updates (e.g., to "z = 16.39 meters").
    const legendText = page.locator('#plot-intensity g.legendtext').nth(1);
    await expect(legendText).toHaveText('z = 16.39 meters');


    // 5. Action: Drag the slider to its maximum value of 32.
    await slider.fill('32');


    // 6. Assert: The `label-z` text updates to "32.".
    await expect(label).toHaveText('32.');

    // 6. Assert: The blue dashed line and the second vertical line in all plots are updated to their positions corresponding to z=32.
    const maxRangeBlueLinePathIntensity = await page.locator('#plot-intensity g.trace.scatter path.js-line').nth(1).getAttribute('d');
    expect(maxRangeBlueLinePathIntensity).not.toBe(midRangeBlueLinePathIntensity);

    const maxRangeVLinePath = await vlineLocator.getAttribute('d');
    expect(maxRangeVLinePath).not.toBe(midRangeVLinePath);

    const maxLegendText = page.locator('#plot-intensity g.legendtext').nth(1);
    await expect(maxLegendText).toHaveText('z = 32. meters');
});