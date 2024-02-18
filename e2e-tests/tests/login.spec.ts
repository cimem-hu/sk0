import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8080');
});

test.describe('LoginPage', () => {
  test('should render a form', async ({ page }) => {
    const loginFormLocator = await page.waitForSelector("form");
    expect(loginFormLocator).not.toBe(null);
  });

  test('should render a form and there should be two fields in it', async ({ page }) => {
    const emailLocator = page.getByLabel('Email cím');
    const passwordLocator = page.getByLabel('Jelszó');
    await expect(emailLocator).toBeVisible();
    await expect(passwordLocator).toBeVisible();
  });

  test('be able to fill the email input with an invalid email and get an error state', async ({ page }) => {
    const emailLocator = page.getByLabel('Email cím');
    const notValidText = "some_not_email address";
    await emailLocator.fill(notValidText);
    await expect(emailLocator).toHaveValue(notValidText);
    const buttonLocator = page.getByRole('button', { name: 'Bejelentkezés' });
    await expect(buttonLocator).toBeDisabled();
  });

});