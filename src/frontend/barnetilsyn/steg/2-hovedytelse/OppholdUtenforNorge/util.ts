import { EnumFlereValgFelt } from '../../../../typer/skjema';
import {
    ArbeidOgOpphold,
    MottarPengestøtteTyper,
    OppholdUtenforNorge,
} from '../../../../typer/søknad';
import { harVerdi } from '../../../../utils/typer';

/**
 * Oppdaterer felt i [OppholdUtenforNorge] med gitt verdi
 */
export const oppdaterOpphold = <T extends OppholdUtenforNorge, K extends keyof T>(
    oppholdUtenforNorge: OppholdUtenforNorge[],
    id: number,
    key: K,
    verdi: T[K]
) => {
    return oppholdUtenforNorge.map((opphold) => {
        if (opphold._id === id) {
            return {
                ...opphold,
                [key]: verdi,
            };
        } else {
            return opphold;
        }
    });
};

/**
 * Utleder max id for å kunne sette nytt id på neste item for å kunne lenke til unik opphold
 */
const utledMaxId = (oppholdUtenforNorge: OppholdUtenforNorge[]) => {
    const ids = oppholdUtenforNorge.map((opphold) => opphold._id);
    return ids.length > 0 ? Math.max(...ids) : 0;
};

/**
 * Oppretter tomt [OppholdUtenforNorge] med ny [_id]
 */
export const opprettOppholdForNesteId = (opphold: OppholdUtenforNorge[]): OppholdUtenforNorge => {
    const maxId = utledMaxId(opphold);
    return { _id: maxId + 1, lagret: false };
};
export const skalTaStillingTilPengestøtte = (opphold: ArbeidOgOpphold) =>
    opphold?.jobberIAnnetLandEnnNorge?.verdi === 'NEI' ||
    harVerdi(opphold.hvilketLandJobberIAnnetLandEnnNorge?.verdi);
const mottarPengestøtteTyperSomMåSåTaStillingTilLand: MottarPengestøtteTyper[] = [
    'SYKEPENGER',
    'PENSJON',
    'ANNEN_PENGESTØTTE',
];
export const skalTaStillingTilLandForPengestøtte = (
    verdier: EnumFlereValgFelt<MottarPengestøtteTyper> | undefined
) =>
    (verdier?.verdier || []).some(
        (verdi) => mottarPengestøtteTyperSomMåSåTaStillingTilLand.indexOf(verdi.verdi) > -1
    );
export const skalTaStillingTilOppholdUtenforNorge = (opphold: ArbeidOgOpphold) =>
    (opphold.mottarDuPengestøtteFraAnnetLand?.verdier || []).length > 0 &&
    !skalTaStillingTilLandForPengestøtte(opphold.mottarDuPengestøtteFraAnnetLand);
export const skalTaStillingTilOppholdSiste12mnd = (opphold: ArbeidOgOpphold) =>
    opphold.harDuOppholdUtenforNorgeSiste12mnd?.verdi === 'JA';
export const skalTaStillingTilOppholdNeste12mnd = (opphold: ArbeidOgOpphold) =>
    opphold.harDuOppholdUtenforNorgeNeste12mnd?.verdi === 'JA';
