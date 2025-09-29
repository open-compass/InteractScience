const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/BandStructureOfAQuantumWireWithRashbaAndZeemanInteractions.html');

test.describe('Band Structure of a Quantum Wire with Rashba and Zeeman Interactions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForTimeout(500);
  });

  test('Rashba spin-orbit interaction strength (wso) slider', async ({ page }) => {
    // 1. Assert: The slider with id `slider-wso` is visible on the page.
    await expect(page.locator('#slider-wso')).toBeVisible();

    // 2. Assert: The slider's default value is 0, and the corresponding `span#value-wso` displays "0". The plot shows one solid red line.
    await expect(page.locator('#slider-wso')).toHaveValue('0');
    await expect(page.locator('#value-wso')).toHaveText('0');
    await expect(page.locator('#plot-container .trace')).toHaveCount(1);
    
    // 3. Action: Drag the `slider-wso` to a value of 1.0.
    await page.locator('#slider-wso').fill('1');

    // 4. Assert: The `span#value-wso` updates to "1.0". The plot updates to show two distinct traces (one solid, one dashed). The plot title now includes "wso = 1".
    await expect(page.locator('#value-wso')).toHaveText(/^1\.00*$/);
    await expect(page.locator('#plot-container .trace')).toHaveCount(2);
    await expect(page.locator('#plot-container .gtitle')).toHaveText(/wso = 1/);

    // 5. Action: Drag the `slider-wso` to its maximum value of 2.
    await page.locator('#slider-wso').fill('2');

    // 6. Assert: The `span#value-wso` updates to "2.0". The plot traces change, showing a larger separation between them.
    await expect(page.locator('#value-wso')).toHaveText(/^2\.00*$/);
    await expect(page.locator('#plot-container .trace')).toHaveCount(2); // Re-asserting trace count implies the plot updated
  });

  test('Subband (n) slider', async ({ page }) => {
    // 1. Assert: The slider with id `slider-n` is visible on the page.
    await expect(page.locator('#slider-n')).toBeVisible();
    
    // 2. Assert: The slider's default value is 0, and the corresponding `span#value-n` displays "0". The plot title displays "n = 0".
    await expect(page.locator('#slider-n')).toHaveValue('0');
    await expect(page.locator('#value-n')).toHaveText('0');
    await expect(page.locator('#plot-container .gtitle')).toHaveText('n = 0');
    
    // 3. Action: Drag the `slider-n` to a value of 5.
    await page.locator('#slider-n').fill('5');
    
    // 4. Assert: The `span#value-n` updates to "5". The plot's energy bands shift vertically upwards. The plot title updates to "n = 5".
    await expect(page.locator('#value-n')).toHaveText('5');
    await expect(page.locator('#plot-container .gtitle')).toHaveText('n = 5');
    
    // 5. Action: Drag the `slider-n` to its maximum value of 10.
    await page.locator('#slider-n').fill('10');
    
    // 6. Assert: The `span#value-n` updates to "10". The plot's energy bands shift further up. The plot title updates to "n = 10".
    await expect(page.locator('#value-n')).toHaveText('10');
    await expect(page.locator('#plot-container .gtitle')).toHaveText('n = 10');
  });

  test('Magnetic field x-direction strength (BX) slider', async ({ page }) => {
    // 1. Assert: The slider with id `slider-bx` is visible on the page.
    await expect(page.locator('#slider-bx')).toBeVisible();

    // 2. Assert: The slider's default value is 0, and the corresponding `span#value-bx` displays "0". The plot title does not contain "BX".
    await expect(page.locator('#slider-bx')).toHaveValue('0');
    await expect(page.locator('#value-bx')).toHaveText('0');
    await expect(page.locator('#plot-container .gtitle')).not.toHaveText(/BX/);

    // 3. Action: Drag the `slider-bx` to a value of 1.5.
    await page.locator('#slider-bx').fill('1.5');

    // 4. Assert: The `span#value-bx` updates to "1.5". The plot changes from one trace to two (one solid, one dashed). The plot title now includes "BX = 1.5".
    await expect(page.locator('#value-bx')).toHaveText(/^1\.50*$/);
    await expect(page.locator('#plot-container .trace')).toHaveCount(2);
    await expect(page.locator('#plot-container .gtitle')).toHaveText(/BX = 1.5/);

    // 5. Action: Drag the `slider-bx` back to its minimum value of 0.
    await page.locator('#slider-bx').fill('0');

    // 6. Assert: The `span#value-bx` updates to "0". The plot reverts to a single trace (assuming other parameters are zero). The plot title no longer includes "BX".
    await expect(page.locator('#value-bx')).toHaveText('0');
    await expect(page.locator('#plot-container .trace')).toHaveCount(1);
    await expect(page.locator('#plot-container .gtitle')).not.toHaveText(/BX/);
  });

  test('Magnetic field y-direction strength (BY) slider', async ({ page }) => {
    // 1. Assert: The slider with id `slider-by` is visible on the page.
    await expect(page.locator('#slider-by')).toBeVisible();

    // 2. Assert: The slider's default value is 0, and the corresponding `span#value-by` displays "0".
    await expect(page.locator('#slider-by')).toHaveValue('0');
    await expect(page.locator('#value-by')).toHaveText('0');

    // 3. Action: Drag the `slider-by` to a value of 0.8.
    await page.locator('#slider-by').fill('0.8');

    // 4. Assert: The `span#value-by` updates to "0.8". The plot splits into two traces. The plot title now includes "BY = 0.8".
    await expect(page.locator('#value-by')).toHaveText(/^0\.80*$/);
    await expect(page.locator('#plot-container .trace')).toHaveCount(2);
    await expect(page.locator('#plot-container .gtitle')).toHaveText(/BY = 0.8/);

    // 5. Action: Drag the `slider-by` to its maximum value of 2.
    await page.locator('#slider-by').fill('2');

    // 6. Assert: The `span#value-by` updates to "2.0". The plot traces show a different shape compared to the previous step, and the plot title updates to "BY = 2".
    await expect(page.locator('#value-by')).toHaveText(/^2\.00*$/);
    await expect(page.locator('#plot-container .gtitle')).toHaveText(/BY = 2/);
  });

  test('Magnetic field z-direction strength (BZ) slider', async ({ page }) => {
    // 1. Assert: The slider with id `slider-bz` is visible on the page.
    await expect(page.locator('#slider-bz')).toBeVisible();
    
    // 2. Assert: The slider's default value is 0, and the corresponding `span#value-bz` displays "0".
    await expect(page.locator('#slider-bz')).toHaveValue('0');
    await expect(page.locator('#value-bz')).toHaveText('0');

    // 3. Action: Drag the `slider-bz` to a value of 1.0.
    await page.locator('#slider-bz').fill('1');

    // 4. Assert: The `span#value-bz` updates to "1.0". The plot splits from one trace into two. The plot title now includes "BZ = 1".
    await expect(page.locator('#value-bz')).toHaveText(/^1\.00*$/);
    await expect(page.locator('#plot-container .trace')).toHaveCount(2);
    await expect(page.locator('#plot-container .gtitle')).toHaveText(/BZ = 1/);

    // 5. Action: Drag the `slider-bz` to its maximum value of 2.
    await page.locator('#slider-bz').fill('2');

    // 6. Assert: The `span#value-bz` updates to "2.0". The plot traces show a larger vertical separation, and the plot title updates to "BZ = 2".
    await expect(page.locator('#value-bz')).toHaveText(/^2\.00*$/);
    await expect(page.locator('#plot-container .gtitle')).toHaveText(/BZ = 2/);
    await expect(page.locator('#plot-container .trace')).toHaveCount(2); // Re-asserting trace count implies the plot updated
  });
});