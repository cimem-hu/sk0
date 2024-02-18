const { Given, When, Then } = require('@cucumber/cucumber')
// import expect for assertion
const { expect } = require("@playwright/test")
const { page } = require("@playwright/test")

const url = 'http://localhost:8080'

Given('a user', () => {

    // return 'pending';
});

When('the user types an invalid email address {string}', async (value) => {
    await page.goto(url);
    const emailLocator = page.getByLabel('Email cím');
    await emailLocator.fill(value);
    // await expect(emailLocator).toHaveValue(value);
    // const buttonLocator = page.getByRole('button', { name: 'Bejelentkezés' });
    // TODO: should be
    // await expect(buttonLocator).toBeDisabled(); 
});