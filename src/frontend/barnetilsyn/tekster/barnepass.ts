import { PassType } from '../../typer/barn';
import { Lenke, Radiogruppe, TekstElement } from '../../typer/tekst';

interface BarnepassInnhold {
    steg_tittel: TekstElement<string>;
    hvem_passer_radio: Radiogruppe<PassType>;
    hvem_passer_andre_alert: TekstElement<(string | Lenke)[]>;
}

export const barnepassTekster: BarnepassInnhold = {
    steg_tittel: {
        nb: 'Om pass av barn',
    },
    hvem_passer_radio: {
        header: { nb: 'Hvem skal passe [0]?' },
        beskrivelse: {
            nb: 'Vi spør om dette fordi vi trenger å vite hva slags dokumentasjon vi trenger å legge ved',
        },
        alternativer: [
            {
                value: PassType.BARNEHAGE_SFO_AKS,
                label: { nb: 'Barnehage, skolefritidsordning (SFO) eller aktivitetsskole (AKS)' },
            },
            {
                value: PassType.ANDRE,
                label: {
                    nb: 'Andre',
                },
            },
        ],
    },
    hvem_passer_andre_alert: {
        nb: [
            'Hvis du har privat barnepass, for eksempel dagmamma eller praktikant, må du legge ved avtalen du har med barnepasseren i tillegg til å dokumentere utgiftene dine. Ved privat barnepass er det ',
            {
                tekst: 'egne regler du kan lese om på Skatteetaten.',
                url: 'https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/familie-og-helse/barn/betalt-barnepass/',
            },
        ],
    },
};
