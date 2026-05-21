import { expect, Page, test } from '@playwright/test';

import { mockAktivitet } from '../../mocks/aktivitet';
import { søknadBaseUrl } from '../../utils/utils';
import { forventIngenWcagViolations } from '../../utils/wcag';

const urlSøknad = `${søknadBaseUrl}/reise-til-samling`;

const fjernWebpackOverlay = async (page: Page) => {
    await page.evaluate(() => {
        document.querySelector('#webpack-dev-server-client-overlay')?.remove();
    });
};

test('At reise til samling viser førstesiden og går videre fra din situasjon', async ({ page }) => {
    await mockAktivitet(page);
    await page.goto(urlSøknad);
    await fjernWebpackOverlay(page);

    await expect(
        page.getByRole('heading', { name: 'Søknad om støtte ved reise til samling' })
    ).toBeVisible();
    await expect(page.getByText('Vi dekker den billigste reisemåten.')).toBeVisible();
    await expect(
        page.getByText(
            'Du får støtten utbetalt i etterkant, basert på kvitteringene du sender inn.'
        )
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Start søknad' })).toBeVisible();

    await forventIngenWcagViolations(page);

    await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
    await page.getByRole('button', { name: 'Start søknad' }).click();
    await fjernWebpackOverlay(page);

    await expect(page).toHaveURL(`${urlSøknad}/hovedytelse`);
    await expect(page.getByRole('heading', { name: 'Din situasjon' })).toBeVisible();
    await expect(
        page.getByRole('group', { name: 'Mottar du eller har du nylig søkt om noe av dette?' })
    ).toBeVisible();

    await forventIngenWcagViolations(page);

    await page.getByRole('checkbox', { name: 'Arbeidsavklaringspenger (AAP)' }).check();
    await page.getByRole('button', { name: 'Neste' }).click();
    await fjernWebpackOverlay(page);

    await expect(page).toHaveURL(`${urlSøknad}/aktivitet`);
    await expect(page.getByRole('heading', { name: 'Arbeidsrettet aktivitet' })).toBeVisible();
    await expect(
        page.getByText('Vi viser aktivitetene som er registrert på deg de siste 3 månedene.')
    ).toBeVisible();

    await forventIngenWcagViolations(page);

    await page.getByLabel('Type navn: 2. februar 2025 - 2. februar 2025').check();
    await page
        .getByRole('radiogroup', { name: 'Mottar du lønn gjennom et tiltak?' })
        .getByLabel('Nei')
        .check();
    await page.getByRole('button', { name: 'Neste' }).click();
    await fjernWebpackOverlay(page);

    await expect(page).toHaveURL(`${urlSøknad}/neste-steg`);
    await expect(
        page.getByRole('heading', { name: 'Neste steg er ikke klart ennå' })
    ).toBeVisible();

    await forventIngenWcagViolations(page);
});
