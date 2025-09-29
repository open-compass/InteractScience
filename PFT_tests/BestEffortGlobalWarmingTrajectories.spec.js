const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/BestEffortGlobalWarmingTrajectories.html');

/**
 * Helper function to get the SVG path data for the plot traces.
 * @param {import('@playwright/test').Page} page The Playwright page object.
 * @returns {Promise<{carbonPath: string | null, emissionsPath: string | null}>} An object with the 'd' attributes of the paths.
 */
async function getPlotTracePaths(page) {
    await page.waitForSelector('#plot-div .scatterlayer .trace path');
    const carbonPathLocator = page.locator('#plot-div .scatterlayer .trace:nth-child(1) path');
    const emissionsPathLocator = page.locator('#plot-div .scatterlayer .trace:nth-child(2) path');
    const carbonPath = await carbonPathLocator.getAttribute('d');
    const emissionsPath = await emissionsPathLocator.getAttribute('d');
    return { carbonPath, emissionsPath };
}

test.describe('Best Effort Global Warming Trajectories', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
        // Wait for Plotly to render the chart
        // await page.waitForSelector('#plot-div .main-svg');
        await page.waitForTimeout(500);
    });

    test('Atmospheric CO2 residence time slider interaction', async ({ page }) => {
        // 1. Assert: The slider with id `slider-residence-time` is visible.
        await expect(page.locator('#slider-residence-time')).toBeVisible();

        // 2. Assert: The slider's value is 200 and the associated span `value-residence-time` displays "200".
        await expect(page.locator('#slider-residence-time')).toHaveValue('200');
        await expect(page.locator('#value-residence-time')).toHaveText('200');

        const initialPaths = await getPlotTracePaths(page);

        // 3. Action: Drag the slider to a new value, such as 300.
        await page.locator('#slider-residence-time').fill('300');

        // 4. Assert: The span `value-residence-time` updates to "300" and the plot's blue and purple curves change.
        await expect(page.locator('#value-residence-time')).toHaveText('300');
        const pathsAfter300 = await getPlotTracePaths(page);
        // Per the model, residence time only affects the carbon curve (blue), not the emissions curve (purple).
        expect(pathsAfter300.carbonPath).not.toEqual(initialPaths.carbonPath);
        expect(pathsAfter300.emissionsPath).toEqual(initialPaths.emissionsPath);

        // 5. Action: Drag the slider to its maximum value of 500.
        await page.locator('#slider-residence-time').fill('500');

        // 6. Assert: The span `value-residence-time` updates to "500" and the plot's blue and purple curves change again.
        await expect(page.locator('#value-residence-time')).toHaveText('500');
        const pathsAfter500 = await getPlotTracePaths(page);
        expect(pathsAfter500.carbonPath).not.toEqual(pathsAfter300.carbonPath);
        expect(pathsAfter500.emissionsPath).toEqual(pathsAfter300.emissionsPath);
    });

    test('Transition to constant reduction pace slider interaction', async ({ page }) => {
        // 1. Assert: The slider with id `slider-transition-pace` is visible.
        await expect(page.locator('#slider-transition-pace')).toBeVisible();

        // 2. Assert: The slider's value is 25 and the associated span `value-transition-pace` displays "25".
        await expect(page.locator('#slider-transition-pace')).toHaveValue('25');
        await expect(page.locator('#value-transition-pace')).toHaveText('25');

        const initialPaths = await getPlotTracePaths(page);

        // 3. Action: Drag the slider to a new value, such as 81.
        await page.locator('#slider-transition-pace').fill('81');

        // 4. Assert: The span `value-transition-pace` updates to "81" and the plot's blue and purple curves change.
        await expect(page.locator('#value-transition-pace')).toHaveText('81');
        const pathsAfter81 = await getPlotTracePaths(page);
        expect(pathsAfter81.carbonPath).not.toEqual(initialPaths.carbonPath);
        expect(pathsAfter81.emissionsPath).not.toEqual(initialPaths.emissionsPath);

        // 5. Action: Drag the slider to its minimum value of 0.
        await page.locator('#slider-transition-pace').fill('0');

        // 6. Assert: The span `value-transition-pace` updates to "0" and the plot's blue and purple curves change again.
        await expect(page.locator('#value-transition-pace')).toHaveText('0');
        const pathsAfter0 = await getPlotTracePaths(page);
        expect(pathsAfter0.carbonPath).not.toEqual(pathsAfter81.carbonPath);
        expect(pathsAfter0.emissionsPath).not.toEqual(pathsAfter81.emissionsPath);
    });

    test('Number of constant pace wedges slider interaction', async ({ page }) => {
        // 1. Assert: The slider with id `slider-wedges` is visible.
        await expect(page.locator('#slider-wedges')).toBeVisible();

        // 2. Assert: The slider's value is 4 and the associated span `value-wedges` displays "4.00".
        await expect(page.locator('#slider-wedges')).toHaveValue('4');
        await expect(page.locator('#value-wedges')).toHaveText(/^4\.000*$/);

        const initialPaths = await getPlotTracePaths(page);

        // 3. Action: Drag the slider to a new value, such as 2.15.
        await page.locator('#slider-wedges').fill('2.15');

        // 4. Assert: The span `value-wedges` updates to "2.15" and the plot's blue and purple curves change.
        await expect(page.locator('#value-wedges')).toHaveText(/^2\.150*$/);
        const pathsAfter215 = await getPlotTracePaths(page);
        expect(pathsAfter215.carbonPath).not.toEqual(initialPaths.carbonPath);
        expect(pathsAfter215.emissionsPath).not.toEqual(initialPaths.emissionsPath);

        // 5. Action: Drag the slider to its maximum value of 10.
        await page.locator('#slider-wedges').fill('10');

        // 6. Assert: The span `value-wedges` updates to "10.00" and the plot's blue and purple curves change again.
        await expect(page.locator('#value-wedges')).toHaveText(/^10\.000*$/);
        const pathsAfter10 = await getPlotTracePaths(page);
        expect(pathsAfter10.carbonPath).not.toEqual(pathsAfter215.carbonPath);
        expect(pathsAfter10.emissionsPath).not.toEqual(pathsAfter215.emissionsPath);
    });
});