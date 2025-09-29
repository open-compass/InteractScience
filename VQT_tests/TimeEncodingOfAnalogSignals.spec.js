const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/TimeEncodingOfAnalogSignals.html');

test.describe('Time Encoding of Analog Signals', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
    });

    test('Sine function with ASDM encoding and a total time of 2.0', async ({ page }) => {
        await page.locator('#slider-total-time').fill('2');
        await page.locator('#btn-sin').click();
        await page.screenshot({ path: './snapshots/TimeEncodingOfAnalogSignals-1.png', fullPage: true });
    });

    test("Default 'g' function with ASDM encoding and total time of 2.0", async ({ page }) => {
        await page.locator('#slider-total-time').fill('2');
        await page.screenshot({ path: './snapshots/TimeEncodingOfAnalogSignals-2.png', fullPage: true });
    });

    test("Linear function 'f' with ASDM encoding and a custom time window", async ({ page }) => {
        await page.locator('#slider-start-time').fill('-0.3');
        await page.locator('#slider-total-time').fill('1.4');
        await page.locator('#btn-f').click();
        await page.screenshot({ path: './snapshots/TimeEncodingOfAnalogSignals-3.png', fullPage: true });
    });

    test("Default 'g' function with IAF encoding and total time of 2.0", async ({ page }) => {
        await page.locator('#slider-total-time').fill('2');
        await page.locator('#btn-iaf').click();
        await page.screenshot({ path: './snapshots/TimeEncodingOfAnalogSignals-4.png', fullPage: true });
    });
});