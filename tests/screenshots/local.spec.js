// tests/screenshots/local.spec.js
const { test, expect } = require('@playwright/test');

test('Перевірка змін сторінки за скриншотом', async ({ page }) => {
    await page.goto('http://localhost:3000');
    expect(await page.screenshot()).toMatchSnapshot('local-page-index.png');
});

test('Порівняння скриншота елемента h1', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const element = page.locator('h1');
    expect(await element.screenshot()).toMatchSnapshot('local-page-element-h1.png');
});
