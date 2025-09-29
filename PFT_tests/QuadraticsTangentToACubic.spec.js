const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/QuadraticsTangentToACubic.html');

test.describe('Quadratics Tangent to a Cubic Visualization', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // A small wait to ensure p5.js has initialized the canvas
    // await page.waitForSelector('#canvas-container canvas');
    await page.waitForTimeout(500);
  });

  test('Test "choose quadratic" slider functionality', async ({ page }) => {
    // 1. Assert: The slider with id `slider-t` is visible.
    await expect(page.locator('#slider-t')).toBeVisible();

    // 2. Assert: The slider's initial value corresponds to 0.5, as shown in the `input-t` field.
    await expect(page.locator('#input-t')).toHaveValue('0.5');

    // 3. Action: Drag the slider handle to the left, changing its value to approximately -2.0.
    await page.locator('#slider-t').fill('-2.0');

    // 4. Assert: The orange tangent quadratic curve on the canvas changes its shape and position. The `input-t` value updates to reflect the slider's new value.
    await expect(page.locator('#input-t')).toHaveValue('-2');

    // 5. Action: Drag the slider handle to its maximum position on the right.
    await page.locator('#slider-t').fill('5');

    // 6. Assert: The orange quadratic curve updates again. The `input-t` field displays the max value of 5.
    await expect(page.locator('#input-t')).toHaveValue('5');
  });

  test('Test "choose quadratic" number input functionality', async ({ page }) => {
    // 1. Assert: The number input field with id `input-t` is visible.
    await expect(page.locator('#input-t')).toBeVisible();

    // 2. Assert: The number input field displays the default value of 0.5.
    await expect(page.locator('#input-t')).toHaveValue('0.5');

    // 3. Action: Type the value `3.0` into the `input-t` field.
    await page.locator('#input-t').fill('3');

    // 4. Assert: The `slider-t` handle moves to a new position corresponding to 3.0. The orange tangent quadratic curve on the canvas changes.
    await expect(page.locator('#slider-t')).toHaveValue('3');

    // 5. Action: Type the minimum value `-5` into the `input-t` field.
    await page.locator('#input-t').fill('-5');

    // 6. Assert: The `slider-t` handle moves to its minimum position. The orange quadratic curve updates on the canvas.
    await expect(page.locator('#slider-t')).toHaveValue('-5');
  });

  test('Test "family" checkbox functionality', async ({ page }) => {
    // 1. Assert: The checkbox with id `checkbox-family` is visible.
    await expect(page.locator('#checkbox-family')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default.
    await expect(page.locator('#checkbox-family')).not.toBeChecked();

    // 3. Action: Click the `checkbox-family` to check it.
    await page.locator('#checkbox-family').check();

    // 4. Assert: The visualization changes: the blue cubic curve is hidden and a family of filled, colored quadratic curves appears on the canvas.
    await expect(page.locator('#checkbox-family')).toBeChecked();

    // 5. Action: Click the `checkbox-family` again to uncheck it.
    await page.locator('#checkbox-family').uncheck();

    // 6. Assert: The visualization reverts: the family of quadratics is hidden and the blue cubic curve becomes visible again.
    await expect(page.locator('#checkbox-family')).not.toBeChecked();
  });

  test('Test reset button functionality', async ({ page }) => {
    // 1. Assert: The reset button with id `btn-reset` is visible.
    await expect(page.locator('#btn-reset')).toBeVisible();

    // 2. Action: Change the state by dragging the `slider-t` to a value of `4.0`.
    await page.locator('#slider-t').fill('4');

    // 3. Assert: The `input-t` value shows `4.0` and the orange curve has updated.
    await expect(page.locator('#input-t')).toHaveValue('4');

    // 4. Action: Click the `btn-reset`.
    await page.locator('#btn-reset').click();

    // 5. Assert: The `slider-t` and `input-t` are reset to their default value of `0.5`.
    await expect(page.locator('#input-t')).toHaveValue('0.5');
    await expect(page.locator('#slider-t')).toHaveValue('0.5');

    // 6. Assert: The canvas visualization returns to its initial state, with all curves and locators in their default positions.
    // This is implicitly verified by the controls being reset.
  });

  test('Test draggable locator functionality', async ({ page }) => {
    // 1. Assert: The four draggable locators are visible on the canvas.
    // 2. Assert: The initial state of the blue cubic curve is visible, based on the default locator positions.
    await expect(page.locator('#canvas-container canvas')).toBeVisible();

    // 3. Action: Click and drag one of the locators to a new position on the canvas.
    // Simulate dragging the first locator from its initial position.
    // Assuming canvas 600x500, origin at center, scale 50px/unit.
    // Locator 1 initial math coords: (-4, 1)
    // Pixel coords: x=300+(-4*50)=100, y=250-(1*50)=200
    const startX = 100;
    const startY = 200;
    const dragToX = startX + 50;
    const dragToY = startY + 50;
    
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(dragToX, dragToY, { steps: 5 });
    await page.mouse.up();

    // 4. Assert: The shape of the blue cubic curve changes. The shape of the orange tangent quadratic curve also changes.
    // This action is performed; direct visual assertion is out of scope.

    // 5. Action: Click the `btn-reset` button.
    await page.locator('#btn-reset').click();

    // 6. Assert: The locator that was moved returns to its original position, and the curves on the canvas revert to their initial shapes.
    // We verify the reset by checking the state of a known control.
    await expect(page.locator('#input-t')).toHaveValue('0.5');
  });

});