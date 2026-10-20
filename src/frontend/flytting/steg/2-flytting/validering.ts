import { isValid, parseISO } from 'date-fns';

import { AdresseFeilIder, validerAdresse } from '../../../components/AdresseVelger/validering';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { flyttingDetaljerTekster } from '../../tekster/flyttingDetaljer';
import { egenutgiftFelter, Flyttebyrå, FlyttingDetaljer } from '../../typer/flyttingDetaljer';

export const feilId = (felt: string): string => `flyttingDetaljer_${felt}`;

export const adresseFeilIder: AdresseFeilIder = {
    land: feilId('adresse_land'),
    gateadresse: feilId('adresse_gateadresse'),
    postnummer: feilId('adresse_postnummer'),
    poststed: feilId('adresse_poststed'),
};

export const tilDesimaltall = (verdi: string | undefined): number | undefined => {
    if (verdi === undefined || !/^\d+(?:[.,]\d{1,2})?$/.test(verdi.trim())) {
        return undefined;
    }
    const tall = Number(verdi.trim().replace(',', '.'));
    return Number.isFinite(tall) ? tall : undefined;
};

export const erGyldigFlyttedato = (verdi: string | undefined): boolean =>
    verdi !== undefined && /^\d{4}-\d{2}-\d{2}$/.test(verdi) && isValid(parseISO(verdi));

const tilHundredeler = (verdi: string): bigint => {
    const [heltall, desimaler = ''] = verdi.trim().split(/[.,]/);
    return BigInt(heltall + desimaler.padEnd(2, '0'));
};

export const harValgtDyrereTilbud = (flyttebyrå: Flyttebyrå | undefined): boolean => {
    const verdi1 = flyttebyrå?.tilbud1?.beløp?.verdi;
    const verdi2 = flyttebyrå?.tilbud2?.beløp?.verdi;
    if (
        verdi1 === undefined ||
        verdi2 === undefined ||
        tilDesimaltall(verdi1) === undefined ||
        tilDesimaltall(verdi2) === undefined
    ) {
        return false;
    }
    const beløp1 = tilHundredeler(verdi1);
    const beløp2 = tilHundredeler(verdi2);
    return (
        (flyttebyrå?.valgtTilbud?.verdi === 'TILBUD_1' && beløp1 > beløp2) ||
        (flyttebyrå?.valgtTilbud?.verdi === 'TILBUD_2' && beløp2 > beløp1)
    );
};

export const validerFlyttingDetaljer = (
    detaljer: FlyttingDetaljer | undefined,
    locale: Locale
): Valideringsfeil => {
    const feil: Valideringsfeil = {};
    const leggTilFeil = (felt: string, melding: string) => {
        const id = feilId(felt);
        feil[id] = { id, melding };
    };
    const tekster = flyttingDetaljerTekster;

    if (!detaljer?.årsak) {
        leggTilFeil('årsak', tekster.radio_årsak.feilmelding[locale]);
    }
    if (!erGyldigFlyttedato(detaljer?.flyttedato?.verdi)) {
        leggTilFeil('flyttedato', tekster.dato_flytting.feilmelding[locale]);
    }
    if (
        detaljer?.årsak?.verdi === 'NY_JOBB' &&
        !erGyldigFlyttedato(detaljer.førsteArbeidsdag?.verdi)
    ) {
        leggTilFeil('førsteArbeidsdag', tekster.dato_første_arbeidsdag.feilmelding[locale]);
    }
    Object.assign(
        feil,
        validerAdresse(detaljer?.adresse, locale, tekster.adresse_spørsmål, adresseFeilIder)
    );
    if (!detaljer?.flyttemåte) {
        leggTilFeil('flyttemåte', tekster.radio_flyttemåte.feilmelding[locale]);
    }
    if (!detaljer?.utgifterDekketPåAnnenMåte) {
        leggTilFeil('utgifterDekketPåAnnenMåte', tekster.radio_annen_dekning.feilmelding[locale]);
    }

    if (detaljer?.flyttemåte?.verdi === 'FLYTTER_SELV') {
        const avstand = tilDesimaltall(detaljer.utgifterEgenFlytting?.avstand?.verdi);
        if (avstand === undefined || avstand <= 0) {
            leggTilFeil('avstand', tekster.antall_km.feilmelding[locale]);
        }
        egenutgiftFelter.forEach((felt) => {
            const verdi = detaljer.utgifterEgenFlytting?.[felt]?.verdi;
            if (verdi?.trim() && tilDesimaltall(verdi) === undefined) {
                leggTilFeil(felt, tekster.egenutgifter_beløp[felt].feilmelding[locale]);
            }
        });
    }

    if (detaljer?.flyttemåte?.verdi === 'FLYTTEBYRÅ') {
        (['tilbud1', 'tilbud2'] as const).forEach((felt) => {
            const tilbud = detaljer.flyttebyrå?.[felt];
            if (!tilbud?.navn?.verdi.trim()) {
                leggTilFeil(`${felt}_navn`, tekster[`${felt}_spørsmål`].navn.feilmelding[locale]);
            }
            if (tilDesimaltall(tilbud?.beløp?.verdi) === undefined) {
                leggTilFeil(`${felt}_beløp`, tekster[`${felt}_spørsmål`].beløp.feilmelding[locale]);
            }
        });
        if (!detaljer.flyttebyrå?.valgtTilbud) {
            leggTilFeil('valgtTilbud', tekster.radio_valgt_tilbud.feilmelding[locale]);
        }
    }
    return feil;
};
