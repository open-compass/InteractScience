const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/BifurcationInABiochemicalReactor.html');

test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly to be ready, a simple way is to wait for the plot container to have some content
    // await page.waitForSelector('#plot-container .plot-container');
    await page.waitForTimeout(500);
});

test.describe('Bifurcation in a Biochemical Reactor Tests', () => {

    test('Model Selector Buttons', async ({ page }) => {
        // 1. Assert: The "Monod" and "substrate inhibition" buttons are visible.
        await expect(page.locator('#btn-monod')).toBeVisible();
        await expect(page.locator('#btn-si')).toBeVisible();

        // 2. Assert: The "Monod" button has the `active` class, the `k₁` slider is hidden, and the plot displays the Monod model bifurcation diagram.
        await expect(page.locator('#btn-monod')).toHaveClass(/active/);
        await expect(page.locator('#slider-k1').locator('xpath=..')).toBeHidden();
        // A proxy for checking the plot is to check the axes, which should be for the bifurcation diagram
        await expect(page.locator('#plot-container .xtitle')).toHaveText('dilution rate');

        // 3. Action: Click the "substrate inhibition" button.
        await page.locator('#btn-si').click();

        // 4. Assert: The "substrate inhibition" button gains the `active` class, the `k₁` slider becomes visible, and the plot updates.
        await expect(page.locator('#btn-si')).toHaveClass(/active/);
        await expect(page.locator('#btn-monod')).not.toHaveClass(/active/);
        await expect(page.locator('#slider-k1').locator('xpath=..')).toBeVisible();

        // 5. Action: Click the "Monod" button.
        await page.locator('#btn-monod').click();

        // 6. Assert: The "Monod" button regains the `active` class, the `k₁` slider is hidden, and the plot updates.
        await expect(page.locator('#btn-monod')).toHaveClass(/active/);
        await expect(page.locator('#btn-si')).not.toHaveClass(/active/);
        await expect(page.locator('#slider-k1').locator('xpath=..')).toBeHidden();
    });

    test('View Selector Buttons', async ({ page }) => {
        // 1. Assert: The "bifurcation diagram" and "nontrivial steady state" buttons are visible.
        await expect(page.locator('#btn-bifurcation')).toBeVisible();
        await expect(page.locator('#btn-nontrivial')).toBeVisible();

        // 2. Assert: The "bifurcation diagram" button has the `active` class and the plot shows axes for "dilution rate" and "X₂".
        await expect(page.locator('#btn-bifurcation')).toHaveClass(/active/);
        await expect(page.locator('#plot-container .xtitle')).toHaveText('dilution rate');
        await expect(page.locator('#plot-container .ytitle')).toHaveText(/X₂/); // Use regex to match subscript

        // 3. Action: Click the "nontrivial steady state" button.
        await page.locator('#btn-nontrivial').click();

        // 4. Assert: The "nontrivial steady state" button gains the `active` class and the plot axes change to "substrate concentration" and "specific growth rate coefficient".
        await expect(page.locator('#btn-nontrivial')).toHaveClass(/active/);
        await expect(page.locator('#btn-bifurcation')).not.toHaveClass(/active/);
        await expect(page.locator('#plot-container .xtitle')).toHaveText('substrate concentration');
        await expect(page.locator('#plot-container .ytitle')).toHaveText('specific growth rate coefficient');

        // 5. Action: Click the "bifurcation diagram" button.
        await page.locator('#btn-bifurcation').click();

        // 6. Assert: The "bifurcation diagram" button regains the `active` class and the plot axes revert to "dilution rate" and "X₂".
        await expect(page.locator('#btn-bifurcation')).toHaveClass(/active/);
        await expect(page.locator('#btn-nontrivial')).not.toHaveClass(/active/);
        await expect(page.locator('#plot-container .xtitle')).toHaveText('dilution rate');
        await expect(page.locator('#plot-container .ytitle')).toHaveText(/X₂/);
    });

    test('Parameter Slider x₂f', async ({ page }) => {
        // 1. Assert: The slider `slider-x2f` and its value display `value-x2f` are visible.
        await expect(page.locator('#slider-x2f')).toBeVisible();
        await expect(page.locator('#value-x2f')).toBeVisible();

        // 2. Assert: The slider's value is 4.0 and its display shows "4.".
        await expect(page.locator('#slider-x2f')).toHaveValue('4');
        await expect(page.locator('#value-x2f')).toHaveText('4.');

        // 3. Action: Drag the slider to a new value, such as 6.0.
        await page.locator('#slider-x2f').fill('6');

        // 4. Assert: The value display updates to "6.0" and the horizontal line on the bifurcation plot moves vertically.
        await expect(page.locator('#value-x2f')).toHaveText(/^6\.00*$/);

        // 5. Action: Drag the slider to its minimum value (1).
        await page.locator('#slider-x2f').fill('1');

        // 6. Assert: The value display updates to "1" and the plot updates.
        await expect(page.locator('#value-x2f')).toHaveText('1');
    });

    test('Parameter Slider μₘₐₓ', async ({ page }) => {
        // 1. Assert: The slider `slider-umax` and its value display `value-umax` are visible.
        await expect(page.locator('#slider-umax')).toBeVisible();
        await expect(page.locator('#value-umax')).toBeVisible();

        // 2. Assert: The slider's value is 0.6 and its display shows "0.6".
        await expect(page.locator('#slider-umax')).toHaveValue('0.6');
        await expect(page.locator('#value-umax')).toHaveText(/^0\.60*$/);

        // 3. Action: Drag the slider to a new value, such as 1.5.
        await page.locator('#slider-umax').fill('1.5');

        // 4. Assert: The value display updates to "1.5" and the curvature of the steady state plot line changes.
        await expect(page.locator('#value-umax')).toHaveText(/^1\.50*$/);

        // 5. Action: Drag the slider to its maximum value (2).
        await page.locator('#slider-umax').fill('2');

        // 6. Assert: The value display updates to "2" and the plot updates.
        await expect(page.locator('#value-umax')).toHaveText('2');
    });

    test('Parameter Slider kₘ', async ({ page }) => {
        // 1. Assert: The slider `slider-km` and its value display `value-km` are visible.
        await expect(page.locator('#slider-km')).toBeVisible();
        await expect(page.locator('#value-km')).toBeVisible();

        // 2. Assert: The slider's value is 0.12 and its display shows "0.12".
        await expect(page.locator('#slider-km')).toHaveValue('0.12');
        await expect(page.locator('#value-km')).toHaveText(/^0\.120*$/);

        // 3. Action: Drag the slider to a new value, such as 0.5.
        await page.locator('#slider-km').fill('0.5');

        // 4. Assert: The value display updates to "0.5" and the shape of the nontrivial steady state curve on the plot changes.
        await expect(page.locator('#value-km')).toHaveText(/^0\.50*$/);

        // 5. Action: Drag the slider to its minimum value (0.01).
        await page.locator('#slider-km').fill('0.01');

        // 6. Assert: The value display updates to "0.01" and the plot updates.
        await expect(page.locator('#value-km')).toHaveText(/^0\.010*$/);
    });

    test('Parameter Slider k₁', async ({ page }) => {
        // 1. Assert: The container for the `k₁` slider is not visible.
        await expect(page.locator('#slider-k1').locator('xpath=..')).toBeHidden();

        // 2. Assert: The "Monod" model is active by default.
        await expect(page.locator('#btn-monod')).toHaveClass(/active/);

        // 3. Action: Click the "substrate inhibition" button, then drag the `k₁` slider to a new value, such as 1.0.
        await page.locator('#btn-si').click();
        await page.locator('#slider-k1').fill('1');

        // 4. Assert: The `k₁` slider container becomes visible, its value display updates to "1.0", and the plot shows a curve with a peak.
        await expect(page.locator('#slider-k1').locator('xpath=..')).toBeVisible();
        await expect(page.locator('#value-k1')).toHaveText(/^1\.00*$/);

        // 5. Action: Drag the `k₁` slider to its maximum value (2).
        await page.locator('#slider-k1').fill('2');

        // 6. Assert: The value display updates to "2" and the plot updates.
        await expect(page.locator('#value-k1')).toHaveText('2');
    });

    test('Parameter Slider Dₛ', async ({ page }) => {
        // 1. Assert: The slider `slider-ds` and its value display `value-ds` are visible.
        await expect(page.locator('#slider-ds')).toBeVisible();
        await expect(page.locator('#value-ds')).toBeVisible();

        // 2. Assert: The slider's value is 0.6 and its display shows "0.6".
        await expect(page.locator('#slider-ds')).toHaveValue('0.6');
        await expect(page.locator('#value-ds')).toHaveText(/^0\.60*$/);

        // 3. Action: Drag the slider to a new value, such as 0.3.
        await page.locator('#slider-ds').fill('0.3');

        // 4. Assert: The value display updates to "0.3" and the vertical gray line on the plot moves to the left.
        await expect(page.locator('#value-ds')).toHaveText(/^0\.30*$/);

        // 5. Action: Drag the slider to its maximum value (1.0).
        await page.locator('#slider-ds').fill('1');

        // 6. Assert: The value display updates to "1.0" and the vertical gray line on the plot moves to the right edge.
        await expect(page.locator('#value-ds')).toHaveText(/^1\.00*$/);
    });
});