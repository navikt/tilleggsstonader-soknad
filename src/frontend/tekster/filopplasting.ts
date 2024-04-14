import { FeilmeldingerFraDokument } from '../components/Filopplaster/feilmeldingOpplasting';
import { MAKS_FILSTØRRELSE_FORMATTERT } from '../components/Filopplaster/utils';
import { TekstElement } from '../typer/tekst';

export interface FilopplastingInnhold {
    last_opp_fil_knapp: TekstElement<string>;
    krav_dokumentasjon_overskrift: TekstElement<string>;
}

export const filopplastingTekster: FilopplastingInnhold = {
    last_opp_fil_knapp: {
        nb: 'Last opp fil',
    },
    krav_dokumentasjon_overskrift: {
        nb: 'Krav til dokumentasjonen',
    },
};

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
        nb: `"[0]" er for stor (maksimal filstørrelse er ${MAKS_FILSTØRRELSE_FORMATTERT}).`,
    },
    filtype: {
        nb: '"[0]" – Ugyldig filtype.',
    },
    feilmeldinger: {
        generisk: {
            nb: 'Feilet opplasting av "[0]". ', // Space på slutten fordi det kommer en mer spesifik feilmelding etterpå
        },
        fra_dokument: {
            IMAGE_DIMENSIONS_TOO_SMALL: {
                nb: 'Bilde du har forsøkt å laste opp er for lite. Bilde må være større enn 400x400 piksler.',
            },
            IMAGE_TOO_LARGE: {
                nb: 'Fil er for stor.',
            },
        },
    },
};
