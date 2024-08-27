import { EnumFlereValgFelt } from '../../../typer/skjema';
import { ArbeidOgOpphold, MottarPengestøtteTyper } from '../../../typer/søknad';

export const skalTaStillingTilLandForJobberIAnnetLand = (opphold: ArbeidOgOpphold): boolean =>
    opphold.jobberIAnnetLand?.verdi === 'JA';

const pengestøtteTyperSomMåOppgiLand: MottarPengestøtteTyper[] = [
    'SYKEPENGER',
    'PENSJON',
    'ANNEN_PENGESTØTTE',
];

export const skalTaStillingTilLandForPengestøtte = (
    verdier: EnumFlereValgFelt<MottarPengestøtteTyper> | undefined
): boolean =>
    (verdier?.verdier || []).some(
        (verdi) => pengestøtteTyperSomMåOppgiLand.indexOf(verdi.verdi) > -1
    );
