const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/PredictingMaximumSeaLevels.html');

test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly to render the initial plots
    // await page.waitForSelector('#plot-pdf .plot-container');
    // await page.waitForSelector('#plot-return-level .plot-container');
    await page.waitForTimeout(500);
});

test.describe('GEV Distribution 1', () => {
    test('GEV Distribution 1 Location (μ₁) Slider', async ({ page }) => {
        const slider = page.locator('#slider-mu1');
        const display = page.locator('#display-mu1');
        const pdfPlot = page.locator('#plot-pdf');
        const returnLevelPlot = page.locator('#plot-return-level');

        await expect(slider).toBeVisible();
        await expect(display).toHaveValue('3.87');

        const initialPdfScreenshot = await pdfPlot.screenshot();
        const initialReturnLevelScreenshot = await returnLevelPlot.screenshot();

        await slider.fill('4.5');
        await expect(display).toHaveValue('4.5');
        await expect(pdfPlot).not.toHaveScreenshot(initialPdfScreenshot);
        await expect(returnLevelPlot).not.toHaveScreenshot(initialReturnLevelScreenshot);

        const midPdfScreenshot = await pdfPlot.screenshot();
        const midReturnLevelScreenshot = await returnLevelPlot.screenshot();

        await slider.fill('6');
        await expect(display).toHaveValue('6');
        await expect(pdfPlot).not.toHaveScreenshot(midPdfScreenshot);
        await expect(returnLevelPlot).not.toHaveScreenshot(midReturnLevelScreenshot);
    });

    test('GEV Distribution 1 Scale (σ₁) Slider', async ({ page }) => {
        const slider = page.locator('#slider-sigma1');
        const display = page.locator('#display-sigma1');
        const pdfPlot = page.locator('#plot-pdf');
        const returnLevelPlot = page.locator('#plot-return-level');

        await expect(slider).toBeVisible();
        await expect(display).toHaveValue('0.198');

        const initialPdfScreenshot = await pdfPlot.screenshot();
        const initialReturnLevelScreenshot = await returnLevelPlot.screenshot();

        await slider.fill('0.4');
        await expect(display).toHaveValue('0.4');
        await expect(pdfPlot).not.toHaveScreenshot(initialPdfScreenshot);
        await expect(returnLevelPlot).not.toHaveScreenshot(initialReturnLevelScreenshot);

        const midPdfScreenshot = await pdfPlot.screenshot();
        const midReturnLevelScreenshot = await returnLevelPlot.screenshot();

        await slider.fill('0.1');
        await expect(display).toHaveValue('0.1');
        await expect(pdfPlot).not.toHaveScreenshot(midPdfScreenshot);
        await expect(returnLevelPlot).not.toHaveScreenshot(midReturnLevelScreenshot);
    });

    test('GEV Distribution 1 Shape (ξ₁) Slider', async ({ page }) => {
        const slider = page.locator('#slider-xi1');
        const display = page.locator('#display-xi1');
        const pdfPlot = page.locator('#plot-pdf');
        const returnLevelPlot = page.locator('#plot-return-level');

        await expect(slider).toBeVisible();
        await expect(display).toHaveValue('-0.05');

        const initialPdfScreenshot = await pdfPlot.screenshot();
        const initialReturnLevelScreenshot = await returnLevelPlot.screenshot();

        await slider.fill('0.25');
        await expect(display).toHaveValue('0.25');
        await expect(pdfPlot).not.toHaveScreenshot(initialPdfScreenshot);
        await expect(returnLevelPlot).not.toHaveScreenshot(initialReturnLevelScreenshot);

        const midPdfScreenshot = await pdfPlot.screenshot();
        const midReturnLevelScreenshot = await returnLevelPlot.screenshot();

        await slider.fill('-0.5');
        await expect(display).toHaveValue('-0.5');
        await expect(pdfPlot).not.toHaveScreenshot(midPdfScreenshot);
        await expect(returnLevelPlot).not.toHaveScreenshot(midReturnLevelScreenshot);
    });
});

test.describe('GEV Distribution 2', () => {
    test('GEV Distribution 2 Location (μ₂) Slider', async ({ page }) => {
        const slider = page.locator('#slider-mu2');
        const display = page.locator('#display-mu2');
        const pdfPlot = page.locator('#plot-pdf');
        const returnLevelPlot = page.locator('#plot-return-level');

        await expect(slider).toBeVisible();
        await expect(display).toHaveValue('3.87');

        const initialPdfScreenshot = await pdfPlot.screenshot();
        const initialReturnLevelScreenshot = await returnLevelPlot.screenshot();

        await slider.fill('5');
        await expect(display).toHaveValue('5.0');
        await expect(pdfPlot).not.toHaveScreenshot(initialPdfScreenshot);
        await expect(returnLevelPlot).not.toHaveScreenshot(initialReturnLevelScreenshot);

        const midPdfScreenshot = await pdfPlot.screenshot();
        const midReturnLevelScreenshot = await returnLevelPlot.screenshot();

        await slider.fill('2');
        await expect(display).toHaveValue('2');
        await expect(pdfPlot).not.toHaveScreenshot(midPdfScreenshot);
        await expect(returnLevelPlot).not.toHaveScreenshot(midReturnLevelScreenshot);
    });

    test('GEV Distribution 2 Scale (σ₂) Slider', async ({ page }) => {
        const slider = page.locator('#slider-sigma2');
        const display = page.locator('#display-sigma2');
        const pdfPlot = page.locator('#plot-pdf');
        const returnLevelPlot = page.locator('#plot-return-level');

        await expect(slider).toBeVisible();
        await expect(display).toHaveValue('0.3');

        const initialPdfScreenshot = await pdfPlot.screenshot();
        const initialReturnLevelScreenshot = await returnLevelPlot.screenshot();

        await slider.fill('0.15');
        await expect(display).toHaveValue('0.15');
        await expect(pdfPlot).not.toHaveScreenshot(initialPdfScreenshot);
        await expect(returnLevelPlot).not.toHaveScreenshot(initialReturnLevelScreenshot);

        const midPdfScreenshot = await pdfPlot.screenshot();
        const midReturnLevelScreenshot = await returnLevelPlot.screenshot();

        await slider.fill('0.5');
        await expect(display).toHaveValue('0.5');
        await expect(pdfPlot).not.toHaveScreenshot(midPdfScreenshot);
        await expect(returnLevelPlot).not.toHaveScreenshot(midReturnLevelScreenshot);
    });

    test('GEV Distribution 2 Shape (ξ₂) Slider', async ({ page }) => {
        const slider = page.locator('#slider-xi2');
        const display = page.locator('#display-xi2');
        const pdfPlot = page.locator('#plot-pdf');
        const returnLevelPlot = page.locator('#plot-return-level');

        await expect(slider).toBeVisible();
        await expect(display).toHaveValue('-0.05');

        const initialPdfScreenshot = await pdfPlot.screenshot();
        const initialReturnLevelScreenshot = await returnLevelPlot.screenshot();

        await slider.fill('0.3');
        await expect(display).toHaveValue('0.3');
        await expect(pdfPlot).not.toHaveScreenshot(initialPdfScreenshot);
        await expect(returnLevelPlot).not.toHaveScreenshot(initialReturnLevelScreenshot);

        const midPdfScreenshot = await pdfPlot.screenshot();
        const midReturnLevelScreenshot = await returnLevelPlot.screenshot();

        await slider.fill('0.5');
        await expect(display).toHaveValue('0.5');
        await expect(pdfPlot).not.toHaveScreenshot(midPdfScreenshot);
        await expect(returnLevelPlot).not.toHaveScreenshot(midReturnLevelScreenshot);
    });
});

test.describe('Return Level Curves', () => {
    test('Return Period (P_max) Slider', async ({ page }) => {
        const slider = page.locator('#slider-pmax');
        const display = page.locator('#display-pmax');
        const pdfPlot = page.locator('#plot-pdf');
        const returnLevelPlot = page.locator('#plot-return-level');

        await expect(slider).toBeVisible();
        await expect(display).toHaveValue('100');

        const initialPdfScreenshot = await pdfPlot.screenshot();
        const initialReturnLevelScreenshot = await returnLevelPlot.screenshot();

        await slider.fill('500');
        await expect(display).toHaveValue('500');
        await expect(returnLevelPlot).not.toHaveScreenshot(initialReturnLevelScreenshot);
        await expect(pdfPlot).toHaveScreenshot(initialPdfScreenshot);

        const midReturnLevelScreenshot = await returnLevelPlot.screenshot();

        await slider.fill('1000');
        await expect(display).toHaveValue('1000');
        await expect(returnLevelPlot).not.toHaveScreenshot(midReturnLevelScreenshot);
        await expect(pdfPlot).toHaveScreenshot(initialPdfScreenshot);
    });
});