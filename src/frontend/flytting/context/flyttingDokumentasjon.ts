import { DokumentasjonFelt, Dokumentasjonsbehov, VedleggstypeFlytting } from '../../typer/skjema';
import { FlyttingDetaljer } from '../typer/flyttingDetaljer';

export const hentDokumentasjonsbehovFlytting = (
    detaljer: FlyttingDetaljer | undefined
): Dokumentasjonsbehov[] => {
    switch (detaljer?.flyttemåte?.verdi) {
        case 'FLYTTER_SELV':
            return [{ type: VedleggstypeFlytting.UTGIFTER_EGEN_FLYTTING }];
        case 'FLYTTEBYRÅ':
            return [
                { type: VedleggstypeFlytting.TILBUD_FLYTTEBYRÅ_1 },
                { type: VedleggstypeFlytting.TILBUD_FLYTTEBYRÅ_2 },
            ];
        default:
            return [];
    }
};

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
