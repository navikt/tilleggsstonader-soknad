import { test, expect } from '@playwright/test';

import { mockAktivitet, mockIngenAktivitet } from '../../mocks/aktivitet';
import { mockHarSøknadTilsynBarnFraFør } from '../../mocks/harSøknadFraFør';
import { mockPersonMedBarnApi } from '../../mocks/person';
import { mockSendSøknadPassAvBarn } from '../../mocks/sendSøknad';
import { mockSøknadRoutingApi } from '../../mocks/søknadRouting';
import { lastOppFil } from '../../utils/filoppladding/uploadFile';
import { klikkPåKnapp } from '../../utils/knapp';
import { søknadBaseUrl } from '../../utils/utils';
import { forventIngenWcagViolations } from '../../utils/wcag';

test.beforeEach(async ({ page }) => {
    await mockSøknadRoutingApi(page);
    await mockPersonMedBarnApi(page);
    await mockAktivitet(page);
    await mockSendSøknadPassAvBarn(page);
});

const urlSøknad = `${søknadBaseUrl}/pass-av-barn`;

enum PassAvBarnUrls {
    START = urlSøknad,
    DIN_SITUASJON = `${urlSøknad}/hovedytelse`,
    AKTIVITET = `${urlSøknad}/aktivitet`,
    DINE_BARN = `${urlSøknad}/dine-barn`,
    BARNEPASS = `${urlSøknad}/barnepass`,
    VEDLEGG = `${urlSøknad}/vedlegg`,
    OPPSUMMERING = `${urlSøknad}/oppsummering`,
    KVITTERING = `${urlSøknad}/kvittering`,
}

test('At enkel gjennomkjøring av tilsyn barn fungerer', async ({ page }) => {
    await page.goto(PassAvBarnUrls.START);

    await expect(
        page.getByRole('heading', { name: 'Søknad om støtte til pass av barn' })
    ).toBeVisible();
    await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Start søknad');

    await expect(page).toHaveURL(PassAvBarnUrls.DIN_SITUASJON);
    await page.getByLabel('Arbeidsavklaringspenger (AAP)').check();

    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Neste');

    await expect(page).toHaveURL(PassAvBarnUrls.AKTIVITET);
    await page.getByLabel('Type navn: 2. februar 2025 - 2. februar 2025').check();
    await page.getByLabel('Annet').check();
    await page
        .getByRole('group', { name: 'Hvilken annen type arbeidsrettet aktivitet har du?' })
        .getByLabel('Utdanning godkjent av Nav')
        .check();

    await page
        .getByRole('group', { name: 'Mottar du lønn gjennom et tiltak?' })
        .getByLabel('Nei')
        .check();

    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Neste');

    await expect(page).toHaveURL(PassAvBarnUrls.DINE_BARN);
    const spørsmålHvilkeBarn = page.getByRole('group', {
        name: 'Hvilke barn søker du om støtte til pass for?',
    });
    await spørsmålHvilkeBarn.getByLabel('Ronja Røverdatter').check();
    await spørsmålHvilkeBarn.getByLabel('Espen Askeladden').check();
    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Neste');

    await expect(page).toHaveURL(PassAvBarnUrls.BARNEPASS);
    await page
        .getByRole('group', { name: 'Hvem skal passe Ronja?' })
        .getByLabel('Barnehage,')
        .check();

    await page
        .getByRole('group', { name: 'Hvem skal passe Espen?' })
        .getByLabel('Dagmamma,')
        .check();
    await page
        .getByRole('group', { name: 'Har Espen startet i 5. klasse når tiltaket ditt starter?' })
        .getByLabel('Ja')
        .check();

    await page
        .getByRole('group', {
            name: 'Hva er årsaken til at Espen trenger pass etter at han har begynt i 5. klasse?',
        })
        .getByLabel('Trenger mer pleie')
        .check();
    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Neste');

    await expect(page).toHaveURL(PassAvBarnUrls.VEDLEGG);
    await lastOppFil(page, 'Faktura fra SFO/AKS/barnehage');
    await lastOppFil(page, 'Skriftlig uttalelse fra helsepersonell for [0]');
    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Neste');
    // Modal om at det mangler vedlegg
    await expect(page.getByRole('heading', { name: 'Vedlegg mangler' })).toBeVisible();
    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Ja, gå til neste side');

    await expect(page).toHaveURL(PassAvBarnUrls.OPPSUMMERING);
    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Send søknad');

    await expect(page).toHaveURL(PassAvBarnUrls.KVITTERING);
    await forventIngenWcagViolations(page);
});

test('Velger hovedytelse Tiltakspenger som trigger ekstra spørsmål koblet til arbeid utenfor Norge', async ({
    page,
}) => {
    await page.goto(PassAvBarnUrls.START);

    await expect(
        page.getByRole('heading', { name: 'Søknad om støtte til pass av barn' })
    ).toBeVisible();
    await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Start søknad');

    await expect(page).toHaveURL(PassAvBarnUrls.DIN_SITUASJON);
    await page.getByLabel('Tiltakspenger').check();
    await page
        .getByRole('group', { name: 'Jobber du i et annet land enn Norge?' })
        .getByLabel('Ja')
        .check();
    await page.getByLabel('Hvilket land jobber du i?').selectOption('Sverige');
    await page
        .getByRole('group', { name: 'Mottar du pengestøtte fra et annet land enn Norge?' })
        .getByLabel('Sykepenger')
        .check();

    await page.getByLabel('Hvilket land mottar du pengestøtte fra?').selectOption('Finland');
    await page
        .getByRole('group', {
            name: 'Har du oppholdt deg utenfor Norge i løpet av de siste 12 månedene?',
        })
        .getByLabel('Ja')
        .check();
    await page.getByLabel('Hvilket land har du oppholdt deg i?').selectOption('Tyskland');
    await page
        .getByRole('group', {
            name: 'Hva gjorde du i dette landet?',
        })
        .getByLabel('Jobbet')
        .check();

    const nårVarDuIDetteLander = page.getByText('Når var du i dette landet?').locator('..');
    await nårVarDuIDetteLander.getByLabel('Fra', { exact: true }).fill('01.01.2025');
    await nårVarDuIDetteLander.getByLabel('Til', { exact: true }).fill('31.01.2025');

    await page
        .getByRole('group', {
            name: 'Planlegger du å oppholde deg utenfor Norge de neste 12 månedene?',
        })
        .getByLabel('Ja')
        .check();
    await page.getByLabel('Hvilket land skal du oppholde deg i?').selectOption('Spania');

    await page
        .getByRole('group', {
            name: 'Hva skal du gjøre i dette landet?',
        })
        .getByLabel('Studere')
        .check();
    const nårSkalDuVæreIDetteLandet = page
        .getByText('Når skal du være i dette landet?')
        .locator('..');
    await nårSkalDuVæreIDetteLandet.getByLabel('Fra', { exact: true }).fill('01.03.2025');
    await nårSkalDuVæreIDetteLandet.getByLabel('Til', { exact: true }).fill('31.03.2025');

    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Neste');

    await expect(page).toHaveURL(PassAvBarnUrls.AKTIVITET);
});

test('Har søknad fra før', async ({ page }) => {
    await mockHarSøknadTilsynBarnFraFør(page);

    await page.goto(PassAvBarnUrls.START);
    await expect(page).toHaveURL(PassAvBarnUrls.START);
    await expect(
        page.getByRole('heading', {
            name: 'Du har allerede sendt oss en søknad om støtte til pass av barn.',
        })
    ).toBeVisible();

    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Start ny søknad');

    await expect(
        page.getByRole('heading', { name: 'Søknad om støtte til pass av barn' })
    ).toBeVisible();
    await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Start søknad');

    await expect(page).toHaveURL(PassAvBarnUrls.DIN_SITUASJON);
});

test('Har ingen aktiviteter', async ({ page }) => {
    await mockIngenAktivitet(page);
    await page.goto(PassAvBarnUrls.START);
    await expect(
        page.getByRole('heading', { name: 'Søknad om støtte til pass av barn' })
    ).toBeVisible();
    await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
    await klikkPåKnapp(page, 'Start søknad');

    await page.getByLabel('Arbeidsavklaringspenger (AAP)').check();
    await klikkPåKnapp(page, 'Neste');

    await expect(page).toHaveURL(PassAvBarnUrls.AKTIVITET);
    await page.pause();
    await expect(
        page.getByText(
            'Vi fant dessverre ingen arbeidsrettede aktiviteter som er registrert på deg.'
        )
    ).toBeVisible();
    await page
        .getByRole('group', {
            name: 'Hvilken arbeidsrettet aktivitet har du?',
        })
        .getByLabel('Utdanning godkjent av Nav')
        .check();
    await forventIngenWcagViolations(page);
    await klikkPåKnapp(page, 'Neste');
    await expect(page).toHaveURL(PassAvBarnUrls.DINE_BARN);
});
