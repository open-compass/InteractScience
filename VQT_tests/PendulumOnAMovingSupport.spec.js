const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../pages/PendulumOnAMovingSupport.html');

test.describe('Pendulum on a Moving Support', () => {
    let page;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(fileUrl);
    });

    test.afterEach(async () => {
        await page.close();
    });

    test('Initial state of the pendulum with default parameters', async () => {
        await page.screenshot({ path: './snapshots/PendulumOnAMovingSupport-1.png', fullPage: true });
    });

    test('Pendulum hanging vertically after setting initial angle to zero', async () => {
        await page.locator('#slider-theta0').fill('0');
        await page.screenshot({ path: './snapshots/PendulumOnAMovingSupport-2.png', fullPage: true });
    });

    test('Pendulum positioned horizontally with positive initial velocity', async () => {
        await page.locator('#slider-theta0').fill('1.57');
        await page.locator('#slider-v0').fill('1');
        await page.screenshot({ path: './snapshots/PendulumOnAMovingSupport-3.png', fullPage: true });
    });

    test('Pendulum at a wide angle with negative initial velocity', async () => {
        await page.locator('#slider-theta0').fill('2.09');
        await page.locator('#slider-v0').fill('-1');
        await page.screenshot({ path: './snapshots/PendulumOnAMovingSupport-4.png', fullPage: true });
    });
});