import { FeilmeldingerFraDokument } from '../components/Filopplaster/feilmeldingOpplasting';
import { MAKS_FILSTØRRELSE_FORMATTERT } from '../components/Filopplaster/utils';
import { TekstElement } from '../typer/tekst';

export const teksterFeilmeldinger: {
    enFil: TekstElement<string>;
    maksstørrelse: TekstElement<string>;
    filtype: TekstElement<string>;
    feilmeldinger: {
        generisk: TekstElement<string>;
        fra_dokument: Record<FeilmeldingerFraDokument, TekstElement<string>>;
    };
} = {
    enFil: {
        nb: `Må laste opp en og en fil`,
    },
    maksstørrelse: {
        nb: `For stor (maksimal filstørrelse er ${MAKS_FILSTØRRELSE_FORMATTERT}).`,
    },
    filtype: {
        nb: 'Ugyldig filtype.',
    },
    feilmeldinger: {
        generisk: {
            nb: 'Feilet opplasting. ', // Space på slutten fordi det kommer en mer spesifik feilmelding etterpå
        },
        fra_dokument: {
            IMAGE_DIMENSIONS_TOO_SMALL: {
                nb: 'Bilde du har forsøkt å laste opp er for lite. Bilde må være større enn 400x400 piksler.',
            },
            IMAGE_TOO_LARGE: {
                nb: 'Filen er for stor.',
            },
        },
    },
};
