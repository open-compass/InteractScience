const { test, expect } = require('@playwright/test');

test.describe('Solar Energy Incident on Earth\'s Surface', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/SolarEnergyIncidentOnEarthsSurface.html');

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the Plotly charts to be rendered to avoid flaky screenshots
    // await page.waitForSelector('#plot-instant .plot-container');
    // await page.waitForSelector('#plot-cumulative .plot-container');
  });

  test('Initial state with default settings for summer solstice at Greenwich', async ({ page }) => {
    // Action: Load the application. The sliders should initialize to their default values (season: 0, latitude: 51.4789, time of day: 12).
    // No user actions needed for the initial state.
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SolarEnergyIncidentOnEarthsSurface-1.png', fullPage: true });
  });

  test('View of the equator at midnight during the summer solstice', async ({ page }) => {
    // Action: Set the value of the "latitude" slider (#slider-latitude) to 0.
    await page.locator('#slider-latitude').fill('0');
    // Action: Set the value of the "time of day" slider (#slider-time) to 0.
    await page.locator('#slider-time').fill('0');
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SolarEnergyIncidentOnEarthsSurface-2.png', fullPage: true });
  });

  test('View of the Tropic of Cancer in the morning during the summer solstice', async ({ page }) => {
    // Action: Set the value of the "latitude" slider (#slider-latitude) to 23.5.
    await page.locator('#slider-latitude').fill('23.5');
    // Action: Set the value of the "time of day" slider (#slider-time) to 8.3.
    await page.locator('#slider-time').fill('8.3');
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SolarEnergyIncidentOnEarthsSurface-3.png', fullPage: true });
  });

  test('View of the Tropic of Cancer in late afternoon during winter', async ({ page }) => {
    // Action: Set the value of the "season" slider (#slider-season) to 0.798.
    await page.locator('#slider-season').fill('0.798');
    // Action: Set the value of the "latitude" slider (#slider-latitude) to 23.5.
    await page.locator('#slider-latitude').fill('23.5');
    // Action: Set the value of the "time of day" slider (#slider-time) to 16.55.
    await page.locator('#slider-time').fill('16.55');
    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/SolarEnergyIncidentOnEarthsSurface-4.png', fullPage: true });
  });
});