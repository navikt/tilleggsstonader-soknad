import { miljø } from './miljø';

export enum SkjematypeFyllUt {
    SØKNAD_BOUTGIFTER = 'SØKNAD_BOUTGIFTER',
    SØKNAD_DAGLIG_REISE = 'SØKNAD_DAGLIG_REISE',
}

const SKJEMAKODER: Record<SkjematypeFyllUt, { ny: string; gammel: string }> = {
    [SkjematypeFyllUt.SØKNAD_BOUTGIFTER]: {
        ny: 'nav111219',
        gammel: 'nav111219b',
    },
    [SkjematypeFyllUt.SØKNAD_DAGLIG_REISE]: {
        ny: 'nav111221',
        gammel: 'nav111221b',
    },
};

export const getFyllutUrl = (skjematype: SkjematypeFyllUt, versjon: 'NY' | 'GAMMEL'): string => {
    const skjema = versjon === 'NY' ? SKJEMAKODER[skjematype].ny : SKJEMAKODER[skjematype].gammel;

    return `${miljø.fyllUtUrl}/${skjema}?sub=digital`;
};
