const { test, expect } = require('@playwright/test');

test.describe('Chemical Bonding and Electron Density in H2', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ChemicalBondingAndElectronDensityInH2.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with R at minimum value (0.001 Å)', async ({ page }) => {
    await page.locator('#slider-r').fill('0.001');
    await page.screenshot({ path: './snapshots/ChemicalBondingAndElectronDensityInH2-1.png', fullPage: true });
  });

  test('State with R set to 0.228 Å', async ({ page }) => {
    await page.locator('#slider-r').fill('0.228');
    await page.screenshot({ path: './snapshots/ChemicalBondingAndElectronDensityInH2-2.png', fullPage: true });
  });

  test('State with R set to 1.922 Å showing separated orbitals', async ({ page }) => {
    await page.locator('#slider-r').fill('1.922');
    await page.screenshot({ path: './snapshots/ChemicalBondingAndElectronDensityInH2-3.png', fullPage: true });
  });

  test('State with R set to 0.976 Å', async ({ page }) => {
    await page.locator('#slider-r').fill('0.976');
    await page.screenshot({ path: './snapshots/ChemicalBondingAndElectronDensityInH2-4.png', fullPage: true });
  });
});