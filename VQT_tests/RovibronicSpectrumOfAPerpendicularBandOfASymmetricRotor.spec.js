const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/RovibronicSpectrumOfAPerpendicularBandOfASymmetricRotor.html');

test.describe('Rovibronic Spectrum of a Perpendicular Band of a Symmetric Rotor', () => {

    test('Sub-band view for K=0 showing only the positive sub-band', async ({ page }) => {
        await page.goto(fileUrl);
        await page.locator('label[for="radio-view-sub"]').click();
        await page.locator('label[for="radio-k-0"]').click();
        // Action: Ensure the "full sub-band" radio button is selected (default state after selecting "sub-band" view).
        // This is the default state, so no click is performed.
        await page.screenshot({ path: './snapshots/RovibronicSpectrumOfAPerpendicularBandOfASymmetricRotor-1.png', fullPage: true });
    });

    test('Full spectrum view showing all sub-bands combined', async ({ page }) => {
        await page.goto(fileUrl);
        await page.locator('label[for="radio-view-full"]').click();
        await page.screenshot({ path: './snapshots/RovibronicSpectrumOfAPerpendicularBandOfASymmetricRotor-2.png', fullPage: true });
    });

    test('Sub-band view for K=3 showing both positive and negative sub-bands', async ({ page }) => {
        await page.goto(fileUrl);
        await page.locator('label[for="radio-view-sub"]').click();
        await page.locator('label[for="radio-k-3"]').click();
        // Action: Ensure the "full sub-band" radio button is selected (default state after selecting "sub-band" view).
        // This is the default state, so no click is performed.
        await page.screenshot({ path: './snapshots/RovibronicSpectrumOfAPerpendicularBandOfASymmetricRotor-3.png', fullPage: true });
    });

    test('Sub-band view for K=3 filtered to show only the positive sub-band branches', async ({ page }) => {
        await page.goto(fileUrl);
        await page.locator('label[for="radio-view-sub"]').click();
        await page.locator('label[for="radio-k-3"]').click();
        await page.locator('#radio-subband-positive').click();
        await page.screenshot({ path: './snapshots/RovibronicSpectrumOfAPerpendicularBandOfASymmetricRotor-4.png', fullPage: true });
    });
});