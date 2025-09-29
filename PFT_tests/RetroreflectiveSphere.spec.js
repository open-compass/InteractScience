const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/RetroreflectiveSphere.html');

test.describe('Interactive Component Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
        // Wait for p5.js to potentially initialize and draw the first frame.
        // A small delay or waiting for a specific element state might be needed in a real-world scenario,
        // but based on the plan, we assume readiness after page load.
        // await page.locator('#p5-canvas').waitFor();
        await page.waitForTimeout(500);
    });

    test('Ray Count Slider Control', async ({ page }) => {
        const slider = page.locator('#slider-ray-count');
        const valueSpan = slider.locator('~ span');
        const canvas = page.locator('#p5-canvas');

        // 1. Assert: The "ray count" slider (#slider-ray-count) is visible.
        await expect(slider).toBeVisible();

        // 2. Assert: The slider's value is 15 and its associated span displays "15".
        await expect(slider).toHaveValue('15');
        await expect(valueSpan).toHaveText('15');

        // 3. Action: Drag the slider to a value of 40.
        await slider.fill('40');

        // 4. Assert: The number of rays drawn on the canvas changes, and the span updates to "40".
        await expect(valueSpan).toHaveText('40');
        await expect(canvas).toHaveScreenshot('ray-count-40.png');

        // 5. Action: Drag the slider to its minimum value, 1.
        await slider.fill('1');

        // 6. Assert: The canvas updates to show a single ray, and the span updates to "1".
        await expect(valueSpan).toHaveText('1');
        await expect(canvas).toHaveScreenshot('ray-count-1.png');
    });

    test('Beam Width Slider Control', async ({ page }) => {
        const slider = page.locator('#slider-beam-width');
        const valueSpan = slider.locator('~ span');
        const canvas = page.locator('#p5-canvas');

        // 1. Assert: The "beam width" slider (#slider-beam-width) is visible.
        await expect(slider).toBeVisible();

        // 2. Assert: The slider's value is 1.25 and its associated span displays "1.25".
        await expect(slider).toHaveValue('1.25');
        await expect(valueSpan).toHaveText(/^1\.250*$/);

        // 3. Action: Drag the slider to a value of 0.5.
        await slider.fill('0.5');

        // 4. Assert: The width of the ray beam on the canvas decreases, and the span updates to "0.5".
        await expect(valueSpan).toHaveText(/^0\.50*$/);
        await expect(canvas).toHaveScreenshot('beam-width-0.5.png');

        // 5. Action: Drag the slider to its maximum value, 2.0.
        await slider.fill('2');

        // 6. Assert: The width of the ray beam on the canvas increases, and the span updates to "2.0".
        await expect(valueSpan).toHaveText(/^2\.00*$/);
        await expect(canvas).toHaveScreenshot('beam-width-2.0.png');
    });

    test('Incident Angle Slider Control', async ({ page }) => {
        const slider = page.locator('#slider-incident-angle');
        const valueSpan = slider.locator('~ span');
        const canvas = page.locator('#p5-canvas');

        // 1. Assert: The "incident angle" slider (#slider-incident-angle) is visible.
        await expect(slider).toBeVisible();

        // 2. Assert: The slider's value is -45 and its span displays "-45°".
        await expect(slider).toHaveValue('-45');
        await expect(valueSpan).toHaveText('-45°');

        // 3. Action: Drag the slider to a value of 0.
        await slider.fill('0');

        // 4. Assert: The incident angle of the ray beam on the canvas changes, and the span updates to "0°".
        await expect(valueSpan).toHaveText('0°');
        await expect(canvas).toHaveScreenshot('incident-angle-0.png');

        // 5. Action: Drag the slider to its maximum value, 90.
        await slider.fill('90');

        // 6. Assert: The ray beam on the canvas rotates to a vertical orientation, and the span updates to "90°".
        await expect(valueSpan).toHaveText('90°');
        await expect(canvas).toHaveScreenshot('incident-angle-90.png');
    });

    test('Refraction Ratio Slider Control', async ({ page }) => {
        const slider = page.locator('#slider-refraction-ratio');
        const valueSpan = slider.locator('~ span');
        const canvas = page.locator('#p5-canvas');

        // 1. Assert: The "refraction ratio" slider (#slider-refraction-ratio) is visible.
        await expect(slider).toBeVisible();

        // 2. Assert: The slider's value is 2.0 and its span displays "2.".
        await expect(slider).toHaveValue('2');
        await expect(valueSpan).toHaveText('2.');

        // 3. Action: Drag the slider to a value of 1.5.
        await slider.fill('1.5');

        // 4. Assert: The paths of the green, blue, and black rays on the canvas change, and the span updates to "1.5".
        await expect(valueSpan).toHaveText(/^1\.50*$/);
        await expect(canvas).toHaveScreenshot('refraction-ratio-1.5.png');

        // 5. Action: Drag the slider to its maximum value, 3.0.
        await slider.fill('3');

        // 6. Assert: The paths of the internal and exiting rays change again, and the span updates to "3.0".
        await expect(valueSpan).toHaveText(/^3\.00*$/);
        await expect(canvas).toHaveScreenshot('refraction-ratio-3.0.png');
    });

    test('Injected Rays Visibility Checkbox', async ({ page }) => {
        const checkbox = page.locator('#checkbox-injected');
        const canvas = page.locator('#p5-canvas');

        // 1. Assert: The "injected" checkbox (#checkbox-injected) is visible.
        await expect(checkbox).toBeVisible();

        // 2. Assert: The checkbox is in a 'checked' state and red rays are visible on the canvas.
        await expect(checkbox).toBeChecked();
        await expect(canvas).toHaveScreenshot('injected-rays-visible.png');

        // 3. Action: Click the "injected" checkbox to uncheck it.
        await checkbox.click();

        // 4. Assert: The red rays disappear from the canvas.
        await expect(canvas).toHaveScreenshot('injected-rays-hidden.png');

        // 5. Action: Click the "injected" checkbox to check it again.
        await checkbox.click();

        // 6. Assert: The red rays reappear on the canvas.
        await expect(canvas).toHaveScreenshot('injected-rays-visible.png');
    });

    test('Refracted Rays Visibility Checkbox', async ({ page }) => {
        const checkbox = page.locator('#checkbox-refracted');
        const canvas = page.locator('#p5-canvas');

        // 1. Assert: The "refracted" checkbox (#checkbox-refracted) is visible.
        await expect(checkbox).toBeVisible();

        // 2. Assert: The checkbox is in a 'checked' state and green rays are visible on the canvas.
        await expect(checkbox).toBeChecked();
        await expect(canvas).toHaveScreenshot('refracted-rays-visible.png');

        // 3. Action: Click the "refracted" checkbox to uncheck it.
        await checkbox.click();

        // 4. Assert: The green rays disappear from the canvas.
        await expect(canvas).toHaveScreenshot('refracted-rays-hidden.png');

        // 5. Action: Click the "refracted" checkbox to check it again.
        await checkbox.click();

        // 6. Assert: The green rays reappear on the canvas.
        await expect(canvas).toHaveScreenshot('refracted-rays-visible.png');
    });

    test('Reflected Rays Visibility Checkbox', async ({ page }) => {
        const checkbox = page.locator('#checkbox-reflected');
        const canvas = page.locator('#p5-canvas');

        // 1. Assert: The "reflected" checkbox (#checkbox-reflected) is visible.
        await expect(checkbox).toBeVisible();

        // 2. Assert: The checkbox is in a 'checked' state and blue rays are visible on the canvas.
        await expect(checkbox).toBeChecked();
        await expect(canvas).toHaveScreenshot('reflected-rays-visible.png');

        // 3. Action: Click the "reflected" checkbox to uncheck it.
        await checkbox.click();

        // 4. Assert: The blue rays disappear from the canvas.
        await expect(canvas).toHaveScreenshot('reflected-rays-hidden.png');

        // 5. Action: Click the "reflected" checkbox to check it again.
        await checkbox.click();

        // 6. Assert: The blue rays reappear on the canvas.
        await expect(canvas).toHaveScreenshot('reflected-rays-visible.png');
    });

    test('Ejected Rays Visibility Checkbox', async ({ page }) => {
        const checkbox = page.locator('#checkbox-ejected');
        const canvas = page.locator('#p5-canvas');

        // 1. Assert: The "ejected" checkbox (#checkbox-ejected) is visible.
        await expect(checkbox).toBeVisible();

        // 2. Assert: The checkbox is in a 'checked' state and black rays are visible on the canvas.
        await expect(checkbox).toBeChecked();
        await expect(canvas).toHaveScreenshot('ejected-rays-visible.png');

        // 3. Action: Click the "ejected" checkbox to uncheck it.
        await checkbox.click();

        // 4. Assert: The black rays disappear from the canvas.
        await expect(canvas).toHaveScreenshot('ejected-rays-hidden.png');

        // 5. Action: Click the "ejected" checkbox to check it again.
        await checkbox.click();

        // 6. Assert: The black rays reappear on the canvas.
        await expect(canvas).toHaveScreenshot('ejected-rays-visible.png');
    });

    test('Normals Visibility Checkbox', async ({ page }) => {
        const checkbox = page.locator('#checkbox-normals');
        const canvas = page.locator('#p5-canvas');

        // 1. Assert: The "normals" checkbox (#checkbox-normals) is visible.
        await expect(checkbox).toBeVisible();

        // 2. Assert: The checkbox is in an 'unchecked' state and no normal lines are visible on the canvas.
        await expect(checkbox).not.toBeChecked();
        await expect(canvas).toHaveScreenshot('normals-hidden.png');

        // 3. Action: Click the "normals" checkbox to check it.
        await checkbox.click();

        // 4. Assert: Dashed lines representing surface normals appear on the canvas.
        await expect(canvas).toHaveScreenshot('normals-visible.png');

        // 5. Action: Click the "normals" checkbox to uncheck it again.
        await checkbox.click();

        // 6. Assert: The dashed normal lines disappear from the canvas.
        await expect(canvas).toHaveScreenshot('normals-hidden.png');
    });

    test('Intersections Visibility Checkbox', async ({ page }) => {
        const checkbox = page.locator('#checkbox-intersections');
        const canvas = page.locator('#p5-canvas');

        // 1. Assert: The "intersections" checkbox (#checkbox-intersections) is visible.
        await expect(checkbox).toBeVisible();

        // 2. Assert: The checkbox is in an 'unchecked' state and no intersection points are visible on the canvas.
        await expect(checkbox).not.toBeChecked();
        await expect(canvas).toHaveScreenshot('intersections-hidden.png');

        // 3. Action: Click the "intersections" checkbox to check it.
        await checkbox.click();

        // 4. Assert: Small circles appear on the canvas where rays meet the sphere's surface.
        await expect(canvas).toHaveScreenshot('intersections-visible.png');

        // 5. Action: Click the "intersections" checkbox to uncheck it again.
        await checkbox.click();

        // 6. Assert: The small intersection circles disappear from the canvas.
        await expect(canvas).toHaveScreenshot('intersections-hidden.png');
    });

    test('Beam Top Half Visibility Checkbox', async ({ page }) => {
        const checkbox = page.locator('#checkbox-beam-top');
        const canvas = page.locator('#p5-canvas');

        // 1. Assert: The "beam top half" checkbox (#checkbox-beam-top) is visible.
        await expect(checkbox).toBeVisible();

        // 2. Assert: The checkbox is in a 'checked' state and the top half of the rays are visible.
        await expect(checkbox).toBeChecked();
        await expect(canvas).toHaveScreenshot('beam-top-visible.png');

        // 3. Action: Click the "beam top half" checkbox to uncheck it.
        await checkbox.click();

        // 4. Assert: The top half of the rays disappear from the canvas, leaving only the bottom half.
        await expect(canvas).toHaveScreenshot('beam-top-hidden.png');

        // 5. Action: Click the "beam top half" checkbox to check it again.
        await checkbox.click();

        // 6. Assert: The top half of the rays reappear on the canvas.
        await expect(canvas).toHaveScreenshot('beam-top-visible.png');
    });

    test('Beam Bottom Half Visibility Checkbox', async ({ page }) => {
        const checkbox = page.locator('#checkbox-beam-bottom');
        const canvas = page.locator('#p5-canvas');

        // 1. Assert: The "beam bottom half" checkbox (#checkbox-beam-bottom) is visible.
        await expect(checkbox).toBeVisible();

        // 2. Assert: The checkbox is in a 'checked' state and the bottom half of the rays are visible.
        await expect(checkbox).toBeChecked();
        await expect(canvas).toHaveScreenshot('beam-bottom-visible.png');

        // 3. Action: Click the "beam bottom half" checkbox to uncheck it.
        await checkbox.click();

        // 4. Assert: The bottom half of the rays disappear from the canvas, leaving only the top half.
        await expect(canvas).toHaveScreenshot('beam-bottom-hidden.png');

        // 5. Action: Click the "beam bottom half" checkbox to check it again.
        await checkbox.click();

        // 6. Assert: The bottom half of the rays reappear on the canvas.
        await expect(canvas).toHaveScreenshot('beam-bottom-visible.png');
    });
});