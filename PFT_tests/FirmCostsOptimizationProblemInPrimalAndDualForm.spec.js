const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/FirmCostsOptimizationProblemInPrimalAndDualForm.html');

test.describe('Firm Costs Optimization Interaction', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(fileUrl);
        await page.waitForTimeout(500);
    });

    test('α (alpha) slider for factor share', async ({ page }) => {
        // 1. Assert: Slider with id `slider-alpha` is visible.
        await expect(page.locator('#slider-alpha')).toBeVisible();

        // 2. Assert: The slider's value is 0.5, and the associated label `label-alpha` displays "0.5".
        await expect(page.locator('#slider-alpha')).toHaveValue('0.5');
        await expect(page.locator('#label-alpha')).toHaveText(/^0\.50*$/);

        const initialOutputPrimal = await page.locator('#output-primal').textContent();

        // 3. Action: Drag the slider to a new value, e.g., 0.8.
        await page.locator('#slider-alpha').fill('0.8');

        // 4. Assert: The label `label-alpha` updates to "0.8", and the content of `#output-primal` changes.
        await expect(page.locator('#label-alpha')).toHaveText(/^0\.80*$/);
        await expect(page.locator('#output-primal')).not.toHaveText(initialOutputPrimal);

        const secondOutputPrimal = await page.locator('#output-primal').textContent();

        // 5. Action: Drag the slider to its maximum value of 1.0.
        await page.locator('#slider-alpha').fill('1');

        // 6. Assert: The label `label-alpha` updates to "1", and the visualization in `#plot-primal` changes.
        await expect(page.locator('#label-alpha')).toHaveText('1');
        await expect(page.locator('#output-primal')).not.toHaveText(secondOutputPrimal);
        await expect(page.locator('#plot-primal canvas')).toBeVisible();
    });

    test('β (beta) slider for factor share', async ({ page }) => {
        // 1. Assert: Slider with id `slider-beta` is visible.
        await expect(page.locator('#slider-beta')).toBeVisible();

        // 2. Assert: The slider's value is 0.5, and the associated label `label-beta` displays "0.5".
        await expect(page.locator('#slider-beta')).toHaveValue('0.5');
        await expect(page.locator('#label-beta')).toHaveText(/^0\.50*$/);

        const initialOutputDual = await page.locator('#output-dual').textContent();

        // 3. Action: Drag the slider to a new value, e.g., 0.2.
        await page.locator('#slider-beta').fill('0.2');

        // 4. Assert: The label `label-beta` updates to "0.2", and the content of `#output-dual` changes.
        await expect(page.locator('#label-beta')).toHaveText(/^0\.20*$/);
        await expect(page.locator('#output-dual')).not.toHaveText(initialOutputDual);

        const secondOutputDual = await page.locator('#output-dual').textContent();

        // 5. Action: Drag the slider to its minimum value of 0.1.
        await page.locator('#slider-beta').fill('0.1');

        // 6. Assert: The label `label-beta` updates to "0.1", and the visualization in `#plot-dual` changes.
        await expect(page.locator('#label-beta')).toHaveText(/^0\.10*$/);
        await expect(page.locator('#output-dual')).not.toHaveText(secondOutputDual);
        await expect(page.locator('#plot-dual canvas')).toBeVisible();
    });

    test('w slider for factor price', async ({ page }) => {
        // 1. Assert: Slider with id `slider-w` is visible.
        await expect(page.locator('#slider-w')).toBeVisible();

        // 2. Assert: The slider's value is 1.0, and the associated label `label-w` displays "1".
        await expect(page.locator('#slider-w')).toHaveValue('1');
        await expect(page.locator('#label-w')).toHaveText('1');

        const initialOutputPrimal = await page.locator('#output-primal').textContent();

        // 3. Action: Drag the slider to a new value, e.g., 1.5.
        await page.locator('#slider-w').fill('1.5');

        // 4. Assert: The label `label-w` updates to "1.5", and the content of `#output-primal` changes.
        await expect(page.locator('#label-w')).toHaveText(/^1\.50*$/);
        await expect(page.locator('#output-primal')).not.toHaveText(initialOutputPrimal);

        const secondOutputPrimal = await page.locator('#output-primal').textContent();

        // 5. Action: Drag the slider to its maximum value of 2.0.
        await page.locator('#slider-w').fill('2');

        // 6. Assert: The label `label-w` updates to "2", and the visualization in `#plot-primal` changes.
        await expect(page.locator('#label-w')).toHaveText('2');
        await expect(page.locator('#output-primal')).not.toHaveText(secondOutputPrimal);
        await expect(page.locator('#plot-primal canvas')).toBeVisible();
    });

    test('r slider for factor price', async ({ page }) => {
        // 1. Assert: Slider with id `slider-r` is visible.
        await expect(page.locator('#slider-r')).toBeVisible();

        // 2. Assert: The slider's value is 1.0, and the associated label `label-r` displays "1".
        await expect(page.locator('#slider-r')).toHaveValue('1');
        await expect(page.locator('#label-r')).toHaveText('1');

        const initialOutputDual = await page.locator('#output-dual').textContent();

        // 3. Action: Drag the slider to a new value, e.g., 0.5.
        await page.locator('#slider-r').fill('0.5');

        // 4. Assert: The label `label-r` updates to "0.5", and the content of `#output-dual` changes.
        await expect(page.locator('#label-r')).toHaveText(/^0\.50*$/);
        await expect(page.locator('#output-dual')).not.toHaveText(initialOutputDual);

        const secondOutputDual = await page.locator('#output-dual').textContent();

        // 5. Action: Drag the slider to its minimum value of 0.1.
        await page.locator('#slider-r').fill('0.1');

        // 6. Assert: The label `label-r` updates to "0.1", and the visualization in `#plot-dual` changes.
        await expect(page.locator('#label-r')).toHaveText(/^0\.10*$/);
        await expect(page.locator('#output-dual')).not.toHaveText(secondOutputDual);
        await expect(page.locator('#plot-dual canvas')).toBeVisible();
    });

    test('Reset button for all parameters', async ({ page }) => {
        // 1. Assert: Button with id `btn-reset` is visible.
        await expect(page.locator('#btn-reset')).toBeVisible();

        // 2. Assert: The value of `slider-alpha` is 0.5 and the value of `slider-Q` is 3.0.
        await expect(page.locator('#slider-alpha')).toHaveValue('0.5');
        await expect(page.locator('#slider-Q')).toHaveValue('3');

        // 3. Action: Change the `slider-alpha` value to 0.2 and the `slider-Q` value to 8.0.
        await page.locator('#slider-alpha').fill('0.2');
        await page.locator('#slider-Q').fill('8');

        // 4. Assert: The label `label-alpha` shows "0.2" and `label-Q` shows "8".
        await expect(page.locator('#label-alpha')).toHaveText(/^0\.20*$/);
        await expect(page.locator('#label-Q')).toHaveText('8');

        // 5. Action: Click the `btn-reset` button.
        await page.locator('#btn-reset').click();

        // 6. Assert: The value of `slider-alpha` returns to 0.5 and the value of `slider-Q` returns to 3.0.
        await expect(page.locator('#slider-alpha')).toHaveValue('0.5');
        await expect(page.locator('#slider-Q')).toHaveValue('3');
    });

    test('Q slider for primal problem production volume', async ({ page }) => {
        // 1. Assert: Slider with id `slider-Q` is visible.
        await expect(page.locator('#slider-Q')).toBeVisible();

        // 2. Assert: The slider's value is 3.0, and the associated label `label-Q` displays "3".
        await expect(page.locator('#slider-Q')).toHaveValue('3');
        await expect(page.locator('#label-Q')).toHaveText('3');

        const initialOutputPrimal = await page.locator('#output-primal').textContent();

        // 3. Action: Drag the slider to a new value, e.g., 5.0.
        await page.locator('#slider-Q').fill('5');

        // 4. Assert: The label `label-Q` updates to "5", and the content of `#output-primal` changes.
        await expect(page.locator('#label-Q')).toHaveText('5');
        await expect(page.locator('#output-primal')).not.toHaveText(initialOutputPrimal);

        const secondOutputPrimal = await page.locator('#output-primal').textContent();

        // 5. Action: Drag the slider to its maximum value of 10.
        await page.locator('#slider-Q').fill('10');

        // 6. Assert: The label `label-Q` updates to "10", and the visualization in `#plot-primal` changes.
        await expect(page.locator('#label-Q')).toHaveText('10');
        await expect(page.locator('#output-primal')).not.toHaveText(secondOutputPrimal);
        await expect(page.locator('#plot-primal canvas')).toBeVisible();
    });

    test('C slider for dual problem cost limit', async ({ page }) => {
        // 1. Assert: Slider with id `slider-C` is visible.
        await expect(page.locator('#slider-C')).toBeVisible();

        // 2. Assert: The slider's value is 4.0, and the associated label `label-C` displays "4".
        await expect(page.locator('#slider-C')).toHaveValue('4');
        await expect(page.locator('#label-C')).toHaveText('4');

        const initialOutputDual = await page.locator('#output-dual').textContent();

        // 3. Action: Drag the slider to a new value, e.g., 8.0.
        await page.locator('#slider-C').fill('8');

        // 4. Assert: The label `label-C` updates to "8", and the content of `#output-dual` changes.
        await expect(page.locator('#label-C')).toHaveText('8');
        await expect(page.locator('#output-dual')).not.toHaveText(initialOutputDual);

        const secondOutputDual = await page.locator('#output-dual').textContent();

        // 5. Action: Drag the slider to its minimum value of 1.
        await page.locator('#slider-C').fill('1');

        // 6. Assert: The label `label-C` updates to "1", and the visualization in `#plot-dual` changes.
        await expect(page.locator('#label-C')).toHaveText('1');
        await expect(page.locator('#output-dual')).not.toHaveText(secondOutputDual);
        await expect(page.locator('#plot-dual canvas')).toBeVisible();
    });

    test('"C from primal" button', async ({ page }) => {
        // 1. Assert: Button with id `btn-C-from-primal` is visible.
        await expect(page.locator('#btn-C-from-primal')).toBeVisible();

        // 2. Assert: The `slider-C` has its default value of 4.0.
        await expect(page.locator('#slider-C')).toHaveValue('4');

        // 3. Action: Click the `btn-C-from-primal` button.
        await page.locator('#btn-C-from-primal').click();

        // 4. Assert: The value of `slider-C` changes from 4.0 to the calculated primal cost `C` (6.00), and its label updates.
        await expect(page.locator('#slider-C')).toHaveValue('6');
        await expect(page.locator('#label-C')).toHaveText('6');

        // 5. Action: Change `slider-w` to 2.0, then click `btn-C-from-primal` again.
        await page.locator('#slider-w').fill('2');
        await page.locator('#btn-C-from-primal').click();

        // 6. Assert: The value of `slider-C` updates to a new value based on the latest primal calculation.
        const newCValue = parseFloat(await page.locator('#slider-C').inputValue());
        expect(newCValue).toBeCloseTo(8.49, 1);
    });

    test('"Q from dual" button', async ({ page }) => {
        // 1. Assert: Button with id `btn-Q-from-dual` is visible.
        await expect(page.locator('#btn-Q-from-dual')).toBeVisible();

        // 2. Assert: The `slider-Q` has its default value of 3.0.
        await expect(page.locator('#slider-Q')).toHaveValue('3');

        // 3. Action: Click the `btn-Q-from-dual` button.
        await page.locator('#btn-Q-from-dual').click();

        // 4. Assert: The value of `slider-Q` changes from 3.0 to the calculated dual quantity `Q` (2.00), and its label updates.
        await expect(page.locator('#slider-Q')).toHaveValue('2');
        await expect(page.locator('#label-Q')).toHaveText('2');

        // 5. Action: Change `slider-C` to 6.0, then click `btn-Q-from-dual` again.
        await page.locator('#slider-C').fill('6');
        await page.locator('#btn-Q-from-dual').click();

        // 6. Assert: The value of `slider-Q` updates to a new value based on the latest dual calculation.
        await expect(page.locator('#slider-Q')).toHaveValue('3');
    });
});