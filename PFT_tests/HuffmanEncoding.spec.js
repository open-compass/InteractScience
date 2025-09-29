const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/HuffmanEncoding.html');

test.describe('Huffman Encoding Interactive Visualization', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the canvas to be potentially drawn by p5.js
    // await page.waitForSelector('#canvas-container canvas');
    await page.waitForTimeout(500);
  });

  test('Encoding Example 1 Button', async ({ page }) => {
    // 1. Assert: The button with ID `btn-ex1` is visible.
    const btnEx1 = page.locator('#btn-ex1');
    await expect(btnEx1).toBeVisible();

    // 2. Assert: The button `btn-ex1` does not have an "active" style on page load, as example 2 is the default. The canvas shows the visualization for example 2.
    await expect(btnEx1).not.toHaveClass(/active/);
    const canvas = page.locator('#canvas-container canvas');
    const initialCanvasScreenshot = await canvas.screenshot();

    // 3. Action: Click the button `btn-ex1`.
    await btnEx1.click();

    // 4. Assert: The button `btn-ex1` now has an "active" style, and the canvas visualization has changed.
    await expect(btnEx1).toHaveClass(/active/);
    const canvasAfterClick1 = await canvas.screenshot();
    expect(canvasAfterClick1).not.toEqual(initialCanvasScreenshot);

    // 5. Action: Click the button `btn-ex1` again.
    await btnEx1.click();

    // 6. Assert: The button `btn-ex1` remains in an "active" state, and the canvas visualization does not change.
    await expect(btnEx1).toHaveClass(/active/);
    const canvasAfterClick2 = await canvas.screenshot();
    expect(canvasAfterClick2).toEqual(canvasAfterClick1);
  });

  test('Encoding Example 2 Button', async ({ page }) => {
    const btnEx2 = page.locator('#btn-ex2');
    const btnEx3 = page.locator('#btn-ex3');
    const canvas = page.locator('#canvas-container canvas');

    // 1. Assert: The button with ID `btn-ex2` is visible.
    await expect(btnEx2).toBeVisible();

    // 2. Assert: The button `btn-ex2` has an "active" style on page load, and the canvas displays the visualization for example 2.
    await expect(btnEx2).toHaveClass(/active/);
    const initialCanvasScreenshot = await canvas.screenshot();

    // 3. Action: Click the button `btn-ex3`.
    await btnEx3.click();

    // 4. Assert: The "active" style is removed from `btn-ex2` and applied to `btn-ex3`. The canvas visualization updates to show example 3.
    await expect(btnEx2).not.toHaveClass(/active/);
    await expect(btnEx3).toHaveClass(/active/);
    const canvasEx3Screenshot = await canvas.screenshot();
    expect(canvasEx3Screenshot).not.toEqual(initialCanvasScreenshot);

    // 5. Action: Click the button `btn-ex2` again.
    await btnEx2.click();

    // 6. Assert: The "active" style is removed from `btn-ex3` and re-applied to `btn-ex2`. The canvas visualization changes back to show example 2.
    await expect(btnEx3).not.toHaveClass(/active/);
    await expect(btnEx2).toHaveClass(/active/);
    const canvasBackToEx2Screenshot = await canvas.screenshot();
    expect(canvasBackToEx2Screenshot).toEqual(initialCanvasScreenshot);
  });

  test('Encoding Example 3 Button', async ({ page }) => {
    const btnEx3 = page.locator('#btn-ex3');
    const btnEx4 = page.locator('#btn-ex4');
    const canvas = page.locator('#canvas-container canvas');

    // 1. Assert: The button with ID `btn-ex3` is visible.
    await expect(btnEx3).toBeVisible();

    // 2. Assert: The button `btn-ex3` does not have an "active" style on page load.
    await expect(btnEx3).not.toHaveClass(/active/);
    const initialCanvasScreenshot = await canvas.screenshot();

    // 3. Action: Click the button `btn-ex3`.
    await btnEx3.click();

    // 4. Assert: The button `btn-ex3` now has an "active" style, and the canvas visualization updates to reflect example 3.
    await expect(btnEx3).toHaveClass(/active/);
    const canvasEx3Screenshot = await canvas.screenshot();
    expect(canvasEx3Screenshot).not.toEqual(initialCanvasScreenshot);

    // 5. Action: Click the button `btn-ex4`.
    await btnEx4.click();

    // 6. Assert: The "active" style is removed from `btn-ex3`, and the canvas visualization changes to show example 4.
    await expect(btnEx3).not.toHaveClass(/active/);
    const canvasEx4Screenshot = await canvas.screenshot();
    expect(canvasEx4Screenshot).not.toEqual(canvasEx3Screenshot);
  });

  test('Encoding Example 4 Button', async ({ page }) => {
    const btnEx4 = page.locator('#btn-ex4');
    const btnEx2 = page.locator('#btn-ex2');
    const canvas = page.locator('#canvas-container canvas');

    // 1. Assert: The button with ID `btn-ex4` is visible.
    await expect(btnEx4).toBeVisible();

    // 2. Assert: The button `btn-ex4` does not have an "active" style by default.
    await expect(btnEx4).not.toHaveClass(/active/);
    const defaultCanvasScreenshot = await canvas.screenshot();

    // 3. Action: Click the button `btn-ex4`.
    await btnEx4.click();

    // 4. Assert: The button `btn-ex4` gains the "active" style. The canvas content changes from the default visualization.
    await expect(btnEx4).toHaveClass(/active/);
    const canvasEx4Screenshot = await canvas.screenshot();
    expect(canvasEx4Screenshot).not.toEqual(defaultCanvasScreenshot);

    // 5. Action: Click the default button `btn-ex2`.
    await btnEx2.click();

    // 6. Assert: The "active" style is removed from `btn-ex4`. The canvas content changes back to the default visualization.
    await expect(btnEx4).not.toHaveClass(/active/);
    const canvasBackToDefaultScreenshot = await canvas.screenshot();
    expect(canvasBackToDefaultScreenshot).toEqual(defaultCanvasScreenshot);
  });

  test('Encoding Example 5 Button', async ({ page }) => {
    const btnEx5 = page.locator('#btn-ex5');
    const btnEx1 = page.locator('#btn-ex1');
    const canvas = page.locator('#canvas-container canvas');

    // 1. Assert: The button with ID `btn-ex5` is visible.
    await expect(btnEx5).toBeVisible();

    // 2. Assert: The button `btn-ex5` does not have an "active" style on page load.
    await expect(btnEx5).not.toHaveClass(/active/);
    const initialCanvasScreenshot = await canvas.screenshot();

    // 3. Action: Click the button `btn-ex5`.
    await btnEx5.click();

    // 4. Assert: The button `btn-ex5` now has an "active" style, and the canvas visualization has changed.
    await expect(btnEx5).toHaveClass(/active/);
    const canvasEx5Screenshot = await canvas.screenshot();
    expect(canvasEx5Screenshot).not.toEqual(initialCanvasScreenshot);

    // 5. Action: Click the button `btn-ex1`.
    await btnEx1.click();

    // 6. Assert: The "active" style is removed from `btn-ex5`. The canvas visualization changes to show example 1.
    await expect(btnEx5).not.toHaveClass(/active/);
    const canvasEx1Screenshot = await canvas.screenshot();
    expect(canvasEx1Screenshot).not.toEqual(canvasEx5Screenshot);
  });
});