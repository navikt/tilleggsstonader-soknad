import { JaNeiTilTekst } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import {
    InlineLenke,
    InputFelt,
    LesMer,
    RadiogruppePåkrevd,
    TekstElement,
} from '../../typer/tekst';

interface BarnOgSærligeBehovInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<string[]>;
    info_fant_ingen_barn: TekstElement<InlineLenke>;
    radio_har_barn_under_18_som_har_flyttet_med: RadiogruppePåkrevd<JaNei>;
    hvilke_barn_flytter_med: InputFelt;
    info_søke_for_ikke_registrert_barn: LesMer<InlineLenke>;
    radio_har_barn_hjemme_under_4_klasse: RadiogruppePåkrevd<JaNei>;
    radio_har_særlige_behov_for_flere_hjemreiser: RadiogruppePåkrevd<JaNei>;
}

export const barnOgSærligeBehovTekster: BarnOgSærligeBehovInnhold = {
    tittel: { nb: 'Barn og særlige behov' },
    guide_innhold: {
        nb: [
            'Vi trenger opplysninger om barna dine og eventuelle særlige behov for å vurdere hvor mange hjemreiser du kan ha rett på. I tillegg kan du få støtte til reiseutgifter for barn under 18 år som flytter med deg.',
        ],
    },
    info_fant_ingen_barn: {
        nb: [
            'Vi fant ingen barn registrert på deg. Har du barn under 18 år som skal flytte med deg, eller barn hjemme som ikke er ferdig med fjerde skoleår må du ',
            {
                tekst: 'fylle ut papirsøknad',
                url: 'https://www.nav.no/fyllut/nav111218b?sub=paper',
            },
            '.',
        ],
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
    info_søke_for_ikke_registrert_barn: {
        header: { nb: 'Ønsker du å søke for et barn som ikke kommer opp her?' },
        innhold: {
            nb: [
                'Dersom du ønsker å søke for et barn som ikke kommer opp her må du ',
                {
                    tekst: 'fylle ut papirsøknad',
                    url: 'https://www.nav.no/fyllut/nav111218b?sub=paper',
                },
                '.',
            ],
        },
    },

    radio_har_barn_hjemme_under_4_klasse: {
        header: { nb: 'Har du barn som bor hjemme, og som ikke er ferdig med fjerde skoleår?' },
        alternativer: JaNeiTilTekst,
        feilmelding: {
            nb: 'Du må svare på om du har barn hjemme som ikke er ferdig med fjerde skoleår.',
        },
    },
    radio_har_særlige_behov_for_flere_hjemreiser: {
        header: { nb: 'Har du særlige behov som gjør at du trenger flere hjemreiser?' },
        alternativer: JaNeiTilTekst,
        feilmelding: {
            nb: 'Du må svare på om du har særlige behov for flere hjemreiser.',
        },
    },
};
