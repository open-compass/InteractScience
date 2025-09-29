const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/MethylationIndexAndAnalysisOfSRBMediatedMercuryMethylation.html');

test.describe('Methylation Index and Analysis of SRB-Mediated Mercury Methylation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with default parameters', async ({ page }) => {
    await page.screenshot({ path: './snapshots/MethylationIndexAndAnalysisOfSRBMediatedMercuryMethylation-1.png', fullPage: true });
  });

  test('State with high POC, low redox potential, and adjusted saturation constant', async ({ page }) => {
    await page.locator('#slider-poc').fill('185.5');
    await page.locator('#slider-eh').fill('-139');
    await page.locator('#slider-hg_m').fill('3.5');
    await page.locator('#slider-a').fill('0.2');
    await page.screenshot({ path: './snapshots/MethylationIndexAndAnalysisOfSRBMediatedMercuryMethylation-2.png', fullPage: true });
  });

  test('State with medium POC and a high saturation constant', async ({ page }) => {
    await page.locator('#slider-poc').fill('42.5');
    await page.locator('#slider-eh').fill('-139');
    await page.locator('#slider-hg_m').fill('3.5');
    await page.locator('#slider-a').fill('0.233');
    await page.screenshot({ path: './snapshots/MethylationIndexAndAnalysisOfSRBMediatedMercuryMethylation-3.png', fullPage: true });
  });

  test('State with maximum POC, high mercury concentration, and a low saturation constant', async ({ page }) => {
    await page.locator('#slider-poc').fill('200');
    await page.locator('#slider-eh').fill('-143');
    await page.locator('#slider-hg_m').fill('10');
    await page.locator('#slider-a').fill('0.065');
    await page.screenshot({ path: './snapshots/MethylationIndexAndAnalysisOfSRBMediatedMercuryMethylation-4.png', fullPage: true });
  });
});