import { test, expect, Page } from '@playwright/test';

import { mockAktivitet, mockIngenAktivitet } from '../../mocks/aktivitet';
import { mockHarSøknadLæremidlerFraFør } from '../../mocks/harSøknadFraFør';
import { mockPersonApi } from '../../mocks/person';
import { mockSendSøknadLæremilder } from '../../mocks/sendSøknad';
import { mockSøknadRoutingApi } from '../../mocks/søknadRouting';
import { søknadBaseUrl } from '../../utils/utils';
import { forventIngenWcagViolations } from '../../utils/wcag';

test.beforeEach(async ({ page }) => {
    await mockSøknadRoutingApi(page);
    await mockPersonApi(page);
    await mockAktivitet(page);
    await mockSendSøknadLæremilder(page);
});

const urlSøknad = `${søknadBaseUrl}/laremidler`;

enum LæremidlerUrls {
    START = urlSøknad,
    DIN_SITUASJON = `${urlSøknad}/hovedytelse`,
    UTDANNING = `${urlSøknad}/utdanning`,
    VEDLEGG = `${urlSøknad}/vedlegg`,
    OPPSUMMERING = `${urlSøknad}/oppsummering`,
    KVITTERING = `${urlSøknad}/kvittering`,
}

const klikkPåKnapp = (page: Page, label: string) =>
    page.getByRole('button', { name: label }).click();

test('At enkel gjennomkjøring av læremidler fungerer', async ({ page }) => {
    await page.goto(LæremidlerUrls.START);

    await expect(
        page.getByRole('heading', { name: 'Søknad om støtte til læremidler' })
    ).toBeVisible();
    await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Start søknad');

    await expect(page).toHaveURL(LæremidlerUrls.DIN_SITUASJON);
    await page.getByLabel('Arbeidsavklaringspenger (AAP)').check();

    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Neste');

    await expect(page).toHaveURL(LæremidlerUrls.UTDANNING);
    await page.getByLabel('Type navn: 2. februar 2025 - 2. februar 2025').check();

    await page
        .getByRole('group', {
            name: 'Hvilken utdanning eller opplæring søker du om støtte til læremidler for?',
        })
        .getByLabel('Annet')
        .check();
    await page
        .getByRole('group', {
            name: 'Hva slags utdanning eller opplæring skal du ta?',
        })
        .getByLabel('Videregående utdanning')
        .check();
    await page
        .getByRole('group', {
            name: 'Er du lærling, lærekandidat, praksisbrevkandidat eller kandidat for fagbrev på jobb?',
        })
        .getByLabel('Nei')
        .check();
    await page
        .getByRole('group', {
            name: 'Har du tidligere fullført videregående skole?',
        })
        .getByLabel('Nei')
        .check();

    await page
        .getByRole('group', {
            name: 'Har du særlig store utgifter til læremidler på grunn av en funksjonsnedsettelse?',
        })
        .getByLabel('Ja')
        .check();

    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Neste');
    await page.pause();

    await expect(page).toHaveURL(LæremidlerUrls.VEDLEGG);
    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Neste');
    // Modal om at det mangler vedlegg
    await expect(page.getByRole('heading', { name: 'Vedlegg mangler' })).toBeVisible();
    await page.pause();
    await klikkPåKnapp(page, 'Ja, gå til neste side');

    await page.pause();
    await expect(page).toHaveURL(LæremidlerUrls.OPPSUMMERING);
    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Send søknad');

    await expect(page).toHaveURL(LæremidlerUrls.KVITTERING);
    await forventIngenWcagViolations(page);
});

test('Har søknad fra før', async ({ page }) => {
    await mockHarSøknadLæremidlerFraFør(page);

    await page.goto(LæremidlerUrls.START);
    await expect(page).toHaveURL(LæremidlerUrls.START);
    await expect(
        page.getByRole('heading', {
            name: 'Du har allerede sendt oss en søknad om støtte til læremidler.',
        })
    ).toBeVisible();

    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Start ny søknad');

    await expect(
        page.getByRole('heading', { name: 'Søknad om støtte til læremidler' })
    ).toBeVisible();
    await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Start søknad');

    await expect(page).toHaveURL(LæremidlerUrls.DIN_SITUASJON);
});

test('Har ingen aktiviteter', async ({ page }) => {
    await mockIngenAktivitet(page);
    await page.goto(LæremidlerUrls.START);
    await expect(
        page.getByRole('heading', { name: 'Søknad om støtte til læremidler' })
    ).toBeVisible();
    await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
    await klikkPåKnapp(page, 'Start søknad');

    await page.getByLabel('Arbeidsavklaringspenger (AAP)').check();
    await klikkPåKnapp(page, 'Neste');

    await expect(page).toHaveURL(LæremidlerUrls.UTDANNING);
    await page
        .getByRole('group', {
            name: 'Hva slags utdanning eller opplæring skal du ta?',
        })
        .getByLabel('Høgskole, universitet eller fagskole')
        .check();
    await page
        .getByRole('group', {
            name: 'Har du særlig store utgifter til læremidler på grunn av en funksjonsnedsettelse?',
        })
        .getByLabel('Ja')
        .check();
    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Neste');

    await expect(page).toHaveURL(LæremidlerUrls.VEDLEGG);
});
