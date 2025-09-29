const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/DecimalMultiplication.html');

test.describe('Decimal Multiplication Interactive', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Method Selection Dropdown', async ({ page }) => {
    // 1. Assert: The method selection dropdown with id `select-method` is visible.
    await expect(page.locator('#select-method')).toBeVisible();

    // 2. Assert: The dropdown's selected value is `estimation`, and the output display shows the steps for the estimation method.
    await expect(page.locator('#select-method')).toHaveValue('estimation');
    await expect(page.locator('#output-display')).toContainText('convert to:');

    // 3. Action: Change the dropdown selection to `place values`.
    await page.locator('#select-method').selectOption('place values');

    // 4. Assert: The content of the output display with id `output-display` changes to show the steps for the "place values" method (e.g., text contains "rewrite as:").
    await expect(page.locator('#output-display')).toContainText('rewrite as:');

    // 5. Action: Change the dropdown selection back to `estimation`.
    await page.locator('#select-method').selectOption('estimation');

    // 6. Assert: The content of the output display changes back to show the steps for the "estimation" method (e.g., text contains "convert to:").
    await expect(page.locator('#output-display')).toContainText('convert to:');
  });

  test('First Number Slider Control', async ({ page }) => {
    // 1. Assert: The "first number" slider with id `slider-num1` is visible.
    await expect(page.locator('#slider-num1')).toBeVisible();

    // 2. Assert: The slider's value is `1.1`, and the output display shows a calculation involving `1.1`.
    await expect(page.locator('#slider-num1')).toHaveValue('1.1');
    await expect(page.locator('#output-display')).toContainText('1.1');

    // 3. Action: Drag the slider to a new value, such as `5.5`.
    await page.locator('#slider-num1').fill('5.5');

    // 4. Assert: The numbers in the calculation shown in the output display update to reflect `5.5`.
    await expect(page.locator('#output-display')).toContainText('5.5');

    // 5. Action: Drag the slider to its maximum value of `20`.
    await page.locator('#slider-num1').fill('20');

    // 6. Assert: The numbers in the calculation shown in the output display update to reflect `20`.
    await expect(page.locator('#output-display')).toContainText('20');
  });

  test("'Integers Only' Toggle Button 'Yes'", async ({ page }) => {
    // 1. Assert: The "yes" button with id `btn-int-yes` is visible.
    await expect(page.locator('#btn-int-yes')).toBeVisible();
    
    // 2. Assert: The `btn-int-yes` button has an "active" style and the `slider-num2` step is `1`.
    await expect(page.locator('#btn-int-yes')).toHaveClass(/active/);
    await expect(page.locator('#slider-num2')).toHaveAttribute('step', '1');

    // 3. Action: Click the `btn-int-no` button.
    await page.locator('#btn-int-no').click();
    
    // 4. Assert: The `btn-int-yes` button now has an "inactive" style and the `slider-num2` step is `0.1`.
    await expect(page.locator('#btn-int-yes')).toHaveClass(/inactive/);
    await expect(page.locator('#slider-num2')).toHaveAttribute('step', '0.1');

    // 5. Action: Click the `btn-int-yes` button again.
    await page.locator('#btn-int-yes').click();

    // 6. Assert: The `btn-int-yes` button returns to its "active" style, and the `slider-num2` step is set back to `1`.
    await expect(page.locator('#btn-int-yes')).toHaveClass(/active/);
    await expect(page.locator('#slider-num2')).toHaveAttribute('step', '1');
  });

  test("'Integers Only' Toggle Button 'No'", async ({ page }) => {
    // 1. Assert: The "no" button with id `btn-int-no` is visible.
    await expect(page.locator('#btn-int-no')).toBeVisible();

    // 2. Assert: The `btn-int-no` button has an "inactive" style.
    await expect(page.locator('#btn-int-no')).toHaveClass(/inactive/);

    // 3. Action: Click the `btn-int-no` button.
    await page.locator('#btn-int-no').click();

    // 4. Assert: The `btn-int-no` button gains an "active" style, and the `slider-num2` step attribute is changed to `0.1`.
    await expect(page.locator('#btn-int-no')).toHaveClass(/active/);
    await expect(page.locator('#slider-num2')).toHaveAttribute('step', '0.1');

    // 5. Action: Click the `btn-int-yes` button.
    await page.locator('#btn-int-yes').click();
    
    // 6. Assert: The `btn-int-no` button returns to its "inactive" style, and the `slider-num2` step attribute changes back to `1`.
    await expect(page.locator('#btn-int-no')).toHaveClass(/inactive/);
    await expect(page.locator('#slider-num2')).toHaveAttribute('step', '1');
  });

  test('Second Number Slider Control', async ({ page }) => {
    // 1. Assert: The "multiply by" slider with id `slider-num2` is visible.
    await expect(page.locator('#slider-num2')).toBeVisible();
    
    // 2. Assert: The slider's value is `2`, and the output display shows a calculation involving `2`.
    await expect(page.locator('#slider-num2')).toHaveValue('2');
    await expect(page.locator('#output-display')).toContainText('× 2');

    // 3. Action: Drag the slider to a new value, such as `10`.
    await page.locator('#slider-num2').fill('10');

    // 4. Assert: The numbers in the calculation shown in the output display update to reflect `10`.
    await expect(page.locator('#output-display')).toContainText('× 10');

    // 5. Action: Click `btn-int-no`, then drag the slider to a decimal value like `6.6`.
    await page.locator('#btn-int-no').click();
    await page.locator('#slider-num2').fill('6.6');

    // 6. Assert: The numbers in the calculation shown in the output display update to reflect `6.6`.
    await expect(page.locator('#output-display')).toContainText('× 6.6');
  });

});