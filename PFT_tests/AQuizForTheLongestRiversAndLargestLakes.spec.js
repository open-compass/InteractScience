const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/AQuizForTheLongestRiversAndLargestLakes.html');

test.describe('A Quiz for the Longest Rivers and Largest Lakes', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the canvas to be rendered by p5.js, which is a good signal for readiness
    // await page.waitForSelector('#canvas-container canvas');
    await page.waitForTimeout(500);
  });

  test('Quiz Type Radio Button Interaction', async ({ page }) => {
    // 1. Assert: The "rivers" and "lakes" radio buttons are visible on the page.
    await expect(page.locator('#radio-rivers')).toBeVisible();
    await expect(page.locator('#radio-lakes')).toBeVisible();

    // 2. Assert: The "rivers" radio button is checked by default, and the quiz table contains headers for rivers.
    await expect(page.locator('#radio-rivers')).toBeChecked();
    await expect(page.locator('#table-quiz th', { hasText: 'Nile' })).toBeVisible();
    await expect(page.locator('#table-quiz th', { hasText: 'Yangtze' })).toBeVisible();
    await expect(page.locator('#table-quiz th', { hasText: 'Huron' })).not.toBeVisible();

    // 3. Action: Click the "lakes" radio button.
    await page.locator('#radio-lakes').click();

    // 4. Assert: The quiz table's headers change to lake names, and the "lakes" radio button is now checked.
    await expect(page.locator('#radio-lakes')).toBeChecked();
    await expect(page.locator('#table-quiz th', { hasText: 'Huron' })).toBeVisible();
    await expect(page.locator('#table-quiz th', { hasText: 'Baikal' })).toBeVisible();
    await expect(page.locator('#table-quiz th', { hasText: 'Nile' })).not.toBeVisible();

    // 5. Action: Click the "rivers" radio button again.
    await page.locator('#radio-rivers').click();

    // 6. Assert: The quiz table's headers revert to river names.
    await expect(page.locator('#table-quiz th', { hasText: 'Nile' })).toBeVisible();
    await expect(page.locator('#table-quiz th', { hasText: 'Yangtze' })).toBeVisible();
  });

  test('Reset Button Functionality', async ({ page }) => {
    // Helper function to get the status cell for a given river/lake name
    const getStatusCell = async (name) => {
      const headers = await page.locator('#table-quiz th').all();
      let itemIndex = -1;
      for (let i = 0; i < headers.length; i++) {
        if (await headers[i].textContent() === name) {
          itemIndex = i;
          break;
        }
      }
      return page.locator('#table-quiz td').nth(itemIndex);
    };

    // 1. Assert: The reset button is visible.
    await expect(page.locator('#btn-reset')).toBeVisible();

    // 2. Assert: The status cells in the quiz table all show "False".
    const allStatuses = await page.locator('#table-quiz td').allTextContents();
    expect(allStatuses.every(status => status === 'False')).toBe(true);

    // 3. Action: Click on the map canvas over a location marker (e.g., the Nile) to find it.
    const canvas = page.locator('#canvas-container canvas');
    const boundingBox = await canvas.boundingBox();
    const mapCoord = (value, start1, stop1, start2, stop2) => start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
    const nileLon = 31.2;
    const nileLat = 30.2;
    const clickX = mapCoord(nileLon, -180, 180, 0, boundingBox.width);
    const clickY = mapCoord(nileLat, 90, -90, 0, boundingBox.height);
    await canvas.click({ position: { x: clickX, y: clickY } });

    // 4. Assert: The corresponding table cell changes text to "True" and background color.
    const nileStatusCell = await getStatusCell('Nile');
    await expect(nileStatusCell).toHaveText('True');
    await expect(nileStatusCell).toHaveCSS('background-color', 'rgb(144, 238, 144)'); // lightgreen

    // 5. Action: Click the reset button.
    await page.locator('#btn-reset').click();

    // 6. Assert: The table cell reverts to "False" with its original background color.
    await expect(nileStatusCell).toHaveText('False');
    await expect(nileStatusCell).not.toHaveCSS('background-color', 'rgb(144, 238, 144)');
  });

  test('"Show Locations" Checkbox Toggling', async ({ page }) => {
    // 1. Assert: The "show locations" checkbox is visible.
    await expect(page.locator('#check-show-locations')).toBeVisible();

    // 2. Assert: The checkbox is checked by default. Visual assertion for markers is skipped.
    await expect(page.locator('#check-show-locations')).toBeChecked();

    // 3. Action: Uncheck the "show locations" checkbox.
    await page.locator('#check-show-locations').uncheck();

    // 4. Assert: Checkbox is unchecked. Visual assertion for marker disappearance is skipped.
    await expect(page.locator('#check-show-locations')).not.toBeChecked();

    // 5. Action: Check the "show locations" checkbox again.
    await page.locator('#check-show-locations').check();

    // 6. Assert: The checkbox is checked again. Visual assertion for marker reappearance is skipped.
    await expect(page.locator('#check-show-locations')).toBeChecked();
  });

  test('"Show Some Rivers and Lakes" Hint Checkbox', async ({ page }) => {
    // 1. Assert: The checkbox is visible.
    await expect(page.locator('#check-show-some')).toBeVisible();

    // 2. Assert: The checkbox is unchecked by default. Visual assertion for labels is skipped.
    await expect(page.locator('#check-show-some')).not.toBeChecked();

    // 3. Action: Check the "show some rivers and lakes" checkbox.
    await page.locator('#check-show-some').check();

    // 4. Assert: The checkbox is now checked. Visual assertion for labels is skipped.
    await expect(page.locator('#check-show-some')).toBeChecked();

    // 5. Action: Uncheck the "show some rivers and lakes" checkbox.
    await page.locator('#check-show-some').uncheck();

    // 6. Assert: The checkbox is unchecked again. Visual assertion for labels is skipped.
    await expect(page.locator('#check-show-some')).not.toBeChecked();
  });

  test('Map Canvas Click to Find Location', async ({ page }) => {
    // Helper function to get the status cell for a given river/lake name
    const getStatusCell = async (name) => {
      const headers = await page.locator('#table-quiz th').all();
      let itemIndex = -1;
      for (let i = 0; i < headers.length; i++) {
        if (await headers[i].textContent() === name) {
          itemIndex = i;
          break;
        }
      }
      return page.locator('#table-quiz td').nth(itemIndex);
    };

    // 1. Assert: The map canvas is visible.
    await expect(page.locator('#canvas-container canvas')).toBeVisible();

    // 2. Assert: A specific location ("Nile") has a status of "False".
    const nileStatusCell = await getStatusCell('Nile');
    await expect(nileStatusCell).toHaveText('False');

    // 3. Action: Click the mouse on the red marker for the "Nile" on the map.
    const canvas = page.locator('#canvas-container canvas');
    const boundingBox = await canvas.boundingBox();
    const mapCoord = (value, start1, stop1, start2, stop2) => start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
    const nileLon = 31.2;
    const nileLat = 30.2;
    const clickX = mapCoord(nileLon, -180, 180, 0, boundingBox.width);
    const clickY = mapCoord(nileLat, 90, -90, 0, boundingBox.height);
    await canvas.click({ position: { x: clickX, y: clickY } });

    // 4. Assert: The status for "Nile" changes to "True".
    await expect(nileStatusCell).toHaveText('True');

    // 5. Action: Click on an area of the map with no location markers.
    const tableStateBefore = await page.locator('#table-quiz').innerHTML();
    await page.locator('#canvas-container canvas').click({ position: { x: 100, y: 300 } });

    // 6. Assert: The state of the quiz table does not change.
    const tableStateAfter = await page.locator('#table-quiz').innerHTML();
    expect(tableStateAfter).toEqual(tableStateBefore);
  });

});