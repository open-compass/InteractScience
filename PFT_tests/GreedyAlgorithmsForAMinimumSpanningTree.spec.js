const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/GreedyAlgorithmsForAMinimumSpanningTree.html');

test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
});

test.describe('Component-Level Tests', () => {

    test('Dimension Control Buttons (2D/3D)', async ({ page }) => {
        // 1. Assert: The "2D" and "3D" buttons are visible.
        await expect(page.locator('#btn-2d')).toBeVisible();
        await expect(page.locator('#btn-3d')).toBeVisible();

        // 2. Assert: The "2D" button is in an 'active' state by default, and the canvas shows a 2D plot.
        await expect(page.locator('#btn-2d')).toHaveClass(/active/);
        await expect(page.locator('#btn-3d')).not.toHaveClass(/active/);

        // 3. Action: Click the "3D" button.
        await page.locator('#btn-3d').click();

        // 4. Assert: The "3D" button becomes 'active'. The canvas updates to show a 3D visualization (e.g., a wireframe cube appears), and the point layout changes.
        await expect(page.locator('#btn-3d')).toHaveClass(/active/);
        await expect(page.locator('#btn-2d')).not.toHaveClass(/active/);

        // 5. Action: Click the "2D" button again.
        await page.locator('#btn-2d').click();

        // 6. Assert: The "2D" button becomes 'active'. The canvas reverts to a 2D plot, and the point layout changes again.
        await expect(page.locator('#btn-2d')).toHaveClass(/active/);
        await expect(page.locator('#btn-3d')).not.toHaveClass(/active/);
    });

    test('Random Seed Slider', async ({ page }) => {
        // 1. Assert: The "random seed" slider (`slider-seed`) is visible.
        await expect(page.locator('#slider-seed')).toBeVisible();

        // 2. Assert: The slider's value is 525, and its corresponding value span (`seed-value`) displays "525". An initial set of points is visible on the canvas.
        await expect(page.locator('#slider-seed')).toHaveValue('525');
        await expect(page.locator('#seed-value')).toHaveText('525');

        // 3. Action: Drag the slider to a new value, such as 700.
        await page.locator('#slider-seed').fill('700');

        // 4. Assert: The value span updates to "700", and the arrangement of points on the canvas changes.
        await expect(page.locator('#seed-value')).toHaveText('700');
        await expect(page.locator('#slider-seed')).toHaveValue('700');

        // 5. Action: Drag the slider to its maximum value (1000).
        await page.locator('#slider-seed').fill('1000');

        // 6. Assert: The value span updates to "1000", and the arrangement of points on the canvas changes again.
        await expect(page.locator('#seed-value')).toHaveText('1000');
        await expect(page.locator('#slider-seed')).toHaveValue('1000');
    });

    test('Number of Vertices Slider', async ({ page }) => {
        // 1. Assert: The "number" slider (`slider-number`) is visible.
        await expect(page.locator('#slider-number')).toBeVisible();

        // 2. Assert: The slider's value is 40, and its corresponding value span (`number-value`) displays "40".
        await expect(page.locator('#slider-number')).toHaveValue('40');
        await expect(page.locator('#number-value')).toHaveText('40');

        // 3. Action: Drag the slider to a higher value, such as 80.
        await page.locator('#slider-number').fill('80');

        // 4. Assert: The value span updates to "80", and the number of points visible on the canvas increases.
        await expect(page.locator('#number-value')).toHaveText('80');
        await expect(page.locator('#slider-number')).toHaveValue('80');

        // 5. Action: Drag the slider to its minimum value (5).
        await page.locator('#slider-number').fill('5');

        // 6. Assert: The value span updates to "5", and the number of points on the canvas decreases to 5.
        await expect(page.locator('#number-value')).toHaveText('5');
        await expect(page.locator('#slider-number')).toHaveValue('5');
    });

    test('Algorithm Method Buttons (Prim/Kruskal)', async ({ page }) => {
        // 1. Assert: The "Prim" and "Kruskal" buttons are visible.
        await expect(page.locator('#btn-prim')).toBeVisible();
        await expect(page.locator('#btn-kruskal')).toBeVisible();

        // 2. Assert: The "Prim" button is in an 'active' state by default.
        await expect(page.locator('#btn-prim')).toHaveClass(/active/);

        // 3. Action: Start the animation and let a few edges appear, then click the "Kruskal" button.
        await page.locator('#btn-play').click();
        await page.waitForTimeout(500); // Allow time for edges to appear
        await page.locator('#btn-kruskal').click();

        // 4. Assert: The "Kruskal" button becomes 'active', and all red edges are cleared from the canvas, resetting the animation progress. The point locations remain unchanged.
        await expect(page.locator('#btn-kruskal')).toHaveClass(/active/);
        await expect(page.locator('#btn-prim')).not.toHaveClass(/active/);
        await expect(page.locator('#btn-play')).toBeEnabled();
        await expect(page.locator('#btn-pause')).toBeDisabled();

        // 5. Action: Click the "Prim" button again.
        await page.locator('#btn-prim').click();

        // 6. Assert: The "Prim" button becomes 'active', and the UI remains in a reset state.
        await expect(page.locator('#btn-prim')).toHaveClass(/active/);
        await expect(page.locator('#btn-kruskal')).not.toHaveClass(/active/);
    });

    test('Play Button', async ({ page }) => {
        // 1. Assert: The "►" (play) button is visible and enabled.
        await expect(page.locator('#btn-play')).toBeVisible();
        await expect(page.locator('#btn-play')).toBeEnabled();

        // 2. Assert: The `animationState` is 'stopped', and the canvas displays only points.
        await expect(page.locator('#btn-pause')).toBeDisabled();

        // 3. Action: Click the "►" button.
        await page.locator('#btn-play').click();

        // 4. Assert: The play button becomes disabled, the pause button becomes enabled, and at least one red edge appears on the canvas.
        await expect(page.locator('#btn-play')).toBeDisabled();
        await expect(page.locator('#btn-pause')).toBeEnabled();

        // 5. Action: Let the animation run to completion.
        // Wait for a period sufficient for the animation to complete.
        await page.waitForTimeout(5000);

        // 6. Assert: The play and pause buttons become disabled, indicating the algorithm has finished. The canvas shows the complete MST.
        await expect(page.locator('#btn-play')).toBeDisabled();
        await expect(page.locator('#btn-pause')).toBeDisabled();
    });

    test('Pause Button', async ({ page }) => {
        // 1. Assert: The "||" (pause) button is visible and disabled.
        await expect(page.locator('#btn-pause')).toBeVisible();
        await expect(page.locator('#btn-pause')).toBeDisabled();

        // 2. Assert: The canvas displays only points, and the animation is not running.
        await expect(page.locator('#btn-play')).toBeEnabled();

        // 3. Action: Click the "►" (play) button, wait for several red edges to appear, then click the "||" (pause) button.
        await page.locator('#btn-play').click();
        await page.waitForTimeout(500); // Wait for some animation steps
        await page.locator('#btn-pause').click();

        // 4. Assert: The animation freezes. The "||" button becomes disabled, and the "►" button becomes enabled. The set of edges on the canvas does not change.
        await expect(page.locator('#btn-pause')).toBeDisabled();
        await expect(page.locator('#btn-play')).toBeEnabled();

        // 5. Action: Click the "►" (play) button again.
        await page.locator('#btn-play').click();

        // 6. Assert: The animation resumes, and new red edges begin appearing on the canvas.
        await expect(page.locator('#btn-play')).toBeDisabled();
        await expect(page.locator('#btn-pause')).toBeEnabled();
    });

    test('Reset Button', async ({ page }) => {
        // 1. Assert: The "|◄" (reset) button is visible and enabled.
        await expect(page.locator('#btn-reset')).toBeVisible();
        await expect(page.locator('#btn-reset')).toBeEnabled();

        // 2. Assert: The canvas shows only blue points.
        await expect(page.locator('#btn-pause')).toBeDisabled();

        // 3. Action: Click the "►" (play) button and allow the animation to add several red edges to the canvas.
        await page.locator('#btn-play').click();
        await page.waitForTimeout(500); // Wait for some edges to be drawn

        // 4. Assert: The canvas shows both points and red edges connecting them.
        await expect(page.locator('#btn-pause')).toBeEnabled();

        // 5. Action: Click the "|◄" (reset) button.
        await page.locator('#btn-reset').click();

        // 6. Assert: All red edges are removed from the canvas, which now shows only the original points. The play button is enabled, and the pause button is disabled.
        await expect(page.locator('#btn-play')).toBeEnabled();
        await expect(page.locator('#btn-pause')).toBeDisabled();
    });
});