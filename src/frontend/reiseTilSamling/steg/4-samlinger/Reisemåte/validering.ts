import { nullstillteDrosjefeil } from './Drosje/validering';
import { validerDrosje } from './Drosje/validering';
import { nullstilteOffentligTransportFeil } from './OffentligTransport/validering';
import { validerOffentligTransport } from './OffentligTransport/validering';
import { nullstiltePrivatBilFeil } from './PrivatBil/validering';
import { validerPrivatBil } from './PrivatBil/validering';
import { EnumFlereValgFelt } from '../../../../typer/skjema';
import { Locale } from '../../../../typer/tekst';
import { Valideringsfeil } from '../../../../typer/validering';
import { harVerdi } from '../../../../utils/typeUtils';
import { reisemåteTekster } from '../../../tekster/reisemåte';
import {
    Reisemåte,
    UnntakFraOffentligTransport,
    ÅrsakKanIkkeBenytteEgenBil,
} from '../../../typer/reisemåte';

export const errorKeyHvilkeTransportmidlerBleBenyttet = (samlingId: number) =>
    `samling_${samlingId}_reisemåte_hvilke_transportmidler_ble_benyttet`;

export const errorKeyUnntakFraOffentligTransport = (samlingId: number) =>
    `samling_${samlingId}_reisemåte_unntak_fra_offentlig_transport`;
export const errorKeyUnntakFraOffentligTransportBarnehageAdresse = (samlingId: number) =>
    `samling_${samlingId}_reisemåte_unntak_fra_offentlig_transport_barnehage_adresse`;
export const errorKeyUnntakFraOffentligTransportBarnehagePostnummer = (samlingId: number) =>
    `samling_${samlingId}_reisemåte_unntak_fra_offentlig_transport_barnehage_postnummer`;
export const errorKeyUnntakFraPrivatBil = (samlingId: number) =>
    `samling_${samlingId}_reisemåte_unntak_fra_privat_bil`;

export const nullstilteUnntakFraOffentligTransport = (samlingId: number): Valideringsfeil => ({
    [errorKeyUnntakFraOffentligTransport(samlingId)]: undefined,
    [errorKeyUnntakFraOffentligTransportBarnehageAdresse(samlingId)]: undefined,
    [errorKeyUnntakFraOffentligTransportBarnehagePostnummer(samlingId)]: undefined,
});

export const nullstilteReisemåteFeil = (samlingId: number): Valideringsfeil => ({
    [errorKeyHvilkeTransportmidlerBleBenyttet(samlingId)]: undefined,
    ...nullstilteOffentligTransportFeil(samlingId),
    ...nullstiltePrivatBilFeil(samlingId),
    ...nullstillteDrosjefeil(samlingId),
    ...nullstilteUnntakFraOffentligTransport(samlingId),
    [errorKeyUnntakFraPrivatBil(samlingId)]: undefined,
});

export const validerReisemåte = (
    reisemåte: Reisemåte | undefined,
    locale: Locale,
    samlingId: number
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (
        !reisemåte?.hvilkeTransportmidlerBleBenyttet?.verdier.some((felt) => harVerdi(felt.verdi))
    ) {
        feil = {
            ...feil,
            [errorKeyHvilkeTransportmidlerBleBenyttet(samlingId)]: {
                id: errorKeyHvilkeTransportmidlerBleBenyttet(samlingId),
                melding: reisemåteTekster.check_hvilke_transportmidler.feilmelding[locale],
            },
        };
    }

    const valgteTransportmidler =
        reisemåte?.hvilkeTransportmidlerBleBenyttet?.verdier.map((felt) => felt.verdi) || [];

    if (valgteTransportmidler.includes('OFFENTLIG_TRANSPORT')) {
        feil = {
            ...feil,
            ...validerOffentligTransport(reisemåte?.offentligTransport, locale, samlingId),
        };
    }

    if (valgteTransportmidler.includes('PRIVAT_BIL')) {
        feil = {
            ...feil,
            ...validerUnntakFraOffentligTransport(
                reisemåte?.unntakFraOffentligTransport,
                locale,
                samlingId
            ),
            ...validerPrivatBil(reisemåte?.privatBil, locale, samlingId),
        };
    }

    if (valgteTransportmidler.includes('DROSJE')) {
        feil = {
            ...feil,
            ...validerUnntakFraOffentligTransport(
                reisemåte?.unntakFraOffentligTransport,
                locale,
                samlingId
            ),
            ...validerUnntakFraPrivatBil(reisemåte?.unntakFraPrivatBil, locale, samlingId),
            ...validerDrosje(reisemåte, locale, samlingId),
        };
    }

    return feil;
};

const validerUnntakFraOffentligTransport = (
    unntakFraOffentligTransport: UnntakFraOffentligTransport | undefined,
    locale: Locale,
    samlingId: number
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (!unntakFraOffentligTransport?.årsaker?.verdier.some((felt) => harVerdi(felt.verdi))) {
        feil = {
            ...feil,
            [errorKeyUnntakFraOffentligTransport(samlingId)]: {
                id: errorKeyUnntakFraOffentligTransport(samlingId),
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
                    [errorKeyUnntakFraOffentligTransportBarnehageAdresse(samlingId)]: {
                        id: errorKeyUnntakFraOffentligTransportBarnehageAdresse(samlingId),
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
                    [errorKeyUnntakFraOffentligTransportBarnehagePostnummer(samlingId)]: {
                        id: errorKeyUnntakFraOffentligTransportBarnehagePostnummer(samlingId),
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
    locale: Locale,
    samlingId: number
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (!unntakFraPrivatBil?.verdier.some((felt) => harVerdi(felt.verdi))) {
        feil = {
            ...feil,
            [errorKeyUnntakFraPrivatBil(samlingId)]: {
                id: errorKeyUnntakFraPrivatBil(samlingId),
                melding:
                    reisemåteTekster.check_kan_ikke_benytte_egen_bil_begrunnelse.feilmelding[
                        locale
                    ],
            },
        };
    }

    return feil;
};
