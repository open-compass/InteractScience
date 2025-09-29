const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/VisibilityRegionOfAPolygon.html');

test.describe('Visibility Region of a Polygon', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
        // Wait for the canvas to be ready, which is a good proxy for p5 setup
        // await page.waitForSelector('#canvas-container canvas');
        await page.waitForTimeout(500);
    });

    test('Source Point Draggability', async ({ page }) => {
        const canvas = page.locator('#canvas-container canvas');

        // 1. & 2. Assert: The blue source point is visible on the canvas at its default position.
        // We'll use a screenshot to verify the initial rendered state.
        await expect(canvas).toBeVisible();
        await expect(page).toHaveScreenshot('source-point-initial.png');

        // 3. Action: Click and drag the source point to a new valid position.
        const canvasBoundingBox = await canvas.boundingBox();
        const startX = canvasBoundingBox.x + 275;
        const startY = canvasBoundingBox.y + 275;
        const endX = canvasBoundingBox.x + 400; // New valid position
        const endY = canvasBoundingBox.y + 300;

        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(endX, endY, { steps: 10 });
        await page.mouse.up();

        // 4. Assert: The source point's position is updated, and the visibility polygon changes.
        // The new screenshot should be different from the initial one.
        await expect(page).not.toHaveScreenshot('source-point-initial.png');
        await expect(page).toHaveScreenshot('source-point-dragged.png');
        
        // 5. Action: Attempt to drag the source point into one of the inner "hole" polygons.
        const holeCenterX = canvasBoundingBox.x + 325; // Center of a hole
        const holeCenterY = canvasBoundingBox.y + 325;

        await page.mouse.move(endX, endY);
        await page.mouse.down();
        await page.mouse.move(holeCenterX, holeCenterY, { steps: 10 });
        await page.mouse.up();

        // 6. Assert: The source point is constrained and does not enter the hole polygon area.
        // The rendering should change from the last valid position to a new position on the boundary.
        // Therefore, the screenshot should differ from the previous 'dragged' state.
        await expect(page).not.toHaveScreenshot('source-point-dragged.png');
        await expect(page).toHaveScreenshot('source-point-constrained.png');
    });

    test('Angle Slider for Algorithm Steps', async ({ page }) => {
        const angleSlider = page.locator('#angle-slider');
        const angleValue = page.locator('#angle-value');

        // 1. Assert: The slider and its value display are visible.
        await expect(angleSlider).toBeVisible();
        await expect(angleValue).toBeVisible();
        await expect(page.locator('label', { hasText: 'vertices sorted by angle' })).toBeVisible();

        // 2. Assert: The slider's default value is 3, and the value display shows "3".
        // The canvas should show a partial visibility polygon and helper lines.
        await expect(angleSlider).toHaveValue('3');
        await expect(angleValue).toHaveText('3');
        await expect(page).toHaveScreenshot('slider-default-state.png');

        // 3. Action: Drag the slider to a new value, such as 10.
        await angleSlider.fill('10');

        // 4. Assert: The value display updates, and the visualization changes.
        await expect(angleValue).toHaveText('10');
        await expect(page).not.toHaveScreenshot('slider-default-state.png');
        await expect(page).toHaveScreenshot('slider-mid-state.png');

        // 5. Action: Drag the slider to its maximum value, 38.
        await angleSlider.fill('38');

        // 6. Assert: The value display shows "38", and the final visibility polygon is drawn without helpers.
        await expect(angleValue).toHaveText('38');
        await expect(page).not.toHaveScreenshot('slider-mid-state.png');
        await expect(page).toHaveScreenshot('slider-max-state.png');
    });

    test('Reset Button Functionality', async ({ page }) => {
        const resetButton = page.locator('#reset-button');
        const angleSlider = page.locator('#angle-slider');
        const angleValue = page.locator('#angle-value');
        const canvas = page.locator('#canvas-container canvas');

        // 1. Assert: The reset button is visible.
        await expect(resetButton).toBeVisible();

        // 2. Assert: The demo is in its initial state.
        await expect(angleSlider).toHaveValue('3');
        await expect(angleValue).toHaveText('3');
        const initialScreenshot = await page.screenshot();

        // 3. Action: Drag the source point and change the slider's value.
        const canvasBoundingBox = await canvas.boundingBox();
        await page.mouse.move(canvasBoundingBox.x + 275, canvasBoundingBox.y + 275);
        await page.mouse.down();
        await page.mouse.move(canvasBoundingBox.x + 150, canvasBoundingBox.y + 300, { steps: 10 });
        await page.mouse.up();
        await angleSlider.fill('20');
        
        // 4. Assert: The state has updated.
        await expect(angleValue).toHaveText('20');
        await expect(page).not.toHaveScreenshot(initialScreenshot);
        
        // 5. Action: Click the reset button.
        await resetButton.click();
        
        // 6. Assert: The demo has returned to its initial state.
        await expect(angleSlider).toHaveValue('3');
        await expect(angleValue).toHaveText('3');
        await expect(page).toHaveScreenshot(initialScreenshot);
    });
});