const { test, expect } = require('@playwright/test');

test.describe('DecimalMultiplication', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/DecimalMultiplication.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Default state with estimation method', async ({ page }) => {
    await page.screenshot({ path: './snapshots/DecimalMultiplication-1.png', fullPage: true });
  });

  test('Place values method with two decimal numbers', async ({ page }) => {
    await page.locator('#select-method').selectOption('place values');
    await page.locator('#btn-int-no').click();
    await page.locator('#slider-num1').fill('16.1');
    await page.locator('#slider-num2').fill('1.5');
    await page.screenshot({ path: './snapshots/DecimalMultiplication-2.png', fullPage: true });
  });

  test('Estimation method with an integer and a decimal number', async ({ page }) => {
    await page.locator('#select-method').selectOption('estimation');
    await page.locator('#btn-int-no').click();
    await page.locator('#slider-num1').fill('15');
    await page.locator('#slider-num2').fill('6.6');
    await page.screenshot({ path: './snapshots/DecimalMultiplication-3.png', fullPage: true });
  });

  test('Place values method with two integer numbers', async ({ page }) => {
    await page.locator('#select-method').selectOption('place values');
    await page.locator('#btn-int-yes').click();
    await page.locator('#slider-num1').fill('3');
    await page.locator('#slider-num2').fill('10');
    await page.screenshot({ path: './snapshots/DecimalMultiplication-4.png', fullPage: true });
  });
});