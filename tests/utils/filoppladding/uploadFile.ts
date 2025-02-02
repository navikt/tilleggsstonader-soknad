import { Page } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const lastOppFil = async (page: Page, label: string) => {
    await page.getByLabel(label).setInputFiles(path.join(__dirname, 'tom_bild.png'));
};
