import { ReiseInfoReiseOppstartAvslutningHjemreise } from '../../typer/søknad';

export const oppdaterReise = <K extends keyof ReiseInfoReiseOppstartAvslutningHjemreise>(
    reiser: ReiseInfoReiseOppstartAvslutningHjemreise[],
    id: number,
    key: K,
    verdi: ReiseInfoReiseOppstartAvslutningHjemreise[K]
): ReiseInfoReiseOppstartAvslutningHjemreise[] =>
    reiser.map((reise) => (reise._id === id ? { ...reise, [key]: verdi } : reise));

const utledMaxId = (reiser: ReiseInfoReiseOppstartAvslutningHjemreise[]): number => {
    const ids = reiser.map((reise) => reise._id);
    return ids.length > 0 ? Math.max(...ids) : 0;
};

export const opprettReiseForNesteId = (
    reiser: ReiseInfoReiseOppstartAvslutningHjemreise[]
): ReiseInfoReiseOppstartAvslutningHjemreise => ({
    _id: utledMaxId(reiser) + 1,
    lagret: false,
});
