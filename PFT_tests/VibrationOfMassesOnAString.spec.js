const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/VibrationOfMassesOnAString.html');

// Helper function to get Plotly plot data (y-values of all traces)
const getPlotData = (page, selector) => {
    return page.evaluate(sel => {
        const plotElement = document.querySelector(sel);
        if (plotElement && plotElement.data) {
            return plotElement.data.map(trace => trace.y);
        }
        return null;
    }, selector);
};

// Helper function to get the time marker's x-position from a Plotly plot
const getTimeMarkerPosition = (page, selector) => {
    return page.evaluate(sel => {
        const plotElement = document.querySelector(sel);
        if (plotElement && plotElement.layout && plotElement.layout.shapes && plotElement.layout.shapes.length > 0) {
            return plotElement.layout.shapes[0].x0;
        }
        return 0; // Default to 0 if not found
    }, selector);
};

test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for Plotly to be ready by checking for a plot container's content
    // await page.waitForSelector('#displacement-plot-container .plot-container');
    // await page.waitForSelector('#velocity-plot-container .plot-container');
    await page.waitForTimeout(500);
});

test.describe('Tension Slider Control', () => {
    test('Tension Slider Control', async ({ page }) => {
        // 1. Assert: The "tension T" slider (`#slider-tension`) is visible.
        const tensionSlider = page.locator('#slider-tension');
        await expect(tensionSlider).toBeVisible();

        // 2. Assert: The tension slider's value is set to its default of 50.
        await expect(tensionSlider).toHaveValue('50');

        const displacementPlotSelector = '#displacement-plot-container';
        const velocityPlotSelector = '#velocity-plot-container';

        const initialDisplacementData = await getPlotData(page, displacementPlotSelector);
        const initialVelocityData = await getPlotData(page, velocityPlotSelector);

        // 3. Action: Drag the tension slider to a new value, such as 75.
        await tensionSlider.fill('75');

        // 4. Assert: The data series in the displacement and velocity plots are updated.
        const updatedDisplacementData1 = await getPlotData(page, displacementPlotSelector);
        const updatedVelocityData1 = await getPlotData(page, velocityPlotSelector);
        expect(updatedDisplacementData1).not.toEqual(initialDisplacementData);
        expect(updatedVelocityData1).not.toEqual(initialVelocityData);

        // 5. Action: Drag the tension slider to its minimum value, 1.
        await tensionSlider.fill('1');

        // 6. Assert: The data series in the displacement and velocity plots change again.
        const updatedDisplacementData2 = await getPlotData(page, displacementPlotSelector);
        const updatedVelocityData2 = await getPlotData(page, velocityPlotSelector);
        expect(updatedDisplacementData2).not.toEqual(updatedDisplacementData1);
        expect(updatedVelocityData2).not.toEqual(updatedVelocityData1);
    });
});

test.describe('Mass 1 Initial Displacement Slider', () => {
    test('Mass 1 Initial Displacement Slider', async ({ page }) => {
        // 1. Assert: The "x₁" slider (`#slider-x1`) is visible.
        const sliderX1 = page.locator('#slider-x1');
        await expect(sliderX1).toBeVisible();

        // 2. Assert: The x₁ slider's value is set to its default of 0.1.
        await expect(sliderX1).toHaveValue('0.1');

        const displacementPlotSelector = '#displacement-plot-container';
        const initialDisplacementData = await getPlotData(page, displacementPlotSelector);

        // 3. Action: Drag the x₁ slider to a new value, such as 0.4.
        await sliderX1.fill('0.4');

        // 4. Assert: The initial vertical position of the first mass in the main animation canvas changes, and the displacement plot updates to reflect the new initial condition.
        const updatedData1 = await getPlotData(page, displacementPlotSelector);
        expect(updatedData1).not.toEqual(initialDisplacementData);

        // 5. Action: Drag the x₁ slider to its maximum value, 0.5.
        await sliderX1.fill('0.5');

        // 6. Assert: The initial position of the first mass and the corresponding plots are updated again.
        const updatedData2 = await getPlotData(page, displacementPlotSelector);
        expect(updatedData2).not.toEqual(updatedData1);
    });
});

test.describe('Mass 2 Initial Displacement Slider', () => {
    test('Mass 2 Initial Displacement Slider', async ({ page }) => {
        // 1. Assert: The "x₂" slider (`#slider-x2`) is visible.
        const sliderX2 = page.locator('#slider-x2');
        await expect(sliderX2).toBeVisible();

        // 2. Assert: The x₂ slider's value is set to its default of 0.1.
        await expect(sliderX2).toHaveValue('0.1');
        
        const displacementPlotSelector = '#displacement-plot-container';
        const initialData = await getPlotData(page, displacementPlotSelector);

        // 3. Action: Drag the x₂ slider to a new value, such as -0.3.
        await sliderX2.fill('-0.3');

        // 4. Assert: The initial vertical position of the second mass in the main animation canvas changes, and the displacement plot updates.
        const updatedData1 = await getPlotData(page, displacementPlotSelector);
        expect(updatedData1).not.toEqual(initialData);

        // 5. Action: Drag the x₂ slider to its minimum value, -0.5.
        await sliderX2.fill('-0.5');

        // 6. Assert: The initial position of the second mass and the corresponding plots are updated again.
        const updatedData2 = await getPlotData(page, displacementPlotSelector);
        expect(updatedData2).not.toEqual(updatedData1);
    });
});

test.describe('Mass 3 Initial Displacement Slider', () => {
    test('Mass 3 Initial Displacement Slider', async ({ page }) => {
        // 1. Assert: The "x₃" slider (`#slider-x3`) is visible.
        const sliderX3 = page.locator('#slider-x3');
        await expect(sliderX3).toBeVisible();
        
        // 2. Assert: The x₃ slider's value is set to its default of 0.0.
        await expect(sliderX3).toHaveValue('0');

        const displacementPlotSelector = '#displacement-plot-container';
        const initialData = await getPlotData(page, displacementPlotSelector);

        // 3. Action: Drag the x₃ slider to a new value, such as 0.25.
        await sliderX3.fill('0.25');

        // 4. Assert: The initial vertical position of the third mass in the main animation canvas changes, and the displacement plot updates.
        const updatedData1 = await getPlotData(page, displacementPlotSelector);
        expect(updatedData1).not.toEqual(initialData);

        // 5. Action: Drag the x₃ slider to its maximum value, 0.5.
        await sliderX3.fill('0.5');

        // 6. Assert: The initial position of the third mass and the corresponding plots are updated again.
        const updatedData2 = await getPlotData(page, displacementPlotSelector);
        expect(updatedData2).not.toEqual(updatedData1);
    });
});

test.describe('Mass 1 Value Slider', () => {
    test('Mass 1 Value Slider', async ({ page }) => {
        // 1. Assert: The "m₁" slider (`#slider-m1`) is visible.
        const sliderM1 = page.locator('#slider-m1');
        await expect(sliderM1).toBeVisible();

        // 2. Assert: The m₁ slider's value is set to its default of 1.0.
        await expect(sliderM1).toHaveValue('1');

        const displacementPlotSelector = '#displacement-plot-container';
        const initialData = await getPlotData(page, displacementPlotSelector);

        // 3. Action: Drag the m₁ slider to a higher value, such as 1.8.
        await sliderM1.fill('1.8');

        // 4. Assert: The radius of the first mass in the main animation increases, and the data in the time plots is recalculated and redrawn.
        const updatedData1 = await getPlotData(page, displacementPlotSelector);
        expect(updatedData1).not.toEqual(initialData);

        // 5. Action: Drag the m₁ slider to its minimum value, 0.1.
        await sliderM1.fill('0.1');

        // 6. Assert: The radius of the first mass decreases, and the time plots are updated again.
        const updatedData2 = await getPlotData(page, displacementPlotSelector);
        expect(updatedData2).not.toEqual(updatedData1);
    });
});

test.describe('Mass 2 Value Slider', () => {
    test('Mass 2 Value Slider', async ({ page }) => {
        // 1. Assert: The "m₂" slider (`#slider-m2`) is visible.
        const sliderM2 = page.locator('#slider-m2');
        await expect(sliderM2).toBeVisible();

        // 2. Assert: The m₂ slider's value is set to its default of 1.0.
        await expect(sliderM2).toHaveValue('1');

        const displacementPlotSelector = '#displacement-plot-container';
        const initialData = await getPlotData(page, displacementPlotSelector);

        // 3. Action: Drag the m₂ slider to a lower value, such as 0.3.
        await sliderM2.fill('0.3');

        // 4. Assert: The radius of the second mass in the main animation decreases, and the data in the time plots is updated.
        const updatedData1 = await getPlotData(page, displacementPlotSelector);
        expect(updatedData1).not.toEqual(initialData);

        // 5. Action: Drag the m₂ slider to its maximum value, 2.0.
        await sliderM2.fill('2');

        // 6. Assert: The radius of the second mass increases, and the time plots are updated again.
        const updatedData2 = await getPlotData(page, displacementPlotSelector);
        expect(updatedData2).not.toEqual(updatedData1);
    });
});

test.describe('Mass 3 Value Slider', () => {
    test('Mass 3 Value Slider', async ({ page }) => {
        // 1. Assert: The "m₃" slider (`#slider-m3`) is visible.
        const sliderM3 = page.locator('#slider-m3');
        await expect(sliderM3).toBeVisible();

        // 2. Assert: The m₃ slider's value is set to its default of 1.0.
        await expect(sliderM3).toHaveValue('1');

        const displacementPlotSelector = '#displacement-plot-container';
        const initialData = await getPlotData(page, displacementPlotSelector);

        // 3. Action: Drag the m₃ slider to a new value, such as 1.5.
        await sliderM3.fill('1.5');
        
        // 4. Assert: The radius of the third mass in the main animation increases, and the data in the time plots is updated.
        const updatedData1 = await getPlotData(page, displacementPlotSelector);
        expect(updatedData1).not.toEqual(initialData);
        
        // 5. Action: Drag the m₃ slider to its minimum value, 0.1.
        await sliderM3.fill('0.1');

        // 6. Assert: The radius of the third mass decreases, and the time plots are updated again.
        const updatedData2 = await getPlotData(page, displacementPlotSelector);
        expect(updatedData2).not.toEqual(updatedData1);
    });
});

test.describe('Play/Pause Button Control', () => {
    test('Play/Pause Button Control', async ({ page }) => {
        const playPauseButton = page.locator('#btn-play-pause');
        const displacementPlotSelector = '#displacement-plot-container';

        // 1. Assert: The Play/Pause button (`#btn-play-pause`) is visible.
        await expect(playPauseButton).toBeVisible();

        // 2. Assert: The button displays the "Play" icon ("▶") and the animation is not running.
        await expect(playPauseButton).toHaveText('▶');
        expect(await getTimeMarkerPosition(page, displacementPlotSelector)).toBe(0);
        
        // 3. Action: Click the Play/Pause button.
        await playPauseButton.click();
        
        // 4. Assert: The button icon changes to "Pause" ("❚❚") and the vertical time marker on both plots begins to move.
        await expect(playPauseButton).toHaveText('❚❚');
        await page.waitForTimeout(500); // Allow time for animation to progress
        const timeAfterPlay = await getTimeMarkerPosition(page, displacementPlotSelector);
        expect(timeAfterPlay).toBeGreaterThan(0);

        // 5. Action: Click the Play/Pause button again.
        await playPauseButton.click();

        // 6. Assert: The button icon reverts to "Play" ("▶") and the vertical time marker on the plots stops moving.
        await expect(playPauseButton).toHaveText('▶');
        const timeAtPause = await getTimeMarkerPosition(page, displacementPlotSelector);
        await page.waitForTimeout(500); // Wait to ensure it hasn't moved
        const timeAfterPause = await getTimeMarkerPosition(page, displacementPlotSelector);
        expect(timeAfterPause).toBe(timeAtPause);
    });
});

test.describe('Reset Button Control', () => {
    test('Reset Button Control', async ({ page }) => {
        const resetButton = page.locator('#btn-reset');
        const playPauseButton = page.locator('#btn-play-pause');
        const displacementPlotSelector = '#displacement-plot-container';

        // 1. Assert: The Reset button (`#btn-reset`) is visible.
        await expect(resetButton).toBeVisible();

        // 2. Assert: The animation is in its initial state (time `t`=0).
        expect(await getTimeMarkerPosition(page, displacementPlotSelector)).toBe(0);

        // 3. Action: Click the Play button to start the animation and let it run for a short duration.
        await playPauseButton.click();
        await page.waitForTimeout(500);

        // 4. Assert: The positions of the masses in the animation change, and the time marker on the plots moves from 0.
        const timeAfterPlay = await getTimeMarkerPosition(page, displacementPlotSelector);
        expect(timeAfterPlay).toBeGreaterThan(0);

        // 5. Action: Click the Reset button.
        await resetButton.click();

        // 6. Assert: The animation pauses, the masses return to their initial positions based on the sliders, and the time marker on the plots returns to 0.
        await expect(playPauseButton).toHaveText('▶');
        expect(await getTimeMarkerPosition(page, displacementPlotSelector)).toBe(0);
    });
});