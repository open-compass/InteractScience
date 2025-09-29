const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/LocalSolutionOfANonlinearODEUsingAPowerSeriesExpansion.html');

test.describe('Interactive ODE Power Series Visualization', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
        // Wait for the Plotly chart to be rendered
        // await page.waitForSelector('#plot-container .plot-container');
        await page.waitForTimeout(500);
    });

    test('Expansion Order Slider', async ({ page }) => {
        // 1. Assert: The "expansion order" slider (#slider-order) is visible on the page.
        const slider = page.locator('#slider-order');
        await expect(slider).toBeVisible();

        // 2. Assert: The slider's initial value is 5, and its corresponding label (#value-order) displays "5".
        const valueLabel = page.locator('#value-order');
        await expect(slider).toHaveValue('5');
        await expect(valueLabel).toHaveText('5');
        
        const plotTitle = page.locator('#plot-container .gtitle');

        // 3. Action: Drag the "expansion order" slider handle to the left, setting its value to 3.
        await slider.fill('3');

        // 4. Assert: The value label (#value-order) updates to "3" and the polynomial in the plot title is now a 3rd-order polynomial.
        await expect(valueLabel).toHaveText('3');
        await expect(plotTitle).toContainText('x^3');
        await expect(plotTitle).not.toContainText('x^4');

        // 5. Action: Drag the slider handle to its minimum position, setting the value to 1.
        await slider.fill('1');

        // 6. Assert: The value label (#value-order) updates to "1", and the plot title and red curve change to reflect a 1st-order polynomial.
        await expect(valueLabel).toHaveText('1');
        await expect(plotTitle).not.toContainText('x^2');
    });

    test('Initial Condition f(0) Slider', async ({ page }) => {
        // 1. Assert: The "f(0)" slider (#slider-a) is visible on the page.
        const slider = page.locator('#slider-a');
        await expect(slider).toBeVisible();

        // 2. Assert: The slider's initial value is 2.0, and its corresponding label (#value-a) displays "2.0".
        const valueLabel = page.locator('#value-a');
        await expect(slider).toHaveValue('2.0');
        await expect(valueLabel).toHaveText(/^2\.00*$/);
        
        const plotTitle = page.locator('#plot-container .gtitle');
        const initialTitleText = await plotTitle.textContent();

        // 3. Action: Drag the "f(0)" slider handle, setting its value to 1.5.
        await slider.fill('1.5');

        // 4. Assert: The value label (#value-a) updates to "1.5", the plot title's polynomial coefficients change, and the start point (at x=0) of both curves moves down.
        await expect(valueLabel).toHaveText(/^1\.50*$/);
        const newTitleText1 = await plotTitle.textContent();
        expect(newTitleText1).not.toEqual(initialTitleText);
        await expect(plotTitle).toContainText('f(x) = 1.5');

        // 5. Action: Drag the slider handle to its maximum position, setting the value to 3.0.
        await slider.fill('3');

        // 6. Assert: The value label (#value-a) updates to "3.0", and the plot title and curves change again.
        await expect(valueLabel).toHaveText(/^3\.00*$/);
        const newTitleText2 = await plotTitle.textContent();
        expect(newTitleText2).not.toEqual(newTitleText1);
        await expect(plotTitle).toContainText('f(x) = 3');
    });

    test("Initial Condition f'(0) Slider", async ({ page }) => {
        // 1. Assert: The "f'(0)" slider (#slider-b) is visible on the page.
        const slider = page.locator('#slider-b');
        await expect(slider).toBeVisible();

        // 2. Assert: The slider's initial value is 0.0, and its corresponding label (#value-b) displays "0.0".
        const valueLabel = page.locator('#value-b');
        await expect(slider).toHaveValue('0.0');
        await expect(valueLabel).toHaveText(/^0\.00*$/);

        const plotTitle = page.locator('#plot-container .gtitle');
        const initialTitleText = await plotTitle.textContent();
        
        // 3. Action: Drag the "f'(0)" slider handle, setting its value to 1.0.
        await slider.fill('1');

        // 4. Assert: The value label (#value-b) updates to "1.0", the plot title's polynomial coefficients change, and the initial slope of both curves changes.
        await expect(valueLabel).toHaveText(/^1\.00*$/);
        const newTitleText1 = await plotTitle.textContent();
        expect(newTitleText1).not.toEqual(initialTitleText);
        await expect(plotTitle).toContainText('+ 1.00000 x');

        // 5. Action: Drag the slider handle to its minimum position, setting the value to -2.0.
        await slider.fill('-2.0');

        // 6. Assert: The value label (#value-b) updates to "-2.0", and the plot title and curves change again.
        await expect(valueLabel).toHaveText(/^\-2\.00*$/);
        const newTitleText2 = await plotTitle.textContent();
        expect(newTitleText2).not.toEqual(newTitleText1);
        await expect(plotTitle).toContainText('- 2.00000 x');
    });

});