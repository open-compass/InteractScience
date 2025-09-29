const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/RayleighWaves.html');

test.describe('Rayleigh Waves', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial state with animation paused at t=7.0', async ({ page }) => {
    await page.locator('#slider-time').fill('7');
    await page.locator('#slider-wavelength').fill('4');
    await page.locator('#slider-longitudinal-amplitude').fill('2');
    await page.locator('#slider-latitudinal-amplitude').fill('1');
    await page.screenshot({ path: './snapshots/RayleighWaves-1.png', fullPage: true });
  });

  test('Short wavelength with small, circular particle motion', async ({ page }) => {
    await page.locator('#slider-time').fill('1.28');
    await page.locator('#slider-wavelength').fill('1.34');
    await page.locator('#slider-longitudinal-amplitude').fill('0.5');
    await page.locator('#slider-latitudinal-amplitude').fill('0.5');
    await page.screenshot({ path: './snapshots/RayleighWaves-2.png', fullPage: true });
  });

  test('Large amplitude motion with a deep wave trough', async ({ page }) => {
    await page.locator('#slider-time').fill('20.01');
    await page.locator('#slider-wavelength').fill('4');
    await page.locator('#slider-longitudinal-amplitude').fill('2.13');
    await page.locator('#slider-latitudinal-amplitude').fill('2.41');
    await page.screenshot({ path: './snapshots/RayleighWaves-3.png', fullPage: true });
  });

  test('Long wavelength with tall, elliptical particle motion', async ({ page }) => {
    await page.locator('#slider-time').fill('14.35');
    await page.locator('#slider-wavelength').fill('5.14');
    await page.locator('#slider-longitudinal-amplitude').fill('0.74');
    await page.locator('#slider-latitudinal-amplitude').fill('1.45');
    await page.screenshot({ path: './snapshots/RayleighWaves-4.png', fullPage: true });
  });
});