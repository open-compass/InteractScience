const { test, expect } = require('@playwright/test');

test.describe('CircularHoleDrilledInACylinder', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/CircularHoleDrilledInACylinder.html');

  test('Default state of the drilled cylinder visualization', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/CircularHoleDrilledInACylinder-1.png', fullPage: true });
  });

  test('Boundary curve only mode with modified parameters', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-cylinder-radius').fill('2.5');
    await page.locator('#slider-drill-radius').fill('1.5');
    await page.locator('#slider-inclination').fill('0.74');
    await page.locator('#slider-rotation').fill('1.83');
    await page.locator('#slider-offset').fill('1.14');
    await page.locator('#checkbox-boundary-only').check();
    await page.screenshot({ path: './snapshots/CircularHoleDrilledInACylinder-2.png', fullPage: true });
  });

  test('Return to the default state after modifications', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-cylinder-radius').fill('2.1');
    await page.locator('#slider-drill-radius').fill('1.35');
    await page.locator('#slider-inclination').fill('0.76');
    await page.locator('#slider-rotation').fill('0.9');
    await page.locator('#slider-offset').fill('-0.92');
    await page.locator('#checkbox-boundary-only').click();
    await page.screenshot({ path: './snapshots/CircularHoleDrilledInACylinder-3.png', fullPage: true });
  });

  test('Larger drill hole with negative rotation and offset', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-cylinder-radius').fill('2.5');
    await page.locator('#slider-drill-radius').fill('1.5');
    await page.locator('#slider-rotation').fill('-0.42');
    await page.locator('#slider-offset').fill('-1.0');
    await page.screenshot({ path: './snapshots/CircularHoleDrilledInACylinder-4.png', fullPage: true });
  });
});