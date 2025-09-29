const { test, expect } = require('@playwright/test');

test.describe('Diffusion-Reaction in a Catalytic Particle', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/DiffusionReactionInACatalyticParticle.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with low Prater number and position marker at the center', async ({ page }) => {
    await page.locator('#slider-tau').fill('1');
    await page.locator('#slider-phi').fill('2');
    await page.locator('#slider-beta').fill('0.02');
    await page.locator('#slider-gamma').fill('20');
    await page.locator('#slider-xi').fill('0.001');
    await page.screenshot({ path: './snapshots/DiffusionReactionInACatalyticParticle-1.png', fullPage: true });
  });

  test('Default parameter state with position marker at ξ = 0.4', async ({ page }) => {
    await page.locator('#slider-tau').fill('1');
    await page.locator('#slider-phi').fill('2');
    await page.locator('#slider-beta').fill('0.2');
    await page.locator('#slider-gamma').fill('20');
    await page.locator('#slider-xi').fill('0.4');
    await page.screenshot({ path: './snapshots/DiffusionReactionInACatalyticParticle-2.png', fullPage: true });
  });

  test('System at a later time (τ = 2.405) with low Prater number', async ({ page }) => {
    await page.locator('#slider-tau').fill('2.405');
    await page.locator('#slider-phi').fill('2');
    await page.locator('#slider-beta').fill('0.02');
    await page.locator('#slider-gamma').fill('20');
    await page.locator('#slider-xi').fill('0.001');
    await page.screenshot({ path: './snapshots/DiffusionReactionInACatalyticParticle-3.png', fullPage: true });
  });

  test('State with low Prater number and position marker near the surface (ξ = 0.735)', async ({ page }) => {
    await page.locator('#slider-tau').fill('1');
    await page.locator('#slider-phi').fill('2');
    await page.locator('#slider-beta').fill('0.02');
    await page.locator('#slider-gamma').fill('20');
    await page.locator('#slider-xi').fill('0.735');
    await page.screenshot({ path: './snapshots/DiffusionReactionInACatalyticParticle-4.png', fullPage: true });
  });
});