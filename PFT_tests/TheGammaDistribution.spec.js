const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/TheGammaDistribution.html');

test.describe('Gamma Distribution Visualization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly and MathJax to be ready if necessary, but the prompt says not to assume async logic beyond DOM readiness.
    // await page.locator('#plot-container .plot-container').waitFor();
    await page.waitForTimeout(500);
  });

  test('Parameter α Slider Control', async ({ page }) => {
    // 1. Assert: The "parameter α" slider (`#slider-alpha`) is visible.
    await expect(page.locator('#slider-alpha')).toBeVisible();

    // 2. Assert: The slider's value is 1.825 and its corresponding label (`#display-alpha`) shows "1.825".
    await expect(page.locator('#slider-alpha')).toHaveValue('1.825');
    await expect(page.locator('#display-alpha')).toHaveText(/^1\.8250*$/);
    await expect(page.locator('#mean-value')).toHaveText(/^3\.5500*$/);
    await expect(page.locator('#variance-value')).toHaveText(/^6\.9040*$/);

    // 3. Action: Drag the slider to a new value, such as 3.0.
    await page.locator('#slider-alpha').fill('3');

    // 4. Assert: The label #display-alpha updates to "3.000", the plot changes, and the mean/variance values in the statistics section are updated.
    await expect(page.locator('#display-alpha')).toHaveText(/^3\.0000*$/);
    // α=3.0, β=1.945 => mean=5.835, variance=11.349
    await expect(page.locator('#mean-value')).toHaveText(/^5\.8350*$/);
    await expect(page.locator('#variance-value')).toHaveText(/^11\.3490*$/);
    // Asserting the formula is updated
    await expect(page.locator('#mgf-formula')).toContainText(`(1 - 1.945 t)^{-3}`);

    // 5. Action: Drag the slider to its maximum value (5.0).
    await page.locator('#slider-alpha').fill('5');

    // 6. Assert: The label #display-alpha updates to "5.000", and the plot and statistics change accordingly.
    await expect(page.locator('#display-alpha')).toHaveText(/^5\.0000*$/);
    // α=5.0, β=1.945 => mean=9.725, variance=18.915
    await expect(page.locator('#mean-value')).toHaveText(/^9\.7250*$/);
    await expect(page.locator('#variance-value')).toHaveText(/^18\.9150*$/);
    await expect(page.locator('#mgf-formula')).toContainText(`(1 - 1.945 t)^{-5}`);
  });

  test('Parameter β Slider Control', async ({ page }) => {
    // 1. Assert: The "parameter β" slider (`#slider-beta`) is visible.
    await expect(page.locator('#slider-beta')).toBeVisible();

    // 2. Assert: The slider's value is 1.945 and its corresponding label (`#display-beta`) shows "1.945".
    await expect(page.locator('#slider-beta')).toHaveValue('1.945');
    await expect(page.locator('#display-beta')).toHaveText(/^1\.9450*$/);
    await expect(page.locator('#mean-value')).toHaveText(/^3\.5500*$/);
    await expect(page.locator('#variance-value')).toHaveText(/^6\.9040*$/);

    // 3. Action: Drag the slider to a new value, such as 1.0.
    await page.locator('#slider-beta').fill('1');

    // 4. Assert: The label #display-beta updates to "1.000", the plot changes, and the mean/variance values in the statistics section are updated.
    await expect(page.locator('#display-beta')).toHaveText(/^1\.0000*$/);
    // α=1.825, β=1.0 => mean=1.825, variance=1.825
    await expect(page.locator('#mean-value')).toHaveText(/^1\.8250*$/);
    await expect(page.locator('#variance-value')).toHaveText(/^1\.8250*$/);
    await expect(page.locator('#mgf-formula')).toContainText(`(1 - 1 t)^{-1.825}`);

    // 5. Action: Drag the slider to its minimum value (0.1).
    await page.locator('#slider-beta').fill('0.1');

    // 6. Assert: The label #display-beta updates to "0.100", and the plot and statistics change accordingly.
    await expect(page.locator('#display-beta')).toHaveText(/^0\.1000*$/);
    // α=1.825, β=0.1 => mean=0.183, variance=0.018
    await expect(page.locator('#mean-value')).toHaveText(/^0\.1830*$/);
    await expect(page.locator('#variance-value')).toHaveText(/^0\.0180*$/);
    await expect(page.locator('#mgf-formula')).toContainText(`(1 - 0.1 t)^{-1.825}`);
  });
});