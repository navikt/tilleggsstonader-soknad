import { DokumentasjonFelt, Dokumentasjonsbehov, VedleggstypeFlytting } from '../../typer/skjema';
import { FlyttingDetaljer } from '../typer/flyttingDetaljer';

export const hentDokumentasjonsbehovFlytting = (
    detaljer: FlyttingDetaljer | undefined
): Dokumentasjonsbehov[] =>
    detaljer?.flyttemåte?.verdi === 'FLYTTEBYRÅ'
        ? [
              { type: VedleggstypeFlytting.TILBUD_FLYTTEBYRÅ_1 },
              { type: VedleggstypeFlytting.TILBUD_FLYTTEBYRÅ_2 },
          ]
        : [];

export const hentAktivDokumentasjon = (
    dokumentasjon: DokumentasjonFelt[],
    behov: Dokumentasjonsbehov[]
): DokumentasjonFelt[] =>
    dokumentasjon.filter((dok) => behov.some((krav) => krav.type === dok.type));

export const oppdaterAktivDokumentasjon = (
    tidligere: DokumentasjonFelt[],
    oppdaterte: DokumentasjonFelt[],
    behov: Dokumentasjonsbehov[]
): DokumentasjonFelt[] => {
    // TODO: Vurder å fjerne inaktive tilbud når brukeren velger egen flytting.
    const inaktive = tidligere.filter((dok) => !behov.some((krav) => krav.type === dok.type));
    return [...inaktive, ...oppdaterte];
};
