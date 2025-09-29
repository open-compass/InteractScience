const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SylvestersPostageStampProblem.html');

test.describe("Sylvester's Postage Stamp Problem", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Information Toggle Button', async ({ page }) => {
    // 1. Assert: The info-toggle button (`#info-toggle`) with a "+" is visible.
    await expect(page.locator('#info-toggle')).toBeVisible();
    await expect(page.locator('#info-toggle')).toHaveText('+');

    // 2. Assert: The description content (`#info-content`) is hidden.
    await expect(page.locator('#info-content')).toBeHidden();

    // 3. Action: Click the `#info-toggle` button.
    await page.locator('#info-toggle').click();

    // 4. Assert: The button's text changes to "-" and the `#info-content` container becomes visible.
    await expect(page.locator('#info-toggle')).toHaveText('-');
    await expect(page.locator('#info-content')).toBeVisible();

    // 5. Action: Click the `#info-toggle` button again.
    await page.locator('#info-toggle').click();

    // 6. Assert: The button's text changes back to "+" and the `#info-content` container is hidden.
    await expect(page.locator('#info-toggle')).toHaveText('+');
    await expect(page.locator('#info-content')).toBeHidden();
  });

  test('Visualization Mode Checkbox (dots/numbers)', async ({ page }) => {
    // 1. Assert: The mode checkbox (`#checkbox-mode`) is visible.
    await expect(page.locator('#checkbox-mode')).toBeVisible();

    // 2. Assert: The checkbox is checked by default, and the canvas shows a grid of dots.
    await expect(page.locator('#checkbox-mode')).toBeChecked();
    // Canvas content assertion is visual and cannot be tested directly here.

    // 3. Action: Uncheck the `#checkbox-mode` checkbox.
    await page.locator('#checkbox-mode').uncheck();

    // 4. Assert: The canvas content changes from dots to a grid of numbers.
    await expect(page.locator('#checkbox-mode')).not.toBeChecked();
    // Canvas content assertion is visual and cannot be tested directly here.

    // 5. Action: Check the `#checkbox-mode` checkbox again.
    await page.locator('#checkbox-mode').check();

    // 6. Assert: The canvas content reverts to showing a grid of dots.
    await expect(page.locator('#checkbox-mode')).toBeChecked();
    // Canvas content assertion is visual and cannot be tested directly here.
  });

  test('Display Mode Checkbox (highest nonsolvable / current equation)', async ({ page }) => {
    // 1. Assert: The display checkbox (`#checkbox-display`) is visible.
    await expect(page.locator('#checkbox-display')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default, and the `c` slider (`#slider-c`) is enabled.
    await expect(page.locator('#checkbox-display')).not.toBeChecked();
    await expect(page.locator('#slider-c')).toBeEnabled();

    // 3. Action: Check the `#checkbox-display` checkbox.
    await page.locator('#checkbox-display').check();

    // 4. Assert: The `c` slider (`#slider-c`) and its value display (`#display-c`) are disabled, and the equation text (`#equation-text`) updates to show the Frobenius number formula.
    await expect(page.locator('#slider-c')).toBeDisabled();
    // The spec says `#display-c` is disabled, but span elements don't have a disabled attribute. We assert the slider's state.
    await expect(page.locator('#equation-text')).toContainText('F = a*b - a - b');

    // 5. Action: Uncheck the `#checkbox-display` checkbox.
    await page.locator('#checkbox-display').uncheck();

    // 6. Assert: The `c` slider (`#slider-c`) and its value display (`#display-c`) are enabled, and the equation text (`#equation-text`) reverts to showing the current equation.
    await expect(page.locator('#slider-c')).toBeEnabled();
    await expect(page.locator('#equation-text')).toContainText('Current equation:');
  });

  test("Coefficient 'a' Number Input", async ({ page }) => {
    // 1. Assert: The number input for 'a' (`#input-a`) is visible.
    await expect(page.locator('#input-a')).toBeVisible();

    // 2. Assert: The input's value is 7.
    await expect(page.locator('#input-a')).toHaveValue('7');

    // 3. Action: Change the value of `#input-a` to 5.
    await page.locator('#input-a').fill('5');

    // 4. Assert: The equation text (`#equation-text`) and the canvas visualization update to reflect a=5.
    await expect(page.locator('#equation-text')).toContainText('5 x + 8 y = 24');
    // Canvas content assertion is visual and cannot be tested directly here.

    // 5. Action: Change the value of `#input-a` to 6 (which is not coprime with the default b=8).
    await page.locator('#input-a').fill('6');

    // 6. Assert: An error message "Numbers a and b should be coprime!" appears in `#equation-text`, and the canvas is cleared.
    await expect(page.locator('#equation-text')).toHaveText('Numbers a and b should be coprime!');
    // Canvas content assertion is visual and cannot be tested directly here.
  });

  test("Coefficient 'b' Number Input", async ({ page }) => {
    // 1. Assert: The number input for 'b' (`#input-b`) is visible.
    await expect(page.locator('#input-b')).toBeVisible();

    // 2. Assert: The input's value is 8.
    await expect(page.locator('#input-b')).toHaveValue('8');

    // 3. Action: Change the value of `#input-b` to 5.
    await page.locator('#input-b').fill('5');

    // 4. Assert: The equation text (`#equation-text`) and the canvas visualization update to reflect b=5.
    await expect(page.locator('#equation-text')).toContainText('7 x + 5 y = 24');
    // Canvas content assertion is visual and cannot be tested directly here.

    // 5. Action: Change the value of `#input-b` to 14 (which is not coprime with the default a=7).
    await page.locator('#input-b').fill('14');

    // 6. Assert: An error message "Numbers a and b should be coprime!" appears in `#equation-text`, and the canvas is cleared.
    await expect(page.locator('#equation-text')).toHaveText('Numbers a and b should be coprime!');
    // Canvas content assertion is visual and cannot be tested directly here.
  });

  test("Constant 'c' Range Slider", async ({ page }) => {
    // 1. Assert: The slider for 'c' (`#slider-c`) is visible.
    await expect(page.locator('#slider-c')).toBeVisible();

    // 2. Assert: The slider's value is 24, and the value display (`#display-c`) shows "24".
    await expect(page.locator('#slider-c')).toHaveValue('24');
    await expect(page.locator('#display-c')).toHaveText('24');

    // 3. Action: Drag the slider to a new value, such as 35.
    await page.locator('#slider-c').fill('35');

    // 4. Assert: The value display (`#display-c`) and the equation text (`#equation-text`) update to 35, and the red line on the canvas moves.
    await expect(page.locator('#display-c')).toHaveText('35');
    await expect(page.locator('#equation-text')).toContainText('7 x + 8 y = 35');
    // Canvas content assertion is visual and cannot be tested directly here.

    // 5. Action: Drag the slider to its maximum value.
    const max = await page.locator('#slider-c').getAttribute('max');
    await page.locator('#slider-c').fill(max);

    // 6. Assert: The value display (`#display-c`) shows the new maximum value, and the canvas visualization updates accordingly.
    await expect(page.locator('#display-c')).toHaveText(max);
    // Canvas content assertion is visual and cannot be tested directly here.
  });
});