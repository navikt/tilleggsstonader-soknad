import { Page } from '@playwright/test';

export const velgLand = async (page: Page, label: string, landnavn: string) => {
    const combobox = page.getByRole('combobox', { name: label });
    await combobox.click();
    await combobox.fill(landnavn);
    await page.getByRole('option', { name: landnavn }).click();
};
