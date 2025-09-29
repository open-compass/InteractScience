const { test, expect } = require('@playwright/test');

test.describe('Comparing Algorithms for the Traveling Salesman Problem', () => {
    const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/ComparingAlgorithmsForTheTravelingSalesmanProblem.html');

    test('Initial state with 10 points and a "Tie" result', async ({ page }) => {
        await page.goto(fileUrl);
        await page.screenshot({ path: './snapshots/ComparingAlgorithmsForTheTravelingSalesmanProblem-1.png', fullPage: true });
    });

    test('State with 30 points and "Mathematica wins" result', async ({ page }) => {
        await page.goto(fileUrl);
        await page.locator('#slider-points').fill('30');
        await page.locator('#btn-random-set').click();
        await page.screenshot({ path: './snapshots/ComparingAlgorithmsForTheTravelingSalesmanProblem-2.png', fullPage: true });
    });

    test('State with 30 points and a different "Tie" result', async ({ page }) => {
        await page.goto(fileUrl);
        await page.locator('#slider-points').fill('30');
        await page.locator('#btn-random-set').click();
        await page.screenshot({ path: './snapshots/ComparingAlgorithmsForTheTravelingSalesmanProblem-3.png', fullPage: true });
    });

    test('State with 40 points and "3-Opt wins" result', async ({ page }) => {
        await page.goto(fileUrl);
        await page.locator('#slider-points').fill('40');
        await page.locator('#btn-random-set').click();
        await page.screenshot({ path: './snapshots/ComparingAlgorithmsForTheTravelingSalesmanProblem-4.png', fullPage: true });
    });
});