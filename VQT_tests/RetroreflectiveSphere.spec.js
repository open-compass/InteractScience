const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/RetroreflectiveSphere.html');

test.describe('RetroreflectiveSphere', () => {

  test('Default application state on load', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForLoadState('domcontentloaded');
    
    // Actions
    await page.locator('#slider-ray-count').fill('15');
    await page.locator('#slider-beam-width').fill('1.25');
    await page.locator('#slider-incident-angle').fill('-45');
    await page.locator('#slider-refraction-ratio').fill('2');

    // Assert
    await page.screenshot({ path: './snapshots/RetroreflectiveSphere-1.png', fullPage: true });
  });

  test('Visualization with reduced refraction ratio and hidden reflected rays', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForLoadState('domcontentloaded');

    // Actions
    await page.locator('#slider-incident-angle').fill('-29');
    await page.locator('#slider-refraction-ratio').fill('1.58');
    await page.locator('#checkbox-reflected').uncheck();

    // Assert
    await page.screenshot({ path: './snapshots/RetroreflectiveSphere-2.png', fullPage: true });
  });

  test('Visualization with narrower beam, hidden ray types, and enabled intersection points', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForLoadState('domcontentloaded');

    // Actions
    await page.locator('#slider-beam-width').fill('0.8');
    await page.locator('#checkbox-reflected').uncheck();
    await page.locator('#checkbox-ejected').uncheck();
    await page.locator('#checkbox-intersections').check();

    // Assert
    await page.screenshot({ path: './snapshots/RetroreflectiveSphere-3.png', fullPage: true });
  });

  test('Visualization with increased ray count, positive angle, and visible normals', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForLoadState('domcontentloaded');

    // Actions
    await page.locator('#slider-ray-count').fill('23');
    await page.locator('#slider-beam-width').fill('0.8');
    await page.locator('#slider-incident-angle').fill('20');
    await page.locator('#slider-refraction-ratio').fill('1.53');
    await page.locator('#checkbox-ejected').uncheck();
    await page.locator('#checkbox-normals').check();

    // Assert
    await page.screenshot({ path: './snapshots/RetroreflectiveSphere-4.png', fullPage: true });
  });

});