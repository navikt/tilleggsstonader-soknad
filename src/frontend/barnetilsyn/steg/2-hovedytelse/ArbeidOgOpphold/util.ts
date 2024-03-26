import { ArbeidOgOpphold } from '../../../../typer/søknad';

export const skalTaStillingTilLandForJobberIAnnetLand = (opphold: ArbeidOgOpphold): boolean =>
    opphold.jobberIAnnetLand?.verdi === 'JA';
