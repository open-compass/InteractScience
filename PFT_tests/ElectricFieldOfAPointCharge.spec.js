const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ElectricFieldOfAPointCharge.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  await page.waitForTimeout(500);
});

test.describe('Source Charge Slider Interaction', () => {
  test('Source Charge Slider Interaction', async ({ page }) => {
    // Step 1: Assert: The "source charge" slider (#slider-source-charge) is visible.
    const sourceChargeSlider = page.locator('#slider-source-charge');
    await expect(sourceChargeSlider).toBeVisible();

    // Step 2: Assert: The slider's value is 2.0 and its corresponding label (#label-source-charge) displays "2".
    await expect(sourceChargeSlider).toHaveValue('2');
    await expect(page.locator('#label-source-charge')).toHaveText(/^2\.00*$/);
    const initialEMag = await page.locator('#display-E-mag').innerText();

    // Step 3: Action: Drag the "source charge" slider to a new value, e.g., -3.0.
    await sourceChargeSlider.fill('-3');

    // Step 4: Assert: The slider's label updates to "-3.0", the red electric field vector on the canvas flips direction, and the text for |E| in the info panel (#display-E-mag) changes.
    await expect(page.locator('#label-source-charge')).toHaveText(/^\-3\.00*$/);
    await expect(page.locator('#display-E-mag')).not.toHaveText(initialEMag);
    const newEMag = await page.locator('#display-E-mag').innerText();

    // Step 5: Action: Drag the slider to its maximum value of 5.
    await sourceChargeSlider.fill('5');

    // Step 6: Assert: The slider's label updates to "5", and the text for |E| and the electric field vector both change again.
    await expect(page.locator('#label-source-charge')).toHaveText(/^5\.00*$/);
    await expect(page.locator('#display-E-mag')).not.toHaveText(newEMag);
  });
});

test.describe('Test Charge Slider Interaction', () => {
  test('Test Charge Slider Interaction', async ({ page }) => {
    // Step 1: Assert: The "charge" slider (#slider-test-charge) is visible.
    const testChargeSlider = page.locator('#slider-test-charge');
    await expect(testChargeSlider).toBeVisible();

    // Step 2: Assert: The slider's value is -0.0845 and its label (#label-test-charge) displays "-0.0845".
    await expect(testChargeSlider).toHaveValue('-0.0845');
    await expect(page.locator('#label-test-charge')).toHaveText(/^\-0\.08450*$/);

    const initialEMag = await page.locator('#display-E-mag').innerText();
    const initialForce = await page.locator('#display-force').innerText();

    // Step 3: Action: Drag the "charge" slider to a positive value, e.g., 0.115.
    await testChargeSlider.fill('0.115');

    // Step 4: Assert: The slider's label updates, the blue force vector on the canvas flips direction, and the "Electric force" value (#display-force) changes. The red electric field vector remains unchanged.
    await expect(page.locator('#label-test-charge')).toHaveText(/^0\.11500*$/);
    await expect(page.locator('#display-force')).not.toHaveText(initialForce);
    await expect(page.locator('#display-E-mag')).toHaveText(initialEMag);

    // Step 5: Action: Drag the slider to exactly 0.
    await testChargeSlider.fill('0');

    // Step 6: Assert: The slider's label displays "0", the "Electric force" value becomes "0.000 N", and the blue force vector is no longer visible on the canvas.
    await expect(page.locator('#label-test-charge')).toHaveText(/^0\.00000*$/);
    await expect(page.locator('#display-force')).toHaveText('Electric force = 0.000 N');
  });
});

test.describe('Draggable Test Charge Locator Interaction', () => {
  test('Draggable Test Charge Locator Interaction', async ({ page }) => {
    // Step 1: Assert: The black test charge locator circle is visible on the canvas.
    const canvas = page.locator('#canvas-container canvas');
    await expect(canvas).toBeVisible();

    // Step 2: Assert: The initial position display shows `x position = 2.00 m` and `y position = 3.00 m`.
    await expect(page.locator('#display-x-pos')).toHaveText('x position = 2.00 m');
    await expect(page.locator('#display-y-pos')).toHaveText('y position = 3.00 m');

    // Prepare for drag-and-drop
    const canvasBox = await canvas.boundingBox();
    const scaleFactor = 40;
    const canvasWidth = 600;
    const canvasHeight = 500;

    const toCanvasX = (lx) => (canvasWidth / 2) + lx * scaleFactor;
    const toCanvasY = (ly) => (canvasHeight / 2) - ly * scaleFactor;

    const initialLogicalX = 2, initialLogicalY = 3;
    const target1LogicalX = 4, target1LogicalY = 2;

    const startX = canvasBox.x + toCanvasX(initialLogicalX);
    const startY = canvasBox.y + toCanvasY(initialLogicalY);
    const target1X = canvasBox.x + toCanvasX(target1LogicalX);
    const target1Y = canvasBox.y + toCanvasY(target1LogicalY);

    const initialXPosText = await page.locator('#display-x-pos').innerText();
    const initialYPosText = await page.locator('#display-y-pos').innerText();
    const initialEMagText = await page.locator('#display-E-mag').innerText();

    // Step 3: Action: Drag the black locator circle to a new position on the grid, e.g., (4, 2).
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(target1X, target1Y, { steps: 5 });
    await page.mouse.up();

    // Step 4: Assert: The x position and y position displays update. The origin, length, and orientation of both the red and blue vectors change. The |E| display (#display-E-mag) updates.
    await expect(page.locator('#display-x-pos')).not.toHaveText(initialXPosText);
    await expect(page.locator('#display-y-pos')).not.toHaveText(initialYPosText);
    await expect(page.locator('#display-E-mag')).not.toHaveText(initialEMagText);

    // Prepare for second drag
    const target2LogicalX = -5, target2LogicalY = 0;
    const target2X = canvasBox.x + toCanvasX(target2LogicalX);
    const target2Y = canvasBox.y + toCanvasY(target2LogicalY);

    // Step 5: Action: Drag the locator circle to a position on the x-axis, e.g., (-5, 0).
    await page.mouse.move(target1X, target1Y); // Start from previous position
    await page.mouse.down();
    await page.mouse.move(target2X, target2Y, { steps: 10 });
    await page.mouse.up();

    // Step 6: Assert: The y position display shows "0.00 m". The red and blue vectors become horizontal, and the E_y component (#display-Ey) becomes "0.000 N/C".
    await expect(page.locator('#display-y-pos')).toHaveText('y position = 0.00 m');
    await expect(page.locator('#display-Ey')).toHaveText('E y component = 0.000 N/C');
  });
});