const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/DistanceTransforms.html');

test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
});

test.describe('Distance Transforms Interaction', () => {

    test('Manhattan Distance Function Button', async ({ page }) => {
        // 1. Assert: The "Manhattan" button with id="btn-manhattan" is visible.
        await expect(page.locator('#btn-manhattan')).toBeVisible();

        // 2. Assert: The "Manhattan" button has an "active" visual style, indicating it is the default selection.
        await expect(page.locator('#btn-manhattan')).toHaveCSS('background-color', 'rgb(169, 169, 169)');
        const initialGridText = await page.locator('#grid-container').textContent();

        // 3. Action: Click the "squared Euclidean" button.
        await page.locator('#btn-euclidean').click();

        // 4. Assert: The numbers displayed in the grid cells change, and the "Manhattan" button no longer has the "active" style.
        const euclideanGridText = await page.locator('#grid-container').textContent();
        expect(euclideanGridText).not.toEqual(initialGridText);
        await expect(page.locator('#btn-manhattan')).not.toHaveCSS('background-color', 'rgb(169, 169, 169)');

        // 5. Action: Click the "Manhattan" button again.
        await page.locator('#btn-manhattan').click();

        // 6. Assert: The grid cell numbers change again, and the "Manhattan" button regains its "active" style.
        const finalGridText = await page.locator('#grid-container').textContent();
        expect(finalGridText).not.toEqual(euclideanGridText);
        expect(finalGridText).toEqual(initialGridText);
        await expect(page.locator('#btn-manhattan')).toHaveCSS('background-color', 'rgb(169, 169, 169)');
    });

    test('Squared Euclidean Distance Function Button', async ({ page }) => {
        // 1. Assert: The "squared Euclidean" button with id="btn-euclidean" is visible.
        await expect(page.locator('#btn-euclidean')).toBeVisible();

        // 2. Assert: The "squared Euclidean" button has a default (inactive) visual style.
        await expect(page.locator('#btn-euclidean')).not.toHaveCSS('background-color', 'rgb(169, 169, 169)');
        const initialGridText = await page.locator('#grid-container').textContent();

        // 3. Action: Click the "squared Euclidean" button.
        await page.locator('#btn-euclidean').click();

        // 4. Assert: The numbers displayed in the grid cells change, and the "squared Euclidean" button adopts the "active" visual style.
        const euclideanGridText = await page.locator('#grid-container').textContent();
        expect(euclideanGridText).not.toEqual(initialGridText);
        await expect(page.locator('#btn-euclidean')).toHaveCSS('background-color', 'rgb(169, 169, 169)');

        // 5. Action: Click the "Chebyshev" button.
        await page.locator('#btn-chebyshev').click();

        // 6. Assert: The grid cell numbers change, and the "squared Euclidean" button returns to its inactive style.
        const chebyshevGridText = await page.locator('#grid-container').textContent();
        expect(chebyshevGridText).not.toEqual(euclideanGridText);
        await expect(page.locator('#btn-euclidean')).not.toHaveCSS('background-color', 'rgb(169, 169, 169)');
    });

    test('Chebyshev Distance Function Button', async ({ page }) => {
        // 1. Assert: The "Chebyshev" button with id="btn-chebyshev" is visible.
        await expect(page.locator('#btn-chebyshev')).toBeVisible();

        // 2. Assert: The "Chebyshev" button has a default (inactive) visual style.
        await expect(page.locator('#btn-chebyshev')).not.toHaveCSS('background-color', 'rgb(169, 169, 169)');
        const initialGridText = await page.locator('#grid-container').textContent();

        // 3. Action: Click the "Chebyshev" button.
        await page.locator('#btn-chebyshev').click();

        // 4. Assert: The numbers displayed in the grid cells change, and the "Chebyshev" button adopts the "active" visual style.
        const chebyshevGridText = await page.locator('#grid-container').textContent();
        expect(chebyshevGridText).not.toEqual(initialGridText);
        await expect(page.locator('#btn-chebyshev')).toHaveCSS('background-color', 'rgb(169, 169, 169)');

        // 5. Action: Click the "Manhattan" button.
        await page.locator('#btn-manhattan').click();

        // 6. Assert: The grid cell numbers change, and the "Chebyshev" button returns to its inactive style.
        const manhattanGridText = await page.locator('#grid-container').textContent();
        expect(manhattanGridText).not.toEqual(chebyshevGridText);
        await expect(page.locator('#btn-chebyshev')).not.toHaveCSS('background-color', 'rgb(169, 169, 169)');
    });

    test('Grid Cell Interaction', async ({ page }) => {
        // 1. Assert: The grid container with id="grid-container" is visible.
        await expect(page.locator('#grid-container')).toBeVisible();

        // Select the cell at row 2, column 1 (0-indexed)
        // Index = (row * num_columns) + col = (2 * 7) + 1 = 15
        const onCell = page.locator('#grid-container > div').nth(15);
        const initialGridText = await page.locator('#grid-container').textContent();

        // 2. Assert: An initially "on" cell (e.g., at row 2, column 1) displays the number "0" and has a yellow background.
        await expect(onCell.locator('span')).toHaveText('0');
        await expect(onCell).toHaveCSS('background-color', 'rgb(255, 215, 0)');

        // 3. Action: Click on this "on" cell.
        await onCell.click();

        // 4. Assert: The cell's background color changes to gray, its number changes to a non-zero value, and the numbers in adjacent cells are updated.
        await expect(onCell).toHaveCSS('background-color', 'rgb(211, 211, 211)');
        await expect(onCell.locator('span')).not.toHaveText('0');
        const gridTextAfterToggleOff = await page.locator('#grid-container').textContent();
        expect(gridTextAfterToggleOff).not.toEqual(initialGridText);

        // 5. Action: Click the same cell again.
        await onCell.click();

        // 6. Assert: The cell's background color reverts to yellow, its number returns to "0", and the surrounding grid numbers are updated again.
        await expect(onCell).toHaveCSS('background-color', 'rgb(255, 215, 0)');
        await expect(onCell.locator('span')).toHaveText('0');
        const finalGridText = await page.locator('#grid-container').textContent();
        expect(finalGridText).not.toEqual(gridTextAfterToggleOff);
        expect(finalGridText).toEqual(initialGridText);
    });
});