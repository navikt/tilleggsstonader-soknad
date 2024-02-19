import { Ytelse } from './typer';
import { EnumFlereValgFelt } from '../../../typer/skjema';

const ytelserMedImplisittMedlemskap: Ytelse[] = [
    'AAP',
    'OVERGANGSSTØNAD',
    'GJENLEVENDEPENSJON',
    'UFØRETRYGD',
    'SYKEPENGER',
    'DAGPENGER',
];

export const skalTaStillingTilOppholdINorge = (ytelse: EnumFlereValgFelt<Ytelse>): boolean => {
    const ytelser: Ytelse[] = ytelse.verdier.map((v) => v.verdi);
    const valgtYtelseMedImplisittMedlemskap = ytelser.some((ytelse) =>
        ytelserMedImplisittMedlemskap.includes(ytelse)
    );
    return !valgtYtelseMedImplisittMedlemskap && ytelser.length > 0;
};
