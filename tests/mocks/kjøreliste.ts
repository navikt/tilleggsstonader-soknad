import { Page } from '@playwright/test';

import { Kjøreliste } from '../../src/frontend/kjørelister/types/Kjøreliste';
import { Rammevedtak } from '../../src/frontend/kjørelister/types/Rammevedtak';

export const mockRammevedtak = async (page: Page, overrides?: Partial<Rammevedtak>) => {
    const defaultRammevedtak: Rammevedtak = {
        reiseId: 'reise-123',
        fom: '2025-02-03',
        tom: '2025-02-09',
        aktivitetsadresse: 'Testveien 1, 0100 Oslo',
        aktivitetsnavn: 'UTDANNING',
        uker: [
            {
                ukeNummer: 6,
                fom: '2025-02-03',
                tom: '2025-02-09',
                reisedagerPerUke: 5,
                innsendtDato: null,
                kanSendeInnKjøreliste: true,
            },
        ],
        helligdager: [
            {
                dato: '2025-02-07',
                navn: 'Fredag før fastelavnsmandag',
            },
        ],
        ...overrides,
    };

    await page.route('api/kjorelister/rammevedtak/*', async (route) => {
        await route.fulfill({ json: defaultRammevedtak });
    });
};

export const mockTidligereInnsendt = async (page: Page, kjøreliste: Kjøreliste | null = null) => {
    await page.route('api/kjorelister/*', async (route) => {
        if (route.request().method() === 'GET') {
            await route.fulfill({ json: kjøreliste });
        }
    });
};

export const mockSendInnKjøreliste = async (page: Page) => {
    await page.route('api/kjorelister', async (route) => {
        if (route.request().method() === 'POST') {
            const json = {
                mottattTidspunkt: '2025-02-02T10:50:09.906814',
                saksnummer: 123456,
            };
            await route.fulfill({ json });
        } else {
            route.continue();
        }
    });
};
