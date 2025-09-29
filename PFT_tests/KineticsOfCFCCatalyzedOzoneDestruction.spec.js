const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/KineticsOfCFCCatalyzedOzoneDestruction.html');

test.describe('Kinetics of CFC Catalyzed Ozone Destruction', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
        // Wait for plots to potentially render
        // await page.waitForSelector('#plot-ozone .plot-container');
        // await page.waitForSelector('#plot-cfc .plot-container');
        await page.waitForTimeout(500);
    });

    test('CFC Plot Dropdown Selection', async ({ page }) => {
        // 1. Assert: The "cfc plot" dropdown with ID `select-cfc` is visible.
        await expect(page.locator('#select-cfc')).toBeVisible();

        // 2. Assert: The default selected option in the `select-cfc` dropdown is "CFC-12".
        await expect(page.locator('#select-cfc')).toHaveValue('CFC-12');
        
        // Capture initial plot states for comparison
        const initialCfcPlotScreenshot = await page.locator('#plot-cfc').screenshot();
        const initialOzonePlotScreenshot = await page.locator('#plot-ozone').screenshot();

        // 3. Action: Select "CFC-11" from the `select-cfc` dropdown.
        await page.locator('#select-cfc').selectOption('CFC-11');

        // 4. Assert: The data trace on the "CFC concentration" plot changes and the slope of the line on the "concentration of ozone" plot updates.
        await expect(page.locator('#plot-cfc')).not.toHaveScreenshot(initialCfcPlotScreenshot);
        await expect(page.locator('#plot-ozone')).not.toHaveScreenshot(initialOzonePlotScreenshot);

        // Capture new state for next comparison
        const cfc11PlotScreenshot = await page.locator('#plot-cfc').screenshot();

        // 5. Action: Select "CCl4" from the `select-cfc` dropdown.
        await page.locator('#select-cfc').selectOption('CCl4');

        // 6. Assert: The data trace on the "CFC concentration" plot updates again to reflect the "CCl4" data.
        await expect(page.locator('#plot-cfc')).not.toHaveScreenshot(cfc11PlotScreenshot);
    });

    test('Show All CFCs Checkbox', async ({ page }) => {
        // 1. Assert: The "show all" checkbox with ID `checkbox-show-all` is visible.
        await expect(page.locator('#checkbox-show-all')).toBeVisible();

        // 2. Assert: The `checkbox-show-all` is unchecked by default.
        await expect(page.locator('#checkbox-show-all')).not.toBeChecked();
        
        const singleTraceScreenshot = await page.locator('#plot-cfc').screenshot();

        // 3. Action: Click the `checkbox-show-all` to check it.
        await page.locator('#checkbox-show-all').check();

        // 4. Assert: The "CFC concentration" plot now displays multiple data traces instead of one.
        await expect(page.locator('#plot-cfc')).not.toHaveScreenshot(singleTraceScreenshot);

        // 5. Action: Click the `checkbox-show-all` to uncheck it.
        await page.locator('#checkbox-show-all').uncheck();

        // 6. Assert: The "CFC concentration" plot reverts to displaying a single data trace corresponding to the selected CFC.
        await expect(page.locator('#plot-cfc')).toHaveScreenshot(singleTraceScreenshot);
    });

    test('Year Slider Control', async ({ page }) => {
        // 1. Assert: The "year" slider with ID `slider-year` is visible.
        await expect(page.locator('#slider-year')).toBeVisible();

        // 2. Assert: The `slider-year` value is 1950, and the `label-year` text displays "1950".
        await expect(page.locator('#slider-year')).toHaveValue('1950');
        await expect(page.locator('#label-year')).toHaveText('1950');
        
        const initialVizScreenshot = await page.locator('#visualization-panel').screenshot();

        // 3. Action: Drag the `slider-year` to the value 2000.
        await page.locator('#slider-year').fill('2000');

        // 4. Assert: The `label-year` text updates to "2000", the red marker on the "CFC concentration" plot moves, and the opacity of the 3D ozone layer changes.
        await expect(page.locator('#label-year')).toHaveText('2000');
        await expect(page.locator('#visualization-panel')).not.toHaveScreenshot(initialVizScreenshot);
        
        const vizAt2000Screenshot = await page.locator('#visualization-panel').screenshot();

        // 5. Action: Drag the `slider-year` to its minimum value, 1940.
        await page.locator('#slider-year').fill('1940');

        // 6. Assert: The `label-year` text updates to "1940", and the red marker on the "CFC concentration" plot moves to the start of the data range.
        await expect(page.locator('#label-year')).toHaveText('1940');
        await expect(page.locator('#visualization-panel')).not.toHaveScreenshot(vizAt2000Screenshot);
    });

    test('Time (s) Slider Control', async ({ page }) => {
        // 1. Assert: The "time (s)" slider with ID `slider-time` is visible.
        await expect(page.locator('#slider-time')).toBeVisible();

        // 2. Assert: The `slider-time` value is 1, and the `label-time` text displays "1".
        await expect(page.locator('#slider-time')).toHaveValue('1');
        await expect(page.locator('#label-time')).toHaveText('1');

        const initialOzonePlotScreenshot = await page.locator('#plot-ozone').screenshot();

        // 3. Action: Drag the `slider-time` to the value 15.
        await page.locator('#slider-time').fill('15');

        // 4. Assert: The `label-time` text updates to "15", and the length of the line on the "concentration of ozone" plot increases.
        await expect(page.locator('#label-time')).toHaveText('15');
        await expect(page.locator('#plot-ozone')).not.toHaveScreenshot(initialOzonePlotScreenshot);

        const ozonePlotAt15Screenshot = await page.locator('#plot-ozone').screenshot();

        // 5. Action: Drag the `slider-time` to its maximum value, 30.
        await page.locator('#slider-time').fill('30');

        // 6. Assert: The `label-time` text updates to "30", and the line on the "concentration of ozone" plot extends to the end of the plot's x-axis.
        await expect(page.locator('#label-time')).toHaveText('30');
        await expect(page.locator('#plot-ozone')).not.toHaveScreenshot(ozonePlotAt15Screenshot);
    });
});