import { Samling } from '../../../typer/søknad';

export const oppdaterSamling = <K extends keyof Samling>(
    samlinger: Samling[],
    id: number,
    key: K,
    verdi: Samling[K]
): Samling[] =>
    samlinger.map((samling) => (samling._id === id ? { ...samling, [key]: verdi } : samling));

const utledMaxId = (samlinger: Samling[]): number => {
    const ids = samlinger.map((s) => s._id);
    return ids.length > 0 ? Math.max(...ids) : 0;
};

export const opprettSamlingForNesteId = (samlinger: Samling[]): Samling => ({
    _id: utledMaxId(samlinger) + 1,
    lagret: false,
});
