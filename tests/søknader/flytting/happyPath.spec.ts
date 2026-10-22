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

test('Ny jobb og egen flytting viser oppsummering og sender riktig payload, også etter API-feil', async ({
    page,
}) => {
    await startSøknad(page);
    await fyllFellesDetaljer(page, true);
    await expect(page.getByRole('textbox', { name: 'Oppgi første dag i ny jobb' })).toHaveCount(0);
    await page.getByLabel('Jeg flytter selv', { exact: true }).check();
    await expect(
        page.getByText(
            'Du må dokumentere alle utgiftene du søker om. Hvis du ikke har dokumentasjonen nå, kan du ettersende den senere.'
        )
    ).toBeVisible();
    await page.getByRole('textbox', { name: 'Hvor lang reisevei har du?' }).fill('120,25');
    await page.getByRole('textbox', { name: 'Bom', exact: true }).fill('0');
    await page.getByRole('textbox', { name: 'Hengerleie', exact: true }).fill('350.50');
    await forventIngenWcagViolations(page);
    await page.getByRole('button', { name: 'Neste' }).click();
    await expect(page).toHaveURL(`${urlSøknad}/vedlegg`);
    await expect(
        page.getByText('Dokumentasjon av utgifter ved egen flytting', { exact: true })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Neste' }).click();
    const modal = page.getByRole('dialog', { name: 'Vedlegg mangler' });
    await expect(modal.getByText('Dokumentasjon av utgifter ved egen flytting')).toBeVisible();
    await modal.getByRole('button', { name: 'Ja, gå til neste side' }).click();
    await expect(page).toHaveURL(`${urlSøknad}/oppsummering`);
    await expect(page.getByText('120,25 km', { exact: true })).toBeVisible();
    await forventIngenWcagViolations(page);

    await page.route('**/api/soknad/flytting', (route) => route.fulfill({ status: 400 }));
    await page.getByRole('button', { name: 'Send inn søknad' }).click();
    await expect(page.getByText('Innsending feilet, prøv på nytt.')).toBeVisible();
    await page.route('**/api/soknad/flytting', (route) =>
        route.fulfill({ json: { mottattTidspunkt: '2025-02-02T10:50:09.906814' } })
    );
    const requestPromise = page.waitForRequest('**/api/soknad/flytting');
    await page.getByRole('button', { name: 'Send inn søknad' }).click();
    const request = await requestPromise;
    expect(request.postDataJSON()).toMatchObject({
        flyttingDetaljer: {
            årsak: { verdi: 'NY_JOBB' },
            flyttedato: { verdi: '2025-06-15' },
            adresse: { gateadresse: { verdi: 'Testveien 1' }, land: { verdi: 'NOR' } },
            flyttemåte: { verdi: 'FLYTTER_SELV' },
            utgifterDekketPåAnnenMåte: { verdi: 'JA' },
            utgifterEgenFlytting: {
                avstand: { verdi: '120,25' },
                bom: { verdi: '0' },
                hengerleie: { verdi: '350.50' },
            },
        },
        dokumentasjon: [{ type: 'UTGIFTER_EGEN_FLYTTING', opplastedeVedlegg: [] }],
    });
    expect(request.postDataJSON().flyttingDetaljer.utgifterEgenFlytting.annet).toBeUndefined();
    await expect(page).toHaveURL(`${urlSøknad}/kvittering`);
});

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
    const requestPromise = page.waitForRequest('**/api/soknad/flytting');
    await page.getByRole('button', { name: 'Send inn søknad' }).click();
    expect((await requestPromise).postDataJSON()).toMatchObject({
        flyttingDetaljer: {
            årsak: { verdi: 'AKTIVITET' },
            flyttebyrå: {
                tilbud: [
                    {
                        navn: { verdi: 'Testbyrå 1', label: 'Navn på flyttebyrå 1' },
                        beløp: { verdi: '800,50', label: 'Beløp for flyttebyrå 1' },
                    },
                    {
                        navn: { verdi: 'Testbyrå 2', label: 'Navn på flyttebyrå 2' },
                        beløp: { verdi: '0', label: 'Beløp for flyttebyrå 2' },
                    },
                ],
            },
        },
        dokumentasjon: [
            { type: 'TILBUD_FLYTTEBYRÅ_1', opplastedeVedlegg: [{ id: 'test-dokument-id' }] },
            { type: 'TILBUD_FLYTTEBYRÅ_2', opplastedeVedlegg: [{ id: 'test-dokument-id' }] },
        ],
    });
    await expect(page).toHaveURL(`${urlSøknad}/kvittering`);
});

test('Skjulte svar og vedlegg beholdes ved bytte, mens oppsummering viser aktiv gren', async ({
    page,
}) => {
    await startSøknad(page);
    await fyllFellesDetaljer(page, true);
    await fyllTilbud(page);
    await page.getByRole('button', { name: 'Neste' }).click();
    await lastOppTilbud(page, 'Tilbud fra flyttebyrå 1');
    await lastOppTilbud(page, 'Tilbud fra flyttebyrå 2');
    await expect(page.getByText('tom_bild.png', { exact: true })).toHaveCount(2);
    await page.getByRole('button', { name: 'Neste' }).click();
    await page
        .getByRole('link', { name: /Endre/ })
        .and(page.locator('[href$="/flytting"]'))
        .click();
    await page
        .getByLabel('Jeg flytter i forbindelse med at jeg skal gjennomføre en aktivitet')
        .check();
    await page.getByLabel('Jeg flytter selv', { exact: true }).check();
    await page.getByRole('textbox', { name: 'Hvor lang reisevei har du?' }).fill('10');
    await page.getByRole('button', { name: 'Neste' }).click();
    const egenflyttingModal = page.getByRole('dialog', { name: 'Vedlegg mangler' });
    await expect(
        egenflyttingModal.getByText('Dokumentasjon av utgifter ved egen flytting')
    ).toBeVisible();
    await egenflyttingModal.getByRole('button', { name: 'Ja, gå til neste side' }).click();
    await expect(page.getByText('tom_bild.png', { exact: true })).toHaveCount(0);
    await page.getByRole('button', { name: 'Forrige' }).click();
    await page.getByLabel('Jeg vil bruke flyttebyrå').check();
    await expect(
        page.getByRole('textbox', { name: 'Navn på flyttebyrå 1', exact: true })
    ).toHaveValue('Testbyrå 1');
    await page.getByLabel('Jeg flytter fordi jeg har fått ny jobb').check();
    await page.getByRole('button', { name: 'Neste' }).click();
    await expect(page.getByText('tom_bild.png', { exact: true })).toHaveCount(2);
    await page.getByRole('button', { name: 'Forrige' }).click();
    await page
        .getByLabel('Jeg flytter i forbindelse med at jeg skal gjennomføre en aktivitet')
        .check();
    await page.getByLabel('Jeg flytter selv', { exact: true }).check();
    await expect(page.getByRole('textbox', { name: 'Hvor lang reisevei har du?' })).toHaveValue(
        '10'
    );
    await page.getByRole('button', { name: 'Neste' }).click();
    await page
        .getByRole('dialog', { name: 'Vedlegg mangler' })
        .getByRole('button', { name: 'Ja, gå til neste side' })
        .click();
    await page.getByRole('button', { name: 'Neste' }).click();
    await expect(page.getByText('Testbyrå 1', { exact: false })).toHaveCount(0);
    await expect(page.getByText('tom_bild.png', { exact: true })).toHaveCount(0);
    const requestPromise = page.waitForRequest('**/api/soknad/flytting');
    await page.getByRole('button', { name: 'Send inn søknad' }).click();
    expect((await requestPromise).postDataJSON()).toMatchObject({
        flyttingDetaljer: {
            årsak: { verdi: 'AKTIVITET' },
            flyttemåte: { verdi: 'FLYTTER_SELV' },
        },
        dokumentasjon: [{ type: 'UTGIFTER_EGEN_FLYTTING', opplastedeVedlegg: [] }],
    });
});

test('Manglende tilbud kan ettersendes og opplastingsfeil vises', async ({ page }) => {
    await startSøknad(page);
    await fyllFellesDetaljer(page);
    await fyllTilbud(page);
    await page.getByRole('button', { name: 'Neste' }).click();
    await page.getByRole('button', { name: 'Neste' }).click();
    const modal = page.getByRole('dialog', { name: 'Vedlegg mangler' });
    await expect(modal.getByText('Tilbud fra flyttebyrå 1', { exact: true })).toBeVisible();
    await expect(modal.getByText('Tilbud fra flyttebyrå 2', { exact: true })).toBeVisible();
    await modal.getByRole('button', { name: 'Nei, gå tilbake til vedlegg' }).click();
    await page.route('**/api/vedlegg/tillegg', (route) => route.fulfill({ status: 400 }));
    await lastOppTilbud(page, 'Tilbud fra flyttebyrå 1');
    await expect(page.getByRole('heading', { name: 'Vedlegg med feil' })).toBeVisible();
    await page.route('**/api/vedlegg/tillegg', (route) =>
        route.fulfill({ json: { dokumentId: 'test-dokument-id' } })
    );
    await lastOppTilbud(page, 'Tilbud fra flyttebyrå 1');
    await page.getByRole('button', { name: 'Neste' }).click();
    await expect(modal.getByText('Tilbud fra flyttebyrå 1', { exact: true })).toHaveCount(0);
    await expect(modal.getByText('Tilbud fra flyttebyrå 2', { exact: true })).toBeVisible();
    await modal.getByRole('button', { name: 'Ja, gå til neste side' }).click();
    await expect(page).toHaveURL(`${urlSøknad}/oppsummering`);
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
