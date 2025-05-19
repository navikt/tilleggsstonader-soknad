import { Page } from '@playwright/test';

export const mockHarSøknadTilsynBarnFraFør = async (page: Page) => {
    await page.route('api/person/har-behandling?stonadstype=BARNETILSYN', async (route) => {
        const json = true;
        await route.fulfill({ json });
    });
};

export const mockHarSøknadLæremidlerFraFør = async (page: Page) => {
    await page.route('api/person/har-behandling?stonadstype=L%C3%86REMIDLER', async (route) => {
        const json = true;
        await route.fulfill({ json });
    });
};
