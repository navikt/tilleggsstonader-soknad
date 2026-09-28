import { nullstillteDrosjefeil } from './Drosje/validering';
import { nullstilteOffentligTransportFeil } from './OffentligTransport/validering';
import { nullstiltePrivatBilFeil } from './PrivatBil/validering';
import { errorKeyUnntakFraOffentligTransport, errorKeyUnntakFraPrivatBil } from './validering';
import { EnumFlereValgFelt } from '../../../typer/skjema';
import { Valideringsfeil } from '../../../typer/validering';
import { Transportmiddel } from '../../typer/reisemåte';

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
    inkluderteTransportmidler: Transportmiddel[]
): Valideringsfeil =>
    inkluderteTransportmidler.includes('OFFENTLIG_TRANSPORT')
        ? {}
        : nullstilteOffentligTransportFeil;

// Nullstiller feilmeldinger for privat bil om den ikke lenger er inkludert
export const vurderPrivatBilFelterForNullstillng = (
    inkluderteTransportmidler: Transportmiddel[]
): Valideringsfeil =>
    inkluderteTransportmidler.includes('PRIVAT_BIL') ? {} : nullstiltePrivatBilFeil;

// Nullstiller feilmeldinger for drosje om den ikke lenger er inkludert
export const vurderDrosjeFelterForNullstilling = (
    inkluderteTransportmidler: Transportmiddel[]
): Valideringsfeil => (inkluderteTransportmidler.includes('DROSJE') ? {} : nullstillteDrosjefeil);

// Skal nullstille feil for unntak privat bil dersom drosje ikke er inkludert
// Skal nullstille feil for unntak fra offentlig transport dersom hverken privat bil eller drosje er injludert ikke er inkludert
export const vurderUnntakFeilForNullstilling = (
    inkluderteTransportmidler: Transportmiddel[]
): Valideringsfeil => {
    // Nullstiller ingen feil dersom drosje fortsatt er inkludert siden begge unntak skal vises
    if (inkluderteTransportmidler.includes('DROSJE')) {
        return {};
    }

    // Nullstiller feil for unntak fra privat bil dersom drosje ikke er inkludert, men bil er inkludert
    if (inkluderteTransportmidler.includes('PRIVAT_BIL')) {
        return {
            [errorKeyUnntakFraPrivatBil]: undefined,
        };
    }

    return {
        [errorKeyUnntakFraPrivatBil]: undefined,
        [errorKeyUnntakFraOffentligTransport]: undefined,
    };
};
