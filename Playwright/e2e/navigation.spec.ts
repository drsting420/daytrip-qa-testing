import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('M-08: Navigation', () => {

  test('TC-AUTO-006: Header logo navigates to homepage', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  await page.goto('/en/about');
  // Logo is an image link in header — use img alt text or header locator
  await page.locator('header a').first().click();

  await expect(page).toHaveURL(/transfers|daytrip\.com\/(en)?$/);
  await expect(homePage.fromField).toBeVisible({ timeout: 10000 });
  });

  test('TC-AUTO-007: Sign in button opens Find my booking modal', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByText('Find my booking')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Allow all cookies' })).not.toBeVisible();
  });

  test('TC-AUTO-008: Language switcher is visible in footer', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  // Language switcher shows current language as "English (US)" link
  await expect(page.getByRole('link', { name: 'English (US)' })).toBeVisible();
  });

});