import { expect, Page, test } from '@playwright/test';

import { mockAktivitet } from '../../mocks/aktivitet';
import { mockHarIngenSøknadReiseOppstartAvslutningHjemreiseFraFør } from '../../mocks/harSøknadFraFør';
import { mockPersonApi } from '../../mocks/person';
import { mockSøknadRoutingApi } from '../../mocks/søknadRouting';
import { søknadBaseUrl } from '../../utils/utils';
import { forventIngenWcagViolations } from '../../utils/wcag';

const urlSøknad = `${søknadBaseUrl}/reise-oppstart-avslutning-hjemreise`;

const fjernWebpackOverlay = async (page: Page) => {
    await page.evaluate(() => {
        document.querySelector('#webpack-dev-server-client-overlay')?.remove();
    });
};

test('ROAH viser vedleggsteg når reisemåte krever dokumentasjon', async ({ page }) => {
    await mockSøknadRoutingApi(page);
    await mockPersonApi(page);
    await mockAktivitet(page);
    await mockHarIngenSøknadReiseOppstartAvslutningHjemreiseFraFør(page);

    await page.goto(urlSøknad);
    await fjernWebpackOverlay(page);

    await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
    await page.getByRole('button', { name: 'Start søknad' }).click();
    await fjernWebpackOverlay(page);

    await page.getByRole('checkbox', { name: 'Arbeidsavklaringspenger (AAP)' }).check();
    await page.getByRole('button', { name: 'Neste' }).click();
    await fjernWebpackOverlay(page);

    await page.getByLabel('Type navn: 2. februar 2025 - 2. februar 2025').check();
    await page
        .getByRole('radiogroup', { name: 'Mottar du lønn gjennom et tiltak?' })
        .getByLabel('Nei')
        .check();
    await page.getByRole('button', { name: 'Neste' }).click();
    await fjernWebpackOverlay(page);

    await page
        .getByRole('radiogroup', {
            name: 'Må du midlertidig bo borte hjemmefra for å delta på denne aktiviteten?',
        })
        .getByLabel('Ja')
        .check();
    await page.getByLabel('Fra dato').fill('01.06.2025');
    await page.getByLabel('Til dato').fill('31.12.2025');
    await page
        .getByRole('radiogroup', {
            name: 'Er det den folkeregistrerte adressen du skal flytte fra?',
        })
        .getByLabel('Ja')
        .check();
    await page.getByLabel('Gateadresse').fill('Testveien 1');
    await page.getByLabel('Postnummer').fill('0123');
    await page.getByLabel('Poststed').fill('Oslo');
    await page.getByRole('button', { name: 'Neste' }).click();
    await fjernWebpackOverlay(page);

    await page
        .getByRole('radiogroup', {
            name: 'Har du særlige behov som gir behov for flere hjemreiser?',
        })
        .getByLabel('Nei')
        .check();
    await page.getByRole('button', { name: 'Neste' }).click();
    await fjernWebpackOverlay(page);

    await page
        .getByRole('radiogroup', { name: 'Hvilken type reise søker du om?' })
        .getByLabel('Oppstart')
        .check();
    await page.getByLabel('Reisedato (dd.mm.åååå)').fill('15.06.2025');
    await page.getByRole('checkbox', { name: 'Offentlig transport' }).check();
    await page
        .getByLabel('Hva er totalutgiftene til offentlig transport for denne reisen?')
        .fill('500');
    await page.getByRole('button', { name: 'Neste' }).click();
    await fjernWebpackOverlay(page);

    await expect(page).toHaveURL(`${urlSøknad}/vedlegg`);
    await expect(page.getByRole('heading', { name: 'Vedlegg' })).toBeVisible();
    await expect(page.getByText('Dokumentasjon på reiseutgifter.')).toBeVisible();

    await page.getByRole('button', { name: 'Neste' }).click();
    await expect(page.getByRole('heading', { name: 'Vedlegg mangler' })).toBeVisible();
    await page.getByRole('button', { name: 'Ja, gå til neste side' }).click();
    await fjernWebpackOverlay(page);

    await expect(page).toHaveURL(`${urlSøknad}/oppsummering`);
    await expect(page.getByRole('heading', { name: 'Oppsummering' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Vedlegg' })).toBeVisible();

    await forventIngenWcagViolations(page);
});
