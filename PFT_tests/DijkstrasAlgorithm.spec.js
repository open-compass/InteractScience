const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/DijkstrasAlgorithm.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  // Wait for the canvas to be ready, p5.js might take a moment to initialize
  // await page.waitForSelector('#canvas-container canvas');
  await page.waitForTimeout(500);
});

test('"Start Over" Button Functionality', async ({ page }) => {
  // 1. Assert: The "start over" button is visible on the page.
  await expect(page.locator('#start-over-btn')).toBeVisible();

  // 2. Assert: The initial title is "Dijkstra's algorithm starting at vertex m".
  await expect(page.locator('#title-display')).toHaveText("Dijkstra's algorithm starting at vertex m");
  const initialCanvas = await page.locator('#canvas-container').screenshot();

  // 3. Action: Click the vertex button 'a', then click the "next step" button.
  await page.locator('#btn-a').click();
  await page.locator('#next-step-btn').click();

  // 4. Assert: The title changes to "starting at vertex a" and the canvas visualization updates (e.g., a new node turns red).
  await expect(page.locator('#title-display')).toHaveText("Dijkstra's algorithm starting at vertex a");
  const updatedCanvas = await page.locator('#canvas-container').screenshot();
  expect(updatedCanvas).not.toEqual(initialCanvas);

  // 5. Action: Click the "start over" button.
  await page.locator('#start-over-btn').click();

  // 6. Assert: The title reverts to "Dijkstra's algorithm starting at vertex m" and the canvas resets to its initial state.
  await expect(page.locator('#title-display')).toHaveText("Dijkstra's algorithm starting at vertex m");
  const revertedCanvas = await page.locator('#canvas-container').screenshot();
  expect(revertedCanvas).toEqual(initialCanvas);
});

test("Initial Vertex Selection Button ('a')", async ({ page }) => {
  // 1. Assert: The vertex selection button labeled 'a' is visible.
  await expect(page.locator('#btn-a')).toBeVisible();

  // 2. Assert: The default vertex button 'm' has a visually distinct active style, and the title displays "...starting at vertex m".
  // Assuming the active style is represented by a class containing "active"
  await expect(page.locator('#btn-m')).toHaveClass(/active/);
  await expect(page.locator('#btn-a')).not.toHaveClass(/active/);
  await expect(page.locator('#title-display')).toHaveText("Dijkstra's algorithm starting at vertex m");

  // 3. Action: Click the 'a' vertex button.
  await page.locator('#btn-a').click();

  // 4. Assert: The title updates to "Dijkstra's algorithm starting at vertex a", and the 'a' button now has the active style.
  await expect(page.locator('#title-display')).toHaveText("Dijkstra's algorithm starting at vertex a");
  await expect(page.locator('#btn-a')).toHaveClass(/active/);
  await expect(page.locator('#btn-m')).not.toHaveClass(/active/);

  // 5. Action: Click another vertex button (e.g., 'p').
  await page.locator('#btn-p').click();

  // 6. Assert: The title updates to "...starting at vertex p", and the 'a' button no longer has the active style.
  await expect(page.locator('#title-display')).toHaveText("Dijkstra's algorithm starting at vertex p");
  await expect(page.locator('#btn-a')).not.toHaveClass(/active/);
  await expect(page.locator('#btn-p')).toHaveClass(/active/);
});

test('"Fixed Example" Button Functionality', async ({ page }) => {
  // 1. Assert: The "fixed example" button is visible.
  await expect(page.locator('#fixed-example-btn')).toBeVisible();

  // 2. Assert: The graph displays the default fixed edge weights (e.g., edge m-n has weight 8).
  const fixedStateCanvas = await page.locator('#canvas-container').screenshot();

  // 3. Action: Click the "random example" button.
  await page.locator('#random-example-btn').click();

  // 4. Assert: The edge weights displayed on the canvas change from their default values.
  const randomStateCanvas = await page.locator('#canvas-container').screenshot();
  expect(randomStateCanvas).not.toEqual(fixedStateCanvas);

  // 5. Action: Click the "fixed example" button.
  await page.locator('#fixed-example-btn').click();

  // 6. Assert: The edge weights on the canvas revert to the defined fixed values (e.g., edge m-n is 8 again).
  const revertedStateCanvas = await page.locator('#canvas-container').screenshot();
  expect(revertedStateCanvas).toEqual(fixedStateCanvas);
});

test('"Random Example" Button Functionality', async ({ page }) => {
  // 1. Assert: The "random example" button is visible.
  await expect(page.locator('#random-example-btn')).toBeVisible();

  // 2. Assert: The graph initially displays the fixed edge weights. Note the weight of edge m-n (8).
  const initialCanvas = await page.locator('#canvas-container').screenshot();

  // 3. Action: Click the "random example" button.
  await page.locator('#random-example-btn').click();

  // 4. Assert: The edge weights on the canvas change. Note the new weight of edge m-n.
  const randomCanvas1 = await page.locator('#canvas-container').screenshot();
  expect(randomCanvas1).not.toEqual(initialCanvas);

  // 5. Action: Click the "random example" button again.
  await page.locator('#random-example-btn').click();

  // 6. Assert: The edge weights on the canvas change again, and the weight of edge m-n is different from the previously generated random weight.
  const randomCanvas2 = await page.locator('#canvas-container').screenshot();
  expect(randomCanvas2).not.toEqual(randomCanvas1);
});

test('"Next Step" Button for Algorithm Progression', async ({ page }) => {
  // 1. Assert: The "next step" button is visible.
  await expect(page.locator('#next-step-btn')).toBeVisible();

  // 2. Assert: The "next step" button is enabled on page load. The canvas shows only vertex 'm' with a non-infinity label.
  await expect(page.locator('#next-step-btn')).toBeEnabled();
  const initialCanvas = await page.locator('#canvas-container').screenshot();

  // 3. Action: Click the "next step" button.
  await page.locator('#next-step-btn').click();

  // 4. Assert: The canvas visualization updates; a new vertex and its label turn red, and a connecting edge turns blue.
  const oneStepCanvas = await page.locator('#canvas-container').screenshot();
  expect(oneStepCanvas).not.toEqual(initialCanvas);
  await expect(page.locator('#next-step-btn')).toBeEnabled();

  // 5. Action: Click the "next step" button repeatedly until the algorithm completes (all 16 vertices are visited).
  // The first click was above, so 14 more clicks are needed to visit all 16 vertices (m is visited on load, first click visits the next one).
  for (let i = 0; i < 14; i++) {
    await page.locator('#next-step-btn').click();
  }

  // After 15 clicks in total, one vertex remains. The button should still be enabled.
  await expect(page.locator('#next-step-btn')).toBeEnabled();

  // The 16th step (15th click) completes the algorithm.
  await page.locator('#next-step-btn').click();

  // 6. Assert: The "next step" button becomes disabled.
  await expect(page.locator('#next-step-btn')).toBeDisabled();
});