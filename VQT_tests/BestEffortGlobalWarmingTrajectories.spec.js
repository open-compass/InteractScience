const { test, expect } = require('@playwright/test');

test.describe('Best Effort Global Warming Trajectories', () => {
    const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/BestEffortGlobalWarmingTrajectories.html');

    test('Default initial state of the demo', async ({ page }) => {
        await page.goto(fileUrl);
        // Assert: Take a screenshot of the current UI state
        await page.screenshot({ path: './snapshots/BestEffortGlobalWarmingTrajectories-1.png', fullPage: true });
    });

    test('Increased transition pace to 81 years', async ({ page }) => {
        await page.goto(fileUrl);
        // Action: Set the "Transition to constant reduction pace (years)" slider to the value 81.
        await page.locator('#slider-transition-pace').fill('81');
        // Assert: Take a screenshot of the current UI state
        await page.screenshot({ path: './snapshots/BestEffortGlobalWarmingTrajectories-2.png', fullPage: true });
    });

    test('Transition pace at 81 years and wedges reduced to 2.15', async ({ page }) => {
        await page.goto(fileUrl);
        // Action: Set the "Transition to constant reduction pace (years)" slider to the value 81.
        await page.locator('#slider-transition-pace').fill('81');
        // Action: Set the "Number of constant pace wedges (above emission stabilization at t=0)" slider to the value 2.15.
        await page.locator('#slider-wedges').fill('2.15');
        // Assert: Take a screenshot of the current UI state
        await page.screenshot({ path: './snapshots/BestEffortGlobalWarmingTrajectories-3.png', fullPage: true });
    });

    test('Demo state matching the initial configuration', async ({ page }) => {
        await page.goto(fileUrl);
        // Assert: Take a screenshot of the current UI state
        await page.screenshot({ path: './snapshots/BestEffortGlobalWarmingTrajectories-4.png', fullPage: true });
    });
});