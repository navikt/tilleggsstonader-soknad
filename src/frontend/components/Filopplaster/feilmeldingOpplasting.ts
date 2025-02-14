import axios from 'axios';

import { teksterFeilmeldinger } from '../../tekster/filopplasting';
import { Locale, TekstElement } from '../../typer/tekst';
import { hentBeskjedMedEttParameter } from '../../utils/tekstUtils';

export enum FeilmeldingerFraDokument {
    IMAGE_DIMENSIONS_TOO_SMALL = 'IMAGE_DIMENSIONS_TOO_SMALL',
    IMAGE_TOO_LARGE = 'IMAGE_TOO_LARGE',
}

const harMappingForFeilmelding = (melding?: string): melding is FeilmeldingerFraDokument =>
    Object.values(FeilmeldingerFraDokument).some((feilmelding) => feilmelding === melding);

const REGEX_FEIL = /^CODE=(.*)$/;

/**
 * Familie-dokument returnerer feil med meldingen `CODE=IMAGE_DIMENSIONS_TOO_SMALL`
 * Henter ut koden
 */
const mapTilFeilmeldingTekst = (req: unknown): TekstElement<string> | undefined => {
    if (axios.isAxiosError(req)) {
        const melding = req?.response?.data?.melding;
        const matches = REGEX_FEIL.exec(melding || '');
        if (matches?.length && matches?.length > 0) {
            const feilmelding = matches[1];
            if (harMappingForFeilmelding(feilmelding)) {
                return teksterFeilmeldinger.feilmeldinger.fra_dokument[feilmelding];
            }
        }
    }
    return undefined;
};

/**
 * Legger til detaljer om feilmeldingen hvis melding i response
 * inneholder type som er definiert i FeilmeldingerFraDokument
 * @param err axiosrequest som feilet
 * @param fil som man laster opp
 * @param locale valgt språk
 */
export const utledFeilmelding = (err: unknown, fil: File, locale: Locale) => {
    const tekstElementDetaljerFeilmelding = mapTilFeilmeldingTekst(err);
    const detaljertFeilmelding = tekstElementDetaljerFeilmelding
        ? hentBeskjedMedEttParameter(fil.name, tekstElementDetaljerFeilmelding[locale])
        : '';
    return (
        hentBeskjedMedEttParameter(fil.name, teksterFeilmeldinger.feilmeldinger.generisk[locale]) +
        detaljertFeilmelding
    );
};
