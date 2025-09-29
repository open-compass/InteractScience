const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ModelForTheFormulationOfMultilayeredEmulsions.html');

test.describe('Interactive Components for Multilayered Emulsions Model', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly and MathJax to potentially render
    // await page.waitForSelector('#plot-container .plotly');
    await page.waitForTimeout(500);
  });

  test('`ϕ` slider (`slider-phi`)', async ({ page }) => {
    // 1. Assert: The slider with the label `\(\phi\)` is visible.
    await expect(page.locator('#slider-phi')).toBeVisible();

    // 2. Assert: The value display `phi-value-display` shows the default value "0.005". The vertical dashed line on the plot is at x=0.005.
    await expect(page.locator('#phi-value-display')).toHaveText(/^0\.0050*$/);
    // Note: Verifying the line's exact position on the plot is complex; we use the display value as a proxy.
    const initialRangeText = await page.locator('#range-display').innerText();

    // 3. Action: Drag the slider to the value 0.02.
    await page.locator('#slider-phi').fill('0.02');

    // 4. Assert: The `phi-value-display` updates to "0.02". The vertical dashed line and the three colored markers on the plot move to the new x-position. The text in `#range-display` changes.
    await expect(page.locator('#phi-value-display')).toHaveText(/^0\.020*$/);
    await expect(page.locator('#range-display')).not.toHaveText(initialRangeText);
    const midRangeText = await page.locator('#range-display').innerText();

    // 5. Action: Drag the slider to its maximum possible value (0.05).
    await page.locator('#slider-phi').fill('0.05');

    // 6. Assert: The `phi-value-display` updates to "0.05". The vertical dashed line moves to the right edge of the plot's initial view. The text in `#range-display` changes again.
    await expect(page.locator('#phi-value-display')).toHaveText(/^0\.050*$/);
    await expect(page.locator('#range-display')).not.toHaveText(midRangeText);
  });

  test('`Γ_sat` slider (`slider-gamma-sat`)', async ({ page }) => {
    // 1. Assert: The slider with the label `\(\Gamma_{sat}\)` is visible.
    await expect(page.locator('#slider-gamma-sat')).toBeVisible();

    // 2. Assert: The value display `gamma-sat-value-display` shows the default value "1.5".
    await expect(page.locator('#gamma-sat-value-display')).toHaveText(/^1\.50*$/);
    const initialPhiMax = await page.locator('#phimax-display').innerText();

    // 3. Action: Drag the slider to a new value, such as 6.0.
    await page.locator('#slider-gamma-sat').fill('6');

    // 4. Assert: The `gamma-sat-value-display` updates to "6.0". The shapes of the three curves, the shaded stability region, and the value of `\(\phi_{max}\)` in the info display all change.
    await expect(page.locator('#gamma-sat-value-display')).toHaveText(/^6\.00*$/);
    await expect(page.locator('#phimax-display')).not.toHaveText(initialPhiMax);
    const midPhiMax = await page.locator('#phimax-display').innerText();

    // 5. Action: Drag the slider to its minimum value, 0.1.
    await page.locator('#slider-gamma-sat').fill('0.1');

    // 6. Assert: The `gamma-sat-value-display` shows "0.1". The plot curves and the `\(\phi_{max}\)` value are updated again.
    await expect(page.locator('#gamma-sat-value-display')).toHaveText(/^0\.10*$/);
    await expect(page.locator('#phimax-display')).not.toHaveText(midPhiMax);
  });

  test('`r` (nm) slider (`slider-r`)', async ({ page }) => {
    // 1. Assert: The slider with the label `r` is visible.
    await expect(page.locator('#slider-r')).toBeVisible();

    // 2. Assert: The value display `r-value-display` shows the default value "300".
    await expect(page.locator('#r-value-display')).toHaveText('300');
    const initialPhiMax = await page.locator('#phimax-display').innerText();

    // 3. Action: Drag the slider to a new value, such as 700.
    await page.locator('#slider-r').fill('700');

    // 4. Assert: The `r-value-display` updates to "700". The plot curves, the shaded region, and the `\(\phi_{max}\)` value in the info display all change.
    await expect(page.locator('#r-value-display')).toHaveText('700');
    await expect(page.locator('#phimax-display')).not.toHaveText(initialPhiMax);
    const midPhiMax = await page.locator('#phimax-display').innerText();

    // 5. Action: Drag the slider to its maximum value, 1000.
    await page.locator('#slider-r').fill('1000');

    // 6. Assert: The `r-value-display` shows "1000". The plot curves, shaded region, and `\(\phi_{max}\)` value update to reflect this new state.
    await expect(page.locator('#r-value-display')).toHaveText('1000');
    await expect(page.locator('#phimax-display')).not.toHaveText(midPhiMax);
  });

  test('`r_pe` (nm) slider (`slider-rpe`)', async ({ page }) => {
    // 1. Assert: The slider with the label `r_{pe}` is visible.
    await expect(page.locator('#slider-rpe')).toBeVisible();

    // 2. Assert: The value display `rpe-value-display` shows the default value "20".
    await expect(page.locator('#rpe-value-display')).toHaveText('20');
    const initialPhiMax = await page.locator('#phimax-display').innerText();

    // 3. Action: Drag the slider to a new value, such as 40.
    await page.locator('#slider-rpe').fill('40');

    // 4. Assert: The `rpe-value-display` updates to "40". The green curve (`y3`) changes its shape, which in turn changes the shaded region and the `\(\phi_{max}\)` value.
    await expect(page.locator('#rpe-value-display')).toHaveText('40');
    await expect(page.locator('#phimax-display')).not.toHaveText(initialPhiMax);
    const midPhiMax = await page.locator('#phimax-display').innerText();

    // 5. Action: Drag the slider to its minimum value, 5.
    await page.locator('#slider-rpe').fill('5');

    // 6. Assert: The `rpe-value-display` shows "5". The green curve, shaded region, and `\(\phi_{max}\)` value are updated again.
    await expect(page.locator('#rpe-value-display')).toHaveText('5');
    await expect(page.locator('#phimax-display')).not.toHaveText(midPhiMax);
  });

  test('`M_W` (kDa) slider (`slider-mw`)', async ({ page }) => {
    // 1. Assert: The slider with the label `M_W` is visible.
    await expect(page.locator('#slider-mw')).toBeVisible();

    // 2. Assert: The value display `mw-value-display` shows the default value "166".
    await expect(page.locator('#mw-value-display')).toHaveText('166');
    const initialPhiMax = await page.locator('#phimax-display').innerText();

    // 3. Action: Drag the slider to a new value, such as 500.
    await page.locator('#slider-mw').fill('500');

    // 4. Assert: The `mw-value-display` updates to "500". The green curve (`y3`), the shaded region, and the `\(\phi_{max}\)` value all change.
    await expect(page.locator('#mw-value-display')).toHaveText('500');
    await expect(page.locator('#phimax-display')).not.toHaveText(initialPhiMax);
    const midPhiMax = await page.locator('#phimax-display').innerText();

    // 5. Action: Drag the slider to its maximum value, 1000.
    await page.locator('#slider-mw').fill('1000');

    // 6. Assert: The `mw-value-display` shows "1000". The plot visualization (green curve, shaded area, `\(\phi_{max}\)`) is updated.
    await expect(page.locator('#mw-value-display')).toHaveText('1000');
    await expect(page.locator('#phimax-display')).not.toHaveText(midPhiMax);
  });

  test('`ϕ` axis max slider (`slider-phi-axis`)', async ({ page }) => {
    // 1. Assert: The slider with the label `\(\phi\)` axis max. is visible.
    await expect(page.locator('#slider-phi-axis')).toBeVisible();

    // 2. Assert: The value display `phi-axis-value-display` shows the default value "0.05". The plot's x-axis ends at 0.05.
    await expect(page.locator('#phi-axis-value-display')).toHaveText(/^0\.050*$/);
    await expect(page.locator('#slider-phi')).toHaveAttribute('max', '0.05');

    // 3. Action: Drag the slider to a new value, such as 0.25.
    await page.locator('#slider-phi-axis').fill('0.25');

    // 4. Assert: The `phi-axis-value-display` updates to "0.25". The plot's x-axis range is updated, showing ticks up to 0.25. The `max` attribute of the `slider-phi` control is also updated.
    await expect(page.locator('#phi-axis-value-display')).toHaveText(/^0\.250*$/);
    await expect(page.locator('#slider-phi')).toHaveAttribute('max', '0.25');

    // 5. Action: Drag the slider to its minimum value, 0.01.
    await page.locator('#slider-phi-axis').fill('0.01');

    // 6. Assert: The `phi-axis-value-display` shows "0.01". The plot's x-axis range is rescaled to end at 0.01.
    await expect(page.locator('#phi-axis-value-display')).toHaveText(/^0\.010*$/);
    await expect(page.locator('#slider-phi')).toHaveAttribute('max', '0.01');
  });

  test('`C` axis max slider (`slider-c-axis`)', async ({ page }) => {
    // 1. Assert: The slider with the label `C` axis max. is visible.
    await expect(page.locator('#slider-c-axis')).toBeVisible();

    // 2. Assert: The value display `c-axis-value-display` shows the default value "2.0". The plot's y-axis ends at 2.0.
    await expect(page.locator('#c-axis-value-display')).toHaveText(/^2\.00*$/);

    // 3. Action: Drag the slider to a new value, such as 3.5.
    await page.locator('#slider-c-axis').fill('3.5');

    // 4. Assert: The `c-axis-value-display` updates to "3.5". The plot's y-axis range is updated, showing ticks up to 3.5. The vertical dashed line is extended to the new axis height.
    await expect(page.locator('#c-axis-value-display')).toHaveText(/^3\.50*$/);

    // 5. Action: Drag the slider to its maximum value, 5.0.
    await page.locator('#slider-c-axis').fill('5');

    // 6. Assert: The `c-axis-value-display` shows "5.0". The plot's y-axis range is rescaled to end at 5.0.
    await expect(page.locator('#c-axis-value-display')).toHaveText(/^5\.00*$/);
  });
});