import { Page } from '@playwright/test';

export const mockAktivitet = async (page: Page) => {
    await page.route('api/aktivitet', async (route) => {
        const json = {
            aktiviteter: [
                {
                    id: '1',
                    fom: '2025-02-02',
                    tom: '2025-02-02',
                    typeNavn: 'Type navn',
                    erUtdanning: false,
                    erUtdanningPåVgsNivå: false,
                    arrangør: 'Baker AS',
                },
            ],
            harAktiviteter: true,
            suksess: true,
        };
        await route.fulfill({ json });
    });
};

export const mockIngenAktivitet = async (page: Page) => {
    await page.route('api/aktivitet', async (route) => {
        const json = {
            aktiviteter: [],
            harAktiviteter: false,
            suksess: true,
        };
        await route.fulfill({ json });
    });
};
