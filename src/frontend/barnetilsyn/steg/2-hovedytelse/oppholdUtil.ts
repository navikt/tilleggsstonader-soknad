import { OppholdUtenforNorge } from '../../../typer/søknad';

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

export const opprettOppholdForNesteId = (opphold: OppholdUtenforNorge[]): OppholdUtenforNorge => {
    const maxId = utledMaxId(opphold);
    return { _id: maxId + 1 };
};
