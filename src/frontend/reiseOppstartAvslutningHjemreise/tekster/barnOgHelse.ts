import { JaNeiTilTekst } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import { InputFelt, RadiogruppePåkrevd, TekstElement } from '../../typer/tekst';

interface BarnOgHelseInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<string[]>;
    radio_har_barn_under_18_som_har_flyttet_med: RadiogruppePåkrevd<JaNei>;
    hvilke_barn_flytter_med: InputFelt;
    radio_har_barn_hjemme_under_4_klasse: RadiogruppePåkrevd<JaNei>;
    radio_har_særlige_behov_for_flere_hjemreiser: RadiogruppePåkrevd<JaNei>;
}

export const barnOgHelseTekster: BarnOgHelseInnhold = {
    tittel: { nb: 'Barn og helse' },
    guide_innhold: {
        nb: ['Vi trenger disse opplysningene for å vurdere hva du kan ha rett til.'],
    },
    radio_har_barn_under_18_som_har_flyttet_med: {
        header: { nb: 'Har du barn under 18 år som har flyttet med deg?' },
        alternativer: JaNeiTilTekst,
        feilmelding: {
            nb: 'Du må svare på om du har barn under 18 år som har flyttet med deg.',
        },
    },
    hvilke_barn_flytter_med: {
        label: { nb: 'Hvilke barn flytter med deg?' },
        feilmelding: { nb: 'Du må velge minst ett barn som flytter med deg.' },
    },
    radio_har_barn_hjemme_under_4_klasse: {
        header: { nb: 'Har du barn som bor hjemme, og som ikke er ferdig med fjerde skoleår?' },
        alternativer: JaNeiTilTekst,
        feilmelding: {
            nb: 'Du må svare på om du har barn hjemme som ikke er ferdig med fjerde skoleår.',
        },
    },
    radio_har_særlige_behov_for_flere_hjemreiser: {
        header: { nb: 'Har du særlige behov som gir behov for flere hjemreiser?' },
        alternativer: JaNeiTilTekst,
        feilmelding: {
            nb: 'Du må svare på om du har særlige behov for flere hjemreiser.',
        },
    },
};
