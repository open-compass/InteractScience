const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/CirclesTriangles.html');

test.describe('Circles & Triangles Interactive Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
        await page.waitForTimeout(500);
    });

    test('Vertex Selector Radio Buttons', async ({ page }) => {
        // 1. Assert: The `vertex-select` radio button group is visible.
        await expect(page.locator('input[name="vertex-select"]').first()).toBeVisible();

        // 2. Assert: The 'C' radio button (`radio-c`) is checked by default, and the info panel shows a single row of data for Vertex C.
        await expect(page.locator('#radio-c')).toBeChecked();
        await expect(page.locator('#vertex-label-1')).toHaveText('Vertex C');
        await expect(page.locator('#arc-label-2')).toBeEmpty();
        await expect(page.locator('#arc-label-3')).toBeEmpty();
        await expect(page.locator('#arc-total')).toHaveText('?');
        await expect(page.locator('#vertex-total')).toHaveText('?');

        // 3. Action: Click the 'None' radio button (`radio-none`).
        await page.locator('#radio-none').check();

        // 4. Assert: The 'None' radio button is checked, the info panel displays three rows of data, and the `arc-total` and `vertex-total` fields show "360°" and "180°" respectively.
        await expect(page.locator('#radio-none')).toBeChecked();
        await expect(page.locator('#arc-label-1')).not.toBeEmpty();
        await expect(page.locator('#arc-label-2')).not.toBeEmpty();
        await expect(page.locator('#arc-label-3')).not.toBeEmpty();
        await expect(page.locator('#arc-total')).toHaveText('360°');
        await expect(page.locator('#vertex-total')).toHaveText('180°');

        // 5. Action: Click the 'A' radio button (`radio-a`).
        await page.locator('#radio-a').check();

        // 6. Assert: The 'A' radio button is checked, the info panel reverts to showing a single row of data for Vertex A, and the total fields display "?".
        await expect(page.locator('#radio-a')).toBeChecked();
        await expect(page.locator('#vertex-label-1')).toHaveText('Vertex A');
        await expect(page.locator('#arc-label-2')).toBeEmpty();
        await expect(page.locator('#arc-label-3')).toBeEmpty();
        await expect(page.locator('#arc-total')).toHaveText('?');
        await expect(page.locator('#vertex-total')).toHaveText('?');
    });

    test('Slider for Vertex A', async ({ page }) => {
        // 1. Assert: The slider with id `slider-a` is visible.
        await expect(page.locator('#slider-a')).toBeVisible();

        // 2. Assert: The slider `slider-a` has its default value of 306.
        await expect(page.locator('#slider-a')).toHaveValue('306');
        const initialArcValue = await page.locator('#arc-value-1').innerText();

        // 3. Action: Drag the slider `slider-a` to a new position.
        await page.locator('#slider-a').fill('200');

        // 4. Assert: Vertex A on the canvas moves, and the numerical value in `arc-value-1` changes.
        await expect(page.locator('#arc-value-1')).not.toHaveText(initialArcValue);
        const valueAfterFirstChange = await page.locator('#arc-value-1').innerText();

        // 5. Action: Drag the slider `slider-a` to its minimum value (0).
        await page.locator('#slider-a').fill('0');

        // 6. Assert: Vertex A on the canvas moves to the 0-degree position, and the info panel values update.
        await expect(page.locator('#slider-a')).toHaveValue('0');
        await expect(page.locator('#arc-value-1')).not.toHaveText(valueAfterFirstChange);
    });

    test('Slider for Vertex B', async ({ page }) => {
        // 1. Assert: The slider with id `slider-b` is visible.
        await expect(page.locator('#slider-b')).toBeVisible();

        // 2. Assert: The slider `slider-b` has its default value of 54.
        await expect(page.locator('#slider-b')).toHaveValue('54');
        const initialArcValue = await page.locator('#arc-value-1').innerText();

        // 3. Action: Drag the slider `slider-b` to a new position.
        await page.locator('#slider-b').fill('150');

        // 4. Assert: Vertex B on the canvas moves, and the numerical value in `arc-value-1` changes.
        await expect(page.locator('#arc-value-1')).not.toHaveText(initialArcValue);
        const valueAfterFirstChange = await page.locator('#arc-value-1').innerText();

        // 5. Action: Drag the slider `slider-b` to its maximum value (360).
        await page.locator('#slider-b').fill('360');

        // 6. Assert: Vertex B on the canvas moves to the 360-degree position, and the info panel values update.
        await expect(page.locator('#slider-b')).toHaveValue('360');
        await expect(page.locator('#arc-value-1')).not.toHaveText(valueAfterFirstChange);
    });

    test('Slider for Vertex C', async ({ page }) => {
        // 1. Assert: The slider with id `slider-c` is visible.
        await expect(page.locator('#slider-c')).toBeVisible();

        // 2. Assert: The slider `slider-c` has its default value of 180.
        await expect(page.locator('#slider-c')).toHaveValue('180');
        const initialVertexValue = await page.locator('#vertex-value-1').innerText();

        // 3. Action: Drag the slider `slider-c` to a new position.
        await page.locator('#slider-c').fill('90');

        // 4. Assert: Vertex C on the canvas moves, and the numerical value in `vertex-value-1` changes.
        await expect(page.locator('#vertex-value-1')).not.toHaveText(initialVertexValue);
        const valueAfterFirstChange = await page.locator('#vertex-value-1').innerText();

        // 5. Action: Drag the slider `slider-c` to a value near its midpoint (e.g., 180).
        await page.locator('#slider-c').fill('180');

        // 6. Assert: Vertex C on the canvas moves to the corresponding position, and the info panel values update.
        await expect(page.locator('#slider-c')).toHaveValue('180');
        await expect(page.locator('#vertex-value-1')).not.toHaveText(valueAfterFirstChange);
    });

    test('Draggable Vertex on Canvas', async ({ page }) => {
        // 1. Assert: The canvas element and Vertex B are visible.
        const canvas = page.locator('#canvas-container canvas');
        await expect(canvas).toBeVisible();

        // 2. Assert: The slider `slider-b` has its default value (54).
        await expect(page.locator('#slider-b')).toHaveValue('54');
        const initialInfoValue = await page.locator('#arc-value-1').innerText();

        // 3. Action: Click and drag Vertex B on the canvas to a new location on the circle's circumference.
        const canvasBox = await canvas.boundingBox();
        if (!canvasBox) {
            throw new Error('Could not get canvas bounding box');
        }
        const centerX = canvasBox.x + canvasBox.width / 2;
        const centerY = canvasBox.y + canvasBox.height / 2;
        const radius = Math.min(canvasBox.width, canvasBox.height) * 0.4; // Reasonable approximation of radius

        // Calculate start coordinates for Vertex B at 54 degrees
        const startAngleRad = (54 * Math.PI) / 180;
        const startX = centerX + radius * Math.cos(startAngleRad);
        const startY = centerY + radius * Math.sin(startAngleRad);

        // Calculate end coordinates for drag, e.g., to 150 degrees
        const endAngleRad = (150 * Math.PI) / 180;
        const endX = centerX + radius * Math.cos(endAngleRad);
        const endY = centerY + radius * Math.sin(endAngleRad);

        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(endX, endY, { steps: 10 });
        await page.mouse.up();

        // 4. Assert: The `slider-b` value updates to reflect the new position of Vertex B, and the info panel values change.
        await expect(page.locator('#slider-b')).not.toHaveValue('54');
        await expect(page.locator('#arc-value-1')).not.toHaveText(initialInfoValue);
        const finalSliderValue = await page.locator('#slider-b').inputValue();

        // 5. Action: Release the mouse drag. (already performed by page.mouse.up())

        // 6. Assert: Vertex B remains in its new position, and the UI state (slider value, info panel) is stable.
        await page.waitForTimeout(100); // Wait briefly to ensure no further changes
        await expect(page.locator('#slider-b')).toHaveValue(finalSliderValue);
    });
});