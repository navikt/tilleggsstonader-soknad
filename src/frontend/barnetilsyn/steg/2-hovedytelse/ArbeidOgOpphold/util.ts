import { EnumFlereValgFelt } from '../../../../typer/skjema';
import { ArbeidOgOpphold, MottarPengestøtteTyper } from '../../../../typer/søknad';
import { harVerdi } from '../../../../utils/typer';

export const skalTaStillingTilLandForJobberIAnnetLand = (opphold: ArbeidOgOpphold): boolean =>
    opphold.jobberIAnnetLandEnnNorge?.verdi === 'JA';

export const skalTaStillingTilPengestøtte = (opphold: ArbeidOgOpphold): boolean =>
    opphold?.jobberIAnnetLandEnnNorge?.verdi === 'NEI' ||
    harVerdi(opphold.hvilketLandJobberIAnnetLandEnnNorge?.verdi);

const mottarPengestøtteTyperSomMåSåTaStillingTilLand: MottarPengestøtteTyper[] = [
    'SYKEPENGER',
    'PENSJON',
    'ANNEN_PENGESTØTTE',
];

export const skalTaStillingTilLandForPengestøtte = (
    verdier: EnumFlereValgFelt<MottarPengestøtteTyper> | undefined
): boolean =>
    (verdier?.verdier || []).some(
        (verdi) => mottarPengestøtteTyperSomMåSåTaStillingTilLand.indexOf(verdi.verdi) > -1
    );
