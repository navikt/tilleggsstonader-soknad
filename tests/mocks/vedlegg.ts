import { Page } from '@playwright/test';

export const mockLastOppVedlegg = async (page: Page) => {
    await page.route('api/vedlegg/tillegg', async (route) => {
        await route.fulfill({ json: { dokumentId: 'test-dokument-id' } });
    });
};
