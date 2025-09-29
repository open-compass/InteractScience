const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/HarmonicDistortionOfNonlinearTransferFunction.html');

// Helper function to get a snapshot of the plot data for comparison.
// It reads the 'd' attribute of the SVG path of the first trace in a Plotly plot.
const getPlotTraceData = async (page, plotId) => {
    return await page.locator(`#${plotId} .traces .trace path`).first().getAttribute('d');
};

test.describe('Harmonic Distortion Demo', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
        // Wait for the initial plots to be rendered by Plotly.js
        // await page.waitForSelector('#plot-signal .plot-container .main-svg');
        // await page.waitForSelector('#plot-spectrum .plot-container .main-svg');
        await page.waitForTimeout(500);
    });

    test('Test c₁ Coefficient Slider', async ({ page }) => {
        await expect(page.locator('#slider-c1')).toBeVisible();
        await expect(page.locator('#slider-c1')).toHaveValue('0');
        await expect(page.locator('#c1-value-display')).toHaveText('0');

        const initialSignalData1 = await getPlotTraceData(page, 'plot-signal');
        const initialSpectrumData1 = await getPlotTraceData(page, 'plot-spectrum');
        await page.locator('#slider-c1').fill('1.5');
        await expect(page.locator('#c1-value-display')).toHaveText(/^1\.50*$/);
        await expect(async () => {
            const newSignalData = await getPlotTraceData(page, 'plot-signal');
            const newSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
            expect(newSignalData).not.toEqual(initialSignalData1);
            expect(newSpectrumData).not.toEqual(initialSpectrumData1);
        }).toPass();

        const initialSignalData2 = await getPlotTraceData(page, 'plot-signal');
        const initialSpectrumData2 = await getPlotTraceData(page, 'plot-spectrum');
        await page.locator('#slider-c1').fill('2');
        await expect(page.locator('#c1-value-display')).toHaveText('2');
        await expect(async () => {
            const newSignalData = await getPlotTraceData(page, 'plot-signal');
            const newSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
            expect(newSignalData).not.toEqual(initialSignalData2);
            expect(newSpectrumData).not.toEqual(initialSpectrumData2);
        }).toPass();
    });

    test('Test c₁ Reset Button', async ({ page }) => {
        await expect(page.locator('#reset-c1')).toBeVisible();
        await expect(page.locator('#slider-c1')).toHaveValue('0');

        const initialSignalData = await getPlotTraceData(page, 'plot-signal');
        const initialSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
        await page.locator('#slider-c1').fill('-1.0');
        await expect(page.locator('#c1-value-display')).toHaveText(/^\-1\.00*$/);
        await expect(async () => {
            const newSignalData = await getPlotTraceData(page, 'plot-signal');
            const newSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
            expect(newSignalData).not.toEqual(initialSignalData);
            expect(newSpectrumData).not.toEqual(initialSpectrumData);
        }).toPass();

        const changedSignalData = await getPlotTraceData(page, 'plot-signal');
        const changedSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
        await page.locator('#reset-c1').click();
        await expect(page.locator('#slider-c1')).toHaveValue('0');
        await expect(page.locator('#c1-value-display')).toHaveText('0');
        await expect(async () => {
            const newSignalData = await getPlotTraceData(page, 'plot-signal');
            const newSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
            expect(newSignalData).not.toEqual(changedSignalData);
            expect(newSpectrumData).not.toEqual(changedSpectrumData);
        }).toPass();
    });

    test('Test c₂ Coefficient Slider', async ({ page }) => {
        await expect(page.locator('#slider-c2')).toBeVisible();
        await expect(page.locator('#slider-c2')).toHaveValue('0');
        await expect(page.locator('#c2-value-display')).toHaveText('0');

        const initialSignalData1 = await getPlotTraceData(page, 'plot-signal');
        const initialSpectrumData1 = await getPlotTraceData(page, 'plot-spectrum');
        await page.locator('#slider-c2').fill('-1.0');
        await expect(page.locator('#c2-value-display')).toHaveText(/^\-1\.00*$/);
        await expect(async () => {
            const newSignalData = await getPlotTraceData(page, 'plot-signal');
            const newSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
            expect(newSignalData).not.toEqual(initialSignalData1);
            expect(newSpectrumData).not.toEqual(initialSpectrumData1);
        }).toPass();
        
        const initialSignalData2 = await getPlotTraceData(page, 'plot-signal');
        const initialSpectrumData2 = await getPlotTraceData(page, 'plot-spectrum');
        await page.locator('#slider-c2').fill('-2');
        await expect(page.locator('#c2-value-display')).toHaveText('-2');
        await expect(async () => {
            const newSignalData = await getPlotTraceData(page, 'plot-signal');
            const newSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
            expect(newSignalData).not.toEqual(initialSignalData2);
            expect(newSpectrumData).not.toEqual(initialSpectrumData2);
        }).toPass();
    });

    test('Test c₂ Reset Button', async ({ page }) => {
        await expect(page.locator('#reset-c2')).toBeVisible();
        await expect(page.locator('#slider-c2')).toHaveValue('0');

        const initialSignalData = await getPlotTraceData(page, 'plot-signal');
        const initialSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
        await page.locator('#slider-c2').fill('1.2');
        await expect(page.locator('#c2-value-display')).toHaveText(/^1\.20*$/);
        await expect(async () => {
            const newSignalData = await getPlotTraceData(page, 'plot-signal');
            const newSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
            expect(newSignalData).not.toEqual(initialSignalData);
            expect(newSpectrumData).not.toEqual(initialSpectrumData);
        }).toPass();

        const changedSignalData = await getPlotTraceData(page, 'plot-signal');
        const changedSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
        await page.locator('#reset-c2').click();
        await expect(page.locator('#slider-c2')).toHaveValue('0');
        await expect(page.locator('#c2-value-display')).toHaveText('0');
        await expect(async () => {
            const newSignalData = await getPlotTraceData(page, 'plot-signal');
            const newSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
            expect(newSignalData).not.toEqual(changedSignalData);
            expect(newSpectrumData).not.toEqual(changedSpectrumData);
        }).toPass();
    });

    test('Test Clipping Checkbox', async ({ page }) => {
        await expect(page.locator('#checkbox-clipping')).toBeVisible();
        await expect(page.locator('#checkbox-clipping')).not.toBeChecked();
        await expect(page.locator('#level-control-group')).toBeHidden();

        const initialSignalData = await getPlotTraceData(page, 'plot-signal');
        await page.locator('#checkbox-clipping').check();
        await expect(page.locator('#level-control-group')).toBeVisible();
        await expect(async () => {
            const newSignalData = await getPlotTraceData(page, 'plot-signal');
            expect(newSignalData).not.toEqual(initialSignalData);
        }).toPass();

        const clippedSignalData = await getPlotTraceData(page, 'plot-signal');
        await page.locator('#checkbox-clipping').uncheck();
        await expect(page.locator('#level-control-group')).toBeHidden();
        await expect(async () => {
            const newSignalData = await getPlotTraceData(page, 'plot-signal');
            expect(newSignalData).not.toEqual(clippedSignalData);
        }).toPass();
    });

    test('Test Clipping Level Slider', async ({ page }) => {
        await page.locator('#checkbox-clipping').check();
        await expect(page.locator('#slider-level')).toBeVisible();
        await expect(page.locator('#slider-level')).toHaveValue('0.7');
        await expect(page.locator('#level-value-display')).toHaveText(/^0\.70*$/);

        const initialSignalData1 = await getPlotTraceData(page, 'plot-signal');
        await page.locator('#slider-level').fill('0.5');
        await expect(page.locator('#level-value-display')).toHaveText(/^0\.50*$/);
        await expect(async () => {
            const newSignalData = await getPlotTraceData(page, 'plot-signal');
            expect(newSignalData).not.toEqual(initialSignalData1);
        }).toPass();

        const initialSignalData2 = await getPlotTraceData(page, 'plot-signal');
        await page.locator('#slider-level').fill('1.5');
        await expect(page.locator('#level-value-display')).toHaveText(/^1\.50*$/);
        await expect(async () => {
            const newSignalData = await getPlotTraceData(page, 'plot-signal');
            expect(newSignalData).not.toEqual(initialSignalData2);
        }).toPass();
    });

    test('Test DFT Linear Scale Button', async ({ page }) => {
        await expect(page.locator('#btn-linear')).toBeVisible();
        await expect(page.locator('#btn-linear')).toHaveClass(/active/);
        
        const initialSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
        await page.locator('#btn-decibel').click();
        await expect(page.locator('#btn-linear')).not.toHaveClass(/active/);
        await expect(async () => {
            const newSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
            expect(newSpectrumData).not.toEqual(initialSpectrumData);
        }).toPass();
        
        const decibelSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
        await page.locator('#btn-linear').click();
        await expect(page.locator('#btn-linear')).toHaveClass(/active/);
        await expect(async () => {
            const newSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
            expect(newSpectrumData).not.toEqual(decibelSpectrumData);
        }).toPass();
    });

    test('Test DFT Decibel Scale Button', async ({ page }) => {
        await expect(page.locator('#btn-decibel')).toBeVisible();
        await expect(page.locator('#btn-decibel')).not.toHaveClass(/active/);
        
        const initialSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
        await page.locator('#btn-decibel').click();
        await expect(page.locator('#btn-decibel')).toHaveClass(/active/);
        await expect(async () => {
            const newSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
            expect(newSpectrumData).not.toEqual(initialSpectrumData);
        }).toPass();

        const decibelSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
        await page.locator('#btn-linear').click();
        await expect(page.locator('#btn-decibel')).not.toHaveClass(/active/);
        await expect(async () => {
            const newSpectrumData = await getPlotTraceData(page, 'plot-spectrum');
            expect(newSpectrumData).not.toEqual(decibelSpectrumData);
        }).toPass();
    });
});