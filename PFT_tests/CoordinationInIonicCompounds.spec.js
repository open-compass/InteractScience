const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/CoordinationInIonicCompounds.html');

test.describe('Coordination in Ionic Compounds', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Coordination Type Button', async ({ page }) => {
    // 1. Assert: The coordination button group and the "fourfold" button (`#btn-fourfold`) are visible.
    await expect(page.locator('#btn-fourfold')).toBeVisible();

    // 2. Assert: The "threefold" button (`#btn-threefold`) has an active state, and the "fourfold" button does not.
    await expect(page.locator('#btn-threefold')).toHaveClass(/active/);
    await expect(page.locator('#btn-fourfold')).not.toHaveClass(/active/);

    // 3. Action: Click the "fourfold" button.
    await page.locator('#btn-fourfold').click();

    // 4. Assert: The "fourfold" button has an active state, the "threefold" button is inactive, and the 3D visualization changes to show 4 anions and a wireframe box.
    await expect(page.locator('#btn-fourfold')).toHaveClass(/active/);
    await expect(page.locator('#btn-threefold')).not.toHaveClass(/active/);
    // Note: Asserting the number of anions and the wireframe box in a 3D canvas is beyond the scope of this test.

    // 5. Action: Click the "eightfold" button.
    await page.locator('#btn-eightfold').click();

    // 6. Assert: The "eightfold" button becomes active, and the 3D visualization changes to show 8 anions.
    await expect(page.locator('#btn-eightfold')).toHaveClass(/active/);
    // Note: Asserting the number of anions in a 3D canvas is beyond the scope of this test.
  });

  test('Relative Anion Radius Slider', async ({ page }) => {
    // 1. Assert: The anion radius slider (`#slider-anion-radius`) is visible.
    await expect(page.locator('#slider-anion-radius')).toBeVisible();

    // 2. Assert: The slider's value is 0.1, and its corresponding text display (`#value-anion-radius`) shows "0.100".
    await expect(page.locator('#slider-anion-radius')).toHaveValue('0.1');
    await expect(page.locator('#value-anion-radius')).toHaveText(/^0\.1000*$/);
    await expect(page.locator('#ratio-text')).toHaveText('The ratio of the cation radius to the anion radius is 1.00.');


    // 3. Action: Drag the slider to a new value, such as 0.7.
    await page.locator('#slider-anion-radius').fill('0.7');

    // 4. Assert: The anion radius text display updates, the size of the anion spheres in the 3D view changes, and the ratio text (`#ratio-text`) updates.
    await expect(page.locator('#value-anion-radius')).toHaveText(/^0\.7000*$/);
    await expect(page.locator('#ratio-text')).toHaveText('The ratio of the cation radius to the anion radius is 0.14.');
    // Note: Asserting the size of spheres in a 3D canvas is beyond the scope of this test.

    // 5. Action: Drag the slider to its maximum value (1.0).
    await page.locator('#slider-anion-radius').fill('1');

    // 6. Assert: The text display shows "1.000", the anion spheres change size, and the ratio text updates.
    await expect(page.locator('#value-anion-radius')).toHaveText(/^1\.0000*$/);
    await expect(page.locator('#ratio-text')).toHaveText('The ratio of the cation radius to the anion radius is 0.10.');
    // Note: Asserting the size of spheres in a 3D canvas is beyond the scope of this test.
  });

  test('Relative Cation Radius Slider', async ({ page }) => {
    // 1. Assert: The cation radius slider (`#slider-cation-radius`) is visible.
    await expect(page.locator('#slider-cation-radius')).toBeVisible();

    // 2. Assert: The slider's value is 0.1, and its corresponding text display (`#value-cation-radius`) shows "0.100".
    await expect(page.locator('#slider-cation-radius')).toHaveValue('0.1');
    await expect(page.locator('#value-cation-radius')).toHaveText(/^0\.1000*$/);

    // 3. Action: Drag the slider to a new value, such as 0.5.
    await page.locator('#slider-cation-radius').fill('0.5');

    // 4. Assert: The cation radius text display updates, the size of the central cation sphere in the 3D view changes, and the ratio text (`#ratio-text`) updates.
    await expect(page.locator('#value-cation-radius')).toHaveText(/^0\.5000*$/);
    await expect(page.locator('#ratio-text')).toHaveText('The ratio of the cation radius to the anion radius is 5.00.');
    // Note: Asserting the size of a sphere in a 3D canvas is beyond the scope of this test.

    // 5. Action: Drag the slider to its minimum value (0.1).
    await page.locator('#slider-cation-radius').fill('0.1');

    // 6. Assert: The text display shows "0.100", the cation sphere changes size, and the ratio text updates.
    await expect(page.locator('#value-cation-radius')).toHaveText(/^0\.1000*$/);
    await expect(page.locator('#ratio-text')).toHaveText('The ratio of the cation radius to the anion radius is 1.00.');
    // Note: Asserting the size of a sphere in a 3D canvas is beyond the scope of this test.
  });

  test('Anion Opacity Slider', async ({ page }) => {
    // 1. Assert: The opacity slider (`#slider-opacity`) is visible.
    await expect(page.locator('#slider-opacity')).toBeVisible();

    // 2. Assert: The slider's value is 0.8.
    await expect(page.locator('#slider-opacity')).toHaveValue('0.8');

    // 3. Action: Drag the slider to a new value, such as 0.3.
    await page.locator('#slider-opacity').fill('0.3');

    // 4. Assert: The opacity of the anion spheres in the 3D visualization decreases.
    await expect(page.locator('#slider-opacity')).toHaveValue('0.3');
    // Note: Asserting the opacity of spheres in a 3D canvas is beyond the scope of this test.

    // 5. Action: Drag the slider to its maximum value (1.0).
    await page.locator('#slider-opacity').fill('1');

    // 6. Assert: The anion spheres in the 3D visualization become fully opaque.
    await expect(page.locator('#slider-opacity')).toHaveValue('1.0');
    // Note: Asserting the opacity of spheres in a 3D canvas is beyond the scope of this test.
  });
});