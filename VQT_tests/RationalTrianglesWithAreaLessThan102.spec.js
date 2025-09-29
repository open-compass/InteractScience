const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/RationalTrianglesWithAreaLessThan102.html');

test.describe('RationalTrianglesWithAreaLessThan102', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Triangle for congruent number 13', async ({ page }) => {
    await page.locator('#input-area').fill('13');
    await page.screenshot({ path: './snapshots/RationalTrianglesWithAreaLessThan102-1.png', fullPage: true });
  });

  test('"Not a congruent number" message for area 4', async ({ page }) => {
    await page.locator('#input-area').fill('4');
    await page.screenshot({ path: './snapshots/RationalTrianglesWithAreaLessThan102-2.png', fullPage: true });
  });

  test('Triangle for congruent number 5', async ({ page }) => {
    await page.locator('#input-area').fill('5');
    await page.screenshot({ path: './snapshots/RationalTrianglesWithAreaLessThan102-3.png', fullPage: true });
  });

  test('Triangle for congruent number 79 with large side values', async ({ page }) => {
    await page.locator('#input-area').fill('79');
    await page.screenshot({ path: './snapshots/RationalTrianglesWithAreaLessThan102-4.png', fullPage: true });
  });
});