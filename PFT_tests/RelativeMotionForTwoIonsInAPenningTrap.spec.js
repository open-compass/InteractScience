const { test, expect } = require('@playwright/test');

// Setup: Load the local HTML file for testing.
const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/RelativeMotionForTwoIonsInAPenningTrap.html');

test.describe('Relative Motion For Two Ions In A Penning Trap', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the local HTML file before each test.
    await page.goto(fileUrl);
    // Wait for the canvas to be rendered, which indicates that three.js has initialized.
    // await page.waitForSelector('#three-canvas');
    await page.waitForTimeout(500);
  });

  test('t Slider Control', async ({ page }) => {
    // 1. Assert: The slider with id `slider-t` is visible.
    await expect(page.locator('#slider-t')).toBeVisible();

    // 2. Assert: The value of `slider-t` is 49 and its associated number input `input-t` displays "49".
    await expect(page.locator('#slider-t')).toHaveValue('49');
    await expect(page.locator('#input-t')).toHaveValue('49');

    const canvas = page.locator('#three-canvas');
    const initialCanvasImage = await canvas.screenshot();

    // 3. Action: Drag the `slider-t` to a value of 80.
    await page.locator('#slider-t').fill('80');

    // 4. Assert: The number input `input-t` updates to "80" and the ion path tube in the 3D view changes its length.
    await expect(page.locator('#input-t')).toHaveValue('80');
    await expect(canvas).not.toHaveScreenshot(initialCanvasImage, { maxDiffPixels: 100 });

    const midCanvasImage = await canvas.screenshot();

    // 5. Action: Drag the `slider-t` to its maximum value, 100.
    await page.locator('#slider-t').fill('100');

    // 6. Assert: The number input `input-t` updates to "100" and the ion path tube in the 3D view is updated.
    await expect(page.locator('#input-t')).toHaveValue('100');
    await expect(canvas).not.toHaveScreenshot(midCanvasImage, { maxDiffPixels: 100 });
  });

  test('ρ₀ Slider Control', async ({ page }) => {
    // 1. Assert: The slider with id `slider-rho0` is visible.
    await expect(page.locator('#slider-rho0')).toBeVisible();

    // 2. Assert: The value of `slider-rho0` is 1.9 and its associated number input `input-rho0` displays "1.9".
    await expect(page.locator('#slider-rho0')).toHaveValue('1.9');
    await expect(page.locator('#input-rho0')).toHaveValue('1.9');

    const canvas = page.locator('#three-canvas');
    const initialCanvasImage = await canvas.screenshot();

    // 3. Action: Drag the `slider-rho0` to a value of 1.0.
    await page.locator('#slider-rho0').fill('1');

    // 4. Assert: The number input `input-rho0` updates to "1.0" and the shape of the ion path in the 3D view changes.
    await expect(page.locator('#input-rho0')).toHaveValue('1.0');
    await expect(canvas).not.toHaveScreenshot(initialCanvasImage, { maxDiffPixels: 100 });

    const midCanvasImage = await canvas.screenshot();

    // 5. Action: Drag the `slider-rho0` to its minimum value, 0.5.
    await page.locator('#slider-rho0').fill('0.5');

    // 6. Assert: The number input `input-rho0` updates to "0.5" and the ion path in the 3D view is updated.
    await expect(page.locator('#input-rho0')).toHaveValue('0.5');
    await expect(canvas).not.toHaveScreenshot(midCanvasImage, { maxDiffPixels: 100 });
  });

  test('ζ₀ Slider Control', async ({ page }) => {
    // 1. Assert: The slider with id `slider-zeta0` is visible.
    await expect(page.locator('#slider-zeta0')).toBeVisible();

    // 2. Assert: The value of `slider-zeta0` is 0.455 and its associated number input `input-zeta0` displays "0.455".
    await expect(page.locator('#slider-zeta0')).toHaveValue('0.455');
    await expect(page.locator('#input-zeta0')).toHaveValue('0.455');
    
    const canvas = page.locator('#three-canvas');
    const initialCanvasImage = await canvas.screenshot();

    // 3. Action: Drag the `slider-zeta0` to a value of 1.0.
    await page.locator('#slider-zeta0').fill('1');

    // 4. Assert: The number input `input-zeta0` updates to "1.0" and the shape of the ion path in the 3D view changes.
    await expect(page.locator('#input-zeta0')).toHaveValue('1.0');
    await expect(canvas).not.toHaveScreenshot(initialCanvasImage, { maxDiffPixels: 100 });
    
    const midCanvasImage = await canvas.screenshot();

    // 5. Action: Drag the `slider-zeta0` to its minimum value, 0.
    await page.locator('#slider-zeta0').fill('0');

    // 6. Assert: The number input `input-zeta0` updates to "0" and the ion path in the 3D view is updated.
    await expect(page.locator('#input-zeta0')).toHaveValue('0');
    await expect(canvas).not.toHaveScreenshot(midCanvasImage, { maxDiffPixels: 100 });
  });

  test('e₀ Slider Control', async ({ page }) => {
    // 1. Assert: The slider with id `slider-e0` is visible.
    await expect(page.locator('#slider-e0')).toBeVisible();

    // 2. Assert: The value of `slider-e0` is 2.93 and its associated number input `input-e0` displays "2.93".
    await expect(page.locator('#slider-e0')).toHaveValue('2.93');
    await expect(page.locator('#input-e0')).toHaveValue('2.93');

    const canvas = page.locator('#three-canvas');
    const initialCanvasImage = await canvas.screenshot();
    
    // 3. Action: Drag the `slider-e0` to a value of 4.0.
    await page.locator('#slider-e0').fill('4');

    // 4. Assert: The number input `input-e0` updates to "4.0" and the shape of the ion path in the 3D view changes.
    await expect(page.locator('#input-e0')).toHaveValue('4.0');
    await expect(canvas).not.toHaveScreenshot(initialCanvasImage, { maxDiffPixels: 100 });

    const midCanvasImage = await canvas.screenshot();

    // 5. Action: Drag the `slider-e0` to its maximum value, 5.0.
    await page.locator('#slider-e0').fill('5');

    // 6. Assert: The number input `input-e0` updates to "5.0" and the ion path in the 3D view is updated.
    await expect(page.locator('#input-e0')).toHaveValue('5.0');
    await expect(canvas).not.toHaveScreenshot(midCanvasImage, { maxDiffPixels: 100 });
  });

  test('v Slider Control', async ({ page }) => {
    // 1. Assert: The slider with id `slider-v` is visible.
    await expect(page.locator('#slider-v')).toBeVisible();

    // 2. Assert: The value of `slider-v` is 0 and its associated number input `input-v` displays "0".
    await expect(page.locator('#slider-v')).toHaveValue('0');
    await expect(page.locator('#input-v')).toHaveValue('0');
    
    const canvas = page.locator('#three-canvas');
    const initialCanvasImage = await canvas.screenshot();

    // 3. Action: Drag the `slider-v` to a value of 1.25.
    await page.locator('#slider-v').fill('1.25');

    // 4. Assert: The number input `input-v` updates to "1.25" and the shape of the ion path in the 3D view changes.
    await expect(page.locator('#input-v')).toHaveValue('1.25');
    await expect(canvas).not.toHaveScreenshot(initialCanvasImage, { maxDiffPixels: 100 });

    const midCanvasImage = await canvas.screenshot();

    // 5. Action: Drag the `slider-v` to its maximum value, 2.0.
    await page.locator('#slider-v').fill('2');

    // 6. Assert: The number input `input-v` updates to "2.0" and the ion path in the 3D view is updated.
    await expect(page.locator('#input-v')).toHaveValue('2.0');
    await expect(canvas).not.toHaveScreenshot(midCanvasImage, { maxDiffPixels: 100 });
  });

  test('λ Slider Control', async ({ page }) => {
    // 1. Assert: The slider with id `slider-lambda` is visible.
    await expect(page.locator('#slider-lambda')).toBeVisible();

    // 2. Assert: The value of `slider-lambda` is 1.1 and its associated number input `input-lambda` displays "1.1".
    await expect(page.locator('#slider-lambda')).toHaveValue('1.1');
    await expect(page.locator('#input-lambda')).toHaveValue('1.1');
    
    const canvas = page.locator('#three-canvas');
    const initialCanvasImage = await canvas.screenshot();

    // 3. Action: Drag the `slider-lambda` to a value of 0.5.
    await page.locator('#slider-lambda').fill('0.5');

    // 4. Assert: The number input `input-lambda` updates to "0.5" and the shape of the ion path in the 3D view changes.
    await expect(page.locator('#input-lambda')).toHaveValue('0.5');
    await expect(canvas).not.toHaveScreenshot(initialCanvasImage, { maxDiffPixels: 100 });

    const midCanvasImage = await canvas.screenshot();

    // 5. Action: Drag the `slider-lambda` to its maximum value, 2.0.
    await page.locator('#slider-lambda').fill('2');

    // 6. Assert: The number input `input-lambda` updates to "2.0" and the ion path in the 3D view is updated.
    await expect(page.locator('#input-lambda')).toHaveValue('2.0');
    await expect(canvas).not.toHaveScreenshot(midCanvasImage, { maxDiffPixels: 100 });
  });
});