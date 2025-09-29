const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/DwarfPlanets.html');

test.describe('Dwarf Planets Orbit Visualization', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
        // Wait for a moment to ensure the 3D scene has had a chance to render initially
        await page.waitForTimeout(500);
    });

    test("Initial view showing Pluto's orbit on Jan 1, 2008", async ({ page }) => {
        // Action: Load the application. The view defaults to Pluto selected and the date set to Jan 1, 2008.
        // No explicit actions needed as this is the default state.

        // Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/DwarfPlanets-1.png', fullPage: true });
    });

    test("View of Eris's orbit on July 4, 2255", async ({ page }) => {
        // Action: Click the "Eris" button in the "dwarf planet" control group.
        await page.locator('button[data-planet="Eris"]').click();

        // Action: Drag the "time" slider handle to approximately 85% of its full range.
        // This corresponds to the date "Wed 4 Jul 2255 00:00:00".
        // Start date: 2000-01-01. Target date: 2255-07-04. Days difference: 93354.
        await page.locator('#time-slider').fill('93354');

        // Action: Use the mouse scroll wheel to zoom out.
        await page.locator('#3d-canvas').hover();
        await page.mouse.wheel(0, 500); // Positive deltaY zooms out

        // Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/DwarfPlanets-2.png', fullPage: true });
    });

    test("View of Makemake's orbit on May 16, 2127", async ({ page }) => {
        // Action: Click the "Makemake" button in the "dwarf planet" control group.
        await page.locator('button[data-planet="Makemake"]').click();

        // Action: Drag the "time" slider handle to approximately 42% of its full range.
        // This corresponds to the date "Fri 16 May 2127 00:00:00".
        // Start date: 2000-01-01. Target date: 2127-05-16. Days difference: 46550.
        await page.locator('#time-slider').fill('46550');

        // Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/DwarfPlanets-3.png', fullPage: true });
    });

    test("View of Haumea's orbit on July 31, 2181", async ({ page }) => {
        // Action: Click the "Haumea" button in the "dwarf planet" control group.
        await page.locator('button[data-planet="Haumea"]').click();

        // Action: Drag the "time" slider handle to approximately 60% of its full range.
        // This corresponds to the date "Tue 31 Jul 2181 00:00:00".
        // Start date: 2000-01-01. Target date: 2181-07-31. Days difference: 66324.
        await page.locator('#time-slider').fill('66324');

        // Assert: Take a screenshot of the current UI state.
        await page.screenshot({ path: './snapshots/DwarfPlanets-4.png', fullPage: true });
    });
});