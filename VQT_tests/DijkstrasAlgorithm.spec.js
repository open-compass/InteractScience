const { test, expect } = require('@playwright/test');

test.describe('Dijkstra Algorithm Visualization', () => {
    const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/DijkstrasAlgorithm.html');

    test('Algorithm completed from vertex \'m\' with fixed weights 1', async ({ page }) => {
        await page.goto(fileUrl);

        // Action: Click the "next step" button 15 times.
        for (let i = 0; i < 15; i++) {
            await page.locator('#next-step-btn').click();
        }

        // Assert: Take a screenshot of the current UI state
        await page.screenshot({ path: './snapshots/DijkstrasAlgorithm-1.png', fullPage: true });
    });

    test('Algorithm completed from vertex \'m\' with fixed weights 2', async ({ page }) => {
        await page.goto(fileUrl);

        // Action: Click the "next step" button 15 times.
        for (let i = 0; i < 15; i++) {
            await page.locator('#next-step-btn').click();
        }

        // Assert: Take a screenshot of the current UI state
        await page.screenshot({ path: './snapshots/DijkstrasAlgorithm-2.png', fullPage: true });
    });

    test('Algorithm completed from vertex \'a\' with fixed weights', async ({ page }) => {
        await page.goto(fileUrl);

        // Action: Click the 'a' button under the "initial vertex" label.
        await page.locator('#btn-a').click();

        // Action: Click the "next step" button 15 times.
        for (let i = 0; i < 15; i++) {
            await page.locator('#next-step-btn').click();
        }

        // Assert: Take a screenshot of the current UI state
        await page.screenshot({ path: './snapshots/DijkstrasAlgorithm-3.png', fullPage: true });
    });

    test('Algorithm completed from vertex \'b\' with random weights', async ({ page }) => {
        await page.goto(fileUrl);

        // Action: Click the "random example" button.
        await page.locator('#random-example-btn').click();

        // Action: Click the 'b' button under the "initial vertex" label.
        await page.locator('#btn-b').click();

        // Action: Click the "next step" button 15 times.
        for (let i = 0; i < 15; i++) {
            await page.locator('#next-step-btn').click();
        }

        // Assert: Take a screenshot of the current UI state
        await page.screenshot({ path: './snapshots/DijkstrasAlgorithm-4.png', fullPage: true });
    });
});