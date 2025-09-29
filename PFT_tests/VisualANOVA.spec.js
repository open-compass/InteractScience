const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/VisualANOVA.html');

test.describe('Interactive Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the canvas to be rendered by p5.js
    // await page.locator('canvas').waitFor();
    await page.waitForTimeout(500);
  });

  test('Mean Slider for Group W (slider-mean-w)', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-mean-w` is visible.
    await expect(page.locator('#slider-mean-w')).toBeVisible();

    // 2. Assert: The slider's value is 0 and its associated value display `value-mean-w` shows "0".
    await expect(page.locator('#slider-mean-w')).toHaveValue('0');
    await expect(page.locator('#value-mean-w')).toHaveText('0');

    // 3. Action: Drag the slider to a new value, such as 5.
    await page.locator('#slider-mean-w').fill('5');

    // 4. Assert: The value display `value-mean-w` updates to "5.0" and the canvas visualization changes.
    await expect(page.locator('#value-mean-w')).toHaveText(/^5\.00*$/);
    await expect(page.locator('canvas')).toHaveScreenshot('mean-w-5.png');

    // 5. Action: Drag the slider to its maximum value of 10.
    await page.locator('#slider-mean-w').fill('10');

    // 6. Assert: The value display `value-mean-w` updates to "10.0" and the canvas visualization updates.
    await expect(page.locator('#value-mean-w')).toHaveText(/^10\.00*$/);
    await expect(page.locator('canvas')).toHaveScreenshot('mean-w-10.png');
  });

  test('Mean Slider for Group X (slider-mean-x)', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-mean-x` is visible.
    await expect(page.locator('#slider-mean-x')).toBeVisible();

    // 2. Assert: The slider's value is 0 and its associated value display `value-mean-x` shows "0".
    await expect(page.locator('#slider-mean-x')).toHaveValue('0');
    await expect(page.locator('#value-mean-x')).toHaveText('0');

    // 3. Action: Drag the slider to a new value, such as -5.
    await page.locator('#slider-mean-x').fill('-5');

    // 4. Assert: The value display `value-mean-x` updates to "-5.0" and the canvas visualization changes.
    await expect(page.locator('#value-mean-x')).toHaveText(/^\-5\.00*$/);
    await expect(page.locator('canvas')).toHaveScreenshot('mean-x--5.png');

    // 5. Action: Drag the slider to its minimum value of -10.
    await page.locator('#slider-mean-x').fill('-10');

    // 6. Assert: The value display `value-mean-x` updates to "-10.0" and the canvas visualization updates.
    await expect(page.locator('#value-mean-x')).toHaveText(/^\-10\.00*$/);
    await expect(page.locator('canvas')).toHaveScreenshot('mean-x--10.png');
  });

  test('Mean Slider for Group Y (slider-mean-y)', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-mean-y` is visible.
    await expect(page.locator('#slider-mean-y')).toBeVisible();

    // 2. Assert: The slider's value is 0 and its associated value display `value-mean-y` shows "0".
    await expect(page.locator('#slider-mean-y')).toHaveValue('0');
    await expect(page.locator('#value-mean-y')).toHaveText('0');

    // 3. Action: Drag the slider to a new value, such as 4.2.
    await page.locator('#slider-mean-y').fill('4.2');

    // 4. Assert: The value display `value-mean-y` updates to "4.2" and the canvas visualization changes.
    await expect(page.locator('#value-mean-y')).toHaveText(/^4\.20*$/);
    await expect(page.locator('canvas')).toHaveScreenshot('mean-y-4.2.png');

    // 5. Action: Drag the slider to its minimum value of -10.
    await page.locator('#slider-mean-y').fill('-10');

    // 6. Assert: The value display `value-mean-y` updates to "-10.0" and the canvas visualization updates.
    await expect(page.locator('#value-mean-y')).toHaveText(/^\-10\.00*$/);
    await expect(page.locator('canvas')).toHaveScreenshot('mean-y--10.png');
  });

  test('Mean Slider for Group Z (slider-mean-z)', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-mean-z` is visible.
    await expect(page.locator('#slider-mean-z')).toBeVisible();

    // 2. Assert: The slider's value is 0 and its associated value display `value-mean-z` shows "0".
    await expect(page.locator('#slider-mean-z')).toHaveValue('0');
    await expect(page.locator('#value-mean-z')).toHaveText('0');

    // 3. Action: Drag the slider to a new value, such as -3.8.
    await page.locator('#slider-mean-z').fill('-3.8');

    // 4. Assert: The value display `value-mean-z` updates to "-3.8" and the canvas visualization changes.
    await expect(page.locator('#value-mean-z')).toHaveText(/^\-3\.80*$/);
    await expect(page.locator('canvas')).toHaveScreenshot('mean-z--3.8.png');

    // 5. Action: Drag the slider back to its default value of 0.
    await page.locator('#slider-mean-z').fill('0');

    // 6. Assert: The value display `value-mean-z` updates to "0" and the canvas visualization updates.
    await expect(page.locator('#value-mean-z')).toHaveText('0');
    await expect(page.locator('canvas')).toHaveScreenshot('mean-z-0.png');
  });

  test('Standard Deviation Slider for Group W (slider-sd-w)', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-sd-w` is visible.
    await expect(page.locator('#slider-sd-w')).toBeVisible();

    // 2. Assert: The slider's value is 1 and its associated value display `value-sd-w` shows "1".
    await expect(page.locator('#slider-sd-w')).toHaveValue('1');
    await expect(page.locator('#value-sd-w')).toHaveText('1');

    // 3. Action: Drag the slider to a new value, such as 5.5.
    await page.locator('#slider-sd-w').fill('5.5');

    // 4. Assert: The value display `value-sd-w` updates to "5.5" and the canvas visualization changes.
    await expect(page.locator('#value-sd-w')).toHaveText(/^5\.50*$/);
    await expect(page.locator('canvas')).toHaveScreenshot('sd-w-5.5.png');

    // 5. Action: Drag the slider to its minimum value of 1.
    await page.locator('#slider-sd-w').fill('1');

    // 6. Assert: The value display `value-sd-w` updates to "1.0" and the canvas visualization updates.
    await expect(page.locator('#value-sd-w')).toHaveText(/^1\.00*$/);
    await expect(page.locator('canvas')).toHaveScreenshot('sd-w-1.0.png');
  });

  test('Standard Deviation Slider for Group X (slider-sd-x)', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-sd-x` is visible.
    await expect(page.locator('#slider-sd-x')).toBeVisible();

    // 2. Assert: The slider's value is 1 and its associated value display `value-sd-x` shows "1".
    await expect(page.locator('#slider-sd-x')).toHaveValue('1');
    await expect(page.locator('#value-sd-x')).toHaveText('1');

    // 3. Action: Drag the slider to a new value, such as 4.
    await page.locator('#slider-sd-x').fill('4');

    // 4. Assert: The value display `value-sd-x` updates to "4.0" and the canvas visualization changes.
    await expect(page.locator('#value-sd-x')).toHaveText(/^4\.00*$/);
    await expect(page.locator('canvas')).toHaveScreenshot('sd-x-4.0.png');

    // 5. Action: Drag the slider to its maximum value of 10.
    await page.locator('#slider-sd-x').fill('10');

    // 6. Assert: The value display `value-sd-x` updates to "10.0" and the canvas visualization updates.
    await expect(page.locator('#value-sd-x')).toHaveText(/^10\.00*$/);
    await expect(page.locator('canvas')).toHaveScreenshot('sd-x-10.0.png');
  });

  test('Standard Deviation Slider for Group Y (slider-sd-y)', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-sd-y` is visible.
    await expect(page.locator('#slider-sd-y')).toBeVisible();

    // 2. Assert: The slider's value is 1 and its associated value display `value-sd-y` shows "1".
    await expect(page.locator('#slider-sd-y')).toHaveValue('1');
    await expect(page.locator('#value-sd-y')).toHaveText('1');

    // 3. Action: Drag the slider to a new value, such as 2.5.
    await page.locator('#slider-sd-y').fill('2.5');

    // 4. Assert: The value display `value-sd-y` updates to "2.5" and the canvas visualization changes.
    await expect(page.locator('#value-sd-y')).toHaveText(/^2\.50*$/);
    await expect(page.locator('canvas')).toHaveScreenshot('sd-y-2.5.png');

    // 5. Action: Drag the slider to its minimum value of 1.
    await page.locator('#slider-sd-y').fill('1');

    // 6. Assert: The value display `value-sd-y` updates to "1.0" and the canvas visualization updates.
    await expect(page.locator('#value-sd-y')).toHaveText(/^1\.00*$/);
    await expect(page.locator('canvas')).toHaveScreenshot('sd-y-1.0.png');
  });

  test('Standard Deviation Slider for Group Z (slider-sd-z)', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-sd-z` is visible.
    await expect(page.locator('#slider-sd-z')).toBeVisible();

    // 2. Assert: The slider's value is 1 and its associated value display `value-sd-z` shows "1".
    await expect(page.locator('#slider-sd-z')).toHaveValue('1');
    await expect(page.locator('#value-sd-z')).toHaveText('1');

    // 3. Action: Drag the slider to a new value, such as 3.5.
    await page.locator('#slider-sd-z').fill('3.5');

    // 4. Assert: The value display `value-sd-z` updates to "3.5" and the canvas visualization changes.
    await expect(page.locator('#value-sd-z')).toHaveText(/^3\.50*$/);
    await expect(page.locator('canvas')).toHaveScreenshot('sd-z-3.5.png');

    // 5. Action: Drag the slider to its maximum value of 10.
    await page.locator('#slider-sd-z').fill('10');

    // 6. Assert: The value display `value-sd-z` updates to "10.0" and the canvas visualization updates.
    await expect(page.locator('#value-sd-z')).toHaveText(/^10\.00*$/);
    await expect(page.locator('canvas')).toHaveScreenshot('sd-z-10.0.png');
  });
});