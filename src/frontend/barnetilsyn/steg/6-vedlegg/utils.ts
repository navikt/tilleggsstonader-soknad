import { Dokument, DokumentasjonFelt } from '../../../typer/skjema';

export const leggTilVedlegg = (
    alleDokumentasjonFelter: DokumentasjonFelt[],
    dokumentasjonFeltSomSkalOppdateres: DokumentasjonFelt,
    vedlegg: Dokument
): DokumentasjonFelt[] => {
    return alleDokumentasjonFelter.map((dokumentasjon) => {
        if (dokumentajonFeltEquals(dokumentasjon, dokumentasjonFeltSomSkalOppdateres)) {
            return {
                ...dokumentasjon,
                opplastedeVedlegg: [...dokumentasjon.opplastedeVedlegg, vedlegg],
            };
        } else {
            return dokumentasjon;
        }
    });
};

export const fjernVedlegg = (
    alleDokumentasjonFelter: DokumentasjonFelt[],
    dokumentasjonFeltSomSkalOppdateres: DokumentasjonFelt,
    dokumentSomSkalSlettet: Dokument
): DokumentasjonFelt[] => {
    return alleDokumentasjonFelter.map((dokumentasjon) => {
        if (dokumentajonFeltEquals(dokumentasjon, dokumentasjonFeltSomSkalOppdateres)) {
            return {
                ...dokumentasjon,
                opplastedeVedlegg: dokumentasjon.opplastedeVedlegg.filter(
                    (vedlegg) => vedlegg.id !== dokumentSomSkalSlettet.id
                ),
            };
        } else {
            return dokumentasjon;
        }
    });
};

export const toggleHarSendtInn = (
    alleDokumentasjonFelter: DokumentasjonFelt[],
    dokumentasjonFeltSomSkalOppdateres: DokumentasjonFelt
): DokumentasjonFelt[] => {
    return alleDokumentasjonFelter.map((dokumentasjon) => {
        if (dokumentajonFeltEquals(dokumentasjon, dokumentasjonFeltSomSkalOppdateres)) {
            return {
                ...dokumentasjon,
                harSendtInn: !dokumentasjon.harSendtInn,
            };
        } else {
            return dokumentasjon;
        }
    });
};

/**
 * Sjekker at det er samme type og barnId
 * Listen over dokumentajonFelt bør kun inneholde unike typer, eller unike typer/barnId
 */
export const dokumentajonFeltEquals = (first: DokumentasjonFelt, second: DokumentasjonFelt) =>
    first.type === second.type && first.barnId === second.barnId;
