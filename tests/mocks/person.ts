import { Page } from '@playwright/test';

export const mockPersonMedBarnApi = async (page: Page) => {
    await page.route('api/person/med-barn', async (route) => {
        const json = {
            fornavn: 'fornavn',
            alder: 20,
            visningsnavn: 'fornavn etternavn',
            adresse: 'Hildes vei 3 a, 0100 Oslo',
            barn: [
                {
                    ident: '08921997974',
                    fornavn: 'Ronja',
                    visningsnavn: 'Ronja Røverdatter',
                    fødselsdato: '2019-12-08',
                    alder: 5,
                },
                {
                    ident: '43921075201',
                    fornavn: 'Espen',
                    visningsnavn: 'Espen Askeladden',
                    fødselsdato: '2010-12-03',
                    alder: 14,
                },
            ],
        };
        await route.fulfill({ json });
    });
};

export const mockPersonApi = async (page: Page) => {
    await page.route('api/person', async (route) => {
        const json = {
            fornavn: 'fornavn',
            alder: 20,
            visningsnavn: 'fornavn etternavn',
            adresse: 'Hildes vei 3 a, 0100 Oslo',
        };
        await route.fulfill({ json });
    });
};
