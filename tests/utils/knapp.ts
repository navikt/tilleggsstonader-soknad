import { Page } from '@playwright/test';

export const klikkPåKnapp = (page: Page, label: string) =>
    page.getByRole('button', { name: label }).click();
