import { test, expect, Page } from '@playwright/test';

import {
    mockRammevedtak,
    mockTidligereInnsendt,
    mockSendInnKjøreliste,
} from '../../mocks/kjøreliste';
import { mockPersonApi } from '../../mocks/person';
import { mockSøknadRoutingApi } from '../../mocks/søknadRouting';
import { mockLastOppVedlegg } from '../../mocks/vedlegg';
import { lastOppFil } from '../../utils/filoppladding/uploadFile';
import { klikkPåKnapp } from '../../utils/knapp';
import { søknadBaseUrl } from '../../utils/utils';
// import { forventIngenWcagViolations } from '../../utils/wcag';

test.beforeEach(async ({ page }) => {
    await mockSøknadRoutingApi(page);
    await mockPersonApi(page);
    await mockRammevedtak(page);
    await mockTidligereInnsendt(page, null);
    await mockSendInnKjøreliste(page);
    await mockLastOppVedlegg(page);
});

const urlSøknad = `${søknadBaseUrl}/kjoreliste/reise-123`;

enum KjørelisteUrls {
    START = `${søknadBaseUrl}/kjoreliste`,
    SKJEMA = `${urlSøknad}/skjema`,
    VEDLEGG = `${urlSøknad}/vedlegg`,
    OPPSUMMERING = `${urlSøknad}/oppsummering`,
    KVITTERING = `${urlSøknad}/kvittering`,
}

const hukeAvDagForReise = async (page: Page, dato: string) => {
    // Find the checkbox with the specific date label
    const checkbox = page.getByRole('checkbox', { name: new RegExp(dato) });
    await checkbox.check();
};

test('Innsending av en uke uten vedlegg skal fungere', async ({ page }) => {
    await page.goto(KjørelisteUrls.SKJEMA);

    await expect(page.getByRole('heading', { name: /Klart til innsending/i })).toBeVisible();
    // await forventIngenWcagViolations(page);

    // Åpne uke-accordionen (uke 6 = 3-9 februar)
    const ukeButton = page.getByRole('button', { name: /Uke 6/i });
    await ukeButton.click();

    // Huke av for flere dager i løpet av uken
    // Mandag 3. februar
    await hukeAvDagForReise(page, 'Mandag 3\\. februar 2025');
    const parkingFields = page.getByLabel(/Parkeringsutgift/);
    await parkingFields.first().fill('50');

    // Tirsdag 4. februar
    await hukeAvDagForReise(page, 'Tirsdag 4\\. februar 2025');
    const parkingFieldsTwo = page.getByLabel(/Parkeringsutgift/);
    await parkingFieldsTwo.nth(1).fill('50');

    // Onsdag 5. februar
    await hukeAvDagForReise(page, 'Onsdag 5\\. februar 2025');
    const parkingFieldsThree = page.getByLabel(/Parkeringsutgift/);
    await parkingFieldsThree.nth(2).fill('50');

    // await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Neste steg');

    // Anta at man ikke legger til vedlegg
    await expect(page).toHaveURL(KjørelisteUrls.VEDLEGG);
    // await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Neste steg');

    await expect(page).toHaveURL(KjørelisteUrls.OPPSUMMERING);
    await page.getByLabel(/Jeg er kjent med at jeg kan miste retten til stønad/i).check();
    // await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Send inn');

    await expect(page).toHaveURL(KjørelisteUrls.KVITTERING);
    await expect(page.getByRole('heading', { name: /Kvittering/i })).toBeVisible();
    // await forventIngenWcagViolations(page);
});

test('Innsending av en uke med vedlegg skal fungere', async ({ page }) => {
    await page.goto(KjørelisteUrls.SKJEMA);

    await expect(page.getByRole('heading', { name: /Klart til innsending/i })).toBeVisible();
    // await forventIngenWcagViolations(page);

    // Åpne uke-accordionen (uke 6 = 3-9 februar)
    const ukeButton = page.getByRole('button', { name: /Uke 6/i });
    await ukeButton.click();

    // Huke av for dager
    await hukeAvDagForReise(page, 'Mandag 3\\. februar 2025');
    const parkingFields = page.getByLabel(/Parkeringsutgift/);
    await parkingFields.first().fill('75');

    await hukeAvDagForReise(page, 'Tirsdag 4\\. februar 2025');
    const parkingFieldsTwo = page.getByLabel(/Parkeringsutgift/);
    await parkingFieldsTwo.nth(1).fill('75');

    // await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Neste steg');

    // Legg til vedlegg
    await expect(page).toHaveURL(KjørelisteUrls.VEDLEGG);
    await lastOppFil(page, 'Vedlegg parkeringsutgift (valgfri)');

    // await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Neste steg');

    await expect(page).toHaveURL(KjørelisteUrls.OPPSUMMERING);
    await page.getByLabel(/Jeg er kjent med at jeg kan miste retten til stønad/i).check();
    // await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Send inn');

    await expect(page).toHaveURL(KjørelisteUrls.KVITTERING);
    await expect(page.getByRole('heading', { name: /Kvittering/i })).toBeVisible();
    // await forventIngenWcagViolations(page);
});

test('Skal ikke være mulig å gå videre om man ikke har huket av for minst en dag', async ({
    page,
}) => {
    await page.goto(KjørelisteUrls.SKJEMA);

    await expect(page.getByRole('heading', { name: /Klart til innsending/i })).toBeVisible();

    // Prøv å gå videre uten å huke av noe
    // await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Neste steg');

    // Forvent validering feil
    await expect(page.getByText(/Du må fylle ut minst én reisedag/i)).toBeVisible();
    await expect(page).toHaveURL(KjørelisteUrls.SKJEMA);
});

test('Varsel om flere dager enn rammevedtak skal vises', async ({ page }) => {
    await mockRammevedtak(page, {
        uker: [
            {
                ukeNummer: 6,
                fom: '2025-02-03',
                tom: '2025-02-09',
                reisedagerPerUke: 2, // Kun 2 dager rammevedtak
                innsendtDato: null,
                kanSendeInnKjøreliste: true,
            },
        ],
    });

    await page.goto(KjørelisteUrls.SKJEMA);

    // Åpne uke-accordionen
    const ukeButton = page.getByRole('button', { name: /Uke 6/i });
    await ukeButton.click();

    // Huke av for 3 dager (mer enn de 2 som er rammevedtatt)
    await hukeAvDagForReise(page, 'Mandag 3\\. februar 2025');
    const parkingFields = page.getByLabel(/Parkeringsutgift/);
    await parkingFields.first().fill('50');

    await hukeAvDagForReise(page, 'Tirsdag 4\\. februar 2025');
    const parkingFieldsTwo = page.getByLabel(/Parkeringsutgift/);
    await parkingFieldsTwo.nth(1).fill('50');

    await hukeAvDagForReise(page, 'Onsdag 5\\. februar 2025');
    const parkingFieldsThree = page.getByLabel(/Parkeringsutgift/);
    await parkingFieldsThree.nth(2).fill('50');

    // Forvent varsel om for mange dager
    await expect(
        page.getByText(
            /Du har fått innvilget stønad for daglige reiser med egen bil for 2 dager i uken, men du har registrert 3 dager/i
        )
    ).toBeVisible();
    // await forventIngenWcagViolations(page);
});

test('Varsel om kjøring på helligdag skal vises', async ({ page }) => {
    // Rammevedtaket har en helligdag på fredag 7. februar
    // Vi haker av at vi kjørte på den dagen
    await page.goto(KjørelisteUrls.SKJEMA);

    // Åpne uke-accordionen (uke 6 = 3-9 februar)
    const ukeButton = page.getByRole('button', { name: /Uke 6/i });
    await ukeButton.click();

    // Huke av for helligdagen (fredag 7. februar - Fredag før fastelavnsmandag)
    await hukeAvDagForReise(page, 'Fredag 7\\. februar 2025');

    // Forvent varsel som nevner helligdagen
    await expect(
        page.getByText(
            /Du har fylt inn at du har kjørt på en helligdag \(Fredag før fastelavnsmandag\)/i
        )
    ).toBeVisible();
    // await forventIngenWcagViolations(page);
});
