const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SelfishBinaryHalfrangeAutomatonCycles2D.html');

test.describe('Selfish Binary Halfrange Automaton Cycles 2D', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Initialization Slider', async ({ page }) => {
    // 1. Assert: The "initialization" slider (#slider-initialization) is visible.
    await expect(page.locator('#slider-initialization')).toBeVisible();

    // 2. Assert: The slider's default value is 462, the label span#value-initialization displays "+ 462", and the info text p#info-text contains "initial condition 462".
    await expect(page.locator('#slider-initialization')).toHaveValue('462');
    await expect(page.locator('#value-initialization')).toHaveText('+ 462');
    await expect(page.locator('#info-text')).toContainText('initial condition 462');

    // 3. Action: Drag the slider to a new value, such as 22712.
    await page.locator('#slider-initialization').fill('22712');

    // 4. Assert: The label span#value-initialization updates to "+ 22712", the p#info-text updates to contain "initial condition 22712", and the automaton path on the canvas redraws.
    await expect(page.locator('#value-initialization')).toHaveText('+ 22712');
    await expect(page.locator('#info-text')).toContainText('initial condition 22712');

    // 5. Action: Drag the slider to its maximum value (65535).
    await page.locator('#slider-initialization').fill('65535');

    // 6. Assert: The label span#value-initialization updates to "+ 65535", the p#info-text updates to contain "initial condition 65535", and the automaton path on the canvas redraws.
    await expect(page.locator('#value-initialization')).toHaveText('+ 65535');
    await expect(page.locator('#info-text')).toContainText('initial condition 65535');
  });

  test('Max Steps Slider', async ({ page }) => {
    // 1. Assert: The "max steps" slider (#slider-max-steps) is visible.
    await expect(page.locator('#slider-max-steps')).toBeVisible();

    // 2. Assert: The slider's default value is 9, and its corresponding label span#value-max-steps displays "+ 9".
    await expect(page.locator('#slider-max-steps')).toHaveValue('9');
    await expect(page.locator('#value-max-steps')).toHaveText('+ 9');

    // 3. Action: Drag the slider to a new value, such as 25.
    await page.locator('#slider-max-steps').fill('25');

    // 4. Assert: The label span#value-max-steps updates to "+ 25", the p#info-text updates to mention "26 steps", and the automaton path on the canvas changes.
    await expect(page.locator('#value-max-steps')).toHaveText('+ 25');
    await expect(page.locator('#info-text')).toContainText('26 steps');

    // 5. Action: Drag the slider to its minimum value (1).
    await page.locator('#slider-max-steps').fill('1');

    // 6. Assert: The label span#value-max-steps updates to "+ 1", the p#info-text updates to mention "2 steps", and the automaton path on the canvas changes.
    await expect(page.locator('#value-max-steps')).toHaveText('+ 1');
    await expect(page.locator('#info-text')).toContainText('2 steps');
  });

  test('Length 4 Cycle Checkbox', async ({ page }) => {
    // 1. Assert: The "length 4 cycle" checkbox (#checkbox-cycle4) is visible.
    await expect(page.locator('#checkbox-cycle4')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default.
    await expect(page.locator('#checkbox-cycle4')).not.toBeChecked();

    // 3. Action: Click the checkbox to check it.
    await page.locator('#checkbox-cycle4').check();

    // 4. Assert: The checkbox becomes checked, and an orange rectangle with green lines appears on the canvas.
    await expect(page.locator('#checkbox-cycle4')).toBeChecked();

    // 5. Action: Click the checkbox again to uncheck it.
    await page.locator('#checkbox-cycle4').uncheck();

    // 6. Assert: The checkbox becomes unchecked, and the orange rectangle and green lines disappear from the canvas.
    await expect(page.locator('#checkbox-cycle4')).not.toBeChecked();
  });

  test('Length 2 Cycles Checkbox', async ({ page }) => {
    // 1. Assert: The "length 2 cycles" checkbox (#checkbox-cycle2) is visible.
    await expect(page.locator('#checkbox-cycle2')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default.
    await expect(page.locator('#checkbox-cycle2')).not.toBeChecked();

    // 3. Action: Click the checkbox to check it.
    await page.locator('#checkbox-cycle2').check();

    // 4. Assert: The checkbox becomes checked, and a set of green lines appears on the canvas.
    await expect(page.locator('#checkbox-cycle2')).toBeChecked();

    // 5. Action: Click the checkbox again to uncheck it.
    await page.locator('#checkbox-cycle2').uncheck();

    // 6. Assert: The checkbox becomes unchecked, and the green lines disappear from the canvas.
    await expect(page.locator('#checkbox-cycle2')).not.toBeChecked();
  });

  test('Length 1 Cycle Points Checkbox', async ({ page }) => {
    // 1. Assert: The "length 1 cycle points" checkbox (#checkbox-cycle1) is visible.
    await expect(page.locator('#checkbox-cycle1')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default.
    await expect(page.locator('#checkbox-cycle1')).not.toBeChecked();

    // 3. Action: Click the checkbox to check it.
    await page.locator('#checkbox-cycle1').check();

    // 4. Assert: The checkbox becomes checked, and a set of cyan dots appears on the canvas.
    await expect(page.locator('#checkbox-cycle1')).toBeChecked();

    // 5. Action: Click the checkbox again to uncheck it.
    await page.locator('#checkbox-cycle1').uncheck();

    // 6. Assert: The checkbox becomes unchecked, and the cyan dots disappear from the canvas.
    await expect(page.locator('#checkbox-cycle1')).not.toBeChecked();
  });

  test('All Map Points Checkbox', async ({ page }) => {
    // 1. Assert: The "all map points" checkbox (#checkbox-all-points) is visible.
    await expect(page.locator('#checkbox-all-points')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default.
    await expect(page.locator('#checkbox-all-points')).not.toBeChecked();

    // 3. Action: Click the checkbox to check it.
    await page.locator('#checkbox-all-points').check();

    // 4. Assert: The checkbox becomes checked, and a background pattern of gray points appears on the canvas.
    await expect(page.locator('#checkbox-all-points')).toBeChecked();

    // 5. Action: Click the checkbox again to uncheck it.
    await page.locator('#checkbox-all-points').uncheck();

    // 6. Assert: The checkbox becomes unchecked, and the background pattern of gray points disappears from the canvas.
    await expect(page.locator('#checkbox-all-points')).not.toBeChecked();
  });

  test('Modify Initialization Checkbox', async ({ page }) => {
    // 1. Assert: The "modify initialization" checkbox (#checkbox-modify) is visible.
    await expect(page.locator('#checkbox-modify')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default.
    await expect(page.locator('#checkbox-modify')).not.toBeChecked();

    // 3. Action: Click the checkbox to check it.
    await page.locator('#checkbox-modify').check();

    // 4. Assert: The checkbox's internal state changes to checked.
    await expect(page.locator('#checkbox-modify')).toBeChecked();

    // 5. Action: Click the checkbox again to uncheck it.
    await page.locator('#checkbox-modify').uncheck();

    // 6. Assert: The checkbox's internal state changes to unchecked.
    await expect(page.locator('#checkbox-modify')).not.toBeChecked();
  });

});