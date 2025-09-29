const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/DiffusionReactionInACatalyticParticle.html');

test.describe('DiffusionReactionInACatalyticParticle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly to render the plots
    // await page.waitForSelector('#plot-concentration .scatterlayer .trace');
    // await page.waitForSelector('#plot-temperature .scatterlayer .trace');
    await page.waitForTimeout(500);
  });

  test('Time (τ) Slider Interaction', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-tau` is visible.
    await expect(page.locator('#slider-tau')).toBeVisible();

    // 2. Assert: The slider's value is `1.0` and its corresponding value display `value-tau` shows `1.0`.
    await expect(page.locator('#slider-tau')).toHaveValue('1');
    await expect(page.locator('#value-tau')).toHaveText(/^1\.00*$/);
    
    // Capture initial state for comparison
    const initialConcentrationPath = await page.locator('#plot-concentration .scatterlayer .trace:first-of-type path').getAttribute('d');
    const initialTemperaturePath = await page.locator('#plot-temperature .scatterlayer .trace:first-of-type path').getAttribute('d');
    await expect(page.locator('#plot-concentration .annotation-text')).toContainText('τ = 1.00');

    // 3. Action: Drag the `slider-tau` to a new value, for example, `3.0`.
    await page.locator('#slider-tau').fill('3');

    // 4. Assert: The `value-tau` display updates to `3.0`, and the curves on both the concentration and temperature plots change. The `τ` value in the plot annotations updates.
    await expect(page.locator('#value-tau')).toHaveText(/^3\.00*$/);
    const midConcentrationPath = await page.locator('#plot-concentration .scatterlayer .trace:first-of-type path').getAttribute('d');
    const midTemperaturePath = await page.locator('#plot-temperature .scatterlayer .trace:first-of-type path').getAttribute('d');
    expect(midConcentrationPath).not.toEqual(initialConcentrationPath);
    expect(midTemperaturePath).not.toEqual(initialTemperaturePath);
    await expect(page.locator('#plot-concentration .annotation-text')).toContainText('τ = 3.00');
    await expect(page.locator('#plot-temperature .annotation-text')).toContainText('τ = 3.00');

    // 5. Action: Drag the `slider-tau` to its maximum value of `5`.
    await page.locator('#slider-tau').fill('5');

    // 6. Assert: The `value-tau` display updates to `5`, and the curves and annotations on both plots update.
    await expect(page.locator('#value-tau')).toHaveText('5');
    const finalConcentrationPath = await page.locator('#plot-concentration .scatterlayer .trace:first-of-type path').getAttribute('d');
    const finalTemperaturePath = await page.locator('#plot-temperature .scatterlayer .trace:first-of-type path').getAttribute('d');
    expect(finalConcentrationPath).not.toEqual(midConcentrationPath);
    expect(finalTemperaturePath).not.toEqual(midTemperaturePath);
    await expect(page.locator('#plot-concentration .annotation-text')).toContainText('τ = 5.00');
    await expect(page.locator('#plot-temperature .annotation-text')).toContainText('τ = 5.00');
  });

  test('Thiele Modulus (φ) Slider Interaction', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-phi` is visible.
    await expect(page.locator('#slider-phi')).toBeVisible();

    // 2. Assert: The slider's value is `2.0` and its corresponding value display `value-phi` shows `2.0`.
    await expect(page.locator('#slider-phi')).toHaveValue('2');
    await expect(page.locator('#value-phi')).toHaveText(/^2\.00*$/);
    
    // Capture initial state for comparison
    const initialConcentrationPath = await page.locator('#plot-concentration .scatterlayer .trace:first-of-type path').getAttribute('d');
    const initialTemperaturePath = await page.locator('#plot-temperature .scatterlayer .trace:first-of-type path').getAttribute('d');

    // 3. Action: Drag the `slider-phi` to a new value, for example, `6.0`.
    await page.locator('#slider-phi').fill('6');

    // 4. Assert: The `value-phi` display updates to `6.0`, and the curves on both the concentration and temperature plots change.
    await expect(page.locator('#value-phi')).toHaveText(/^6\.00*$/);
    const midConcentrationPath = await page.locator('#plot-concentration .scatterlayer .trace:first-of-type path').getAttribute('d');
    const midTemperaturePath = await page.locator('#plot-temperature .scatterlayer .trace:first-of-type path').getAttribute('d');
    expect(midConcentrationPath).not.toEqual(initialConcentrationPath);
    expect(midTemperaturePath).not.toEqual(initialTemperaturePath);

    // 5. Action: Drag the `slider-phi` to its minimum value of `0.1`.
    await page.locator('#slider-phi').fill('0.1');

    // 6. Assert: The `value-phi` display updates to `0.1`, and the curves on both plots update.
    await expect(page.locator('#value-phi')).toHaveText(/^0\.10*$/);
    const finalConcentrationPath = await page.locator('#plot-concentration .scatterlayer .trace:first-of-type path').getAttribute('d');
    const finalTemperaturePath = await page.locator('#plot-temperature .scatterlayer .trace:first-of-type path').getAttribute('d');
    expect(finalConcentrationPath).not.toEqual(midConcentrationPath);
    expect(finalTemperaturePath).not.toEqual(midTemperaturePath);
  });

  test('Prater Number (β) Slider Interaction', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-beta` is visible.
    await expect(page.locator('#slider-beta')).toBeVisible();

    // 2. Assert: The slider's value is `0.2` and its corresponding value display `value-beta` shows `0.2`.
    await expect(page.locator('#slider-beta')).toHaveValue('0.2');
    await expect(page.locator('#value-beta')).toHaveText(/^0\.20*$/);

    // Capture initial state for comparison
    const initialTemperaturePath = await page.locator('#plot-temperature .scatterlayer .trace:first-of-type path').getAttribute('d');

    // 3. Action: Drag the `slider-beta` to a new value, for example, `-0.1`.
    await page.locator('#slider-beta').fill('-0.1');

    // 4. Assert: The `value-beta` display updates to `-0.1`, and the temperature plot curve changes.
    await expect(page.locator('#value-beta')).toHaveText(/^\-0\.10*$/);
    const midTemperaturePath = await page.locator('#plot-temperature .scatterlayer .trace:first-of-type path').getAttribute('d');
    expect(midTemperaturePath).not.toEqual(initialTemperaturePath);

    // 5. Action: Drag the `slider-beta` to its maximum value of `0.5`.
    await page.locator('#slider-beta').fill('0.5');

    // 6. Assert: The `value-beta` display updates to `0.5`, and the temperature plot curve updates.
    await expect(page.locator('#value-beta')).toHaveText(/^0\.50*$/);
    const finalTemperaturePath = await page.locator('#plot-temperature .scatterlayer .trace:first-of-type path').getAttribute('d');
    expect(finalTemperaturePath).not.toEqual(midTemperaturePath);
  });

  test('Arrhenius Number (γ) Slider Interaction', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-gamma` is visible.
    await expect(page.locator('#slider-gamma')).toBeVisible();

    // 2. Assert: The slider's value is `20` and its corresponding value display `value-gamma` shows `20`.
    await expect(page.locator('#slider-gamma')).toHaveValue('20');
    await expect(page.locator('#value-gamma')).toHaveText('20');

    // Capture initial state for comparison
    const initialConcentrationPath = await page.locator('#plot-concentration .scatterlayer .trace:first-of-type path').getAttribute('d');
    const initialTemperaturePath = await page.locator('#plot-temperature .scatterlayer .trace:first-of-type path').getAttribute('d');

    // 3. Action: Drag the `slider-gamma` to a new value, for example, `10`.
    await page.locator('#slider-gamma').fill('10');

    // 4. Assert: The `value-gamma` display updates to `10`, and the curves on both plots change.
    await expect(page.locator('#value-gamma')).toHaveText('10');
    const midConcentrationPath = await page.locator('#plot-concentration .scatterlayer .trace:first-of-type path').getAttribute('d');
    const midTemperaturePath = await page.locator('#plot-temperature .scatterlayer .trace:first-of-type path').getAttribute('d');
    expect(midConcentrationPath).not.toEqual(initialConcentrationPath);
    expect(midTemperaturePath).not.toEqual(initialTemperaturePath);

    // 5. Action: Drag the `slider-gamma` to its maximum value of `40`.
    await page.locator('#slider-gamma').fill('40');

    // 6. Assert: The `value-gamma` display updates to `40`, and the curves on both plots update.
    await expect(page.locator('#value-gamma')).toHaveText('40');
    const finalConcentrationPath = await page.locator('#plot-concentration .scatterlayer .trace:first-of-type path').getAttribute('d');
    const finalTemperaturePath = await page.locator('#plot-temperature .scatterlayer .trace:first-of-type path').getAttribute('d');
    expect(finalConcentrationPath).not.toEqual(midConcentrationPath);
    expect(finalTemperaturePath).not.toEqual(midTemperaturePath);
  });

  test('Position (ξ) Slider Interaction', async ({ page }) => {
    // 1. Assert: The slider with ID `slider-xi` is visible.
    await expect(page.locator('#slider-xi')).toBeVisible();

    // 2. Assert: The slider's value is `0.4` and the `value-xi` display shows `0.4`. Marker lines are present on both plots.
    await expect(page.locator('#slider-xi')).toHaveValue('0.4');
    await expect(page.locator('#value-xi')).toHaveText(/^0\.40*$/);
    await expect(page.locator('#plot-concentration .scatterlayer .trace:nth-of-type(2)')).toBeVisible();
    await expect(page.locator('#plot-temperature .scatterlayer .trace:nth-of-type(2)')).toBeVisible();

    // Capture initial state for comparison
    const initialProfilePathC = await page.locator('#plot-concentration .scatterlayer .trace:first-of-type path').getAttribute('d');
    const initialMarkerPathC = await page.locator('#plot-concentration .scatterlayer .trace:nth-of-type(2) path').getAttribute('d');
    const initialMarkerPathT = await page.locator('#plot-temperature .scatterlayer .trace:nth-of-type(2) path').getAttribute('d');
    const initialAnnotationC = await page.locator('#plot-concentration .annotation-text').innerText();
    const initialAnnotationT = await page.locator('#plot-temperature .annotation-text').innerText();

    // 3. Action: Drag the `slider-xi` to a new value, for example, `0.8`.
    await page.locator('#slider-xi').fill('0.8');

    // 4. Assert: The `value-xi` display updates to `0.8`, and the position of the marker lines on both plots changes. The `ξ`, `c`, and `θ` values in the annotations update. The main profile curves do not change.
    await expect(page.locator('#value-xi')).toHaveText(/^0\.80*$/);

    const newMarkerPathC = await page.locator('#plot-concentration .scatterlayer .trace:nth-of-type(2) path').getAttribute('d');
    const newMarkerPathT = await page.locator('#plot-temperature .scatterlayer .trace:nth-of-type(2) path').getAttribute('d');
    expect(newMarkerPathC).not.toEqual(initialMarkerPathC);
    expect(newMarkerPathT).not.toEqual(initialMarkerPathT);

    const newProfilePathC = await page.locator('#plot-concentration .scatterlayer .trace:first-of-type path').getAttribute('d');
    expect(newProfilePathC).toEqual(initialProfilePathC);

    await expect(page.locator('#plot-concentration .annotation-text')).toContainText('ξ = 0.800');
    await expect(page.locator('#plot-temperature .annotation-text')).toContainText('ξ = 0.800');
    const newAnnotationC = await page.locator('#plot-concentration .annotation-text').innerText();
    const newAnnotationT = await page.locator('#plot-temperature .annotation-text').innerText();
    expect(newAnnotationC).not.toEqual(initialAnnotationC);
    expect(newAnnotationT).not.toEqual(initialAnnotationT);
    
    // 5. Action: Drag the `slider-xi` to its minimum value of `0.001`.
    await page.locator('#slider-xi').fill('0.001');

    // 6. Assert: The `value-xi` display updates to `0.001`, and the marker lines move to the left side of the plots.
    await expect(page.locator('#value-xi')).toHaveText(/^0\.0010*$/);
    const finalMarkerPathC = await page.locator('#plot-concentration .scatterlayer .trace:nth-of-type(2) path').getAttribute('d');
    expect(finalMarkerPathC).not.toEqual(newMarkerPathC);
  });

  test('Parameter Increment/Decrement Button Interaction', async ({ page }) => {
    // 1. Assert: The buttons `btn-inc-phi` and `btn-dec-phi` are visible.
    await expect(page.locator('#btn-inc-phi')).toBeVisible();
    await expect(page.locator('#btn-dec-phi')).toBeVisible();

    // 2. Assert: The `slider-phi` has its default value of `2.0`.
    await expect(page.locator('#slider-phi')).toHaveValue('2');
    await expect(page.locator('#value-phi')).toHaveText(/^2\.00*$/);

    // Capture initial state
    const initialConcentrationPath = await page.locator('#plot-concentration .scatterlayer .trace:first-of-type path').getAttribute('d');
    const initialTemperaturePath = await page.locator('#plot-temperature .scatterlayer .trace:first-of-type path').getAttribute('d');

    // 3. Action: Click the increment button `btn-inc-phi` once.
    await page.locator('#btn-inc-phi').click();

    // 4. Assert: The `value-phi` display updates to `2.1`, and the curves on both plots change.
    await expect(page.locator('#value-phi')).toHaveText(/^2\.10*$/);
    const postIncrementConcentrationPath = await page.locator('#plot-concentration .scatterlayer .trace:first-of-type path').getAttribute('d');
    const postIncrementTemperaturePath = await page.locator('#plot-temperature .scatterlayer .trace:first-of-type path').getAttribute('d');
    expect(postIncrementConcentrationPath).not.toEqual(initialConcentrationPath);
    expect(postIncrementTemperaturePath).not.toEqual(initialTemperaturePath);

    // 5. Action: Click the decrement button `btn-dec-phi` twice.
    await page.locator('#btn-dec-phi').click();
    await page.locator('#btn-dec-phi').click();

    // 6. Assert: The `value-phi` display updates to `1.9`, and the curves on both plots change.
    await expect(page.locator('#value-phi')).toHaveText(/^1\.90*$/);
    const postDecrementConcentrationPath = await page.locator('#plot-concentration .scatterlayer .trace:first-of-type path').getAttribute('d');
    const postDecrementTemperaturePath = await page.locator('#plot-temperature .scatterlayer .trace:first-of-type path').getAttribute('d');
    expect(postDecrementConcentrationPath).not.toEqual(postIncrementConcentrationPath);
    expect(postDecrementTemperaturePath).not.toEqual(postIncrementTemperaturePath);
  });
});