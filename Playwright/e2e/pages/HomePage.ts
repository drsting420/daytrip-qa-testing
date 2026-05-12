import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  readonly fromField: Locator;
  readonly toField: Locator;
  readonly departureDateField: Locator;
  readonly searchButton: Locator;
  readonly transfersTab: Locator;
  readonly byTheHourTab: Locator;
  readonly acceptCookiesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fromField = page.getByPlaceholder('From city, hotel, airport').first();
    this.toField = page.getByPlaceholder('To city, hotel, airport').first();
    this.departureDateField = page.getByRole('button', { name: 'Departure' });
    this.searchButton = page.getByRole('button', { name: 'Search' }).first();
    this.transfersTab = page.getByRole('tab', { name: 'Transfers' });
    this.byTheHourTab = page.getByRole('tab', { name: 'By the hour' });
    this.acceptCookiesButton = page.getByRole('button', { name: 'Allow all cookies' });
  }

  async goto() {
    await this.page.goto('/en/transfers');
    await this.acceptCookiesIfPresent();
  }

  async acceptCookiesIfPresent() {
    try {
      await this.acceptCookiesButton.waitFor({ timeout: 5000 });
      await this.acceptCookiesButton.click();
    } catch {
      // Cookie banner not present — continue
    }
  }

  async searchTransfer(from: string, to: string) {
    await this.fromField.click();
    await this.fromField.fill(from);
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('option').first().click();

    await this.toField.click();
    await this.toField.fill(to);
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('option').first().click();
  }

  async selectDepartureDate() {
    await this.departureDateField.click();
    await this.page.getByRole('button', { name: 'Saturday, June 6,' }).click();
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(500);
  }
}