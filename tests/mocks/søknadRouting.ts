import { Page } from '@playwright/test';

export const mockSøknadRoutingApi = async (page: Page) => {
    await page.route('api/soknad-routing', async (route) => {
        const json = { skalBehandlesINyLøsning: true };
        await route.fulfill({ json });
    });
};
