import { nullstillteDrosjefeil } from './Drosje/validering';
import { validerDrosje } from './Drosje/validering';
import { nullstilteOffentligTransportFeil } from './OffentligTransport/validering';
import { validerOffentligTransport } from './OffentligTransport/validering';
import { nullstiltePrivatBilFeil } from './PrivatBil/validering';
import { validerPrivatBil } from './PrivatBil/validering';
import {
    ReisemåteTekstInnhold,
    TransportmiddelOgUnntakTekster,
    UnntakFraOffentligTransportTekster,
} from './tekster';
import {
    Reisemåte,
    UnntakFraOffentligTransport,
    ÅrsakKanIkkeBenytteEgenBil,
} from '../../typer/reisemåte';
import { EnumFlereValgFelt } from '../../typer/skjema';
import { Locale } from '../../typer/tekst';
import { Valideringsfeil } from '../../typer/validering';
import { harVerdi } from '../../utils/typeUtils';

export const errorKeyHvilkeTransportmidlerBleBenyttet = (reiseId: number) =>
    `reise_${reiseId}_reisemåte_hvilke_transportmidler_ble_benyttet`;

export const errorKeyUnntakFraOffentligTransport = (reiseId: number) =>
    `reise_${reiseId}_reisemåte_unntak_fra_offentlig_transport`;
export const errorKeyUnntakFraOffentligTransportBarnehageAdresse = (reiseId: number) =>
    `reise_${reiseId}_reisemåte_unntak_fra_offentlig_transport_barnehage_adresse`;
export const errorKeyUnntakFraOffentligTransportBarnehagePostnummer = (reiseId: number) =>
    `reise_${reiseId}_reisemåte_unntak_fra_offentlig_transport_barnehage_postnummer`;
export const errorKeyUnntakFraPrivatBil = (reiseId: number) =>
    `reise_${reiseId}_reisemåte_unntak_fra_privat_bil`;

export const nullstilteUnntakFraOffentligTransport = (reiseId: number): Valideringsfeil => ({
    [errorKeyUnntakFraOffentligTransport(reiseId)]: undefined,
    [errorKeyUnntakFraOffentligTransportBarnehageAdresse(reiseId)]: undefined,
    [errorKeyUnntakFraOffentligTransportBarnehagePostnummer(reiseId)]: undefined,
});

export const nullstilteReisemåteFeil = (reiseId: number): Valideringsfeil => ({
    [errorKeyHvilkeTransportmidlerBleBenyttet(reiseId)]: undefined,
    ...nullstilteOffentligTransportFeil(reiseId),
    ...nullstiltePrivatBilFeil(reiseId),
    ...nullstillteDrosjefeil(reiseId),
    ...nullstilteUnntakFraOffentligTransport(reiseId),
    [errorKeyUnntakFraPrivatBil(reiseId)]: undefined,
});

export const validerReisemåte = (
    reisemåte: Reisemåte | undefined,
    locale: Locale,
    reiseId: number,
    tekster: ReisemåteTekstInnhold
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (
        !reisemåte?.hvilkeTransportmidlerBleBenyttet?.verdier.some((felt) => harVerdi(felt.verdi))
    ) {
        feil = {
            ...feil,
            [errorKeyHvilkeTransportmidlerBleBenyttet(reiseId)]: {
                id: errorKeyHvilkeTransportmidlerBleBenyttet(reiseId),
                melding:
                    tekster.transportmiddelOgUnntak.check_hvilke_transportmidler.feilmelding[
                        locale
                    ],
            },
        };
    }

    const valgteTransportmidler =
        reisemåte?.hvilkeTransportmidlerBleBenyttet?.verdier.map((felt) => felt.verdi) || [];

    if (valgteTransportmidler.includes('OFFENTLIG_TRANSPORT')) {
        feil = {
            ...feil,
            ...validerOffentligTransport(
                reisemåte?.offentligTransport,
                locale,
                reiseId,
                tekster.offentligTransport
            ),
        };
    }

    if (valgteTransportmidler.includes('PRIVAT_BIL')) {
        const skalReiseMedFlereTransportmidler =
            valgteTransportmidler.filter((transportmiddel) => transportmiddel !== 'PRIVAT_BIL')
                .length > 0;

        feil = {
            ...feil,
            ...validerUnntakFraOffentligTransport(
                reisemåte?.unntakFraOffentligTransport,
                locale,
                reiseId,
                tekster.unntakFraOffentligTransport
            ),
            ...validerPrivatBil(
                reisemåte?.privatBil,
                locale,
                reiseId,
                skalReiseMedFlereTransportmidler,
                tekster.privatBil
            ),
        };
    }

    if (valgteTransportmidler.includes('DROSJE')) {
        feil = {
            ...feil,
            ...validerUnntakFraOffentligTransport(
                reisemåte?.unntakFraOffentligTransport,
                locale,
                reiseId,
                tekster.unntakFraOffentligTransport
            ),
            ...validerUnntakFraPrivatBil(
                reisemåte?.unntakFraPrivatBil,
                locale,
                reiseId,
                tekster.transportmiddelOgUnntak
            ),
            ...validerDrosje(reisemåte, locale, reiseId, tekster.drosje),
        };
    }

    return feil;
};

const validerUnntakFraOffentligTransport = (
    unntakFraOffentligTransport: UnntakFraOffentligTransport | undefined,
    locale: Locale,
    reiseId: number,
    tekster: UnntakFraOffentligTransportTekster
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (!unntakFraOffentligTransport?.årsaker?.verdier.some((felt) => harVerdi(felt.verdi))) {
        feil = {
            ...feil,
            [errorKeyUnntakFraOffentligTransport(reiseId)]: {
                id: errorKeyUnntakFraOffentligTransport(reiseId),
                melding: tekster.check_kan_ikke_reise_offentlig_begrunnelse.feilmelding[locale],
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
                    [errorKeyUnntakFraOffentligTransportBarnehageAdresse(reiseId)]: {
                        id: errorKeyUnntakFraOffentligTransportBarnehageAdresse(reiseId),
                        melding:
                            tekster.check_kan_ikke_reise_offentlig_begrunnelse.feilmelding[locale],
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
                    [errorKeyUnntakFraOffentligTransportBarnehagePostnummer(reiseId)]: {
                        id: errorKeyUnntakFraOffentligTransportBarnehagePostnummer(reiseId),
                        melding:
                            tekster.check_kan_ikke_reise_offentlig_begrunnelse.feilmelding[locale],
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
    reiseId: number,
    tekster: TransportmiddelOgUnntakTekster
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (!unntakFraPrivatBil?.verdier.some((felt) => harVerdi(felt.verdi))) {
        feil = {
            ...feil,
            [errorKeyUnntakFraPrivatBil(reiseId)]: {
                id: errorKeyUnntakFraPrivatBil(reiseId),
                melding: tekster.check_kan_ikke_benytte_egen_bil_begrunnelse.feilmelding[locale],
            },
        };
    }

    return feil;
};
