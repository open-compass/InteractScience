const { test, expect } = require('@playwright/test');

test.describe('Band Structure of a Quantum Wire with Rashba and Zeeman Interactions', () => {
    const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/BandStructureOfAQuantumWireWithRashbaAndZeemanInteractions.html');

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
    });

    test('Initial state with no interactions', async ({ page }) => {
        // Action: Load the page. All sliders are at their default value of 0.
        // Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/BandStructureOfAQuantumWireWithRashbaAndZeemanInteractions-1.png', fullPage: true });
    });

    test('State with Rashba interaction and subband n=2', async ({ page }) => {
        // Action: Set the "Rashba spin-orbit interaction strength (wso)" slider to 1.0.
        await page.locator('#slider-wso').fill('1');
        // Action: Set the "subband (n)" slider to 2.
        await page.locator('#slider-n').fill('2');
        // Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/BandStructureOfAQuantumWireWithRashbaAndZeemanInteractions-2.png', fullPage: true });
    });

    test('State with Rashba interaction, subband n=2, and magnetic field in y direction', async ({ page }) => {
        // Action: Set the "Rashba spin-orbit interaction strength (wso)" slider to 1.0.
        await page.locator('#slider-wso').fill('1');
        // Action: Set the "subband (n)" slider to 2.
        await page.locator('#slider-n').fill('2');
        // Action: Set the "y direction (BY)" slider to 0.4.
        await page.locator('#slider-by').fill('0.4');
        // Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/BandStructureOfAQuantumWireWithRashbaAndZeemanInteractions-3.png', fullPage: true });
    });

    test('State with no Rashba interaction, subband n=8, and magnetic field in z direction', async ({ page }) => {
        // Action: Set the "Rashba spin-orbit interaction strength (wso)" slider to 0.0.
        await page.locator('#slider-wso').fill('0');
        // Action: Set the "subband (n)" slider to 8.
        await page.locator('#slider-n').fill('8');
        // Action: Set the "z direction (BZ)" slider to 1.0.
        await page.locator('#slider-bz').fill('1');
        // Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/BandStructureOfAQuantumWireWithRashbaAndZeemanInteractions-4.png', fullPage: true });
    });
});