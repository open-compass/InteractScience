const { test, expect } = require('@playwright/test');

test.describe('DistanceTransforms', () => {
    const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/DistanceTransforms.html');

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
    });

    test('Initial state with Manhattan distance and two active cells', async ({ page }) => {
        await page.screenshot({ path: './snapshots/DistanceTransforms-1.png', fullPage: true });
    });

    test('Adding two more active cells with Manhattan distance', async ({ page }) => {
        // Grid is 9 rows x 7 columns. Cell index = (row-1)*7 + col
        // Cell at row 3, column 3: (3-1)*7 + 3 = 17
        await page.locator('#grid-container > div:nth-child(17)').click();
        // Cell at row 4, column 7: (4-1)*7 + 7 = 28
        await page.locator('#grid-container > div:nth-child(28)').click();

        await page.screenshot({ path: './snapshots/DistanceTransforms-2.png', fullPage: true });
    });

    test('Changing active cells and switching to squared Euclidean distance', async ({ page }) => {
        // Grid is 9 rows x 7 columns. Cell index = (row-1)*7 + col
        // Cell at row 3, column 2 (initial state is off, click will turn it on): (3-1)*7 + 2 = 16
        // Note: The prompt has an error. The initial state has cells [2,1] and [6,4] on. 
        // This test case clicks to turn *off* [2,1] and [6,4] by clicking their positions again.
        // Cell at row 3, col 2 is what's requested. Based on the logic, this turns it on.
        // Let's assume the test case intends to toggle the states starting from the default.
        // Cell at row 3, column 2: (3-1)*7 + 2 = 16 (Turn on)
        // This seems to contradict "turn it off". Let's assume the test case is a sequence of toggles from the initial state.
        // The default on cells are [2,1] and [6,4].
        // To turn off [2,1], click (2,1): index = (2-1)*7 + 1 = 8.
        // To turn off [6,4], click (6,4): index = (6-1)*7 + 4 = 39.

        // Per the prompt, I must follow the exact actions listed.
        // The test case description seems to assume a different starting state than the initial one,
        // but I will follow the explicit actions.
        
        // Click the grid cell at row 3, column 2: (3-1)*7 + 2 = 16
        await page.locator('#grid-container > div:nth-child(16)').click();
        // Click the grid cell at row 7, column 5: (7-1)*7 + 5 = 47
        await page.locator('#grid-container > div:nth-child(47)').click();
        // Click the grid cell at row 2, column 2: (2-1)*7 + 2 = 9
        await page.locator('#grid-container > div:nth-child(9)').click();
        // Click the grid cell at row 5, column 5: (5-1)*7 + 5 = 33
        await page.locator('#grid-container > div:nth-child(33)').click();
        // Click the grid cell at row 9, column 7: (9-1)*7 + 7 = 63
        await page.locator('#grid-container > div:nth-child(63)').click();
        
        await page.locator('#btn-euclidean').click();

        await page.screenshot({ path: './snapshots/DistanceTransforms-3.png', fullPage: true });
    });

    test('Changing active cells and switching to Chebyshev distance', async ({ page }) => {
        // Grid is 9 rows x 7 columns. Cell index = (row-1)*7 + col
        
        // Click the grid cell at row 3, column 2: (3-1)*7 + 2 = 16
        await page.locator('#grid-container > div:nth-child(16)').click();
        // Click the grid cell at row 7, column 5: (7-1)*7 + 5 = 47
        await page.locator('#grid-container > div:nth-child(47)').click();
        // Click the grid cell at row 4, column 1: (4-1)*7 + 1 = 22
        await page.locator('#grid-container > div:nth-child(22)').click();
        // Click the grid cell at row 6, column 6: (6-1)*7 + 6 = 41
        await page.locator('#grid-container > div:nth-child(41)').click();
        
        await page.locator('#btn-chebyshev').click();
        
        await page.screenshot({ path: './snapshots/DistanceTransforms-4.png', fullPage: true });
    });
});