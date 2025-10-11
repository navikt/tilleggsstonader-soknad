import { Kjøreliste } from '../../types/Kjøreliste';

export const harUtgiftOver100kr = (kjøreliste: Kjøreliste): boolean =>
    kjøreliste.reisedagerPerUkeAvsnitt.some((kjørelisteUke) =>
        kjørelisteUke.reisedager.some((reisedag) => (reisedag.parkeringsutgift.verdi ?? 0) > 100)
    );
