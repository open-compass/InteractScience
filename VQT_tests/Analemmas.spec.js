const { test, expect } = require('@playwright/test');

test.describe('Analemmas', () => {
  const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/Analemmas.html');

  test('Test Case 1: Custom orbit with high tilt, equinox offset, and high eccentricity', async ({ page }) => {
    await page.goto(fileUrl);

    // Action: Drag the "axis angle relative to ecliptic" slider (`slider-tilt`) to approximately 50% of its range (value around 45).
    await page.locator('#slider-tilt').fill('45');

    // Action: Drag the "spring equinox point" slider (`slider-equinox`) to approximately 75% of its range (value around 90).
    await page.locator('#slider-equinox').fill('90');

    // Action: Drag the "orbit eccentricity" slider (`slider-eccentricity`) to approximately 60% of its range (value around 0.3).
    await page.locator('#slider-eccentricity').fill('0.3');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/Analemmas-1.png', fullPage: true });
  });

  test('Test Case 2: Earth analemma with sun snapshots and hidden scales', async ({ page }) => {
    await page.goto(fileUrl);

    // Action: Select "Earth" from the "planet" dropdown (`select-planet`).
    await page.locator('#select-planet').selectOption('Earth');

    // Action: Uncheck the "show scales" checkbox (`checkbox-scales`).
    await page.locator('#checkbox-scales').uncheck();

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/Analemmas-2.png', fullPage: true });
  });

  test('Test Case 3: Default manual orbit settings creating a symmetrical analemma', async ({ page }) => {
    await page.goto(fileUrl);

    // Action: Select "-- choose orbit manually --" from the "planet" dropdown (`select-planet`).
    await page.locator('#select-planet').selectOption('manual');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/Analemmas-3.png', fullPage: true });
  });

  test('Test Case 4: Earth analemma selected again from manual mode', async ({ page }) => {
    await page.goto(fileUrl);

    // Action: Select "Earth" from the "planet" dropdown (`select-planet`).
    await page.locator('#select-planet').selectOption('Earth');

    // Assert: Take a screenshot of the current UI state.
    await page.screenshot({ path: './snapshots/Analemmas-4.png', fullPage: true });
  });
});