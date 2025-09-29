const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/HeatConductionInARod.html');

test.describe('Collocation Points Slider Control', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // await page.waitForSelector('#plot-container .js-plotly-plot');
    await page.waitForTimeout(500);
  });

  test('Collocation Points Slider Control', async ({ page }) => {
    // 1. Assert: The "collocation points" slider (`#slider-points`) is visible on the page.
    const pointsSlider = page.locator('#slider-points');
    await expect(pointsSlider).toBeVisible();

    // 2. Assert: The slider's default value is 20, and the corresponding label (`#label-points`) displays "20".
    await expect(pointsSlider).toHaveValue('20');
    await expect(page.locator('#label-points')).toHaveText('20');
    const initialDots = page.locator('#plot-container .trace.scatter .points path');
    await expect(initialDots).toHaveCount(20);

    // 3. Action: Drag the slider handle to the left to set its value to 15.
    await pointsSlider.fill('15');

    // 4. Assert: The label `#label-points` updates to "15", and the number of red dots on the plot decreases.
    await expect(page.locator('#label-points')).toHaveText('15');
    await expect(initialDots).toHaveCount(15);

    // 5. Action: Drag the slider handle to its maximum position.
    await pointsSlider.fill('30');

    // 6. Assert: The slider's value becomes 30, the label `#label-points` updates to "30", and the number of red dots on the plot increases to its maximum.
    await expect(pointsSlider).toHaveValue('30');
    await expect(page.locator('#label-points')).toHaveText('30');
    await expect(initialDots).toHaveCount(30);
  });
});

test.describe('Time (t) Slider Control', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForSelector('#plot-container .js-plotly-plot');
  });

  test('Time (t) Slider Control', async ({ page }) => {
    // Helper function to get the maximum Y value from a trace's data
    const getMaxY = (traceIndex) => {
        return page.evaluate((index) => {
            const plotDiv = document.getElementById('plot-container');
            if (plotDiv && plotDiv._fullData && plotDiv._fullData[index]) {
                const yData = plotDiv._fullData[index].y;
                return Math.max(...yData);
            }
            return null;
        }, traceIndex);
    };
    
    // 1. Assert: The "t" slider (`#slider-time`) is visible on the page.
    const timeSlider = page.locator('#slider-time');
    await expect(timeSlider).toBeVisible();

    // 2. Assert: The slider's default value is 0.05, and the corresponding label (`#label-time`) displays "0.050".
    await expect(timeSlider).toHaveValue('0.05');
    await expect(page.locator('#label-time')).toHaveText(/^0\.0500*$/);
    const initialMaxYCurve = await getMaxY(0); // Blue curve
    const initialMaxYDots = await getMaxY(1); // Red dots

    // 3. Action: Drag the slider handle to the right to set its value to 0.139.
    await timeSlider.fill('0.139');

    // 4. Assert: The label `#label-time` updates to "0.139", and the amplitude of the blue curve and red dots on the plot decreases.
    await expect(page.locator('#label-time')).toHaveText(/^0\.1390*$/);
    const decreasedMaxYCurve = await getMaxY(0);
    const decreasedMaxYDots = await getMaxY(1);
    expect(decreasedMaxYCurve).toBeLessThan(initialMaxYCurve);
    expect(decreasedMaxYDots).toBeLessThan(initialMaxYDots);

    // 5. Action: Drag the slider handle to its minimum position.
    await timeSlider.fill('0.001');

    // 6. Assert: The slider's value becomes 0.001, the label `#label-time` updates to "0.001", and the plot's curve reaches its maximum amplitude.
    await expect(timeSlider).toHaveValue('0.001');
    await expect(page.locator('#label-time')).toHaveText(/^0\.0010*$/);
    const maxAmplitudeYCurve = await getMaxY(0);
    const maxAmplitudeYDots = await getMaxY(1);
    expect(maxAmplitudeYCurve).toBeGreaterThan(decreasedMaxYCurve);
    expect(maxAmplitudeYDots).toBeGreaterThan(decreasedMaxYDots);
    expect(maxAmplitudeYCurve).toBeGreaterThan(initialMaxYCurve); // Should also be greater than initial
  });
});