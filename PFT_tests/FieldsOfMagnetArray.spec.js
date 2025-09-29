const { test, expect } = require('@playwright/test');
const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/FieldsOfMagnetArray.html');

test.describe('FieldsOfMagnetArray', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
        await page.waitForTimeout(500);
    });

    test('Magnet 1 Orientation Control', async ({ page }) => {
        // 1. Assert: The up button (`magnet-orientation-up-0`), down button (`magnet-orientation-down-0`), and display span (`magnet-orientation-display-0`) are visible.
        await expect(page.locator('#magnet-orientation-up-0')).toBeVisible();
        await expect(page.locator('#magnet-orientation-down-0')).toBeVisible();
        await expect(page.locator('#magnet-orientation-display-0')).toBeVisible();

        // 2. Assert: The orientation display (`magnet-orientation-display-0`) shows the default symbol `↓`.
        await expect(page.locator('#magnet-orientation-display-0')).toHaveText('↓');

        const canvasBeforeAction1 = await page.locator('#p5-canvas').screenshot();

        // 3. Action: Click the "up" button (`magnet-orientation-up-0`).
        await page.locator('#magnet-orientation-up-0').click();

        // 4. Assert: The orientation display now shows `⊙` and the canvas visualization has updated.
        await expect(page.locator('#magnet-orientation-display-0')).toHaveText('⊙');
        const canvasAfterAction1 = await page.locator('#p5-canvas').screenshot();
        expect(canvasAfterAction1).not.toEqual(canvasBeforeAction1);

        const canvasBeforeAction2 = await page.locator('#p5-canvas').screenshot();

        // 5. Action: Click the "up" button two more times to cycle past the end of the list and trigger the wrap-around (from `⊗` to `→`).
        await page.locator('#magnet-orientation-up-0').click(); // to ⊗
        await page.locator('#magnet-orientation-up-0').click(); // to →

        // 6. Assert: The orientation display now shows `→` and the canvas visualization has updated.
        await expect(page.locator('#magnet-orientation-display-0')).toHaveText('→');
        const canvasAfterAction2 = await page.locator('#p5-canvas').screenshot();
        expect(canvasAfterAction2).not.toEqual(canvasBeforeAction2);
    });

    test('Magnet Strength Slider Control', async ({ page }) => {
        // 1. Assert: The slider (`slider-strength`) and its value display (`slider-strength-value`) are visible.
        await expect(page.locator('#slider-strength')).toBeVisible();
        await expect(page.locator('#slider-strength-value')).toBeVisible();

        // 2. Assert: The slider's value is 5 and the value display span (`slider-strength-value`) shows "5".
        await expect(page.locator('#slider-strength')).toHaveValue('5');
        await expect(page.locator('#slider-strength-value')).toHaveText('5');

        const canvasBeforeAction1 = await page.locator('#p5-canvas').screenshot();

        // 3. Action: Drag the slider to the right, setting its value to 8.
        await page.locator('#slider-strength').fill('8');

        // 4. Assert: The value display span shows "8" and the canvas visualization has updated.
        await expect(page.locator('#slider-strength-value')).toHaveText('8');
        const canvasAfterAction1 = await page.locator('#p5-canvas').screenshot();
        expect(canvasAfterAction1).not.toEqual(canvasBeforeAction1);

        const canvasBeforeAction2 = await page.locator('#p5-canvas').screenshot();

        // 5. Action: Drag the slider to its minimum value, 1.
        await page.locator('#slider-strength').fill('1');

        // 6. Assert: The value display span shows "1" and the canvas visualization has updated.
        await expect(page.locator('#slider-strength-value')).toHaveText('1');
        const canvasAfterAction2 = await page.locator('#p5-canvas').screenshot();
        expect(canvasAfterAction2).not.toEqual(canvasBeforeAction2);
    });

    test('Stream Plot Button', async ({ page }) => {
        // 1. Assert: The "stream plot" button (`btn-stream-plot`) is visible.
        await expect(page.locator('#btn-stream-plot')).toBeVisible();

        // 2. Assert: The button has an "active" class, and the canvas displays a stream plot.
        await expect(page.locator('#btn-stream-plot')).toHaveClass(/active/);
        const canvasInitial = await page.locator('#p5-canvas').screenshot();

        // 3. Action: Click the "density plot" button (`btn-density-plot`).
        await page.locator('#btn-density-plot').click();

        // 4. Assert: The "stream plot" button no longer has the "active" class, and the canvas displays a density plot.
        await expect(page.locator('#btn-stream-plot')).not.toHaveClass(/active/);
        const canvasAfterDensityClick = await page.locator('#p5-canvas').screenshot();
        expect(canvasAfterDensityClick).not.toEqual(canvasInitial);

        // 5. Action: Click the "stream plot" button (`btn-stream-plot`) again.
        await page.locator('#btn-stream-plot').click();

        // 6. Assert: The "stream plot" button again has the "active" class, and the canvas has changed back to a stream plot visualization.
        await expect(page.locator('#btn-stream-plot')).toHaveClass(/active/);
        const canvasAfterStreamClick = await page.locator('#p5-canvas').screenshot();
        expect(canvasAfterStreamClick).not.toEqual(canvasAfterDensityClick);
    });

    test('Density Plot Button', async ({ page }) => {
        // 1. Assert: The "density plot" button (`btn-density-plot`) is visible.
        await expect(page.locator('#btn-density-plot')).toBeVisible();

        // 2. Assert: The button does not have an "active" class.
        await expect(page.locator('#btn-density-plot')).not.toHaveClass(/active/);
        const canvasBeforeClick = await page.locator('#p5-canvas').screenshot();

        // 3. Action: Click the "density plot" button (`btn-density-plot`).
        await page.locator('#btn-density-plot').click();

        // 4. Assert: The button now has an "active" class, and the canvas visualization has changed from a stream plot to a density plot.
        await expect(page.locator('#btn-density-plot')).toHaveClass(/active/);
        const canvasAfterClick = await page.locator('#p5-canvas').screenshot();
        expect(canvasAfterClick).not.toEqual(canvasBeforeClick);

        // 5. Action: Change the value of the magnet strength slider (`slider-strength`).
        await page.locator('#slider-strength').fill('10');

        // 6. Assert: The canvas visualization updates its colors, confirming the density plot mode is persistent and responsive to other controls.
        const canvasAfterSliderChange = await page.locator('#p5-canvas').screenshot();
        expect(canvasAfterSliderChange).not.toEqual(canvasAfterClick);
    });
});