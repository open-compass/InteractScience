const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/OpacityExplorer2D.html');

test.describe('Opacity Explorer 2D', () => {

  test('Default state of the Opacity Explorer', async ({ page }) => {
    await page.goto(fileUrl);
    // 1. Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/OpacityExplorer2D-1.png', fullPage: true });
  });

  test('Circles with a pastel color scheme', async ({ page }) => {
    await page.goto(fileUrl);
    // 1. Action: Set the value of the color picker with id `color-picker1` to `#ffcc66`.
    await page.locator('#color-picker1').fill('#ffcc66');
    // 2. Action: Set the value of the color picker with id `color-picker2` to `#ccff66`.
    await page.locator('#color-picker2').fill('#ccff66');
    // 3. Action: Set the value of the color picker with id `color-picker3` to `#ff9933`.
    await page.locator('#color-picker3').fill('#ff9933');
    // 4. Action: Set the value of the color picker with id `color-picker4` to `#9933cc`.
    await page.locator('#color-picker4').fill('#9933cc');
    // 5. Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/OpacityExplorer2D-2.png', fullPage: true });
  });

  test('Circles with a bright and cool color scheme', async ({ page }) => {
    await page.goto(fileUrl);
    // 1. Action: Set the value of the color picker with id `color-picker1` to `#ff3399`.
    await page.locator('#color-picker1').fill('#ff3399');
    // 2. Action: Set the value of the color picker with id `color-picker2` to `#ffff99`.
    await page.locator('#color-picker2').fill('#ffff99');
    // 3. Action: Set the value of the color picker with id `color-picker3` to `#3366ff`.
    await page.locator('#color-picker3').fill('#3366ff');
    // 4. Action: Set the value of the color picker with id `color-picker4` to `#66ffff`.
    await page.locator('#color-picker4').fill('#66ffff');
    // 5. Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/OpacityExplorer2D-3.png', fullPage: true });
  });

  test('Circles with an earthy and muted color scheme', async ({ page }) => {
    await page.goto(fileUrl);
    // 1. Action: Set the value of the color picker with id `color-picker1` to `#999933`.
    await page.locator('#color-picker1').fill('#999933');
    // 2. Action: Set the value of the color picker with id `color-picker2` to `#330066`.
    await page.locator('#color-picker2').fill('#330066');
    // 3. Action: Set the value of the color picker with id `color-picker3` to `#ff9999`.
    await page.locator('#color-picker3').fill('#ff9999');
    // 4. Action: Set the value of the color picker with id `color-picker4` to `#993300`.
    await page.locator('#color-picker4').fill('#993300');
    // 5. Assert: Take a screenshot of the current UI state
    await page.screenshot({ path: './snapshots/OpacityExplorer2D-4.png', fullPage: true });
  });

});