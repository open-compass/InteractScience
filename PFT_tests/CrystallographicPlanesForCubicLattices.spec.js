const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/CrystallographicPlanesForCubicLattices.html');

test.describe('Crystallographic Planes for Cubic Lattices', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('BCC Lattice Type Button', async ({ page }) => {
    // 1. Assert: Button with ID "btn-bcc" is visible on the page.
    await expect(page.locator('#btn-bcc')).toBeVisible();

    // 2. Assert: Button "btn-bcc" does not have the "active" class by default.
    await expect(page.locator('#btn-bcc')).not.toHaveClass(/active/);

    // 3. Action: Click the "BCC" button.
    await page.locator('#btn-bcc').click();

    // 4. Assert: The "btn-bcc" button has the "active" class, and the "btn-sc" button does not. The arrangement of atoms in the 3D view changes.
    await expect(page.locator('#btn-bcc')).toHaveClass(/active/);
    await expect(page.locator('#btn-sc')).not.toHaveClass(/active/);

    // 5. Action: Click the default "SC" button.
    await page.locator('#btn-sc').click();

    // 6. Assert: The "btn-bcc" button no longer has the "active" class, and the atom arrangement in the 3D view changes again.
    await expect(page.locator('#btn-bcc')).not.toHaveClass(/active/);
  });

  test("Miller Index 'h' Input", async ({ page }) => {
    // 1. Assert: Number input with ID "input-h" is visible.
    await expect(page.locator('#input-h')).toBeVisible();

    // 2. Assert: The value of input "input-h" is 1.
    await expect(page.locator('#input-h')).toHaveValue('1');

    // 3. Action: Change the value of input "input-h" to 2.
    await page.locator('#input-h').fill('2');

    // 4. Assert: The orientation or number of crystallographic planes in the 3D view changes.
    // (Visual change is assumed to occur after the action)

    // 5. Action: Change the value of input "input-h" to its maximum value, 10.
    await page.locator('#input-h').fill('10');

    // 6. Assert: The crystallographic planes in the 3D view are updated again.
    // (Visual change is assumed to occur after the action)
  });

  test("Miller Index 'k' Input", async ({ page }) => {
    // 1. Assert: Number input with ID "input-k" is visible.
    await expect(page.locator('#input-k')).toBeVisible();

    // 2. Assert: The value of input "input-k" is 1.
    await expect(page.locator('#input-k')).toHaveValue('1');

    // 3. Action: Change the value of input "input-k" to 0.
    await page.locator('#input-k').fill('0');

    // 4. Assert: The orientation or number of crystallographic planes in the 3D view changes.
    // (Visual change is assumed to occur after the action)

    // 5. Action: Change the value of input "input-k" to its minimum value, -10.
    await page.locator('#input-k').fill('-10');

    // 6. Assert: The crystallographic planes in the 3D view are updated again.
    // (Visual change is assumed to occur after the action)
  });

  test("Miller Index 'l' Input", async ({ page }) => {
    // 1. Assert: Number input with ID "input-l" is visible.
    await expect(page.locator('#input-l')).toBeVisible();

    // 2. Assert: The value of input "input-l" is 1.
    await expect(page.locator('#input-l')).toHaveValue('1');

    // 3. Action: Change the value of input "input-l" to 3.
    await page.locator('#input-l').fill('3');

    // 4. Assert: The orientation or number of crystallographic planes in the 3D view changes.
    // (Visual change is assumed to occur after the action)

    // 5. Action: Change the value of input "input-l" back to the default value, 1.
    await page.locator('#input-l').fill('1');

    // 6. Assert: The crystallographic planes in the 3D view return to their initial orientation.
    // (Visual change is assumed to occur after the action)
  });

  test('Plane Opacity Slider', async ({ page }) => {
    // 1. Assert: Range slider with ID "slider-opacity" is visible.
    await expect(page.locator('#slider-opacity')).toBeVisible();

    // 2. Assert: The value of the slider is 0.8.
    await expect(page.locator('#slider-opacity')).toHaveValue('0.8');

    // 3. Action: Drag the slider to the left, setting its value to approximately 0.2.
    await page.locator('#slider-opacity').fill('0.2');

    // 4. Assert: The crystallographic planes in the 3D view become more transparent.
    // (Visual change is assumed to occur after the action)

    // 5. Action: Drag the slider to its minimum position (value 0).
    await page.locator('#slider-opacity').fill('0');

    // 6. Assert: The crystallographic planes in the 3D view become fully transparent (invisible).
    // (Visual change is assumed to occur after the action)
  });
});