const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/DiauxicBehaviorOfYeastInAFedBatchReactor.html');

test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly to render
    // await page.waitForSelector('#plot-top .plot-container');
    // await page.waitForSelector('#plot-bottom .plot-container');
    await page.waitForTimeout(500);
});

test.describe('Interactive Component Tests', () => {

    test('"maximum fraction of respiring biomass" slider', async ({ page }) => {
        const slider = page.locator('#slider-alpha-max');
        const valueDisplay = slider.locator('+ span');

        await expect(slider).toBeVisible();
        await expect(slider).toHaveValue('0.3');
        await expect(valueDisplay).toHaveText(/^0\.30*$/);

        await slider.fill('0.6');
        await expect(valueDisplay).toHaveText(/^0\.60*$/);
        // Implicit assertion: The action above should trigger a plot redraw.

        await slider.fill('1');
        await expect(valueDisplay).toHaveText(/^1\.00*$/);
        // Implicit assertion: The action above should trigger a plot redraw.
    });

    test('"run time minimum (h)" disabled slider', async ({ page }) => {
        const slider = page.locator('#slider-t-min');
        const valueDisplay = slider.locator('+ span');

        await expect(slider).toBeVisible();
        await expect(slider).toHaveValue('0');
        await expect(slider).toBeDisabled();

        // Attempt to interact is verified by re-checking state.
        // Playwright's fill() would error on a disabled element.
        // The core assertion is that it remains disabled and unchanged.
        await expect(slider).toHaveValue('0');
        await expect(valueDisplay).toHaveText('0');

        // Re-inspect the slider element
        await expect(slider).toBeDisabled();
    });

    test('"run time maximum (h)" slider', async ({ page }) => {
        const slider = page.locator('#slider-t-max');
        const valueDisplay = slider.locator('+ span');
        const feedTimeSlider = page.locator('#slider-feed-time');

        await expect(slider).toBeVisible();
        await expect(slider).toHaveValue('60');
        await expect(valueDisplay).toHaveText('60');

        await slider.fill('80');
        await expect(valueDisplay).toHaveText('80');
        await expect(page.locator('#plot-top .xaxislayer-above .xtick text').last()).toHaveText('80');
        await expect(feedTimeSlider).toHaveAttribute('max', '80');

        await slider.fill('10');
        await expect(valueDisplay).toHaveText('10');
        await expect(page.locator('#plot-top .xaxislayer-above .xtick text').last()).toHaveText('10');
        await expect(feedTimeSlider).toHaveAttribute('max', '10');
    });

    test('"intermediate enzyme control" slider', async ({ page }) => {
        const slider = page.locator('#slider-enzyme-control');
        const valueDisplay = slider.locator('+ span');

        await expect(slider).toBeVisible();
        await expect(slider).toHaveValue('1');
        await expect(valueDisplay).toHaveText('1');

        await slider.fill('3');
        await expect(valueDisplay).toHaveText(/^3\.00*$/);
        // Implicit assertion: plot redraw

        await slider.fill('0.1');
        await expect(valueDisplay).toHaveText(/^0\.10*$/);
        // Implicit assertion: plot redraw
    });

    test('"feed flow rate" slider', async ({ page }) => {
        const slider = page.locator('#slider-feed-rate');
        const valueDisplay = slider.locator('+ span');

        await expect(slider).toBeVisible();
        await expect(slider).toHaveValue('0.2');
        await expect(valueDisplay).toHaveText(/^0\.20*$/);

        await slider.fill('1.5');
        await expect(valueDisplay).toHaveText(/^1\.50*$/);
        // Implicit assertion: plot redraw

        await slider.fill('2');
        await expect(valueDisplay).toHaveText(/^2\.00*$/);
        // Implicit assertion: plot redraw
    });

    test('"substrate feed concentration" slider', async ({ page }) => {
        const slider = page.locator('#slider-substrate-feed-conc');
        const valueDisplay = slider.locator('+ span');

        await expect(slider).toBeVisible();
        await expect(slider).toHaveValue('100');
        await expect(valueDisplay).toHaveText('100');

        await slider.fill('50');
        await expect(valueDisplay).toHaveText('50');
        // Implicit assertion: plot redraw

        await slider.fill('200');
        await expect(valueDisplay).toHaveText('200');
        // Implicit assertion: plot redraw
    });

    test('"feed time" slider', async ({ page }) => {
        const slider = page.locator('#slider-feed-time');
        const valueDisplay = slider.locator('+ span');

        await expect(slider).toBeVisible();
        await expect(slider).toHaveValue('35');
        await expect(slider).toHaveAttribute('max', '60');

        await slider.fill('20');
        await expect(valueDisplay).toHaveText('20');
        // Implicit assertion: plot redraw

        await slider.fill('60');
        await expect(valueDisplay).toHaveText('60');
        // Implicit assertion: plot redraw
    });

    test('Plot selection dropdown', async ({ page }) => {
        const selector = page.locator('#select-plot');
        const topPlotTitle = page.locator('#plot-top .gtitle');
        const bottomPlotTitle = page.locator('#plot-bottom .gtitle');

        await expect(selector).toBeVisible();
        await expect(selector).toHaveValue('fed batch');
        await expect(topPlotTitle).toHaveText('diauxic behavior');

        await selector.selectOption('α');
        await expect(topPlotTitle).toHaveText('glucose concentration');
        await expect(bottomPlotTitle).toHaveText('fraction of respiring biomass');

        await selector.selectOption('fed batch');
        await expect(topPlotTitle).toHaveText('diauxic behavior');
        await expect(bottomPlotTitle).toHaveText('enzyme concentration');
    });

    test('"initial conditions" collapsible section', async ({ page }) => {
        const summary = page.locator('summary', { hasText: 'initial conditions' });
        const details = page.locator('details', { has: summary });

        await expect(summary).toBeVisible();
        await expect(details).not.toHaveAttribute('open');

        await summary.click();
        await expect(details).toHaveAttribute('open', '');

        await summary.click();
        await expect(details).not.toHaveAttribute('open');
    });
});