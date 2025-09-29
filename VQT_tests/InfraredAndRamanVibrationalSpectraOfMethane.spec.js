const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/InfraredAndRamanVibrationalSpectraOfMethane.html');

test.describe('Infrared and Raman Vibrational Spectra of Methane', () => {

  test('Initial view showing symmetric stretch mode', async ({ page }) => {
    await page.goto(fileUrl);
    await page.screenshot({ path: './snapshots/InfraredAndRamanVibrationalSpectraOfMethane-1.png', fullPage: true });
  });

  test('View showing stretch (triply degenerate) mode selected', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#select-vibration-mode').selectOption({ label: 'stretch (triply degenerate)' });
    await page.screenshot({ path: './snapshots/InfraredAndRamanVibrationalSpectraOfMethane-2.png', fullPage: true });
  });

  test('View showing stretch (triply degenerate) mode selected (static)', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#select-vibration-mode').selectOption({ label: 'stretch (triply degenerate)' });
    await page.screenshot({ path: './snapshots/InfraredAndRamanVibrationalSpectraOfMethane-3.png', fullPage: true });
  });

  test('View showing the IR spectrum plot', async ({ page }) => {
    await page.goto(fileUrl);
    await page.locator('#select-vibration-mode').selectOption({ label: 'IR spectrum' });
    await page.screenshot({ path: './snapshots/InfraredAndRamanVibrationalSpectraOfMethane-4.png', fullPage: true });
  });

});