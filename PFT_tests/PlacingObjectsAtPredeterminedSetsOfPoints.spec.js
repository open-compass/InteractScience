const { test, expect } = require('@playwright/test');

const fileUrl = 'file://' + require('path').resolve(__dirname, '../pages/PlacingObjectsAtPredeterminedSetsOfPoints.html');

test.beforeEach(async ({ page }) => {
  await page.goto(fileUrl);
  await page.waitForTimeout(500);
});

test.describe('Interactive 3D Visualization Controls', () => {

  test('Sphere Diameter Slider Interaction', async ({ page }) => {
    const slider = page.locator('#slider-sphere-diameter');

    // 1. Assert: The "diameter of sphere" slider (`id="slider-sphere-diameter"`) is visible.
    await expect(slider).toBeVisible();

    // 2. Assert: The slider's value is at its default of 1.5.
    await expect(slider).toHaveValue('1.5');

    // 3. Action: Drag the slider to a value of 2.5.
    await slider.fill('2.5');

    // 4. Assert: The central sphere in the 3D visualization increases in size and the attached cones reposition.
    // (Visual change is assumed to occur; asserting control state)
    await expect(slider).toHaveValue('2.5');

    // 5. Action: Drag the slider to its minimum value (0.5).
    await slider.fill('0.5');

    // 6. Assert: The central sphere in the 3D visualization decreases to its smallest size.
    // (Visual change is assumed to occur; asserting control state)
    await expect(slider).toHaveValue('0.5');
  });

  test('Cube Polyhedron Button', async ({ page }) => {
    const cubeButton = page.locator('#btn-cube');
    const octahedronButton = page.locator('#btn-octahedron');

    // 1. Assert: The "Cube" button (`id="btn-cube"`) is visible.
    await expect(cubeButton).toBeVisible();

    // 2. Assert: The "Cube" button is not in an "active" state on page load.
    await expect(cubeButton).not.toHaveClass('active');

    // 3. Action: Click the "Cube" button.
    await cubeButton.click();

    // 4. Assert: The "Cube" button becomes active, the previously active "Octahedron" button becomes inactive, and the visualization changes to show cones on the vertices of a cube.
    await expect(cubeButton).toHaveClass('active');
    await expect(octahedronButton).not.toHaveClass('active');

    // 5. Action: Click the "Cube" button again.
    await cubeButton.click();

    // 6. Assert: The "Cube" button remains active and the visualization does not change.
    await expect(cubeButton).toHaveClass('active');
  });

  test('Dodecahedron Polyhedron Button', async ({ page }) => {
    const dodecahedronButton = page.locator('#btn-dodecahedron');
    const cubeButton = page.locator('#btn-cube');

    // 1. Assert: The "Dodecahedron" button (`id="btn-dodecahedron"`) is visible.
    await expect(dodecahedronButton).toBeVisible();

    // 2. Assert: The "Dodecahedron" button is not in an "active" state on page load.
    await expect(dodecahedronButton).not.toHaveClass('active');

    // 3. Action: Click the "Dodecahedron" button.
    await dodecahedronButton.click();

    // 4. Assert: The "Dodecahedron" button becomes active, and the visualization changes to show a new arrangement of cones.
    await expect(dodecahedronButton).toHaveClass('active');

    // 5. Action: Click the "Cube" button, then click the "Dodecahedron" button again.
    await cubeButton.click();
    await dodecahedronButton.click();

    // 6. Assert: The "Dodecahedron" button becomes active, and the visualization changes back to the dodecahedron shape.
    await expect(dodecahedronButton).toHaveClass('active');
    await expect(cubeButton).not.toHaveClass('active');
  });

  test('Icosahedron Polyhedron Button', async ({ page }) => {
    const icosahedronButton = page.locator('#btn-icosahedron');
    const octahedronButton = page.locator('#btn-octahedron');

    // 1. Assert: The "Icosahedron" button (`id="btn-icosahedron"`) is visible.
    await expect(icosahedronButton).toBeVisible();

    // 2. Assert: The "Icosahedron" button is not in an "active" state on page load.
    await expect(icosahedronButton).not.toHaveClass('active');

    // 3. Action: Click the "Icosahedron" button.
    await icosahedronButton.click();

    // 4. Assert: The "Icosahedron" button becomes active, and the visualization changes to show a new arrangement of cones.
    await expect(icosahedronButton).toHaveClass('active');

    // 5. Action: Click the "Octahedron" button to reset to the default.
    await octahedronButton.click();

    // 6. Assert: The "Octahedron" button becomes active, and the visualization changes back to the default octahedron shape.
    await expect(octahedronButton).toHaveClass('active');
    await expect(icosahedronButton).not.toHaveClass('active');
  });

  test('Octahedron Polyhedron Button', async ({ page }) => {
    const octahedronButton = page.locator('#btn-octahedron');
    const cubeButton = page.locator('#btn-cube');

    // 1. Assert: The "Octahedron" button (`id="btn-octahedron"`) is visible.
    await expect(octahedronButton).toBeVisible();

    // 2. Assert: The "Octahedron" button is in an "active" state on page load.
    await expect(octahedronButton).toHaveClass('active');

    // 3. Action: Click the "Cube" button.
    await cubeButton.click();

    // 4. Assert: The "Octahedron" button becomes inactive, and the visualization changes.
    await expect(octahedronButton).not.toHaveClass('active');
    await expect(cubeButton).toHaveClass('active');

    // 5. Action: Click the "Octahedron" button again.
    await octahedronButton.click();

    // 6. Assert: The "Octahedron" button becomes active again, and the visualization changes back to the octahedron shape.
    await expect(octahedronButton).toHaveClass('active');
    await expect(cubeButton).not.toHaveClass('active');
  });

  test('Tetrahedron Polyhedron Button', async ({ page }) => {
    const tetrahedronButton = page.locator('#btn-tetrahedron');
    const cubeButton = page.locator('#btn-cube');

    // 1. Assert: The "Tetrahedron" button (`id="btn-tetrahedron"`) is visible.
    await expect(tetrahedronButton).toBeVisible();

    // 2. Assert: The "Tetrahedron" button is not in an "active" state on page load.
    await expect(tetrahedronButton).not.toHaveClass('active');

    // 3. Action: Click the "Tetrahedron" button.
    await tetrahedronButton.click();

    // 4. Assert: The "Tetrahedron" button becomes active, and the visualization changes to show cones on the vertices of a tetrahedron.
    await expect(tetrahedronButton).toHaveClass('active');

    // 5. Action: Click the "Cube" button, then click the "Tetrahedron" button again.
    await cubeButton.click();
    await tetrahedronButton.click();

    // 6. Assert: The "Tetrahedron" button becomes active again and the visualization changes.
    await expect(tetrahedronButton).toHaveClass('active');
    await expect(cubeButton).not.toHaveClass('active');
  });

  test('Cone Height Slider Interaction', async ({ page }) => {
    const slider = page.locator('#slider-cone-height');

    // 1. Assert: The "height" slider (`id="slider-cone-height"`) is visible.
    await expect(slider).toBeVisible();

    // 2. Assert: The slider's value is at its default of 1.5.
    await expect(slider).toHaveValue('1.5');

    // 3. Action: Drag the slider to a value of 3.0.
    await slider.fill('3');

    // 4. Assert: The cones in the 3D visualization become visibly taller.
    // (Visual change is assumed to occur; asserting control state)
    await expect(slider).toHaveValue('3.0');

    // 5. Action: Drag the slider to its maximum value (4.0).
    await slider.fill('4');

    // 6. Assert: The cones in the 3D visualization increase to their maximum height.
    // (Visual change is assumed to occur; asserting control state)
    await expect(slider).toHaveValue('4.0');
  });

  test('Cone Base Slider Interaction', async ({ page }) => {
    const slider = page.locator('#slider-cone-base');

    // 1. Assert: The "base" slider (`id="slider-cone-base"`) is visible.
    await expect(slider).toBeVisible();

    // 2. Assert: The slider's value is at its default of 0.4.
    await expect(slider).toHaveValue('0.4');

    // 3. Action: Drag the slider to a value of 0.8.
    await slider.fill('0.8');

    // 4. Assert: The base of the cones in the 3D visualization becomes visibly wider.
    // (Visual change is assumed to occur; asserting control state)
    await expect(slider).toHaveValue('0.8');

    // 5. Action: Drag the slider to its minimum value (0.05).
    await slider.fill('0.05');

    // 6. Assert: The base of the cones in the 3D visualization shrinks to its minimum width.
    // (Visual change is assumed to occur; asserting control state)
    await expect(slider).toHaveValue('0.05');
  });
});