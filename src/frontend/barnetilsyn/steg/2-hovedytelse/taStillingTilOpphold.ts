import { Ytelse } from './typer';
import { EnumFlereValgFelt } from '../../../typer/skjema';

const huketAvEnAvYtelser: Ytelse[] = [
    'INGEN_PENGESTØTTE', // ingen pengestøtte men har nedsatt arbeidsevne
    'TILTAKSPENGER',
    'INGEN_PASSENDE_ALTERNATIVER',
    'KVALIFISERINGSSTØNAD',
];
const ikkeHuketAvEnAvDisse: Ytelse[] = [
    'AAP',
    'OVERGANGSSTØNAD',
    'GJENLEVENDEPENSJON',
    'UFØRETRYGD',
    'SYKEPENGER',
    'DAGPENGER',
];

export const skalTaStillingTilOppholdINorge = (ytelse: EnumFlereValgFelt<Ytelse>): boolean => {
    const ytelser: Ytelse[] = ytelse.verdier.map((v) => v.verdi);

    const harValgtEn = ytelser.some((ytelse) => huketAvEnAvYtelser.includes(ytelse));
    const harValgtEnManIkkeSkal = ytelser.some((ytelse) => ikkeHuketAvEnAvDisse.includes(ytelse));
    return harValgtEn && !harValgtEnManIkkeSkal;
};
