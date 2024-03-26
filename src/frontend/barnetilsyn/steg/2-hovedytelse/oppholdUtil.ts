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
