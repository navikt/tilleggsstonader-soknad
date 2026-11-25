import { expect, Page, test } from '@playwright/test';

import { mockAktivitet } from '../../mocks/aktivitet';
import { mockHarIngenSøknadReiseTilSamlingFraFør } from '../../mocks/harSøknadFraFør';
import { mockPersonApi, mockPersonUtenAdresseApi } from '../../mocks/person';
import { mockSøknadRoutingApi } from '../../mocks/søknadRouting';
import { velgLand } from '../../utils/combobox';
import { søknadBaseUrl } from '../../utils/utils';
import { forventIngenWcagViolations } from '../../utils/wcag';

const urlSøknad = `${søknadBaseUrl}/reise-til-samling`;

const fjernWebpackOverlay = async (page: Page) => {
    await page.evaluate(() => {
        document.querySelector('#webpack-dev-server-client-overlay')?.remove();
    });
};

const fyllUtSamling = async (page: Page, gjenbrukAdresse = false) => {
    await page.getByLabel('Fra og med (dd.mm.åååå)').fill('01.06.2025');
    await page.getByLabel('Til og med (dd.mm.åååå)').fill('05.06.2025');
    await page
        .getByRole('radiogroup', { name: 'Er samlingen obligatorisk?' })
        .getByLabel('Ja')
        .check();

    if (gjenbrukAdresse) {
        await page
            .getByRole('radiogroup', { name: 'Er adressen den samme som forrige samling?' })
            .getByLabel('Ja')
            .check();
    } else {
        await page
            .getByLabel('Hvor mange kilometer er det mellom avreiseadresse og samlingsstedet?')
            .fill('45');
        await page.getByLabel('Gateadresse', { exact: true }).fill('Testveien 1');
        await page.getByLabel('Postnummer', { exact: true }).fill('0123');
        await page.getByLabel('Poststed', { exact: true }).fill('Oslo');
    }

    await page.getByRole('checkbox', { name: 'Offentlig transport', exact: true }).check();
    await page
        .getByLabel('Hva er totalutgiftene til offentlig transport til og fra samlingen?')
        .fill('500');
};

const forventSynligeFeilmål = async (page: Page) => {
    const feillenker = page.getByRole('link').filter({ hasText: /Du må|Sluttdato/ });
    expect(await feillenker.count()).toBeGreaterThan(0);
    for (const lenke of await feillenker.all()) {
        const href = await lenke.getAttribute('href');
        expect(href).toMatch(/^#/);
        await expect(page.locator(href!)).toBeVisible();
    }
};

test.describe('Lagrede samlinger', () => {
    test.beforeEach(async ({ page }) => {
        await mockSøknadRoutingApi(page);
        await mockPersonApi(page);
        await mockAktivitet(page);
        await mockHarIngenSøknadReiseTilSamlingFraFør(page);
        await page.goto(urlSøknad);
        await fjernWebpackOverlay(page);
        await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
        await page.getByRole('button', { name: 'Start søknad' }).click();
        await page.getByRole('checkbox', { name: 'Arbeidsavklaringspenger (AAP)' }).check();
        await page.getByRole('button', { name: 'Neste' }).click();
        await page.getByLabel('Type navn: 2. februar 2025 - 2. februar 2025').check();
        await page
            .getByRole('radiogroup', { name: 'Hva slags type arbeidsrettet aktivitet går du på?' })
            .getByLabel('Videregående skole')
            .check();
        await page
            .getByRole('radiogroup', {
                name: 'Er du lærling, lærekandidat, praksisbrevkandidat eller kandidat for fagbrev på jobb?',
            })
            .getByLabel('Ja')
            .check();
        await page
            .getByRole('radiogroup', {
                name: 'Får du dekket reisen til aktivitetsstedet av arbeidsgiveren din?',
            })
            .getByLabel('Nei')
            .check();
        await page.getByRole('button', { name: 'Neste' }).click();
        await page
            .getByRole('radiogroup', { name: 'Skal du reise fra din folkeregistrerte adresse?' })
            .getByLabel('Ja')
            .check();
        await page.getByRole('button', { name: 'Neste' }).click();
        await expect(page).toHaveURL(`${urlSøknad}/samlinger`);
    });

    for (const land of ['Norge', 'Sverige']) {
        test(`viser landnavnet ${land} i lagret adresse`, async ({ page }) => {
            await fyllUtSamling(page);
            if (land !== 'Norge') {
                await velgLand(page, 'Velg land', land);
            }
            await page.getByRole('button', { name: 'Lagre samling' }).click();
            await expect(
                page.getByText(`Testveien 1, 0123 Oslo, ${land}`, { exact: true })
            ).toBeVisible();
            await expect(page.getByLabel('Gateadresse', { exact: true })).toHaveCount(0);
            await forventIngenWcagViolations(page);
        });
    }

    test('viser barnehageadresse og piggdekkavgift, men ikke tomme eller fjernede svar', async ({
        page,
    }) => {
        await fyllUtSamling(page);
        await page.getByRole('checkbox', { name: 'Offentlig transport', exact: true }).uncheck();
        await page.getByRole('checkbox', { name: 'Privat bil', exact: true }).check();
        const barnehage = page.getByRole('checkbox', {
            name: 'Levering/henting i barnehage eller skolefritidsordning (SFO/AKS)',
        });
        await barnehage.check();
        await page.getByLabel('Adresse til barnehage', { exact: true }).fill('Barnehageveien 2');
        await page.getByLabel('Postnummer til barnehage', { exact: true }).fill('0456');
        await page
            .getByRole('radiogroup', { name: 'Benyttet du egen bil?' })
            .getByLabel('Ja')
            .check();
        await page.getByLabel('Piggdekkavgift', { exact: true }).fill('150');
        await page.getByRole('button', { name: 'Lagre samling' }).click();

        await expect(page.getByText('Adresse til barnehage', { exact: true })).toBeVisible();
        await expect(page.getByText('Barnehageveien 2', { exact: true })).toBeVisible();
        await expect(page.getByText('Postnummer til barnehage', { exact: true })).toBeVisible();
        await expect(page.getByText('0456', { exact: true })).toBeVisible();
        await expect(page.getByText('Piggdekkavgift', { exact: true })).toBeVisible();
        await expect(page.getByText('150 kr', { exact: true })).toBeVisible();
        await forventIngenWcagViolations(page);

        await page.getByRole('button', { name: 'Rediger', exact: true }).click();
        await expect(page.getByLabel('Adresse til barnehage', { exact: true })).toHaveValue(
            'Barnehageveien 2'
        );
        await expect(page.getByLabel('Postnummer til barnehage', { exact: true })).toHaveValue(
            '0456'
        );
        await expect(page.getByLabel('Piggdekkavgift', { exact: true })).toHaveValue('150');
        await barnehage.uncheck();
        await page.getByRole('checkbox', { name: 'Dårlig transporttilbud', exact: true }).check();
        await page.getByLabel('Piggdekkavgift', { exact: true }).fill('');
        await page.getByRole('button', { name: 'Lagre samling' }).click();
        await expect(page.getByRole('button', { name: 'Rediger', exact: true })).toBeVisible();
        await expect(page.getByText('Barnehageveien 2', { exact: true })).toHaveCount(0);
        await expect(page.getByText('0456', { exact: true })).toHaveCount(0);
        await expect(page.getByText('Piggdekkavgift', { exact: true })).toHaveCount(0);
    });

    test('fjerner sluttdatofeil når bare startdatoen rettes før lagring', async ({ page }) => {
        await fyllUtSamling(page);
        await page.getByLabel('Fra og med (dd.mm.åååå)').fill('10.06.2025');
        await page.getByRole('button', { name: 'Lagre samling' }).click();
        await expect(
            page.getByRole('link', { name: 'Sluttdato kan ikke være før startdato.' })
        ).toBeVisible();
        await forventSynligeFeilmål(page);
        await page.getByLabel('Fra og med (dd.mm.åååå)').fill('01.06.2025');
        await page.getByRole('button', { name: 'Lagre samling' }).click();
        await expect(page.getByRole('button', { name: 'Rediger', exact: true })).toBeVisible();
        await expect(page.getByText('Sluttdato kan ikke være før startdato.')).toHaveCount(0);
    });

    test('validerer lagret editor før bytte og legg til, og bevarer adressegjenbruk', async ({
        page,
    }) => {
        await fyllUtSamling(page);
        await page.getByRole('button', { name: 'Lagre samling' }).click();
        await page.getByRole('button', { name: 'Legg til samling' }).click();
        await fyllUtSamling(page, true);
        await page.getByRole('button', { name: 'Lagre samling' }).click();
        await expect(page.getByRole('button', { name: 'Rediger', exact: true })).toHaveCount(2);
        await page.getByRole('button', { name: 'Rediger', exact: true }).first().click();
        await page.getByLabel('Gateadresse', { exact: true }).fill('');

        await page.getByRole('button', { name: 'Rediger', exact: true }).click();
        await expect(page.getByLabel('Gateadresse', { exact: true })).toHaveValue('');
        await expect(page.getByRole('button', { name: 'Lagre samling' })).toHaveCount(1);
        await forventSynligeFeilmål(page);
        await page.getByRole('button', { name: 'Legg til samling' }).click();
        await expect(page.getByRole('button', { name: 'Rediger', exact: true })).toHaveCount(1);
        await expect(page.getByLabel('Fra og med (dd.mm.åååå)')).toHaveCount(1);
        await forventSynligeFeilmål(page);
        await forventIngenWcagViolations(page);

        await page.getByLabel('Gateadresse', { exact: true }).fill('Nyveien 3');
        await page.getByRole('button', { name: 'Rediger', exact: true }).click();
        await expect(page.getByRole('link', { name: 'Du må fylle inn gateadresse.' })).toHaveCount(
            0
        );
        await expect(page.getByLabel('Gateadresse', { exact: true })).toHaveCount(0);
        await expect(page.getByLabel('Fra og med (dd.mm.åååå)')).toHaveCount(1);
        await page.getByRole('button', { name: 'Lagre samling' }).click();
        await expect(page.getByText('Nyveien 3, 0123 Oslo, Norge', { exact: true })).toHaveCount(2);

        await page.getByRole('button', { name: 'Rediger', exact: true }).first().click();
        await page.getByRole('button', { name: 'Legg til samling' }).click();
        await expect(page.getByRole('button', { name: 'Rediger', exact: true })).toHaveCount(2);
        await expect(page.getByLabel('Fra og med (dd.mm.åååå)')).toHaveCount(1);
        await expect(page.getByLabel('Fra og med (dd.mm.åååå)')).toHaveValue('');
        await page.getByRole('button', { name: 'Fjern samling' }).last().click();
        await expect(page.getByLabel('Fra og med (dd.mm.åååå)')).toHaveCount(0);
        await expect(page.getByRole('button', { name: 'Rediger', exact: true })).toHaveCount(2);
        await expect(page.getByRole('button', { name: 'Fjern samling' })).toHaveCount(1);
    });

    test('validerer utkast før redigering og lagrer gyldig utkast før bytte', async ({ page }) => {
        await fyllUtSamling(page);
        await page.getByRole('button', { name: 'Lagre samling' }).click();
        await page.getByRole('button', { name: 'Legg til samling' }).click();
        await page.getByRole('button', { name: 'Rediger', exact: true }).click();
        await expect(page.getByLabel('Fra og med (dd.mm.åååå)')).toHaveCount(1);
        await expect(page.getByLabel('Fra og med (dd.mm.åååå)')).toHaveValue('');
        await expect(page.getByRole('button', { name: 'Rediger', exact: true })).toHaveCount(1);
        await forventSynligeFeilmål(page);
        await page.getByRole('button', { name: 'Legg til samling' }).click();
        await expect(page.getByLabel('Fra og med (dd.mm.åååå)')).toHaveCount(1);

        await fyllUtSamling(page, true);
        await page.getByRole('button', { name: 'Rediger', exact: true }).click();
        await expect(page.getByLabel('Fra og med (dd.mm.åååå)')).toHaveCount(1);
        await expect(page.getByLabel('Gateadresse', { exact: true })).toHaveValue('Testveien 1');
        await expect(page.getByRole('link').filter({ hasText: /Du må/ })).toHaveCount(0);
        await page.getByRole('button', { name: 'Lagre samling' }).click();
        await expect(page.getByRole('button', { name: 'Rediger', exact: true })).toHaveCount(2);

        await page.getByRole('button', { name: 'Rediger', exact: true }).last().click();
        await page.getByRole('button', { name: 'Fjern samling' }).click();
        await expect(page.getByLabel('Fra og med (dd.mm.åååå)')).toHaveCount(0);
        await expect(page.getByRole('button', { name: 'Rediger', exact: true })).toHaveCount(1);
        await expect(page.getByRole('button', { name: 'Fjern samling' })).toHaveCount(0);
    });
});

test('At reise til samling viser førstesiden og går videre fra din situasjon', async ({ page }) => {
    await mockSøknadRoutingApi(page);
    await mockPersonApi(page);
    await mockAktivitet(page);
    await mockHarIngenSøknadReiseTilSamlingFraFør(page);
    await page.goto(`${urlSøknad}`);
    await fjernWebpackOverlay(page);

    await expect(
        page.getByRole('heading', { name: 'Søknad om støtte ved reise til samling' })
    ).toBeVisible();
    await expect(
        page.getByText(
            'Vi dekker som hovedregel den billigste reisemåten med offentlig transport. Hvis det ikke er praktisk mulig å bruke offentlig transport, kan du få dekket nødvendige utgifter til annen reisemåte. Vi kommer til å gjøre en konkret vurdering av om du oppfyller vilkårene til annen reisemåte basert på den informasjonen og dokumentasjonen du oppgir.'
        )
    ).toBeVisible();
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
    await page.getByLabel('Annet').check();
    await page
        .getByRole('radiogroup', { name: 'Hvilken annen type arbeidsrettet aktivitet har du?' })
        .getByLabel('Utdanning godkjent av Nav')
        .check();
    await page
        .getByRole('radiogroup', { name: 'Hva slags type arbeidsrettet aktivitet går du på?' })
        .getByLabel('Videregående skole')
        .check();
    await page
        .getByRole('radiogroup', {
            name: 'Er du lærling, lærekandidat, praksisbrevkandidat eller kandidat for fagbrev på jobb?',
        })
        .getByLabel('Ja')
        .check();
    await page
        .getByRole('radiogroup', {
            name: 'Får du dekket reisen til aktivitetsstedet av arbeidsgiveren din?',
        })
        .getByLabel('Nei')
        .check();

    await page.getByRole('button', { name: 'Neste' }).click();
    await fjernWebpackOverlay(page);

    await expect(page).toHaveURL(`${urlSøknad}/avreiseadresse`);
    await expect(page.getByRole('heading', { name: 'Avreiseadresse' })).toBeVisible();

    await forventIngenWcagViolations(page);

    await page
        .getByRole('radiogroup', { name: 'Skal du reise fra din folkeregistrerte adresse?' })
        .getByLabel('Ja')
        .check();
    await page.getByRole('button', { name: 'Neste' }).click();
    await fjernWebpackOverlay(page);

    await expect(page).toHaveURL(`${urlSøknad}/samlinger`);
    await expect(page.getByRole('heading', { name: 'Din reise' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Legg til samling' })).toBeEnabled();

    await forventIngenWcagViolations(page);

    await page.getByRole('button', { name: 'Legg til samling' }).click();
    await expect(page).toHaveURL(`${urlSøknad}/samlinger`);
    await expect(
        page.getByRole('group', { name: 'Er adressen den samme som forrige samling?' })
    ).not.toBeVisible();
    await expect(page.getByLabel('Fra og med (dd.mm.åååå)')).toBeVisible();

    await page.getByLabel('Fra og med (dd.mm.åååå)').fill('01.06.2025');
    await page.getByLabel('Til og med (dd.mm.åååå)').fill('05.06.2025');
    await page
        .getByRole('radiogroup', { name: 'Er samlingen obligatorisk?' })
        .getByLabel('Ja')
        .check();
    await page
        .getByLabel('Hvor mange kilometer er det mellom avreiseadresse og samlingsstedet?')
        .fill('45');

    await page.getByLabel('Gateadresse').fill('Testveien 1');
    await page.getByLabel('Postnummer').fill('0123');
    await page.getByLabel('Poststed').fill('Oslo');

    await page.getByRole('checkbox', { name: 'Offentlig transport' }).check();

    await page
        .getByLabel('Hva er totalutgiftene til offentlig transport til og fra samlingen?')
        .fill('500');

    await expect(page.getByRole('button', { name: 'Legg til samling' })).toBeEnabled();
    await page.getByRole('button', { name: 'Lagre samling' }).click();
    await expect(page.getByRole('button', { name: 'Rediger' })).toBeVisible();

    await page.getByRole('button', { name: 'Neste' }).click();
    await fjernWebpackOverlay(page);

    await expect(page).toHaveURL(`${urlSøknad}/vedlegg`);
    await page.getByRole('button', { name: 'Neste' }).click();
    await expect(page.getByRole('heading', { name: 'Vedlegg mangler' })).toBeVisible();
    await page.getByRole('button', { name: 'Ja, gå til neste side' }).click();
    await fjernWebpackOverlay(page);

    await expect(page).toHaveURL(`${urlSøknad}/oppsummering`);
    await expect(page.getByRole('heading', { name: 'Oppsummering' })).toBeVisible();

    await forventIngenWcagViolations(page);
});

test('At privatbil-feil og -verdier nullstilles når privat bil skjules', async ({ page }) => {
    await mockSøknadRoutingApi(page);
    await mockPersonApi(page);
    await mockAktivitet(page);
    await mockHarIngenSøknadReiseTilSamlingFraFør(page);
    await page.goto(`${urlSøknad}`);
    await fjernWebpackOverlay(page);

    await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
    await page.getByRole('button', { name: 'Start søknad' }).click();
    await fjernWebpackOverlay(page);
    await expect(page).toHaveURL(`${urlSøknad}/hovedytelse`);

    await page.getByRole('checkbox', { name: 'Arbeidsavklaringspenger (AAP)' }).check();
    await page.getByRole('button', { name: 'Neste' }).click();
    await fjernWebpackOverlay(page);

    await page.getByLabel('Type navn: 2. februar 2025 - 2. februar 2025').check();
    await page
        .getByRole('radiogroup', { name: 'Hva slags type arbeidsrettet aktivitet går du på?' })
        .getByLabel('Videregående skole')
        .check();
    await page
        .getByRole('radiogroup', {
            name: 'Er du lærling, lærekandidat, praksisbrevkandidat eller kandidat for fagbrev på jobb?',
        })
        .getByLabel('Ja')
        .check();
    await page
        .getByRole('radiogroup', {
            name: 'Får du dekket reisen til aktivitetsstedet av arbeidsgiveren din?',
        })
        .getByLabel('Nei')
        .check();

    await page.getByRole('button', { name: 'Neste' }).click();
    await fjernWebpackOverlay(page);

    await page
        .getByRole('radiogroup', { name: 'Skal du reise fra din folkeregistrerte adresse?' })
        .getByLabel('Ja')
        .check();
    await page.getByRole('button', { name: 'Neste' }).click();
    await fjernWebpackOverlay(page);

    await expect(page).toHaveURL(`${urlSøknad}/samlinger`);
    await expect(page.getByRole('heading', { name: 'Din reise' })).toBeVisible();
    await page.getByLabel('Fra og med (dd.mm.åååå)').fill('01.06.2025');
    await page.getByLabel('Til og med (dd.mm.åååå)').fill('05.06.2025');
    await page
        .getByRole('radiogroup', { name: 'Er samlingen obligatorisk?' })
        .getByLabel('Ja')
        .check();
    await page
        .getByLabel('Hvor mange kilometer er det mellom avreiseadresse og samlingsstedet?')
        .fill('45');
    await page.getByLabel('Gateadresse').fill('Testveien 1');
    await page.getByLabel('Postnummer').fill('0123');
    await page.getByLabel('Poststed').fill('Oslo');

    await page.getByRole('checkbox', { name: 'Offentlig transport' }).check();
    await page
        .getByLabel('Hva er totalutgiftene til offentlig transport til og fra samlingen?')
        .fill('500');
    await page.getByRole('checkbox', { name: 'Privat bil' }).check();
    await page.getByRole('radiogroup', { name: 'Benyttet du egen bil?' }).getByLabel('Ja').check();
    await page.getByLabel('Totale bompengeutgifter').fill('123');

    await page.getByRole('checkbox', { name: 'Privat bil' }).uncheck();

    await expect(page.getByRole('heading', { name: 'Privat bil' })).not.toBeVisible();
    await expect(page.getByText('Utgifter til kjøring med privat bil')).not.toBeVisible();
    await expect(
        page.getByRole('group', { name: 'Hvorfor kan du ikke reise med offentlig transport?' })
    ).not.toBeVisible();

    await page.getByRole('checkbox', { name: 'Privat bil' }).check();
    await page.getByRole('radiogroup', { name: 'Benyttet du egen bil?' }).getByLabel('Ja').check();
    await expect(page.getByLabel('Totale bompengeutgifter')).toHaveValue('');
});

test('At person uten folkeregistrert adresse kan oppgi avreiseadresse og gå videre', async ({
    page,
}) => {
    await mockSøknadRoutingApi(page);
    await mockPersonUtenAdresseApi(page);
    await mockAktivitet(page);
    await mockHarIngenSøknadReiseTilSamlingFraFør(page);
    await page.goto(`${urlSøknad}`);
    await fjernWebpackOverlay(page);

    await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
    await page.getByRole('button', { name: 'Start søknad' }).click();
    await fjernWebpackOverlay(page);
    await expect(page).toHaveURL(`${urlSøknad}/hovedytelse`);

    await page.getByRole('checkbox', { name: 'Arbeidsavklaringspenger (AAP)' }).check();
    await page.getByRole('button', { name: 'Neste' }).click();
    await fjernWebpackOverlay(page);

    await page.getByLabel('Type navn: 2. februar 2025 - 2. februar 2025').check();
    await page
        .getByRole('radiogroup', { name: 'Hva slags type arbeidsrettet aktivitet går du på?' })
        .getByLabel('Videregående skole')
        .check();
    await page
        .getByRole('radiogroup', {
            name: 'Er du lærling, lærekandidat, praksisbrevkandidat eller kandidat for fagbrev på jobb?',
        })
        .getByLabel('Ja')
        .check();
    await page
        .getByRole('radiogroup', {
            name: 'Får du dekket reisen til aktivitetsstedet av arbeidsgiveren din?',
        })
        .getByLabel('Nei')
        .check();
    await page.getByRole('button', { name: 'Neste' }).click();
    await fjernWebpackOverlay(page);

    await expect(page).toHaveURL(`${urlSøknad}/avreiseadresse`);
    await expect(
        page.getByRole('radiogroup', { name: 'Skal du reise fra din folkeregistrerte adresse?' })
    ).not.toBeVisible();

    await forventIngenWcagViolations(page);

    await page.getByLabel('Gateadresse').fill('Testveien 1');
    await page.getByLabel('Postnummer').fill('0123');
    await page.getByLabel('Poststed').fill('Oslo');
    await page.getByRole('button', { name: 'Neste' }).click();
    await fjernWebpackOverlay(page);

    await expect(page).toHaveURL(`${urlSøknad}/samlinger`);
});
