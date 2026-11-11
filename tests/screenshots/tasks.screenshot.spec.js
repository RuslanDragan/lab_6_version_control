// tests/screenshots/tasks.screenshot.spec.js
const { test, expect } = require('@playwright/test');

test('Screenshot тест №1: Повна сторінка TodoManager (tasks.html)', async ({ page }) => {
    await page.goto('http://localhost:3000/tasks.html');
    await page.fill('#newTaskInput', 'Перевірити візуальний стан');
    await page.click('#addTaskBtn');
    expect(await page.screenshot()).toMatchSnapshot('tasks-full-page.png');
});

test('Screenshot тест №2: Картка списку завдань #taskAppCard', async ({ page }) => {
    await page.goto('http://localhost:3000/tasks.html');
    const card = page.locator('#taskAppCard');
    expect(await card.screenshot()).toMatchSnapshot('tasks-card-element.png');
});
