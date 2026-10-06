import { Ytelse } from './typer';
import { EnumFlereValgFelt } from '../../typer/skjema';

const ytelserMedImplisittMedlemskap: Ytelse[] = [
    'AAP',
    'OVERGANGSSTØNAD',
    'GJENLEVENDEPENSJON',
    'UFØRETRYGD',
    'SYKEPENGER',
    'DAGPENGER',
    'AKTIVITETSPENGER',
];

// Ytelser som krever at bruker oppholder seg i Norge.
// Vi trenger derfor ikke å stille oppfølgingsspørsmål om opphold for disse ytelsene.
const ytelserMedKravOmOppholdIRiket: Ytelse[] = ['KVALIFISERINGSSTØNAD', 'TILTAKSPENGER'];

export const skalTaStillingTilOppholdINorge = (ytelse: EnumFlereValgFelt<Ytelse>): boolean => {
    const ytelser: Ytelse[] = ytelse.verdier.map((v) => v.verdi);
    const valgtYtelseMedImplisittMedlemskap = ytelser.some((ytelse) =>
        ytelserMedImplisittMedlemskap.includes(ytelse)
    );
    const valgtYtelseMedKravOmOppholdIRiket = ytelser.some((ytelse) =>
        ytelserMedKravOmOppholdIRiket.includes(ytelse)
    );

    return (
        !valgtYtelseMedImplisittMedlemskap &&
        !valgtYtelseMedKravOmOppholdIRiket &&
        ytelser.length > 0
    );
};
