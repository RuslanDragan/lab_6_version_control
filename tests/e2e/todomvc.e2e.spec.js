// tests/e2e/todomvc.e2e.spec.js
const { test, expect } = require('@playwright/test');

test.describe('E2E тести локального TodoManager (tasks.html)', () => {
    test('1. Додавання нового завдання та оновлення лічильника', async ({ page }) => {
        await page.goto('http://localhost:3000/tasks.html');
        await page.fill('#newTaskInput', 'Налаштувати Playwright');
        await page.click('#addTaskBtn');
        await expect(page.locator('#taskList li')).toHaveCount(1);
        await expect(page.locator('#taskList li span')).toHaveText('Налаштувати Playwright');
        await expect(page.locator('#tasksCounter')).toHaveText('Активних завдань: 1');
    });

    test('2. Позначення завдання виконаним та видалення елемента', async ({ page }) => {
        await page.goto('http://localhost:3000/tasks.html');
        await page.fill('#newTaskInput', 'Виконати ЛР6');
        await page.click('#addTaskBtn');
        await page.click('#taskList li span');
        await expect(page.locator('#taskList li')).toHaveClass(/completed/);
        await expect(page.locator('#tasksCounter')).toHaveText('Активних завдань: 0');
        await page.click('#taskList li .del-btn');
        await expect(page.locator('#taskList li')).toHaveCount(0);
    });

    test('3. Валідація порожнього поля вводу завдання', async ({ page }) => {
        await page.goto('http://localhost:3000/tasks.html');
        await page.click('#addTaskBtn');
        await expect(page.locator('#validationError')).toBeVisible();
        await expect(page.locator('#validationError')).toHaveText('Назва завдання не може бути порожньою!');
    });
});

test.describe('E2E тести продакшн-додатку TodoMVC React', () => {
    const TODOMVC_URL = 'https://todomvc.com/examples/react/dist/';

    test('4. Додавання завдань та фільтрація Active / Completed на TodoMVC', async ({ page }) => {
        await page.goto(TODOMVC_URL);
        const input = page.getByTestId('text-input');
        await input.fill('Активна справа');
        await input.press('Enter');
        await input.fill('Завершена справа');
        await input.press('Enter');

        await page.getByTestId('todo-item-toggle').nth(1).check();
        await expect(page.locator('.todo-count')).toHaveText('1 item left!');

        await page.click('a[href="#/active"]');
        await expect(page.getByTestId('todo-item')).toHaveCount(1);
        await expect(page.getByTestId('todo-item-label')).toHaveText('Активна справа');

        await page.click('a[href="#/completed"]');
        await expect(page.getByTestId('todo-item')).toHaveCount(1);
        await expect(page.getByTestId('todo-item-label')).toHaveText('Завершена справа');
    });

    test('5. Редагування завдання подвійним кліком та Clear completed на TodoMVC', async ({ page }) => {
        await page.goto(TODOMVC_URL);
        const input = page.getByTestId('text-input');
        await input.fill('Стара назва');
        await input.press('Enter');

        await page.getByTestId('todo-item-label').dblclick();
        const editInput = page.locator('.todo-list li.editing .edit');
        await editInput.fill('Оновлена назва');
        await editInput.press('Enter');

        await expect(page.getByTestId('todo-item-label')).toHaveText('Оновлена назва');
        await page.getByTestId('todo-item-toggle').check();
        await page.click('.clear-completed');
        await expect(page.getByTestId('todo-item')).toHaveCount(0);
    });
});
