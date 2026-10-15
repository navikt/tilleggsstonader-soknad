import { expect, test } from '@playwright/test';

import { mockAktivitet } from '../../mocks/aktivitet';
import { mockHarIngenSøknadFlyttingFraFør } from '../../mocks/harSøknadFraFør';
import { mockPersonApi } from '../../mocks/person';
import { mockSøknadRoutingApi } from '../../mocks/søknadRouting';
import { søknadBaseUrl } from '../../utils/utils';
import { forventIngenWcagViolations } from '../../utils/wcag';

const urlSøknad = `${søknadBaseUrl}/flytting`;

test('Flytting viser generiske steg fra forside til oppsummering', async ({ page }) => {
    await mockSøknadRoutingApi(page);
    await mockPersonApi(page);
    await mockAktivitet(page);
    await mockHarIngenSøknadFlyttingFraFør(page);

    await page.goto(urlSøknad);
    await expect(
        page.getByRole('heading', { name: 'Søknad om støtte ved flytting' })
    ).toBeVisible();
    await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
    await forventIngenWcagViolations(page);
    await page.getByRole('button', { name: 'Start søknad' }).click();

    await expect(page).toHaveURL(`${urlSøknad}/hovedytelse`);
    await expect(page.getByRole('heading', { name: 'Din situasjon' })).toBeVisible();
    await page.getByRole('button', { name: 'Neste' }).click();

    await expect(page).toHaveURL(`${urlSøknad}/vedlegg`);
    await expect(
        page.getByText('Dokumentasjonskrav for Flytting er ikke avklart ennå.')
    ).toBeVisible();
    await page.getByRole('button', { name: 'Neste' }).click();

    await expect(page).toHaveURL(`${urlSøknad}/oppsummering`);
    await expect(page.getByRole('heading', { name: 'Oppsummering' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Om deg' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Din situasjon' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Vedlegg' })).toBeVisible();
    await forventIngenWcagViolations(page);
});
