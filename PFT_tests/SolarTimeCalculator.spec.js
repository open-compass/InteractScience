const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/SolarTimeCalculator.html');

test.describe('Solar Time Calculator', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for p5.js canvas to be potentially drawn, and initial values to be set.
    // await page.waitForSelector('#local-clock-canvas');
    // await page.waitForSelector('#solar-clock-canvas');
    await page.waitForTimeout(500);
  });

  test('Date Slider Control', async ({ page }) => {
    // 1. Assert: The "date" slider (`id="date-slider"`) is visible on the page.
    const dateSlider = page.locator('#date-slider');
    await expect(dateSlider).toBeVisible();

    // 2. Assert: The slider's value is 340, and the adjacent date display (`id="date-display"`) shows "Friday, 07 December".
    await expect(dateSlider).toHaveValue('340');
    const dateDisplay = page.locator('#date-display');
    await expect(dateDisplay).toHaveText('Friday, 07 December');
    
    // Store initial values for comparison
    const offsetDisplay = page.locator('#offset-display');
    const initialOffset = await offsetDisplay.textContent();
    const solarTimeDisplay = page.locator('#solar-time-digital');
    const initialSolarTime = await solarTimeDisplay.textContent();

    // 3. Action: Drag the slider to a different value, such as 215.
    await dateSlider.fill('215');

    // 4. Assert: The date display updates to "Saturday, 04 August", and the `offset-display` value changes.
    await expect(dateDisplay).toHaveText('Saturday, 04 August');
    await expect(offsetDisplay).not.toHaveText(initialOffset);

    // 5. Action: Drag the slider to its minimum value, 0.
    await dateSlider.fill('0');

    // 6. Assert: The date display updates to "January 1st" (or similar), and the solar time shown in `solar-time-digital` changes.
    await expect(dateDisplay).toContainText('01 January');
    // Wait for the next 1-second update cycle to ensure the time has been recalculated
    await page.waitForTimeout(1100); 
    await expect(solarTimeDisplay).not.toHaveText(initialSolarTime);
  });

  test('Today Button Control', async ({ page }) => {
    // 1. Assert: The "today" button (`id="today-button"`) is visible on the page.
    const todayButton = page.locator('#today-button');
    await expect(todayButton).toBeVisible();

    // 2. Assert: The date slider's value is initially set to 340, which is likely not the current date.
    const dateSlider = page.locator('#date-slider');
    await expect(dateSlider).toHaveValue('340');

    // 3. Action: Click the "today" button.
    await todayButton.click();

    // 4. Assert: The `date-slider`'s value changes from 340 to the current day of the year, and the `date-display` updates to show the current date.
    const getDayOfYear = (date) => {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay) - 1;
    };
    const today = new Date();
    const currentDayOfYear = getDayOfYear(today);
    const expectedDateString = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: '2-digit', month: 'long' }).format(today);
    const dateDisplay = page.locator('#date-display');

    await expect(dateSlider).toHaveValue(String(currentDayOfYear));
    await expect(dateDisplay).toHaveText(expectedDateString);

    // 5. Action: Move the slider to a different value (e.g., 150) and then click the "today" button again.
    await dateSlider.fill('150');
    // Wait for the update cycle to register the change
    await page.waitForTimeout(1100);
    const offsetDisplay = page.locator('#offset-display');
    const offsetAt150 = await offsetDisplay.textContent();
    
    await todayButton.click();

    // 6. Assert: The `date-slider`'s value and the `date-display` text revert to reflect the current date, and the `offset-display` value is updated.
    await expect(dateSlider).toHaveValue(String(currentDayOfYear));
    await expect(dateDisplay).toHaveText(expectedDateString);
    await expect(offsetDisplay).not.toHaveText(offsetAt150);
  });
});