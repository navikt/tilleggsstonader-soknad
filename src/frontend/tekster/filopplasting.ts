import { FeilmeldingerFraDokument } from '../components/Filopplaster/feilmeldingOpplasting';
import { MAKS_FILSTØRRELSE_FORMATTERT } from '../components/Filopplaster/utils';
import { TekstElement } from '../typer/tekst';

export const teksterFeilmeldinger: {
    maksstørrelse: TekstElement<string>;
    filtype: TekstElement<string>;
    feilmeldinger: {
        generisk: TekstElement<string>;
        fra_dokument: Record<FeilmeldingerFraDokument, TekstElement<string>>;
    };
} = {
    maksstørrelse: {
        nb: `Filen er for stor (maksimal filstørrelse er ${MAKS_FILSTØRRELSE_FORMATTERT}).`,
    },
    filtype: {
        nb: 'Ugyldig filtype. Tillatte filtyper er .pdf, .png, .jpg og .jpeg.',
    },
    feilmeldinger: {
        generisk: {
            nb: 'Feilet opplasting. ', // Space på slutten fordi det kommer en mer spesifik feilmelding etterpå
        },
        fra_dokument: {
            IMAGE_DIMENSIONS_TOO_SMALL: {
                nb: 'Bildet du har forsøkt å laste opp er for lite. Bildet må være større enn 400x400 piksler.',
            },
            IMAGE_TOO_LARGE: {
                nb: 'Filen er for stor.',
            },
        },
    },
};
