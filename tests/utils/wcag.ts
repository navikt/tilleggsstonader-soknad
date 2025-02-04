import AxeBuilder from '@axe-core/playwright';
import { Page, expect } from '@playwright/test';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
const checkWcag = async (page: Page) => new AxeBuilder({ page }).withTags(wcagTags).analyze();

export const forventIngenWcagViolations = async (page: Page) => {
    const wcagRes = await checkWcag(page);

    expect(wcagRes.violations).toEqual([]);
};
