import { isValid, parseISO } from 'date-fns';

import { AdresseFeilIder, validerAdresse } from '../../../components/AdresseVelger/validering';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { flyttingDetaljerTekster } from '../../tekster/flyttingDetaljer';
import {
    egenutgiftFelter,
    flyttebyråTilbudIndekser,
    FlyttingDetaljer,
} from '../../typer/flyttingDetaljer';

export const feilId = (felt: string): string => `flyttingDetaljer_${felt}`;

export const adresseFeilIder: AdresseFeilIder = {
    land: feilId('adresse_land'),
    gateadresse: feilId('adresse_gateadresse'),
    postnummer: feilId('adresse_postnummer'),
    poststed: feilId('adresse_poststed'),
};

export const adresseFraFeilIder: AdresseFeilIder = {
    land: feilId('adresseFra_land'),
    gateadresse: feilId('adresseFra_gateadresse'),
    postnummer: feilId('adresseFra_postnummer'),
    poststed: feilId('adresseFra_poststed'),
};

export const errorKeySkalFlytteFraFolkeregistrertAdresse = feilId(
    'skalFlytteFraFolkeregistrertAdresse'
);

export const tilDesimaltall = (verdi: string | undefined): number | undefined => {
    if (verdi === undefined || !/^\d+(?:[.,]\d{1,2})?$/.test(verdi.trim())) {
        return undefined;
    }
    const tall = Number(verdi.trim().replace(',', '.'));
    return Number.isFinite(tall) ? tall : undefined;
};

export const erGyldigFlyttedato = (verdi: string | undefined): boolean =>
    verdi !== undefined && /^\d{4}-\d{2}-\d{2}$/.test(verdi) && isValid(parseISO(verdi));

export const validerFlyttingDetaljer = (
    detaljer: FlyttingDetaljer | undefined,
    locale: Locale,
    manglerFolkeregistrertAdresse = false
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
    Object.assign(
        feil,
        validerAdresse(detaljer?.adresse, locale, tekster.adresse_spørsmål, adresseFeilIder)
    );
    if (manglerFolkeregistrertAdresse) {
        Object.assign(
            feil,
            validerAdresse(
                detaljer?.adresseDetSkalFlyttesFra,
                locale,
                tekster.adresse_fra_spørsmål,
                adresseFraFeilIder
            )
        );
    } else if (!detaljer?.skalFlytteFraFolkeregistrertAdresse) {
        leggTilFeil(
            'skalFlytteFraFolkeregistrertAdresse',
            tekster.radio_skalFlytteFraFolkeregistrertAdresse.feilmelding[locale]
        );
    } else if (detaljer.skalFlytteFraFolkeregistrertAdresse.verdi === 'NEI') {
        Object.assign(
            feil,
            validerAdresse(
                detaljer.adresseDetSkalFlyttesFra,
                locale,
                tekster.adresse_fra_spørsmål,
                adresseFraFeilIder
            )
        );
    }
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
        flyttebyråTilbudIndekser.forEach((index) => {
            const tilbud = detaljer.flyttebyrå?.tilbud[index];
            const felt = `tilbud${index + 1}`;
            if (!tilbud?.navn?.verdi.trim()) {
                leggTilFeil(
                    `${felt}_navn`,
                    tekster.tilbud_spørsmål[index].navn.feilmelding[locale]
                );
            }
            if (tilDesimaltall(tilbud?.beløp?.verdi) === undefined) {
                leggTilFeil(
                    `${felt}_beløp`,
                    tekster.tilbud_spørsmål[index].beløp.feilmelding[locale]
                );
            }
        });
    }
    return feil;
};
