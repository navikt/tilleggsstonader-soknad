import { expect, Page, test } from '@playwright/test';

import { mockAktivitet } from '../../mocks/aktivitet';
import { mockHarIngenSøknadFlyttingFraFør } from '../../mocks/harSøknadFraFør';
import { mockPersonApi } from '../../mocks/person';
import { mockSøknadRoutingApi } from '../../mocks/søknadRouting';
import { mockLastOppVedlegg } from '../../mocks/vedlegg';
import { lastOppFil } from '../../utils/filoppladding/uploadFile';
import { søknadBaseUrl } from '../../utils/utils';
import { forventIngenWcagViolations } from '../../utils/wcag';

const urlSøknad = `${søknadBaseUrl}/flytting`;

test.use({ baseURL: `${new URL(søknadBaseUrl).origin}/` });

test.beforeEach(async ({ page }) => {
    await mockSøknadRoutingApi(page);
    await mockPersonApi(page);
    await mockAktivitet(page);
    await mockHarIngenSøknadFlyttingFraFør(page);
    await mockLastOppVedlegg(page);
    await page.route('**/api/soknad/flytting', (route) =>
        route.fulfill({ json: { mottattTidspunkt: '2025-02-02T10:50:09.906814' } })
    );
});

const startSøknad = async (page: Page) => {
    await page.goto(urlSøknad);
    await expect(
        page.getByRole('heading', { name: 'Søknad om støtte ved flytting' })
    ).toBeVisible();
    await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
    await page.getByRole('button', { name: 'Start søknad' }).click();
    await expect(page).toHaveURL(`${urlSøknad}/flytting`);
};

const fyllFellesDetaljer = async (page: Page, nyJobb = false) => {
    await page
        .getByLabel(
            nyJobb
                ? 'Jeg flytter fordi jeg har fått ny jobb'
                : 'Jeg flytter i forbindelse med at jeg skal gjennomføre en aktivitet'
        )
        .check();
    await page.getByRole('textbox', { name: 'Flyttedato' }).fill('15.06.2025');
    await page.getByRole('textbox', { name: 'Gateadresse', exact: true }).fill('Testveien 1');
    await page.getByRole('textbox', { name: 'Postnummer', exact: true }).fill('0123');
    await page.getByRole('textbox', { name: 'Poststed', exact: true }).fill('Oslo');
    await page
        .getByRole('radiogroup', {
            name: 'Får du dekket utgiftene dine til flytting på annen måte enn med stønad fra Nav?',
        })
        .getByLabel('Ja', { exact: true })
        .check();
};

const fyllTilbud = async (page: Page) => {
    await page.getByLabel('Jeg vil bruke flyttebyrå').check();
    await page
        .getByRole('textbox', { name: 'Navn på flyttebyrå 1', exact: true })
        .fill('Testbyrå 1');
    await page.getByRole('textbox', { name: 'Beløp for flyttebyrå 1', exact: true }).fill('800,50');
    await page
        .getByRole('textbox', { name: 'Navn på flyttebyrå 2', exact: true })
        .fill('Testbyrå 2');
    await page.getByRole('textbox', { name: 'Beløp for flyttebyrå 2', exact: true }).fill('400.25');
};

const lastOppTilbud = async (page: Page, label: string) => {
    const response = page.waitForResponse('**/api/vedlegg/tillegg');
    await lastOppFil(page, label);
    await (await response).finished();
    await expect(page.getByText('Laster opp vedlegg...', { exact: true })).toHaveCount(0);
};

test('Byråtilbud viser at Nav dekker laveste tilbud og lar brukeren laste opp begge tilbud', async ({
    page,
}) => {
    await startSøknad(page);
    await fyllFellesDetaljer(page, true);
    await fyllTilbud(page);
    await expect(
        page.getByText(
            'Hvis du bruker flyttebyrå, må du hente inn to tilbud fra ulike flyttebyråer. Nav dekker utgiftene etter det laveste tilbudet.'
        )
    ).toBeVisible();
    await expect(page.getByRole('radiogroup', { name: 'Jeg velger å bruke' })).toHaveCount(0);
    await page.getByRole('textbox', { name: 'Beløp for flyttebyrå 2', exact: true }).fill('800,50');
    await page
        .getByRole('textbox', { name: 'Beløp for flyttebyrå 2', exact: true })
        .fill('ugyldig');
    await page.getByRole('textbox', { name: 'Beløp for flyttebyrå 2', exact: true }).fill('0');
    await forventIngenWcagViolations(page);
    await page.getByRole('button', { name: 'Neste' }).click();
    await expect(page).toHaveURL(`${urlSøknad}/vedlegg`);
    await lastOppTilbud(page, 'Tilbud fra flyttebyrå 1');
    await lastOppTilbud(page, 'Tilbud fra flyttebyrå 2');
    await expect(page.getByText('tom_bild.png', { exact: true })).toHaveCount(2);
    await page.getByRole('button', { name: 'Neste' }).click();
    await expect(page).toHaveURL(`${urlSøknad}/oppsummering`);
    await expect(page.getByText('Testbyrå 2, 0 kr', { exact: true })).toBeVisible();
    await forventIngenWcagViolations(page);
});

test('Obligatoriske svar og ugyldige datoer og tall stopper videreføring', async ({ page }) => {
    await startSøknad(page);
    await page.getByRole('button', { name: 'Neste' }).click();
    await expect(page.getByRole('link', { name: 'Du må oppgi hvorfor du flytter.' })).toBeVisible();
    await fyllFellesDetaljer(page, true);
    await page.getByLabel('Jeg flytter selv', { exact: true }).check();
    const avstand = page.getByRole('textbox', { name: 'Hvor lang reisevei har du?' });
    await avstand.fill('0');
    await page.getByRole('textbox', { name: 'Flyttedato' }).fill('31.02.2025');
    await page.getByRole('button', { name: 'Neste' }).click();
    await expect(
        page.getByRole('link', { name: 'Oppgi en gyldig flyttedato på formatet dd.mm.åååå.' })
    ).toBeVisible();
    await expect(
        page.getByRole('link', {
            name: 'Oppgi en avstand som er større enn 0, med inntil to desimaler.',
        })
    ).toBeVisible();
    await page
        .getByLabel('Jeg flytter i forbindelse med at jeg skal gjennomføre en aktivitet')
        .check();
    await page.getByRole('textbox', { name: 'Flyttedato' }).fill('15.06.2025');
    await avstand.fill('1.234');
    await page.getByRole('button', { name: 'Neste' }).click();
    await expect(page).toHaveURL(`${urlSøknad}/flytting`);
    await avstand.fill('1.25');
    await page.getByRole('textbox', { name: 'Bom', exact: true }).fill('-1');
    await page.getByRole('button', { name: 'Neste' }).click();
    await expect(
        page.getByRole('link', {
            name: 'Oppgi et beløp som er 0 eller større, med inntil to desimaler.',
        })
    ).toBeVisible();
    await page.getByRole('textbox', { name: 'Bom', exact: true }).fill('');
    await page.getByRole('button', { name: 'Neste' }).click();
    await expect(page).toHaveURL(`${urlSøknad}/vedlegg`);
});
