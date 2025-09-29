const { test, expect } = require('@playwright/test');

test.describe('CommonMethodsOfEstimatingTheAreaUnderACurve', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/CommonMethodsOfEstimatingTheAreaUnderACurve.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Default view showing right-hand estimation for the function y=x', async ({ page }) => {
    // Action: Load the page is handled by beforeEach
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/CommonMethodsOfEstimatingTheAreaUnderACurve-1.png', fullPage: true });
  });

  test('Midpoint estimation for sin(x)+1 with 15 quadrilaterals up to a=7.59', async ({ page }) => {
    // Action: Click the button with the text "sin(x)+1" in the "function" control group.
    await page.locator('#function-controls').getByRole('button', { name: 'sin(x)+1' }).click();

    // Action: Click the button with the text "midpoint" in the "type" control group.
    await page.locator('#type-controls').getByRole('button', { name: 'midpoint' }).click();

    // Action: Set the value of the "upper limit a" slider (id slider-a) to 7.59.
    await page.locator('#slider-a').fill('7.59');

    // Action: Set the value of the "number of quadrilaterals" slider (id slider-n) to 15.
    await page.locator('#slider-n').fill('15');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/CommonMethodsOfEstimatingTheAreaUnderACurve-2.png', fullPage: true });
  });

  test('Right-hand estimation for eˣ/³ with 13 quadrilaterals up to a=6.83', async ({ page }) => {
    // Action: Click the button with the text "eˣ/³" in the "function" control group.
    await page.locator('#function-controls').getByRole('button', { name: 'eˣ/³' }).click();

    // Action: Click the button with the text "right" in the "type" control group.
    await page.locator('#type-controls').getByRole('button', { name: 'right' }).click();

    // Action: Set the value of the "upper limit a" slider (id slider-a) to 6.83.
    await page.locator('#slider-a').fill('6.83');

    // Action: Set the value of the "number of quadrilaterals" slider (id slider-n) to 13.
    await page.locator('#slider-n').fill('13');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/CommonMethodsOfEstimatingTheAreaUnderACurve-3.png', fullPage: true });
  });

  test('Trapezoidal estimation for √x with 5 quadrilaterals up to a=3.4', async ({ page }) => {
    // Action: Click the button with the text "√x" in the "function" control group.
    await page.locator('#function-controls').getByRole('button', { name: '√x' }).click();

    // Action: Click the button with the text "trapezoidal" in the "type" control group.
    await page.locator('#type-controls').getByRole('button', { name: 'trapezoidal' }).click();

    // Action: Set the value of the "upper limit a" slider (id slider-a) to 3.4.
    await page.locator('#slider-a').fill('3.4');

    // Action: Set the value of the "number of quadrilaterals" slider (id slider-n) to 5.
    await page.locator('#slider-n').fill('5');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/CommonMethodsOfEstimatingTheAreaUnderACurve-4.png', fullPage: true });
  });
});