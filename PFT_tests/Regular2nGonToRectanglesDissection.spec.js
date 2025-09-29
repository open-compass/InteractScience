const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/Regular2nGonToRectanglesDissection.html');

test.describe('Regular 2n-Gon to Rectangles Dissection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Test n=3 Button', async ({ page }) => {
    const btn3 = page.locator('#btn-n-3');
    const btn6 = page.locator('#btn-n-6');
    const nDisplay = page.locator('#n-display');
    const canvas = page.locator('#canvas-container canvas');

    await expect(btn3).toBeVisible();
    await expect(btn3).toHaveText('3');

    await expect(btn3).not.toHaveClass(/active/);
    await expect(nDisplay).toHaveText('6');
    await expect(btn6).toHaveClass(/active/);

    const initialScreenshot = await canvas.screenshot();
    await btn3.click();

    await expect(nDisplay).toHaveText('3');
    await expect(btn3).toHaveClass(/active/);
    await expect(canvas).not.toHaveScreenshot(initialScreenshot);

    const n3Screenshot = await canvas.screenshot();
    await btn6.click();

    await expect(nDisplay).toHaveText('6');
    await expect(btn3).not.toHaveClass(/active/);
    await expect(canvas).not.toHaveScreenshot(n3Screenshot);
  });

  test('Test n=4 Button', async ({ page }) => {
    const btn4 = page.locator('#btn-n-4');
    const btn3 = page.locator('#btn-n-3');
    const nDisplay = page.locator('#n-display');
    const canvas = page.locator('#canvas-container canvas');

    await expect(btn4).toBeVisible();
    await expect(btn4).toHaveText('4');

    await expect(btn4).not.toHaveClass(/active/);
    await expect(nDisplay).toHaveText('6');

    const initialScreenshot = await canvas.screenshot();
    await btn4.click();

    await expect(nDisplay).toHaveText('4');
    await expect(btn4).toHaveClass(/active/);
    await expect(canvas).not.toHaveScreenshot(initialScreenshot);

    const n4Screenshot = await canvas.screenshot();
    await btn3.click();

    await expect(nDisplay).toHaveText('3');
    await expect(btn4).not.toHaveClass(/active/);
    await expect(canvas).not.toHaveScreenshot(n4Screenshot);
  });

  test('Test n=5 Button', async ({ page }) => {
    const btn5 = page.locator('#btn-n-5');
    const btn10 = page.locator('#btn-n-10');
    const nDisplay = page.locator('#n-display');
    const canvas = page.locator('#canvas-container canvas');

    await expect(btn5).toBeVisible();
    await expect(btn5).toHaveText('5');

    await expect(btn5).not.toHaveClass(/active/);
    await expect(nDisplay).toHaveText('6');

    const initialScreenshot = await canvas.screenshot();
    await btn5.click();

    await expect(nDisplay).toHaveText('5');
    await expect(btn5).toHaveClass(/active/);
    await expect(canvas).not.toHaveScreenshot(initialScreenshot);

    const n5Screenshot = await canvas.screenshot();
    await btn10.click();

    await expect(nDisplay).toHaveText('10');
    await expect(btn5).not.toHaveClass(/active/);
    await expect(canvas).not.toHaveScreenshot(n5Screenshot);
  });

  test('Test n=6 (Default) Button', async ({ page }) => {
    const btn6 = page.locator('#btn-n-6');
    const btn7 = page.locator('#btn-n-7');
    const nDisplay = page.locator('#n-display');
    const canvas = page.locator('#canvas-container canvas');

    await expect(btn6).toBeVisible();
    await expect(btn6).toHaveText('6');

    await expect(btn6).toHaveClass(/active/);
    await expect(nDisplay).toHaveText('6');

    const initialScreenshot = await canvas.screenshot();
    await btn7.click();

    await expect(nDisplay).toHaveText('7');
    await expect(btn6).not.toHaveClass(/active/);
    await expect(canvas).not.toHaveScreenshot(initialScreenshot);

    const n7Screenshot = await canvas.screenshot();
    await btn6.click();

    await expect(nDisplay).toHaveText('6');
    await expect(btn6).toHaveClass(/active/);
    await expect(canvas).not.toHaveScreenshot(n7Screenshot);
  });

  test('Test n=7 Button', async ({ page }) => {
    const btn7 = page.locator('#btn-n-7');
    const btn8 = page.locator('#btn-n-8');
    const nDisplay = page.locator('#n-display');
    const canvas = page.locator('#canvas-container canvas');

    await expect(btn7).toBeVisible();
    await expect(btn7).toHaveText('7');

    await expect(btn7).not.toHaveClass(/active/);
    await expect(nDisplay).toHaveText('6');

    const initialScreenshot = await canvas.screenshot();
    await btn7.click();

    await expect(nDisplay).toHaveText('7');
    await expect(btn7).toHaveClass(/active/);
    await expect(canvas).not.toHaveScreenshot(initialScreenshot);

    const n7Screenshot = await canvas.screenshot();
    await btn8.click();

    await expect(nDisplay).toHaveText('8');
    await expect(btn7).not.toHaveClass(/active/);
    await expect(canvas).not.toHaveScreenshot(n7Screenshot);
  });

  test('Test n=8 Button', async ({ page }) => {
    const btn8 = page.locator('#btn-n-8');
    const btn6 = page.locator('#btn-n-6');
    const nDisplay = page.locator('#n-display');
    const canvas = page.locator('#canvas-container canvas');

    await expect(btn8).toBeVisible();
    await expect(btn8).toHaveText('8');

    await expect(btn8).not.toHaveClass(/active/);
    await expect(nDisplay).toHaveText('6');

    const initialScreenshot = await canvas.screenshot();
    await btn8.click();

    await expect(nDisplay).toHaveText('8');
    await expect(btn8).toHaveClass(/active/);
    await expect(canvas).not.toHaveScreenshot(initialScreenshot);

    const n8Screenshot = await canvas.screenshot();
    await btn6.click();

    await expect(nDisplay).toHaveText('6');
    await expect(btn8).not.toHaveClass(/active/);
    await expect(canvas).not.toHaveScreenshot(n8Screenshot);
  });

  test('Test n=9 Button', async ({ page }) => {
    const btn9 = page.locator('#btn-n-9');
    const btn3 = page.locator('#btn-n-3');
    const nDisplay = page.locator('#n-display');
    const canvas = page.locator('#canvas-container canvas');

    await expect(btn9).toBeVisible();
    await expect(btn9).toHaveText('9');

    await expect(btn9).not.toHaveClass(/active/);
    await expect(nDisplay).toHaveText('6');

    const initialScreenshot = await canvas.screenshot();
    await btn9.click();

    await expect(nDisplay).toHaveText('9');
    await expect(btn9).toHaveClass(/active/);
    await expect(canvas).not.toHaveScreenshot(initialScreenshot);

    const n9Screenshot = await canvas.screenshot();
    await btn3.click();

    await expect(nDisplay).toHaveText('3');
    await expect(btn9).not.toHaveClass(/active/);
    await expect(canvas).not.toHaveScreenshot(n9Screenshot);
  });

  test('Test n=10 Button', async ({ page }) => {
    const btn10 = page.locator('#btn-n-10');
    const btn6 = page.locator('#btn-n-6');
    const nDisplay = page.locator('#n-display');
    const canvas = page.locator('#canvas-container canvas');

    await expect(btn10).toBeVisible();
    await expect(btn10).toHaveText('10');

    await expect(btn10).not.toHaveClass(/active/);
    await expect(nDisplay).toHaveText('6');

    const initialScreenshot = await canvas.screenshot();
    await btn10.click();

    await expect(nDisplay).toHaveText('10');
    await expect(btn10).toHaveClass(/active/);
    await expect(canvas).not.toHaveScreenshot(initialScreenshot);

    const n10Screenshot = await canvas.screenshot();
    await btn6.click();

    await expect(nDisplay).toHaveText('6');
    await expect(btn10).not.toHaveClass(/active/);
    await expect(canvas).not.toHaveScreenshot(n10Screenshot);
  });
});