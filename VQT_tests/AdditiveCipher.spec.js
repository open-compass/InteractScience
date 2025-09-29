const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/AdditiveCipher.html');

test.describe('Additive Cipher Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with default shift and text', async ({ page }) => {
    await page.screenshot({ path: './snapshots/AdditiveCipher-1.png', fullPage: true });
  });

  test('State with a shift of 4 and a long phrase', async ({ page }) => {
    await page.locator('#shift-slider').fill('4');
    // .fill() clears the input before typing, combining the two steps
    await page.locator('#text-input').fill('the quick brown fox jumped over the lazy dog');
    await page.screenshot({ path: './snapshots/AdditiveCipher-2.png', fullPage: true });
  });

  test('State with a maximum shift of 25 and "test phrase"', async ({ page }) => {
    await page.locator('#shift-slider').fill('25');
    await page.locator('#text-input').fill('test phrase');
    await page.screenshot({ path: './snapshots/AdditiveCipher-3.png', fullPage: true });
  });

  test('State with a shift of 13 and "to be or not to be"', async ({ page }) => {
    await page.locator('#shift-slider').fill('13');
    await page.locator('#text-input').fill('to be or not to be');
    await page.screenshot({ path: './snapshots/AdditiveCipher-4.png', fullPage: true });
  });
});