const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/OptimalJointMeasurementsOfQubitObservables.html');

test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for p5 and plotly to be potentially initialized
    // await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
});

test.describe('Optimal Joint Measurements of Qubit Observables', () => {

    test('Incompatibility Slider (θ)', async ({ page }) => {
        const slider = page.locator('#slider-theta');
        const thetaValueSpan = page.locator('#span-theta-value');
        const sinSqThetaValueSpan = page.locator('#span-sinsq-theta-value');
        const visualizationContainer = page.locator('#visualization-container');

        // 1. Assert: The slider with ID `slider-theta` is visible.
        await expect(slider).toBeVisible();

        // 2. Assert: The slider's value is approximately `0.44879`. The associated `span-theta-value` displays "π/7" and `span-sinsq-theta-value` displays "0.188255".
        await expect(slider).toHaveValue('0.44879');
        await expect(thetaValueSpan).toHaveText('π/7');
        await expect(sinSqThetaValueSpan).toHaveText(/^0\.1882550*$/);

        const initialVisScreenshot = await visualizationContainer.screenshot();
        const initialThetaText = await thetaValueSpan.textContent();
        const initialSinSqText = await sinSqThetaValueSpan.textContent();

        // 3. Action: Drag the slider to a new value, such as `0.6`.
        await slider.fill('0.6');

        // 4. Assert: The `span-theta-value` and `span-sinsq-theta-value` update. The positions of vectors `a` and `b` on the canvas change. The blue curve and the red dot on the error plot are redrawn in new positions.
        await expect(thetaValueSpan).not.toHaveText(initialThetaText);
        await expect(sinSqThetaValueSpan).not.toHaveText(initialSinSqText);
        await expect(visualizationContainer).not.toHaveScreenshot(initialVisScreenshot);
        
        const midVisScreenshot = await visualizationContainer.screenshot();
        const midThetaText = await thetaValueSpan.textContent();
        const midSinSqText = await sinSqThetaValueSpan.textContent();

        // 5. Action: Drag the slider to its maximum value (`1.57079`).
        await slider.fill('1.57079');

        // 6. Assert: The value spans update accordingly. The vectors, plot curve, and plot dot all update to reflect the new maximum `θ` value.
        await expect(thetaValueSpan).not.toHaveText(midThetaText);
        await expect(sinSqThetaValueSpan).not.toHaveText(midSinSqText);
        await expect(visualizationContainer).not.toHaveScreenshot(midVisScreenshot);
    });

    test('Draggable Vector \'c\' on Bloch Sphere Canvas', async ({ page }) => {
        const canvas = page.locator('#canvas-bloch');
        const errorPlot = page.locator('#plot-error');

        // 1. Assert: The `canvas-bloch` element is visible, containing a green vector 'c'.
        await expect(canvas).toBeVisible();

        // 2. Assert: The green vector 'c' is at its default position. The red dot on the error plot is at its corresponding default location.
        const initialCanvasScreenshot = await canvas.screenshot();
        const initialPlotScreenshot = await errorPlot.screenshot();

        // 3. Action: Click and drag the tip of the green vector 'c' to a new, valid position within the semi-circle.
        const canvasBox = await canvas.boundingBox();
        // Approximate drag from default position (e.g., upper right) to a new position (e.g., upper left)
        await page.mouse.move(canvasBox.x + canvasBox.width * 0.75, canvasBox.y + canvasBox.height * 0.3);
        await page.mouse.down();
        await page.mouse.move(canvasBox.x + canvasBox.width * 0.25, canvasBox.y + canvasBox.height * 0.4);
        await page.mouse.up();

        // 4. Assert: The green vector 'c' updates its position on the canvas. The red dot on the error plot moves to a new location.
        await expect(canvas).not.toHaveScreenshot(initialCanvasScreenshot);
        await expect(errorPlot).not.toHaveScreenshot(initialPlotScreenshot);
        
        const draggedCanvasScreenshot = await canvas.screenshot();
        const draggedPlotScreenshot = await errorPlot.screenshot();
        
        // 5. Action: Drag the tip of the vector 'c' outside the bounds of the semi-circle.
        await page.mouse.move(canvasBox.x + canvasBox.width * 0.25, canvasBox.y + canvasBox.height * 0.4); // move back to previous position
        await page.mouse.down();
        // Move above the canvas, which should constrain the vector to the semi-circle's edge
        await page.mouse.move(canvasBox.x + canvasBox.width * 0.5, canvasBox.y - 20);
        await page.mouse.up();

        // 6. Assert: The vector 'c' is constrained and drawn at the edge of the semi-circle. The red dot on the error plot moves to a corresponding new position.
        await expect(canvas).not.toHaveScreenshot(draggedCanvasScreenshot);
        await expect(errorPlot).not.toHaveScreenshot(draggedPlotScreenshot);
    });

    test('Metric Error Circle Checkbox', async ({ page }) => {
        const checkbox = page.locator('#checkbox-metric-circle');
        const canvas = page.locator('#canvas-bloch');

        // 1. Assert: The checkbox with ID `checkbox-metric-circle` is visible.
        await expect(checkbox).toBeVisible();

        // 2. Assert: The checkbox is unchecked by default.
        await expect(checkbox).not.toBeChecked();

        const initialCanvasScreenshot = await canvas.screenshot();

        // 3. Action: Click the checkbox to check it.
        await checkbox.click();

        // 4. Assert: A blue dashed circle appears on the Bloch sphere canvas, centered on the tip of vector 'a'.
        await expect(canvas).not.toHaveScreenshot(initialCanvasScreenshot);

        // 5. Action: Click the checkbox again to uncheck it.
        await checkbox.click();

        // 6. Assert: The blue dashed circle on the canvas disappears.
        await expect(canvas).toHaveScreenshot(initialCanvasScreenshot);
    });

    test('Metric Region of Joint Measurability Checkbox', async ({ page }) => {
        const checkbox = page.locator('#checkbox-metric-region');
        const canvas = page.locator('#canvas-bloch');

        // 1. Assert: The checkbox with ID `checkbox-metric-region` is visible.
        await expect(checkbox).toBeVisible();

        // 2. Assert: The checkbox is unchecked by default.
        await expect(checkbox).not.toBeChecked();
        
        const initialCanvasScreenshot = await canvas.screenshot();

        // 3. Action: Click the checkbox to check it.
        await checkbox.click();

        // 4. Assert: Two dashed arcs (one green, one orange/brown) appear on the Bloch sphere canvas.
        await expect(canvas).not.toHaveScreenshot(initialCanvasScreenshot);

        // 5. Action: Click the checkbox again to uncheck it.
        await checkbox.click();

        // 6. Assert: The two dashed arcs on the canvas disappear.
        await expect(canvas).toHaveScreenshot(initialCanvasScreenshot);
    });

    test('First-Order Optimizing Vector Checkbox', async ({ page }) => {
        const checkbox = page.locator('#checkbox-first-order-vec');
        const canvas = page.locator('#canvas-bloch');
        
        // 1. Assert: The checkbox with ID `checkbox-first-order-vec` is visible.
        await expect(checkbox).toBeVisible();

        // 2. Assert: The checkbox is unchecked by default.
        await expect(checkbox).not.toBeChecked();

        const initialCanvasScreenshot = await canvas.screenshot();

        // 3. Action: Click the checkbox to check it.
        await checkbox.click();
        
        // 4. Assert: A dashed orange vector labeled `d_err` appears on the Bloch sphere canvas.
        await expect(canvas).not.toHaveScreenshot(initialCanvasScreenshot);

        // 5. Action: Click the checkbox again to uncheck it.
        await checkbox.click();

        // 6. Assert: The dashed orange `d_err` vector disappears from the canvas.
        await expect(canvas).toHaveScreenshot(initialCanvasScreenshot);
    });

    test('First-Order Region of Joint Measurability Checkbox', async ({ page }) => {
        const checkbox = page.locator('#checkbox-first-order-region');
        const canvas = page.locator('#canvas-bloch');

        // 1. Assert: The checkbox with ID `checkbox-first-order-region` is visible.
        await expect(checkbox).toBeVisible();

        // 2. Assert: The checkbox is unchecked by default.
        await expect(checkbox).not.toBeChecked();
        
        const initialCanvasScreenshot = await canvas.screenshot();

        // 3. Action: Click the checkbox to check it.
        await checkbox.click();

        // 4. Assert: Two dashed arcs appear on the Bloch sphere canvas.
        await expect(canvas).not.toHaveScreenshot(initialCanvasScreenshot);

        // 5. Action: Click the checkbox again to uncheck it.
        await checkbox.click();

        // 6. Assert: The two dashed arcs on the canvas disappear.
        await expect(canvas).toHaveScreenshot(initialCanvasScreenshot);
    });

    test('Optimal Approximators Pair Checkbox', async ({ page }) => {
        const checkbox = page.locator('#checkbox-optimal-pair');
        const visualizationContainer = page.locator('#visualization-container');

        // 1. Assert: The checkbox with ID `checkbox-optimal-pair` is visible.
        await expect(checkbox).toBeVisible();

        // 2. Assert: The checkbox is unchecked by default.
        await expect(checkbox).not.toBeChecked();

        const initialVisScreenshot = await visualizationContainer.screenshot();

        // 3. Action: Click the checkbox to check it.
        await checkbox.click();

        // 4. Assert: New vectors `c_opt` and `d_opt` appear on the canvas, and a green dot appears on the error plot.
        await expect(visualizationContainer).not.toHaveScreenshot(initialVisScreenshot);
        
        // 5. Action: Click the checkbox again to uncheck it.
        await checkbox.click();

        // 6. Assert: The `c_opt` and `d_opt` vectors on the canvas and the green dot on the error plot disappear.
        await expect(visualizationContainer).toHaveScreenshot(initialVisScreenshot);
    });

    test('Optimal Region of Joint Measurability Checkbox', async ({ page }) => {
        const checkbox = page.locator('#checkbox-optimal-region');
        const canvas = page.locator('#canvas-bloch');

        // 1. Assert: The checkbox with ID `checkbox-optimal-region` is visible.
        await expect(checkbox).toBeVisible();

        // 2. Assert: The checkbox is unchecked by default.
        await expect(checkbox).not.toBeChecked();

        const initialCanvasScreenshot = await canvas.screenshot();

        // 3. Action: Click the checkbox to check it.
        await checkbox.click();
        
        // 4. Assert: Dashed arcs corresponding to the optimal pair `c_opt` and `d_opt` appear on the canvas.
        await expect(canvas).not.toHaveScreenshot(initialCanvasScreenshot);
        
        // 5. Action: Click the checkbox again to uncheck it.
        await checkbox.click();

        // 6. Assert: The dashed arcs for the optimal pair disappear from the canvas.
        await expect(canvas).toHaveScreenshot(initialCanvasScreenshot);
    });

});