import { Page } from '@playwright/test';

export const mockHarSøknadTilsynBarnFraFør = async (page: Page) => {
    await page.route('api/person/har-behandling?stonadstype=BARNETILSYN', async (route) => {
        await route.fulfill({ json: true });
    });
};

export const mockHarIngenSøknadTilsynBarnFraFør = async (page: Page) => {
    await page.route('api/person/har-behandling?stonadstype=BARNETILSYN', async (route) => {
        await route.fulfill({ json: false });
    });
};

export const mockHarSøknadLæremidlerFraFør = async (page: Page) => {
    await page.route('api/person/har-behandling?stonadstype=L%C3%86REMIDLER', async (route) => {
        await route.fulfill({ json: true });
    });
};

export const mockHarIngenSøknadLæremidlerFraFør = async (page: Page) => {
    await page.route('api/person/har-behandling?stonadstype=L%C3%86REMIDLER', async (route) => {
        await route.fulfill({ json: false });
    });
};
