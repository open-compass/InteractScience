const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/AdditionOfAngularMomentaInQuantumMechanics.html');

test.describe('Addition of Angular Momenta in Quantum Mechanics', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial "Coupled Model" state with quantum numbers j₁=3/2, m₁=1/2, j₂=1, m₂=0, and j=5/2', async ({ page }) => {
    await page.locator('#j1-selector button:has-text("3/2")').click();
    await page.locator('#m1-selector button:has-text("1/2")').click();
    await page.locator('#j2-selector button:has-text("1")').click();
    await page.locator('#m2-selector button:has-text("0")').click();
    await page.locator('#j-selector button:has-text("5/2")').click();
    await page.screenshot({ path: './snapshots/AdditionOfAngularMomentaInQuantumMechanics-1.png', fullPage: true });
  });

  test('"Uncoupled Model" view with j=1/2', async ({ page }) => {
    await page.locator('#j1-selector button:has-text("3/2")').click();
    await page.locator('#m1-selector button:has-text("1/2")').click();
    await page.locator('#j2-selector button:has-text("1")').click();
    await page.locator('#m2-selector button:has-text("0")').click();
    await page.locator('#j-selector button:has-text("1/2")').click();
    await page.screenshot({ path: './snapshots/AdditionOfAngularMomentaInQuantumMechanics-2.png', fullPage: true });
  });

  test('Animated "Coupled Model" with quantum numbers j₁=3/2, m₁=1/2, j₂=1, m₂=0, and j=5/2', async ({ page }) => {
    await page.locator('#j1-selector button:has-text("3/2")').click();
    await page.locator('#m1-selector button:has-text("1/2")').click();
    await page.locator('#j2-selector button:has-text("1")').click();
    await page.locator('#m2-selector button:has-text("0")').click();
    await page.locator('#j-selector button:has-text("5/2")').click();
    await page.locator('#btn-play-pause').click();
    await page.screenshot({ path: './snapshots/AdditionOfAngularMomentaInQuantumMechanics-3.png', fullPage: true });
  });

  test('Animated "Uncoupled Model" with j₁=1/2, m₁=-1/2, j₂=3/2, m₂=3/2, and j=2', async ({ page }) => {
    await page.locator('#j1-selector button:has-text("1/2")').click();
    await page.locator('#m1-selector button:has-text("-1/2")').click();
    await page.locator('#j2-selector button:has-text("3/2")').click();
    await page.locator('#m2-selector button:has-text("3/2")').click();
    await page.locator('#j-selector button:has-text("2")').click();
    await page.locator('#btn-play-pause').click();
    await page.screenshot({ path: './snapshots/AdditionOfAngularMomentaInQuantumMechanics-4.png', fullPage: true });
  });

});