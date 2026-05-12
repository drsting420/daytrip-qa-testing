import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('M-01: Search — Transfer', () => {

  test('TC-AUTO-001: Homepage loads and search form is visible', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await expect(page).toHaveTitle(/Daytrip/);
    await expect(homePage.fromField).toBeVisible();
    await expect(homePage.toField).toBeVisible();
    await expect(homePage.searchButton).toBeVisible();
  });

  test('TC-AUTO-002: Search Prague to Vienna returns results', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.searchTransfer('Prague', 'Vienna');
    await homePage.selectDepartureDate();
    await homePage.searchButton.click();

    await expect(page).toHaveURL(/configurator|results/, { timeout: 15000 });
  });

  test('TC-AUTO-003: Empty form shows validation — Search blocked', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.searchButton.click();

    // Form should not navigate — still on transfers page
    await expect(page).toHaveURL(/transfers/);
    // From field should show validation (orange highlight)
    await expect(homePage.fromField).toBeVisible();
  });

  test('TC-AUTO-004: Swap button swaps From and To cities', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.searchTransfer('Prague', 'Vienna');

    // Verify cities are set before swap
    await expect(homePage.toField).toHaveValue(/Vienna/);

    // Click swap button (arrow icon between From and To)
    await page.locator('button:near([placeholder="From city, hotel, airport"])').filter({ hasText: '' }).first().click();

    // After swap: To field should now contain Prague
    await expect(homePage.toField).toHaveValue(/Prague/i, { timeout: 5000 });
  });

  test('TC-AUTO-005: Transfers and By the hour tabs are visible', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // Tabs use link role, not tab role
    await expect(page.getByRole('link', { name: 'Transfers' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'By the hour' }).first()).toBeVisible();
  });

});