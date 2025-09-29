const { test, expect } = require('@playwright/test');

test.describe('SetOfNashEquilibriaIn2x2MixedExtendedGames', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SetOfNashEquilibriaIn2x2MixedExtendedGames.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with three Nash equilibria', async ({ page }) => {
    await page.locator('#slider-a11').fill('-5');
    await page.locator('#slider-a12').fill('-3');
    await page.locator('#slider-a21').fill('-1');
    await page.locator('#slider-a22').fill('-4');
    await page.locator('#slider-b11').fill('-5');
    await page.locator('#slider-b12').fill('-3');
    await page.locator('#slider-b21').fill('-1');
    await page.locator('#slider-b22').fill('-4');
    await page.screenshot({ path: './snapshots/SetOfNashEquilibriaIn2x2MixedExtendedGames-1.png', fullPage: true });
  });

  test('State with two Nash equilibria on a vertical line segment', async ({ page }) => {
    await page.locator('#slider-a11').fill('-5');
    await page.locator('#slider-a12').fill('-3');
    await page.locator('#slider-a21').fill('10');
    await page.locator('#slider-a22').fill('-4');
    await page.locator('#slider-b11').fill('-5');
    await page.locator('#slider-b12').fill('-5');
    await page.locator('#slider-b21').fill('0');
    await page.locator('#slider-b22').fill('5');
    await page.screenshot({ path: './snapshots/SetOfNashEquilibriaIn2x2MixedExtendedGames-2.png', fullPage: true });
  });

  test('State with a single pure strategy Nash equilibrium', async ({ page }) => {
    await page.locator('#slider-a11').fill('-2');
    await page.locator('#slider-a12').fill('4');
    await page.locator('#slider-a21').fill('-1');
    await page.locator('#slider-a22').fill('6');
    await page.locator('#slider-b11').fill('-5');
    await page.locator('#slider-b12').fill('-3');
    await page.locator('#slider-b21').fill('-1');
    await page.locator('#slider-b22').fill('-4');
    await page.screenshot({ path: './snapshots/SetOfNashEquilibriaIn2x2MixedExtendedGames-3.png', fullPage: true });
  });

  test('State with a horizontal line segment of Nash equilibria', async ({ page }) => {
    await page.locator('#slider-a11').fill('0');
    await page.locator('#slider-a12').fill('10');
    await page.locator('#slider-a21').fill('-1');
    await page.locator('#slider-a22').fill('-9');
    await page.locator('#slider-b11').fill('-5');
    await page.locator('#slider-b12').fill('-3');
    await page.locator('#slider-b21').fill('-1');
    await page.locator('#slider-b22').fill('-4');
    await page.screenshot({ path: './snapshots/SetOfNashEquilibriaIn2x2MixedExtendedGames-4.png', fullPage: true });
  });
});