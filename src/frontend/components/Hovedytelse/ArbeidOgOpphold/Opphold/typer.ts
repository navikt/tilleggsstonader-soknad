import type { OppholdUtenforNorge } from '../../../../typer/søknad';

export type OppdatertOppholdFelt = <T extends OppholdUtenforNorge, K extends keyof T>(
    id: number,
    key: K,
    verdi: T[K]
) => void;
