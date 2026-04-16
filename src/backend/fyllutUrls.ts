import { miljø } from './miljø';

export enum SkjematypeFyllUt {
    SØKNAD_BOUTGIFTER = 'SØKNAD_BOUTGIFTER',
    SØKNAD_DAGLIG_REISE = 'SØKNAD_DAGLIG_REISE',
    DAGLIG_REISE_KJØRELISTE = 'DAGLIG_REISE_KJØRELISTE',
}

const SKJEMAKODER: Record<SkjematypeFyllUt, { ny?: string; gammel: string }> = {
    [SkjematypeFyllUt.SØKNAD_BOUTGIFTER]: {
        ny: 'nav111219',
        gammel: 'nav111219b',
    },
    [SkjematypeFyllUt.SØKNAD_DAGLIG_REISE]: {
        ny: 'nav111221',
        gammel: 'nav111221b',
    },
    [SkjematypeFyllUt.DAGLIG_REISE_KJØRELISTE]: {
        gammel: 'nav111224b',
    },
};

export const getFyllutUrl = (
    skjematype: SkjematypeFyllUt,
    versjon: 'NY' | 'GAMMEL'
): string | undefined => {
    const skjemakode =
        versjon === 'NY' ? SKJEMAKODER[skjematype].ny : SKJEMAKODER[skjematype].gammel;

    if (!skjemakode) return undefined;

    return miljø.fyllUtUrl(skjemakode);
};
