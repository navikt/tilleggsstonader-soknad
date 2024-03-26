import { ArbeidOgOpphold } from '../../../../typer/søknad';

export const skalTaStillingTilLandForJobberIAnnetLand = (opphold: ArbeidOgOpphold): boolean =>
    opphold.jobberIAnnetLandEnnNorge?.verdi === 'JA';
