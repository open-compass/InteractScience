const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/SurfaceDisplacementsDueToUndergroundFaults.html');

test.describe('Surface Displacements Due To Underground Faults', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for the plot to be visible, indicating that Plotly has rendered.
    // await expect(page.locator('#plot .surface')).toBeVisible();
    await page.waitForTimeout(500);
  });

  test('Fault Dip Slider Interaction', async ({ page }) => {
    // 1. Assert: The "fault dip" slider (#slider-dip) is visible on the page.
    await expect(page.locator('#slider-dip')).toBeVisible();

    // 2. Assert: The slider's default value is 0, and the corresponding value display (#value-dip) shows "0".
    await expect(page.locator('#slider-dip')).toHaveValue('0');
    await expect(page.locator('#value-dip')).toHaveText('0');

    const initialPlotHTML = await page.locator('#plot .surface').innerHTML();

    // 3. Action: Drag the slider to the middle of its range (e.g., to value 45).
    await page.locator('#slider-dip').fill('45');

    // 4. Assert: The value display (#value-dip) updates to "45", and the 3D plot changes.
    await expect(page.locator('#value-dip')).toHaveText('45');
    await expect.poll(async () => await page.locator('#plot .surface').innerHTML()).not.toBe(initialPlotHTML);

    const midPlotHTML = await page.locator('#plot .surface').innerHTML();

    // 5. Action: Drag the slider to its maximum value (90).
    await page.locator('#slider-dip').fill('90');

    // 6. Assert: The value display (#value-dip) updates to "90", and the 3D plot changes again.
    await expect(page.locator('#value-dip')).toHaveText('90');
    await expect.poll(async () => await page.locator('#plot .surface').innerHTML()).not.toBe(midPlotHTML);
  });

  test('Fault Depth Slider Interaction', async ({ page }) => {
    // 1. Assert: The "fault depth" slider (#slider-depth) is visible on the page.
    await expect(page.locator('#slider-depth')).toBeVisible();

    // 2. Assert: The slider's default value is 500, and the corresponding value display (#value-depth) shows "500".
    await expect(page.locator('#slider-depth')).toHaveValue('500');
    await expect(page.locator('#value-depth')).toHaveText('500');

    const initialPlotHTML = await page.locator('#plot .surface').innerHTML();

    // 3. Action: Drag the slider to a new value (e.g., to 750).
    await page.locator('#slider-depth').fill('750');

    // 4. Assert: The value display (#value-depth) updates to "750", and the 3D plot changes.
    await expect(page.locator('#value-depth')).toHaveText('750');
    await expect.poll(async () => await page.locator('#plot .surface').innerHTML()).not.toBe(initialPlotHTML);

    const midPlotHTML = await page.locator('#plot .surface').innerHTML();

    // 5. Action: Drag the slider to its minimum value (100).
    await page.locator('#slider-depth').fill('100');

    // 6. Assert: The value display (#value-depth) updates to "100", and the 3D plot changes again.
    await expect(page.locator('#value-depth')).toHaveText('100');
    await expect.poll(async () => await page.locator('#plot .surface').innerHTML()).not.toBe(midPlotHTML);
  });

  test('X and Y Plot Limit Slider Interaction', async ({ page }) => {
    // 1. Assert: The "x and y plot limit" slider (#slider-limit) is visible on the page.
    await expect(page.locator('#slider-limit')).toBeVisible();

    // 2. Assert: The slider's default value is 1000, and the corresponding value display (#value-limit) shows "1000".
    await expect(page.locator('#slider-limit')).toHaveValue('1000');
    await expect(page.locator('#value-limit')).toHaveText('1000');

    // 3. Action: Drag the slider to a new value (e.g., to 1500).
    await page.locator('#slider-limit').fill('1500');

    // 4. Assert: The value display (#value-limit) updates to "1500", and the x/y axis range of the 3D plot expands.
    await expect(page.locator('#value-limit')).toHaveText('1500');
    await expect.poll(async () => {
      const layout = await page.evaluate(() => document.getElementById('plot').layout);
      return layout.scene.xaxis.range;
    }).toEqual([-1500, 1500]);
    const layout1500 = await page.evaluate(() => document.getElementById('plot').layout);
    expect(layout1500.scene.yaxis.range).toEqual([-1500, 1500]);

    // 5. Action: Drag the slider to its maximum value (2000).
    await page.locator('#slider-limit').fill('2000');

    // 6. Assert: The value display (#value-limit) updates to "2000", and the x/y axis range of the 3D plot expands further.
    await expect(page.locator('#value-limit')).toHaveText('2000');
    await expect.poll(async () => {
        const layout = await page.evaluate(() => document.getElementById('plot').layout);
        return layout.scene.xaxis.range;
      }).toEqual([-2000, 2000]);
    const layout2000 = await page.evaluate(() => document.getElementById('plot').layout);
    expect(layout2000.scene.yaxis.range).toEqual([-2000, 2000]);
  });

  test('Displacement Component Button Group Interaction', async ({ page }) => {
    // 1. Assert: The "displacement component" button group (#btn-group-component) is visible.
    await expect(page.locator('#btn-group-component')).toBeVisible();

    // 2. Assert: The "Z" button (#btn-component-z) is active by default.
    await expect(page.locator('#btn-component-z')).toHaveClass(/active/);
    await expect(page.locator('#btn-component-x')).not.toHaveClass(/active/);
    await expect(page.locator('#btn-component-y')).not.toHaveClass(/active/);

    const initialPlotHTML = await page.locator('#plot .surface').innerHTML();

    // 3. Action: Click the "X" button (#btn-component-x).
    await page.locator('#btn-component-x').click();

    // 4. Assert: The "X" button becomes active, the "Z" button becomes inactive, and the 3D plot is redrawn.
    await expect(page.locator('#btn-component-x')).toHaveClass(/active/);
    await expect(page.locator('#btn-component-z')).not.toHaveClass(/active/);
    await expect.poll(async () => await page.locator('#plot .surface').innerHTML()).not.toBe(initialPlotHTML);

    const plotAfterXClick = await page.locator('#plot .surface').innerHTML();

    // 5. Action: Click the "Y" button (#btn-component-y).
    await page.locator('#btn-component-y').click();

    // 6. Assert: The "Y" button becomes active, the "X" button becomes inactive, and the 3D plot changes again.
    await expect(page.locator('#btn-component-y')).toHaveClass(/active/);
    await expect(page.locator('#btn-component-x')).not.toHaveClass(/active/);
    await expect.poll(async () => await page.locator('#plot .surface').innerHTML()).not.toBe(plotAfterXClick);
  });

  test('Fault Type Button Group Interaction', async ({ page }) => {
    // 1. Assert: The "fault type" button group (#btn-group-fault-type) is visible.
    await expect(page.locator('#btn-group-fault-type')).toBeVisible();

    // 2. Assert: The "tensile" button (#btn-fault-tensile) is active by default.
    await expect(page.locator('#btn-fault-tensile')).toHaveClass(/active/);
    await expect(page.locator('#btn-fault-strike-slip')).not.toHaveClass(/active/);
    await expect(page.locator('#btn-fault-normal')).not.toHaveClass(/active/);
    
    const initialPlotHTML = await page.locator('#plot .surface').innerHTML();

    // 3. Action: Click the "strike-slip" button (#btn-fault-strike-slip).
    await page.locator('#btn-fault-strike-slip').click();

    // 4. Assert: The "strike-slip" button becomes active, the "tensile" button becomes inactive, and the 3D plot is redrawn.
    await expect(page.locator('#btn-fault-strike-slip')).toHaveClass(/active/);
    await expect(page.locator('#btn-fault-tensile')).not.toHaveClass(/active/);
    await expect.poll(async () => await page.locator('#plot .surface').innerHTML()).not.toBe(initialPlotHTML);
    
    const plotAfterStrikeSlipClick = await page.locator('#plot .surface').innerHTML();

    // 5. Action: Click the "normal" button (#btn-fault-normal).
    await page.locator('#btn-fault-normal').click();

    // 6. Assert: The "normal" button becomes active, the "strike-slip" button becomes inactive, and the 3D plot changes again.
    await expect(page.locator('#btn-fault-normal')).toHaveClass(/active/);
    await expect(page.locator('#btn-fault-strike-slip')).not.toHaveClass(/active/);
    await expect.poll(async () => await page.locator('#plot .surface').innerHTML()).not.toBe(plotAfterStrikeSlipClick);
  });
});