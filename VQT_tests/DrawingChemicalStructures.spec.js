const { test, expect } = require('@playwright/test');

test.describe('Drawing Chemical Structures', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/DrawingChemicalStructures.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Displaying the Water structure', async ({ page }) => {
    await page.locator('#select-structure').selectOption({ value: 'water' });
    await page.locator('#btn-add').click();
    await page.screenshot({ path: './snapshots/DrawingChemicalStructures-1.png', fullPage: true });
  });

  test('Displaying the Cyclopropyl-ethane structure', async ({ page }) => {
    await page.locator('#select-structure').selectOption({ value: 'cyclopropyl_ethane' });
    await page.locator('#btn-add').click();
    await page.screenshot({ path: './snapshots/DrawingChemicalStructures-2.png', fullPage: true });
  });

  test('Displaying the Borazine structure', async ({ page }) => {
    await page.locator('#select-structure').selectOption({ value: 'borazine' });
    await page.locator('#btn-add').click();
    await page.screenshot({ path: './snapshots/DrawingChemicalStructures-3.png', fullPage: true });
  });

  test('Displaying the Isopropylamine structure', async ({ page }) => {
    await page.locator('#select-structure').selectOption({ value: 'isopropylamine' });
    await page.locator('#btn-add').click();
    await page.screenshot({ path: './snapshots/DrawingChemicalStructures-4.png', fullPage: true });
  });
});