import { expect, Page, test } from '@playwright/test';

import { søknadBaseUrl } from '../../utils/utils';
import { forventIngenWcagViolations } from '../../utils/wcag';

const urlSøknad = `${søknadBaseUrl}/reise-til-samling`;

const fjernWebpackOverlay = async (page: Page) => {
    await page.evaluate(() => {
        document.querySelector('#webpack-dev-server-client-overlay')?.remove();
    });
};

test('At reise til samling viser førstesiden og går til neste steg', async ({ page }) => {
    await page.goto(urlSøknad);
    await fjernWebpackOverlay(page);

    await expect(
        page.getByRole('heading', { name: 'Søknad om støtte ved reise til samling' })
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Start søknad' })).toBeVisible();

    await forventIngenWcagViolations(page);

    await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
    await page.getByRole('button', { name: 'Start søknad' }).click();
    await fjernWebpackOverlay(page);

    await expect(page).toHaveURL(`${urlSøknad}/placeholder`);
    await expect(page.getByRole('heading', { name: 'Dette er neste steg' })).toBeVisible();

    await forventIngenWcagViolations(page);
});
