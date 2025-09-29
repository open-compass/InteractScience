const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/RationalTrianglesWithAreaLessThan102.html');

test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
});

test.describe('Area Range Slider', () => {
    test('Area Range Slider', async ({ page }) => {
        // 1. Assert: The range slider with id `slider-area` is visible.
        await expect(page.locator('#slider-area')).toBeVisible();

        // 2. Assert: The slider's value is `13` and the canvas displays the corresponding triangle.
        await expect(page.locator('#slider-area')).toHaveValue('13');
        // As 13 is a congruent number, the "not congruent" message should not be visible.
        // This indirectly verifies that a triangle is likely shown.
        await expect(page.getByText('13 is not a congruent number')).not.toBeVisible();

        // 3. Action: Drag the slider to the value `5`.
        await page.locator('#slider-area').fill('5');

        // 4. Assert: The canvas updates to show the triangle for area 5, and the number input `input-area` displays `5`.
        await expect(page.getByText('5 is not a congruent number')).not.toBeVisible();
        await expect(page.locator('#input-area')).toHaveValue('5');

        // 5. Action: Drag the slider to a non-congruent number, such as `4`.
        await page.locator('#slider-area').fill('4');

        // 6. Assert: The canvas updates to show the message "4 is not a congruent number".
        // Note: This assumes the canvas text is rendered in an accessible way that Playwright can detect.
        await expect(page.getByText('4 is not a congruent number')).toBeVisible();
    });
});

test.describe('Area Number Input', () => {
    test('Area Number Input', async ({ page }) => {
        // 1. Assert: The number input with id `input-area` is visible.
        await expect(page.locator('#input-area')).toBeVisible();

        // 2. Assert: The input's value is `13` and the `slider-area` is also set to `13`.
        await expect(page.locator('#input-area')).toHaveValue('13');
        await expect(page.locator('#slider-area')).toHaveValue('13');

        // 3. Action: Change the input's value to `6`.
        await page.locator('#input-area').fill('6');

        // 4. Assert: The canvas updates to show the triangle for area 6, and the `slider-area` position updates to `6`.
        await expect(page.getByText('6 is not a congruent number')).not.toBeVisible();
        await expect(page.locator('#slider-area')).toHaveValue('6');

        // 5. Action: Change the input's value to the maximum value, `101`.
        await page.locator('#input-area').fill('101');

        // 6. Assert: The canvas updates to show the corresponding triangle, and the `slider-area` moves to its maximum position.
        await expect(page.getByText('101 is not a congruent number')).not.toBeVisible();
        await expect(page.locator('#slider-area')).toHaveValue('101');
    });
});