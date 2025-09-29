const { test, expect } = require('@playwright/test');

test.describe('Enigmatic Comet Holmes', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/EnigmaticCometHolmes.html');

  test('Initial view with default slider settings', async ({ page }) => {
    await page.goto(fileUrl);

    await page.locator('#slider-earth-position').fill('180');
    await page.locator('#slider-comet-position').fill('180');
    await page.locator('#slider-coma').fill('20');
    await page.locator('#slider-tail').fill('50');
    await page.locator('#slider-tail-spread').fill('20');

    await page.screenshot({ path: './snapshots/EnigmaticCometHolmes-1.png', fullPage: true });
  });

  test('Comet with maximum coma size and no tail', async ({ page }) => {
    await page.goto(fileUrl);

    await page.locator('#slider-earth-position').fill('180');
    await page.locator('#slider-comet-position').fill('180');
    await page.locator('#slider-coma').fill('100');
    await page.locator('#slider-tail').fill('0');
    await page.locator('#slider-tail-spread').fill('20');

    await page.screenshot({ path: './snapshots/EnigmaticCometHolmes-2.png', fullPage: true });
  });

  test('Comet with a long but very narrow tail', async ({ page }) => {
    await page.goto(fileUrl);

    await page.locator('#slider-earth-position').fill('180');
    await page.locator('#slider-comet-position').fill('180');
    await page.locator('#slider-coma').fill('20');
    await page.locator('#slider-tail').fill('50');
    await page.locator('#slider-tail-spread').fill('0');

    await page.screenshot({ path: './snapshots/EnigmaticCometHolmes-3.png', fullPage: true });
  });

  test('Side view of the comet from an alternate Earth position', async ({ page }) => {
    await page.goto(fileUrl);

    await page.locator('#slider-earth-position').fill('0');
    await page.locator('#slider-comet-position').fill('180');
    await page.locator('#slider-coma').fill('20');
    await page.locator('#slider-tail').fill('50');
    await page.locator('#slider-tail-spread').fill('20');

    await page.screenshot({ path: './snapshots/EnigmaticCometHolmes-4.png', fullPage: true });
  });
});