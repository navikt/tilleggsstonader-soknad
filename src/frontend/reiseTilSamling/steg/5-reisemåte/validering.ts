import { validerDrosje } from './Drosje/validering';
import { validerOffentligTransport } from './OffentligTransport/validering';
import { validerPrivatBil } from './PrivatBil/validering';
import { EnumFlereValgFelt } from '../../../typer/skjema';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { harVerdi } from '../../../utils/typeUtils';
import { reisemåteTekster } from '../../tekster/reisemåte';
import {
    Reisemåte,
    UnntakFraOffentligTransport,
    ÅrsakKanIkkeBenytteEgenBil,
} from '../../typer/reisemåte';

export const errorKeyHvilkeTransportmidlerBleBenyttet =
    'reisemåte_hvilke_transportmidler_ble_benyttet';

export const errorKeyUnntakFraOffentligTransport = 'reisemåte_unntak_fra_offentlig_transport';
export const errorKeyUnntakFraOffentligTransportBarnehageAdresse =
    'reisemåte_unntak_fra_offentlig_transport_barnehage_adresse';
export const errorKeyUnntakFraOffentligTransportBarnehagePostnummer =
    'reisemåte_unntak_fra_offentlig_transport_barnehage_postnummer';
export const errorKeyUnntakFraPrivatBil = 'reisemåte_unntak_fra_privat_bil';

export const nullstilteUnntakFraOffentligTransport = {
    [errorKeyUnntakFraOffentligTransport]: undefined,
    [errorKeyUnntakFraOffentligTransportBarnehageAdresse]: undefined,
    [errorKeyUnntakFraOffentligTransportBarnehagePostnummer]: undefined,
};

// TODO: Sjekk at ting ikke kjæsjer av dobbelt sjekk på unntak fra offentlig transport
export const validerReisemåte = (
    reisemåte: Reisemåte | undefined,
    locale: Locale
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (
        !reisemåte?.hvilkeTransportmidlerBleBenyttet?.verdier.some((felt) => harVerdi(felt.verdi))
    ) {
        feil = {
            ...feil,
            [errorKeyHvilkeTransportmidlerBleBenyttet]: {
                id: errorKeyHvilkeTransportmidlerBleBenyttet,
                melding: reisemåteTekster.check_hvilke_transportmidler.feilmelding[locale],
            },
        };
    }

    const valgteTransportmidler =
        reisemåte?.hvilkeTransportmidlerBleBenyttet?.verdier.map((felt) => felt.verdi) || [];

    if (valgteTransportmidler.includes('OFFENTLIG_TRANSPORT')) {
        feil = {
            ...feil,
            ...validerOffentligTransport(reisemåte?.offentligTransport, locale),
        };
    }

    if (valgteTransportmidler.includes('PRIVAT_BIL')) {
        feil = {
            ...feil,
            ...validerUnntakFraOffentligTransport(reisemåte?.unntakFraOffentligTransport, locale),
            ...validerPrivatBil(reisemåte?.privatBil, locale),
        };
    }

    if (valgteTransportmidler.includes('DROSJE')) {
        feil = {
            ...feil,
            ...validerUnntakFraOffentligTransport(reisemåte?.unntakFraOffentligTransport, locale),
            ...validerUnntakFraPrivatBil(reisemåte?.unntakFraPrivatBil, locale),
            ...validerDrosje(reisemåte, locale),
        };
    }

    return feil;
};

const validerUnntakFraOffentligTransport = (
    unntakFraOffentligTransport: UnntakFraOffentligTransport | undefined,
    locale: Locale
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (!unntakFraOffentligTransport?.årsaker?.verdier.some((felt) => harVerdi(felt.verdi))) {
        feil = {
            ...feil,
            [errorKeyUnntakFraOffentligTransport]: {
                id: errorKeyUnntakFraOffentligTransport,
                melding:
                    reisemåteTekster.check_kan_ikke_reise_offentlig_begrunnelse.feilmelding[locale],
            },
        };
    } else {
        const valgteÅrsaker =
            unntakFraOffentligTransport?.årsaker?.verdier.map((felt) => felt.verdi) || [];

        if (valgteÅrsaker.includes('LEVERING_HENTING_I_BARNEHAGE')) {
            if (
                !harVerdi(
                    unntakFraOffentligTransport.leveringOgHentingIBarnehage?.gateadresse?.verdi
                )
            ) {
                feil = {
                    ...feil,
                    [errorKeyUnntakFraOffentligTransportBarnehageAdresse]: {
                        id: errorKeyUnntakFraOffentligTransportBarnehageAdresse,
                        melding:
                            reisemåteTekster.check_kan_ikke_reise_offentlig_begrunnelse.feilmelding[
                                locale
                            ],
                    },
                };
            }
            if (
                !harVerdi(
                    unntakFraOffentligTransport.leveringOgHentingIBarnehage?.postnummer?.verdi
                )
            ) {
                feil = {
                    ...feil,
                    [errorKeyUnntakFraOffentligTransportBarnehagePostnummer]: {
                        id: errorKeyUnntakFraOffentligTransportBarnehagePostnummer,
                        melding:
                            reisemåteTekster.check_kan_ikke_reise_offentlig_begrunnelse.feilmelding[
                                locale
                            ],
                    },
                };
            }
        }
    }

    return feil;
};

const validerUnntakFraPrivatBil = (
    unntakFraPrivatBil: EnumFlereValgFelt<ÅrsakKanIkkeBenytteEgenBil> | undefined,
    locale: Locale
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (!unntakFraPrivatBil?.verdier.some((felt) => harVerdi(felt.verdi))) {
        feil = {
            ...feil,
            [errorKeyUnntakFraPrivatBil]: {
                id: errorKeyUnntakFraPrivatBil,
                melding:
                    reisemåteTekster.check_kan_ikke_benytte_egen_bil_begrunnelse.feilmelding[
                        locale
                    ],
            },
        };
    }

    return feil;
};
