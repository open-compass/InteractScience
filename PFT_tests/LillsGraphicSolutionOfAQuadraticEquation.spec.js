const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/LillsGraphicSolutionOfAQuadraticEquation.html');

test.describe('Lill\'s Graphic Solution of a Quadratic Equation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the page to be fully loaded, including MathJax rendering
    // await page.waitForFunction(() => typeof MathJax !== 'undefined' && MathJax.startup.promise);
    await page.waitForTimeout(500);
  });

  test('z value slider interaction', async ({ page }) => {
    await test.step('Assert: The "z" slider (#slider-z) is visible.', async () => {
      await expect(page.locator('#slider-z')).toBeVisible();
    });

    await test.step('Assert: The slider\'s default value is 1.5, and its label (#label-z) displays "1.5".', async () => {
      await expect(page.locator('#slider-z')).toHaveValue('1.5');
      await expect(page.locator('#label-z')).toHaveText(/^1\.50*$/);
      await expect(page.locator('#value-z')).toHaveText(/^1\.50*$/);
      await expect(page.locator('#value-pz')).toHaveText(/^\-0\.250*$/);
    });

    const initialPz = await page.locator('#value-pz').textContent();
    const initialL3L2 = await page.locator('#value-l3l2').textContent();

    await test.step('Action: Drag the slider to a new value, such as 2.5.', async () => {
      await page.locator('#slider-z').fill('2.5');
    });

    await test.step('Assert: The slider\'s label (#label-z) updates to "2.5", the values in the results table change, and the test path on the canvas is redrawn.', async () => {
      await expect(page.locator('#label-z')).toHaveText(/^2\.50*$/);
      await expect(page.locator('#value-z')).toHaveText(/^2\.50*$/);
      const newPz = await page.locator('#value-pz').textContent();
      const newL3L2 = await page.locator('#value-l3l2').textContent();
      expect(newPz).not.toBe(initialPz);
      expect(newL3L2).not.toBe(initialL3L2);
    });

    const currentPz = await page.locator('#value-pz').textContent();
    const currentL3L2 = await page.locator('#value-l3l2').textContent();

    await test.step('Action: Drag the slider to its minimum value, -5.', async () => {
      await page.locator('#slider-z').fill('-5');
    });

    await test.step('Assert: The slider\'s label updates to "-5", the table values change, and the canvas is redrawn.', async () => {
      await expect(page.locator('#label-z')).toHaveText('-5');
      await expect(page.locator('#value-z')).toHaveText('-5');
      const minPz = await page.locator('#value-pz').textContent();
      const minL3L2 = await page.locator('#value-l3l2').textContent();
      expect(minPz).not.toBe(currentPz);
      expect(minL3L2).not.toBe(currentL3L2);
    });
  });

  test('Plot range slider interaction', async ({ page }) => {
    await test.step('Assert: The "plot range" slider (#slider-plot-range) is visible.', async () => {
      await expect(page.locator('#slider-plot-range')).toBeVisible();
    });

    await test.step('Assert: The slider\'s default value is 4, and its label (#label-plot-range) displays "4".', async () => {
      await expect(page.locator('#slider-plot-range')).toHaveValue('4');
      await expect(page.locator('#label-plot-range')).toHaveText('4');
    });

    await test.step('Action: Drag the slider to a new value, such as 8.', async () => {
      await page.locator('#slider-plot-range').fill('8');
    });

    await test.step('Assert: The slider\'s label updates to "8", and the visualization on the canvas zooms out (objects appear smaller).', async () => {
      await expect(page.locator('#label-plot-range')).toHaveText('8');
    });

    await test.step('Action: Drag the slider to its maximum value, 10.', async () => {
      await page.locator('#slider-plot-range').fill('10');
    });

    await test.step('Assert: The slider\'s label updates to "10", and the visualization on the canvas zooms out further.', async () => {
      await expect(page.locator('#label-plot-range')).toHaveText('10');
    });
  });

  test('"show labels" checkbox functionality', async ({ page }) => {
    await test.step('Assert: The "show labels" checkbox (#check-show-labels) is visible.', async () => {
      await expect(page.locator('#check-show-labels')).toBeVisible();
    });

    await test.step('Assert: The checkbox is unchecked by default, and no point labels (e.g., "O", "L1") are visible on the canvas.', async () => {
      await expect(page.locator('#check-show-labels')).not.toBeChecked();
    });

    await test.step('Action: Click the "show labels" checkbox to check it.', async () => {
      await page.locator('#check-show-labels').click();
    });

    await test.step('Assert: The checkbox is now checked, and text labels appear next to the points on the canvas.', async () => {
      await expect(page.locator('#check-show-labels')).toBeChecked();
    });

    await test.step('Action: Click the "show labels" checkbox again to uncheck it.', async () => {
      await page.locator('#check-show-labels').click();
    });

    await test.step('Assert: The checkbox is now unchecked, and the text labels disappear from the canvas.', async () => {
      await expect(page.locator('#check-show-labels')).not.toBeChecked();
    });
  });

  test('"show circle" checkbox functionality', async ({ page }) => {
    await test.step('Assert: The "show circle" checkbox (#check-show-circle) is visible.', async () => {
      await expect(page.locator('#check-show-circle')).toBeVisible();
    });

    await test.step('Assert: The checkbox is unchecked by default, and no circle is visible on the canvas.', async () => {
      await expect(page.locator('#check-show-circle')).not.toBeChecked();
    });

    await test.step('Action: Click the "show circle" checkbox to check it.', async () => {
      await page.locator('#check-show-circle').click();
    });

    await test.step('Assert: The checkbox is now checked, and a circle is drawn on the canvas.', async () => {
      await expect(page.locator('#check-show-circle')).toBeChecked();
    });

    await test.step('Action: Click the "show circle" checkbox again to uncheck it.', async () => {
      await page.locator('#check-show-circle').click();
    });

    await test.step('Assert: The checkbox is now unchecked, and the circle disappears from the canvas.', async () => {
      await expect(page.locator('#check-show-circle')).not.toBeChecked();
    });
  });

  test('"show axes" checkbox functionality', async ({ page }) => {
    await test.step('Assert: The "show axes" checkbox (#check-show-axes) is visible.', async () => {
      await expect(page.locator('#check-show-axes')).toBeVisible();
    });

    await test.step('Assert: The checkbox is unchecked by default, and no coordinate axes are visible on the canvas.', async () => {
      await expect(page.locator('#check-show-axes')).not.toBeChecked();
    });

    await test.step('Action: Click the "show axes" checkbox to check it.', async () => {
      await page.locator('#check-show-axes').click();
    });

    await test.step('Assert: The checkbox is now checked, and coordinate axes are drawn on the canvas.', async () => {
      await expect(page.locator('#check-show-axes')).toBeChecked();
    });

    await test.step('Action: Click the "show axes" checkbox again to uncheck it.', async () => {
      await page.locator('#check-show-axes').click();
    });

    await test.step('Assert: The checkbox is now unchecked, and the coordinate axes disappear from the canvas.', async () => {
      await expect(page.locator('#check-show-axes')).not.toBeChecked();
    });
  });

  test('"show grid lines" checkbox functionality', async ({ page }) => {
    await test.step('Assert: The "show grid lines" checkbox (#check-show-grid-lines) is visible.', async () => {
      await expect(page.locator('#check-show-grid-lines')).toBeVisible();
    });

    await test.step('Assert: The checkbox is unchecked by default, and no grid is visible on the canvas.', async () => {
      await expect(page.locator('#check-show-grid-lines')).not.toBeChecked();
    });

    await test.step('Action: Click the "show grid lines" checkbox to check it.', async () => {
      await page.locator('#check-show-grid-lines').click();
    });

    await test.step('Assert: The checkbox is now checked, and a grid is drawn on the canvas.', async () => {
      await expect(page.locator('#check-show-grid-lines')).toBeChecked();
    });

    await test.step('Action: Click the "show grid lines" checkbox again to uncheck it.', async () => {
      await page.locator('#check-show-grid-lines').click();
    });

    await test.step('Assert: The checkbox is now unchecked, and the grid disappears from the canvas.', async () => {
      await expect(page.locator('#check-show-grid-lines')).not.toBeChecked();
    });
  });

  test('"new example" button functionality', async ({ page }) => {
    await test.step('Assert: The "new example" button (#btn-new-example) is visible.', async () => {
      await expect(page.locator('#btn-new-example')).toBeVisible();
    });

    await test.step('Assert: The initial formula displayed is P(z) = z^2 - z - 1.', async () => {
      await expect(page.locator('#formula-text')).toHaveText('z^2 - z - 1');
    });

    const initialFormula = await page.locator('#formula-text').textContent();
    const initialPz = await page.locator('#value-pz').textContent();

    await test.step('Action: Click the "new example" button.', async () => {
      await page.locator('#btn-new-example').click();
    });

    await test.step('Assert: The formula text (#formula-text) changes, the results table updates, and the geometric path on the canvas changes.', async () => {
      await expect(page.locator('#formula-text')).not.toHaveText(initialFormula);
      await expect(page.locator('#value-pz')).not.toHaveText(initialPz);
    });

    const currentFormula = await page.locator('#formula-text').textContent();
    const currentPz = await page.locator('#value-pz').textContent();

    await test.step('Action: Click the "new example" button again.', async () => {
      await page.locator('#btn-new-example').click();
    });

    await test.step('Assert: The formula text, results table, and canvas visualization update to reflect a different new example.', async () => {
      await expect(page.locator('#formula-text')).not.toHaveText(currentFormula);
      await expect(page.locator('#value-pz')).not.toHaveText(currentPz);
    });
  });

  test('"golden ratio" button functionality', async ({ page }) => {
    const goldenRatioFormula = 'z^2 - z - 1';
    
    await test.step('Assert: The "golden ratio" button (#btn-golden-ratio) is visible.', async () => {
      await expect(page.locator('#btn-golden-ratio')).toBeVisible();
    });

    const initialPz = await page.locator('#value-pz').textContent();
    const initialL3L2 = await page.locator('#value-l3l2').textContent();
    const initialZ = await page.locator('#value-z').textContent();

    await test.step('Assert: The demo loads with the "golden ratio" example active, showing P(z) = z^2 - z - 1.', async () => {
      await expect(page.locator('#formula-text')).toHaveText(goldenRatioFormula);
    });

    await test.step('Action: Click the "new example" button to change the state.', async () => {
      await page.locator('#btn-new-example').click();
    });

    await test.step('Assert: The displayed formula (#formula-text) is no longer z^2 - z - 1.', async () => {
      await expect(page.locator('#formula-text')).not.toHaveText(goldenRatioFormula);
    });

    await test.step('Action: Click the "golden ratio" button.', async () => {
      await page.locator('#btn-golden-ratio').click();
    });

    await test.step('Assert: The formula resets to P(z) = z^2 - z - 1, and the canvas and table values revert to the initial state.', async () => {
      await expect(page.locator('#formula-text')).toHaveText(goldenRatioFormula);
      await expect(page.locator('#value-pz')).toHaveText(initialPz);
      await expect(page.locator('#value-l3l2')).toHaveText(initialL3L2);
      await expect(page.locator('#value-z')).toHaveText(initialZ);
    });
  });
});