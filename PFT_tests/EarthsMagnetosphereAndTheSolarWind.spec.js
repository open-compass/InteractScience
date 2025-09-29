const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/EarthsMagnetosphereAndTheSolarWind.html');

test.describe("Earth's Magnetosphere and The Solar Wind", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for a brief moment to ensure canvas initialization scripts have run.
    await page.waitForTimeout(500);
  });

  test('Month Slider Interaction', async ({ page }) => {
    // 1. Assert: The "month" slider (#slider-month) is visible.
    const slider = page.locator('#slider-month');
    await expect(slider).toBeVisible();

    // 2. Assert: The slider's value is initialized to the current calendar month.
    const currentMonth = (new Date()).getMonth();
    await expect(slider).toHaveValue(String(currentMonth));

    const initialCanvasScreenshot = await page.locator('#main-canvas').screenshot();

    // 3. Action: Drag the slider to a different month (e.g., 6 months from the initial value).
    const newMonth = (currentMonth + 6) % 12;
    await slider.fill(String(newMonth));

    // 4. Assert: The canvas visualization updates, showing a different orientation of the Earth and magnetosphere.
    const midChangeCanvasScreenshot = await page.locator('#main-canvas').screenshot();
    expect(midChangeCanvasScreenshot).not.toEqual(initialCanvasScreenshot);

    // 5. Action: Drag the slider to its minimum value (0 for January).
    await slider.fill('0');

    // 6. Assert: The canvas visualization updates to reflect the minimum value setting.
    const finalCanvasScreenshot = await page.locator('#main-canvas').screenshot();
    expect(finalCanvasScreenshot).not.toEqual(midChangeCanvasScreenshot);
  });

  test('2D Perspective Button Interaction', async ({ page }) => {
    // 1. Assert: The "2D" button (#btn-2d) is visible.
    const btn2d = page.locator('#btn-2d');
    await expect(btn2d).toBeVisible();

    // 2. Assert: The "2D" button has the "active" class on page load.
    await expect(btn2d).toHaveClass(/active/);
    const initialCanvasScreenshot = await page.locator('#main-canvas').screenshot();

    // 3. Action: Click the "3D" button (#btn-3d).
    const btn3d = page.locator('#btn-3d');
    await btn3d.click();
    await page.waitForTimeout(200); // Allow time for canvas switch

    // 4. Assert: The "2D" button no longer has the "active" class, and the canvas shows the 3D scene.
    await expect(btn2d).not.toHaveClass(/active/);
    const canvasAfter3DClick = await page.locator('#main-canvas').screenshot();
    expect(canvasAfter3DClick).not.toEqual(initialCanvasScreenshot);

    // 5. Action: Click the "2D" button again.
    await btn2d.click();
    await page.waitForTimeout(200); // Allow time for canvas switch

    // 6. Assert: The "2D" button regains the "active" class, and the canvas rendering switches back to the 2D cross-section view.
    await expect(btn2d).toHaveClass(/active/);
    const finalCanvasScreenshot = await page.locator('#main-canvas').screenshot();
    expect(finalCanvasScreenshot).toEqual(initialCanvasScreenshot);
  });

  test('3D Perspective Button Interaction', async ({ page }) => {
    // 1. Assert: The "3D" button (#btn-3d) is visible.
    const btn3d = page.locator('#btn-3d');
    await expect(btn3d).toBeVisible();

    // 2. Assert: The "3D" button does not have the "active" class on page load.
    await expect(btn3d).not.toHaveClass(/active/);
    const initialCanvasScreenshot = await page.locator('#main-canvas').screenshot();

    // 3. Action: Click the "3D" button.
    await btn3d.click();
    await page.waitForTimeout(200); // Allow time for canvas switch

    // 4. Assert: The "3D" button gains the "active" class, and the canvas rendering changes from the 2D view to the 3D view.
    await expect(btn3d).toHaveClass(/active/);
    const canvas3DScreenshot = await page.locator('#main-canvas').screenshot();
    expect(canvas3DScreenshot).not.toEqual(initialCanvasScreenshot);

    // 5. Action: Click the "2D" button (#btn-2d).
    const btn2d = page.locator('#btn-2d');
    await btn2d.click();
    await page.waitForTimeout(200); // Allow time for canvas switch

    // 6. Assert: The "3D" button no longer has the "active" class, and the canvas rendering changes back to the 2D view.
    await expect(btn3d).not.toHaveClass(/active/);
    const finalCanvasScreenshot = await page.locator('#main-canvas').screenshot();
    expect(finalCanvasScreenshot).toEqual(initialCanvasScreenshot);
  });
});