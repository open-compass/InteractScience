const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/VibrationOfMassesOnAString.html');

test.describe('Vibration of Masses on a String', () => {
  test('Initial state with default parameters.', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-tension').fill('50');
    await page.locator('#slider-x1').fill('0.1');
    await page.locator('#slider-x2').fill('0.1');
    await page.locator('#slider-x3').fill('0');
    await page.locator('#slider-m1').fill('1');
    await page.locator('#slider-m2').fill('1');
    await page.locator('#slider-m3').fill('1');
    await page.screenshot({ path: './snapshots/VibrationOfMassesOnAString-1.png', fullPage: true });
  });

  test('Increased mass for the third oscillator.', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-tension').fill('50');
    await page.locator('#slider-x1').fill('0.1');
    await page.locator('#slider-x2').fill('0.1');
    await page.locator('#slider-x3').fill('0');
    await page.locator('#slider-m1').fill('1');
    await page.locator('#slider-m2').fill('1');
    await page.locator('#slider-m3').fill('2');
    await page.screenshot({ path: './snapshots/VibrationOfMassesOnAString-2.png', fullPage: true });
  });

  test('System with decreased tension.', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-tension').fill('26');
    await page.locator('#slider-x1').fill('0.1');
    await page.locator('#slider-x2').fill('0.1');
    await page.locator('#slider-x3').fill('0');
    await page.locator('#slider-m1').fill('1');
    await page.locator('#slider-m2').fill('1');
    await page.locator('#slider-m3').fill('1');
    await page.screenshot({ path: './snapshots/VibrationOfMassesOnAString-3.png', fullPage: true });
  });

  test('Low tension, high equal masses, and equal positive initial displacements.', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#slider-tension').fill('26');
    await page.locator('#slider-x1').fill('0.1');
    await page.locator('#slider-x2').fill('0.1');
    await page.locator('#slider-x3').fill('0.1');
    await page.locator('#slider-m1').fill('2');
    await page.locator('#slider-m2').fill('2');
    await page.locator('#slider-m3').fill('2');
    await page.screenshot({ path: './snapshots/VibrationOfMassesOnAString-4.png', fullPage: true });
  });
});