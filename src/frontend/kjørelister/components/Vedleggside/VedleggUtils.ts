import { Dokument, VedleggstypeKjøreliste } from '../../../typer/skjema';
import { Kjøreliste } from '../../types/Kjøreliste';

export const harUtgiftOver100krIGjeldendeInnsending = (kjøreliste: Kjøreliste): boolean =>
    kjøreliste.reisedagerPerUkeAvsnitt
        .filter((uke) => !uke.sendtInnTidligere)
        .some((kjørelisteUke) =>
            kjørelisteUke.reisedager.some(
                (reisedag) => (reisedag.parkeringsutgift.verdi ?? 0) > 100
            )
        );

export const finnVedleggMedParkeringsutgifter = (kjøreliste: Kjøreliste): Dokument[] =>
    kjøreliste.dokumentasjon.find(
        (dokumentasjon) => dokumentasjon.type === VedleggstypeKjøreliste.PARKERINGSUTGIFT
    )?.opplastedeVedlegg ?? [];
