const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/InterwovenSphericalTriangles.html');

test.describe('InterwovenSphericalTriangles', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Initial view with default settings', async ({ page }) => {
    await page.screenshot({ path: './snapshots/InterwovenSphericalTriangles-1.png', fullPage: true });
  });

  test('Interwoven spiky pattern with 1x1 units', async ({ page }) => {
    await page.locator('#radio-x-1').click();
    await page.locator('#radio-y-1').click();
    await page.locator('#slider-trim').fill('0.71');
    await page.locator('#checkbox-double').click();
    await page.screenshot({ path: './snapshots/InterwovenSphericalTriangles-2.png', fullPage: true });
  });

  test('Reference sphere and triangles visible with camera rotated', async ({ page }) => {
    await page.locator('#slider-trim').fill('0.71');
    await page.locator('#checkbox-double').click();
    await page.locator('#checkbox-sphere').click();
    await page.locator('#checkbox-triangles').click();
    
    const canvas = await page.locator('#main-canvas');
    const bb = await canvas.boundingBox();
    const centerX = bb.x + bb.width / 2;
    const centerY = bb.y + bb.height / 2;

    await page.mouse.move(centerX, centerY);
    await page.mouse.down();
    await page.mouse.move(centerX + 150, centerY + 150);
    await page.mouse.up();

    await page.screenshot({ path: './snapshots/InterwovenSphericalTriangles-3.png', fullPage: true });
  });

  test('Large 3x3 interwoven pattern', async ({ page }) => {
    await page.locator('#radio-x-3').click();
    await page.locator('#radio-y-3').click();
    await page.locator('#slider-trim').fill('0.812');
    await page.locator('#checkbox-double').click();
    await page.screenshot({ path: './snapshots/InterwovenSphericalTriangles-4.png', fullPage: true });
  });

});