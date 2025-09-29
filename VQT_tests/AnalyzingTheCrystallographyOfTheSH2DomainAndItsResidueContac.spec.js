const { test, expect } = require('@playwright/test');

test.describe('AnalyzingTheCrystallographyOfTheSH2DomainAndItsResidueContac', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/AnalyzingTheCrystallographyOfTheSH2DomainAndItsResidueContac.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Default crystallography view upon page load', async ({ page }) => {
    await page.screenshot({ path: './snapshots/AnalyzingTheCrystallographyOfTheSH2DomainAndItsResidueContac-1.png', fullPage: true });
  });

  test('Crystallography view with adjusted color, sequence, atoms, and plot size', async ({ page }) => {
    await page.locator('#slider-gray-level').fill('0.2');
    await page.locator('#slider-browse-sequence').fill('88');
    await page.locator('#select-residue').selectOption('K');
    await page.locator('#slider-residue-x').fill('315');
    await page.locator('#slider-residue-y').fill('334');
    await page.locator('#slider-rmsd').fill('7.5');
    await page.locator('#slider-plot-size').fill('523');
    await page.screenshot({ path: './snapshots/AnalyzingTheCrystallographyOfTheSH2DomainAndItsResidueContac-2.png', fullPage: true });
  });

  test('Crystallography view with different selected residues', async ({ page }) => {
    await page.locator('#slider-browse-sequence').fill('103');
    await page.locator('#select-residue').selectOption('T');
    await page.locator('#slider-residue-x').fill('277');
    await page.locator('#slider-residue-y').fill('52');
    await page.locator('#slider-gray-level').fill('0.5');
    await page.screenshot({ path: './snapshots/AnalyzingTheCrystallographyOfTheSH2DomainAndItsResidueContac-3.png', fullPage: true });
  });

  test('Contact map view with default parameters', async ({ page }) => {
    await page.locator('#btn-contact-map').click();
    await page.screenshot({ path: './snapshots/AnalyzingTheCrystallographyOfTheSH2DomainAndItsResidueContac-4.png', fullPage: true });
  });
});