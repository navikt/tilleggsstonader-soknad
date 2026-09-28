import { nullstillteDrosjefeil } from './Drosje/validering';
import { nullstilteOffentligTransportFeil } from './OffentligTransport/validering';
import { nullstiltePrivatBilFeil } from './PrivatBil/validering';
import {
    errorKeyUnntakFraOffentligTransport,
    errorKeyUnntakFraPrivatBil,
    nullstilteUnntakFraOffentligTransport,
} from './validering';
import { EnumFlereValgFelt } from '../../../../typer/skjema';
import { Valideringsfeil } from '../../../../typer/validering';
import { Transportmiddel } from '../../../typer/reisemåte';

export const finnValgteTransportmidler = (
    transportmidler: EnumFlereValgFelt<Transportmiddel> | undefined
): Transportmiddel[] => transportmidler?.verdier.map((felt) => felt.verdi) ?? [];

export const nullstillEllerBeholdVerdi = <T>(
    inkluderteTransportmidler: Transportmiddel[],
    transportmiddeler: Transportmiddel[],
    verdi: T | undefined
): T | undefined =>
    inkluderteTransportmidler.some((transportmiddel) => transportmiddeler.includes(transportmiddel))
        ? verdi
        : undefined;

// Nullstiller feilmeldinger for offentlig transport om den ikke lenger er inkludert
export const vurderOffentligTransportFelterForNullstilling = (
    inkluderteTransportmidler: Transportmiddel[],
    samlingId: number
): Valideringsfeil =>
    inkluderteTransportmidler.includes('OFFENTLIG_TRANSPORT')
        ? {}
        : nullstilteOffentligTransportFeil(samlingId);

// Nullstiller feilmeldinger for privat bil om den ikke lenger er inkludert
export const vurderPrivatBilFelterForNullstillng = (
    inkluderteTransportmidler: Transportmiddel[],
    samlingId: number
): Valideringsfeil =>
    inkluderteTransportmidler.includes('PRIVAT_BIL') ? {} : nullstiltePrivatBilFeil(samlingId);

// Nullstiller feilmeldinger for drosje om den ikke lenger er inkludert
export const vurderDrosjeFelterForNullstilling = (
    inkluderteTransportmidler: Transportmiddel[],
    samlingId: number
): Valideringsfeil =>
    inkluderteTransportmidler.includes('DROSJE') ? {} : nullstillteDrosjefeil(samlingId);

export const vurderUnntakFeilForNullstilling = (
    inkluderteTransportmidler: Transportmiddel[],
    samlingId: number
): Valideringsfeil => {
    // Nullstiller ingen feil dersom drosje fortsatt er inkludert siden begge unntak skal vises
    if (inkluderteTransportmidler.includes('DROSJE')) {
        return {};
    }

    // Nullstiller feil for unntak fra privat bil dersom drosje ikke er inkludert, men bil er inkludert
    if (inkluderteTransportmidler.includes('PRIVAT_BIL')) {
        return {
            [errorKeyUnntakFraPrivatBil(samlingId)]: undefined,
        };
    }

    return {
        ...nullstilteUnntakFraOffentligTransport(samlingId),
        [errorKeyUnntakFraPrivatBil(samlingId)]: undefined,
        [errorKeyUnntakFraOffentligTransport(samlingId)]: undefined,
    };
};
