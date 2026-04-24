import { Page } from '@playwright/test';

export const mockSøknadRoutingApi = async (page: Page) => {
    await page.route('api/skjema-routing', async (route) => {
        const json = { aksjon: 'NY_LØSNING' };
        await route.fulfill({ json });
    });
};
