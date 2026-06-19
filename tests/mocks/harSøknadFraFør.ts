import { Page } from '@playwright/test';

export const mockHarSøknadTilsynBarnFraFør = async (page: Page) => {
    await page.route(
        'api/person/har-behandling?skjematype=S%C3%98KNAD_BARNETILSYN',
        async (route) => {
            await route.fulfill({ json: true });
        }
    );
};

export const mockHarIngenSøknadTilsynBarnFraFør = async (page: Page) => {
    await page.route(
        'api/person/har-behandling?skjematype=S%C3%98KNAD_BARNETILSYN',
        async (route) => {
            await route.fulfill({ json: false });
        }
    );
};

export const mockHarSøknadLæremidlerFraFør = async (page: Page) => {
    await page.route(
        'api/person/har-behandling?skjematype=S%C3%98KNAD_L%C3%86REMIDLER',
        async (route) => {
            await route.fulfill({ json: true });
        }
    );
};

export const mockHarIngenSøknadLæremidlerFraFør = async (page: Page) => {
    await page.route(
        'api/person/har-behandling?skjematype=S%C3%98KNAD_L%C3%86REMIDLER',
        async (route) => {
            await route.fulfill({ json: false });
        }
    );
};

export const mockHarIngenSøknadReiseTilSamlingFraFør = async (page: Page) => {
    await page.route(
        'api/person/har-behandling?skjematype=S%C3%98KNAD_REISE_TIL_SAMLING',
        async (route) => {
            await route.fulfill({ json: false });
        }
    );
};
