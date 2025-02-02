import { Page } from '@playwright/test';

export const mockSendSøknadPassAvBarn = async (page: Page) => {
    await page.route('api/soknad/pass-av-barn', async (route) => {
        const json = { mottattTidspunkt: '2025-02-02T10:50:09.906814' };
        await route.fulfill({ json });
    });
};

export const mockSendSøknadLæremilder = async (page: Page) => {
    await page.route('api/soknad/laremidler', async (route) => {
        const json = { mottattTidspunkt: '2025-02-02T10:50:09.906814' };
        await route.fulfill({ json });
    });
};
