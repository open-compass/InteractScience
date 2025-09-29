const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/UllmansTheoremInTwoDimensions.html');

test.describe('Ullman\'s Theorem in Two Dimensions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('"A.u" Dot Product Slider', async ({ page }) => {
    // 1. Assert: Slider with ID `slider-au` is visible.
    await expect(page.locator('#slider-au')).toBeVisible();

    // 2. Assert: The value of `slider-au` is 0.8, and its associated value display shows "0.8".
    await expect(page.locator('#slider-au')).toHaveValue('0.8');
    await expect(page.locator('#value-au')).toHaveText(/^0\.80*$/);

    // 3. Action: Drag the `slider-au` to a new value, such as 1.5.
    await page.locator('#slider-au').fill('1.5');

    // 4. Assert: The canvas visualization is redrawn, and the value display for the slider updates to "1.5".
    await expect(page.locator('#value-au')).toHaveText(/^1\.50*$/);

    // 5. Action: Drag the `slider-au` to its maximum value of 2.
    await page.locator('#slider-au').fill('2');

    // 6. Assert: The canvas visualization is redrawn, and the value display updates to "2.0".
    await expect(page.locator('#value-au')).toHaveText(/^2\.00*$/);
  });

  test('"B.u" Dot Product Slider', async ({ page }) => {
    // 1. Assert: Slider with ID `slider-bu` is visible.
    await expect(page.locator('#slider-bu')).toBeVisible();

    // 2. Assert: The value of `slider-bu` is -0.5, and its associated value display shows "-0.5".
    await expect(page.locator('#slider-bu')).toHaveValue('-0.5');
    await expect(page.locator('#value-bu')).toHaveText(/^\-0\.50*$/);

    // 3. Action: Drag the `slider-bu` to a new value, such as 0.0.
    await page.locator('#slider-bu').fill('0');

    // 4. Assert: The canvas visualization is redrawn, and the value display for the slider updates to "0.0".
    await expect(page.locator('#value-bu')).toHaveText(/^0\.00*$/);

    // 5. Action: Drag the `slider-bu` to its minimum value of -2.
    await page.locator('#slider-bu').fill('-2');

    // 6. Assert: The canvas visualization is redrawn, and the value display updates to "-2.0".
    await expect(page.locator('#value-bu')).toHaveText(/^\-2\.00*$/);
  });

  test('"A.v" Dot Product Slider', async ({ page }) => {
    // 1. Assert: Slider with ID `slider-av` is visible.
    await expect(page.locator('#slider-av')).toBeVisible();

    // 2. Assert: The value of `slider-av` is 1.2, and its associated value display shows "1.2".
    await expect(page.locator('#slider-av')).toHaveValue('1.2');
    await expect(page.locator('#value-av')).toHaveText(/^1\.20*$/);

    // 3. Action: Drag the `slider-av` to a new value, such as 0.7.
    await page.locator('#slider-av').fill('0.7');

    // 4. Assert: The canvas visualization is redrawn, and the value display for the slider updates to "0.7".
    await expect(page.locator('#value-av')).toHaveText(/^0\.70*$/);

    // 5. Action: Drag the `slider-av` to its maximum value of 2.
    await page.locator('#slider-av').fill('2');

    // 6. Assert: The canvas visualization is redrawn, and the value display updates to "2.0".
    await expect(page.locator('#value-av')).toHaveText(/^2\.00*$/);
  });

  test('"B.v" Dot Product Slider', async ({ page }) => {
    // 1. Assert: Slider with ID `slider-bv` is visible.
    await expect(page.locator('#slider-bv')).toBeVisible();

    // 2. Assert: The value of `slider-bv` is 1.0, and its associated value display shows "1.0".
    await expect(page.locator('#slider-bv')).toHaveValue('1');
    await expect(page.locator('#value-bv')).toHaveText(/^1\.00*$/);

    // 3. Action: Drag the `slider-bv` to a new value, such as -0.8.
    await page.locator('#slider-bv').fill('-0.8');

    // 4. Assert: The canvas visualization is redrawn, and the value display for the slider updates to "-0.8".
    await expect(page.locator('#value-bv')).toHaveText(/^\-0\.80*$/);

    // 5. Action: Drag the `slider-bv` to its minimum value of -2.
    await page.locator('#slider-bv').fill('-2');

    // 6. Assert: The canvas visualization is redrawn, and the value display updates to "-2.0".
    await expect(page.locator('#value-bv')).toHaveText(/^\-2\.00*$/);
  });

  test('"A.w" Dot Product Slider', async ({ page }) => {
    // 1. Assert: Slider with ID `slider-aw` is visible.
    await expect(page.locator('#slider-aw')).toBeVisible();

    // 2. Assert: The value of `slider-aw` is 1.1, and its associated value display shows "1.1".
    await expect(page.locator('#slider-aw')).toHaveValue('1.1');
    await expect(page.locator('#value-aw')).toHaveText(/^1\.10*$/);

    // 3. Action: Drag the `slider-aw` to a new value, such as -0.5.
    await page.locator('#slider-aw').fill('-0.5');

    // 4. Assert: The canvas visualization is redrawn, and the value display for the slider updates to "-0.5".
    await expect(page.locator('#value-aw')).toHaveText(/^\-0\.50*$/);

    // 5. Action: Drag the `slider-aw` to its maximum value of 2.
    await page.locator('#slider-aw').fill('2');

    // 6. Assert: The canvas visualization is redrawn, and the value display updates to "2.0".
    await expect(page.locator('#value-aw')).toHaveText(/^2\.00*$/);
  });

  test('"B.w" Dot Product Slider', async ({ page }) => {
    // 1. Assert: Slider with ID `slider-bw` is visible.
    await expect(page.locator('#slider-bw')).toBeVisible();

    // 2. Assert: The value of `slider-bw` is -0.2, and its associated value display shows "-0.2".
    await expect(page.locator('#slider-bw')).toHaveValue('-0.2');
    await expect(page.locator('#value-bw')).toHaveText(/^\-0\.20*$/);

    // 3. Action: Drag the `slider-bw` to a new value, such as 0.5.
    await page.locator('#slider-bw').fill('0.5');

    // 4. Assert: The canvas visualization is redrawn, and the value display for the slider updates to "0.5".
    await expect(page.locator('#value-bw')).toHaveText(/^0\.50*$/);

    // 5. Action: Drag the `slider-bw` to its minimum value of -2.
    await page.locator('#slider-bw').fill('-2');

    // 6. Assert: The canvas visualization is redrawn, and the value display updates to "-2.0".
    await expect(page.locator('#value-bw')).toHaveText(/^\-2\.00*$/);
  });

  test('"x scale" Slider', async ({ page }) => {
    // 1. Assert: Slider with ID `slider-x-scale` is visible.
    await expect(page.locator('#slider-x-scale')).toBeVisible();

    // 2. Assert: The value of `slider-x-scale` is 80, and its associated value display shows "80".
    await expect(page.locator('#slider-x-scale')).toHaveValue('80');
    await expect(page.locator('#value-x-scale')).toHaveText('80');

    // 3. Action: Drag the `slider-x-scale` to a new value, such as 150.
    await page.locator('#slider-x-scale').fill('150');

    // 4. Assert: The canvas visualization is redrawn with a different horizontal scale, and the value display updates to "150".
    await expect(page.locator('#value-x-scale')).toHaveText('150');

    // 5. Action: Drag the `slider-x-scale` to its minimum value of 20.
    await page.locator('#slider-x-scale').fill('20');

    // 6. Assert: The canvas visualization is redrawn with the minimum horizontal scale, and the value display updates to "20".
    await expect(page.locator('#value-x-scale')).toHaveText('20');
  });

  test('"y scale" Slider', async ({ page }) => {
    // 1. Assert: Slider with ID `slider-y-scale` is visible.
    await expect(page.locator('#slider-y-scale')).toBeVisible();

    // 2. Assert: The value of `slider-y-scale` is 80, and its associated value display shows "80".
    await expect(page.locator('#slider-y-scale')).toHaveValue('80');
    await expect(page.locator('#value-y-scale')).toHaveText('80');

    // 3. Action: Drag the `slider-y-scale` to a new value, such as 50.
    await page.locator('#slider-y-scale').fill('50');

    // 4. Assert: The canvas visualization is redrawn with a different vertical scale, and the value display updates to "50".
    await expect(page.locator('#value-y-scale')).toHaveText('50');

    // 5. Action: Drag the `slider-y-scale` to its maximum value of 200.
    await page.locator('#slider-y-scale').fill('200');

    // 6. Assert: The canvas visualization is redrawn with the maximum vertical scale, and the value display updates to "200".
    await expect(page.locator('#value-y-scale')).toHaveText('200');
  });
});