import { Page } from '@playwright/test';

export const mockSøknadRoutingApi = async (page: Page) => {
    await page.route('api/skjema-routing', async (route) => {
        const json = { skalBehandlesINyLøsning: true };
        await route.fulfill({ json });
    });
};
