import { Dokument, VedleggstypeKjøreliste } from '../../../typer/skjema';
import { Kjøreliste } from '../../types/Kjøreliste';

export const harUtgiftOver100kr = (kjøreliste: Kjøreliste): boolean =>
    kjøreliste.reisedagerPerUkeAvsnitt.some((kjørelisteUke) =>
        kjørelisteUke.reisedager.some((reisedag) => reisedag.parkeringsutgift.verdi > 100)
    );

export const finnVedleggMedParkeringsutgifter = (kjøreliste: Kjøreliste): Dokument[] =>
    kjøreliste.dokumentasjon.find(
        (dokumentasjon) => dokumentasjon.type === VedleggstypeKjøreliste.PARKERINGSUTGIFT
    )?.opplastedeVedlegg ?? [];
