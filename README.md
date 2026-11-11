# E2E та Screenshot тестування (Лабораторна робота №6)

Навчальний та індивідуальний веб-проєкт із автоматизованого E2E та візуального (Screenshot) тестування за допомогою **Playwright** та **JavaScript**.

## Конфігурація браузерів (`playwright.config.js`)
- `chromium` (`Desktop Chrome`)
- `firefox` (`Desktop Firefox`)
- `webkit` (`Desktop Safari` — додатковий браузер)
- `Mobile Chrome` (`Pixel 5` — мобільний профіль)

## Структура проєкту
- `public/index.html` — локальна сторінка авторизації
- `public/tasks.html` — локальний веб-додаток TodoManager
- `tests/e2e/local.test.js` — E2E тести локальної форми входу (3 тести)
- `tests/e2e/playwright.test.js` — E2E тести сайту `https://playwright.dev/` (3 тести)
- `tests/e2e/todomvc.e2e.spec.js` — індивідуальні E2E тести для `tasks.html` та продакшн-додатку `https://todomvc.com/examples/react/dist/` (5 тестів)
- `tests/screenshots/local.spec.js` — Screenshot тести для `public/index.html` (2 тести)
- `tests/screenshots/tasks.screenshot.spec.js` — Screenshot тести для `public/tasks.html` (2 тести)

## Команди запуску
```bash
npm install
npx playwright install
npx playwright test --update-snapshots
npm test
npx playwright show-report
```
