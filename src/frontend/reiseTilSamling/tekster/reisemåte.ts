import { JaNeiTilTekst } from '../../tekster/felles';
import {
    DrivstoffType,
    JaNei,
    KanBenytteEgenBil,
    KanIkkeBenytteEgenBilBegrunnelser,
    KanIkkeReiseMedOffentligTransportBegrunnelser,
} from '../../typer/søknad';
import {
    CheckboxGruppePåkrevd,
    InputFelt,
    RadiogruppePåkrevd,
    TekstElement,
} from '../../typer/tekst';

interface ReisemåteInnhold {
    tittel: TekstElement<string>;
    radio_kan_reise_offentlig: RadiogruppePåkrevd<JaNei>;
    kan_reise_offentlig_info: TekstElement<string>;
    check_kan_ikke_reise_offentlig_begrunnelse: CheckboxGruppePåkrevd<KanIkkeReiseMedOffentligTransportBegrunnelser>;
    totalutgifter_offentlig_transport: InputFelt & {
        feilmelding_ugyldig: TekstElement<string>;
        beskrivelse: TekstElement<string>;
    };
    info_barnehage_adresse: TekstElement<string>;
    info_barnehage_postnummer: TekstElement<string>;
    radio_kan_benytte_egen_bil: RadiogruppePåkrevd<KanBenytteEgenBil>;
    check_kan_ikke_benytte_egen_bil_begrunnelse: CheckboxGruppePåkrevd<KanIkkeBenytteEgenBilBegrunnelser>;
    egen_bil_utgifter_tittel: TekstElement<string>;
    egen_bil_utgifter_beskrivelse: TekstElement<string>;
    egen_bil_utgifter_drivstoff_type: RadiogruppePåkrevd<DrivstoffType>;
    egen_bil_utgifter_bompenger: InputFelt;
    egen_bil_utgifter_ferge: InputFelt;
    egen_bil_utgifter_piggdekkavgift: InputFelt;
    radio_betaler_for_reise_selv: RadiogruppePåkrevd<JaNei>;
    radio_ønsker_dekket_utgifter_for_drosje: RadiogruppePåkrevd<JaNei>;
    advarsel_ingen_reisemåte: TekstElement<string>;
    advarsel_skal_ikke_betale_selv: TekstElement<string>;
    info_helsemessige_årsaker_valg: TekstElement<string>;
    info_dårlig_transporttilbud_valg: TekstElement<string>;
    info_drosje_dokumentasjon: TekstElement<string>;
    radio_har_du_tt_kort: RadiogruppePåkrevd<JaNei>;
    info_tt_kort: TekstElement<string[]>;
    barnehage_adresse: InputFelt;
    barnehage_postnummer: InputFelt;
}

export const reisemåteTekster: ReisemåteInnhold = {
    tittel: {
        nb: 'Reisemåte',
    },
    radio_kan_reise_offentlig: {
        header: {
            nb: 'Kan du reise med offentlig transport?',
        },
        alternativer: JaNeiTilTekst,
        beskrivelse: {
            nb: 'Med offentlig transport menes fly, buss, tog, trikk, t-bane, ferge og lignende.',
        },
        feilmelding: { nb: 'Du må svare på om du kan reise med offentlig transport.' },
    },
    kan_reise_offentlig_info: {
        nb: 'Du må dokumentere beløpet med kvitteringer eller annen dokumentasjon. Dette kan legges ved i et senere steg.',
    },
    check_kan_ikke_reise_offentlig_begrunnelse: {
        legend: {
            nb: 'Hvorfor kan du ikke reise med offentlig transport?',
        },
        alternativer: {
            DÅRLIG_TRANSPORTTILBUD: {
                nb: 'Dårlig transporttilbud',
            },
            HELSEMESSIGE_ÅRSAKER: {
                nb: 'Helsemessige årsaker',
            },
            LEVERING_HENTING_I_BARNEHAGE: {
                nb: 'Levering/henting i barnehage eller skolefritidsordning (SFO/AKS)',
            },
        },
        feilmelding: { nb: 'Du må oppgi hvorfor du ikke kan reise med offentlig transport.' },
    },
    info_helsemessige_årsaker_valg: {
        nb: 'Du må dokumentere din helsetilstand med legeerklæring eller annen uttalelse fra helsepersonell. Dette kan legges ved i et senere steg.',
    },
    info_dårlig_transporttilbud_valg: {
        nb: 'Siden du valgte at du ikke kan reise med offentlig transport grunnet dårlig transporttilbud, kommer vi til å gjøre en vurdering av dette.',
    },
    totalutgifter_offentlig_transport: {
        label: { nb: 'Hva er totalutgiftene til offentlig transport til og fra samlingene?' },
        beskrivelse: { nb: 'Oppgi totalbeløpet i kroner for alle samlingene du søker for.' },
        feilmelding: { nb: 'Du må fylle inn totalutgiftene.' },
        feilmelding_ugyldig: { nb: 'Totalutgiftene må være et positivt tall.' },
    },
    info_barnehage_adresse: {
        nb: 'Gateadressen hvor du henter eller leverer barn',
    },
    info_barnehage_postnummer: {
        nb: 'Postnummeret hvor du henter eller leverer barn',
    },
    radio_kan_benytte_egen_bil: {
        header: {
            nb: 'Skal du kjøre bil til aktivitetsstedet?',
        },
        alternativer: {
            JA: {
                nb: 'Ja',
            },
            NEI: {
                nb: 'Nei',
            },
            NEI_SITTER_PÅ_MED_ANDRE: {
                nb: 'Nei, jeg sitter på med andre',
            },
        },
        feilmelding: { nb: 'Du må svare på om du kan benytte egen bil.' },
    },
    check_kan_ikke_benytte_egen_bil_begrunnelse: {
        legend: {
            nb: 'Hvorfor kan du ikke kjøre bil til aktivitetsstedet?',
        },
        alternativer: {
            HAR_IKKE_BIL_ELLER_FØRERKORT: {
                nb: 'Har ikke bil eller førerkort',
            },
            HELSEMESSIGE_ÅRSAKER: {
                nb: 'Helsemessige årsaker',
            },
            ANNET: {
                nb: 'Annet',
            },
        },
        feilmelding: { nb: 'Du må oppgi hvorfor du ikke kan benytte egen bil.' },
    },
    egen_bil_utgifter_tittel: {
        nb: 'Utgifter til kjøring med privat bil',
    },
    egen_bil_utgifter_beskrivelse: {
        nb: 'Du trenger bare å fylle inn det som gjelder for din reise.',
    },
    egen_bil_utgifter_drivstoff_type: {
        header: {
            nb: 'Bilens drivstofftype?',
        },
        alternativer: {
            ELBIL: { nb: 'Elbil' },
            HYDROGEN: { nb: 'Hydrogen' },
            BENSIN: { nb: 'Bensin' },
            HYBRID: { nb: 'Hybrid' },
            DIESEL: { nb: 'Diesel' },
        },
        beskrivelse: {
            nb: 'Bompenger og fergepriser beregnes ut fra bilens offisielle miljøklasse, derfor må du velge drivstofftype.',
        },
        feilmelding: { nb: 'Du må oppgi bilens drivstofftype.' },
    },
    egen_bil_utgifter_bompenger: {
        label: { nb: 'Bompenger per dag (valgfritt)' },
        feilmelding: { nb: 'Bompenger må være et positivt tall.' },
    },
    egen_bil_utgifter_ferge: {
        label: { nb: 'Ferge per dag (valgfritt)' },
        feilmelding: { nb: 'Ferge må være et positivt tall.' },
    },
    egen_bil_utgifter_piggdekkavgift: {
        label: { nb: 'Piggdekkavgift per dag (valgfritt)' },
        feilmelding: { nb: 'Piggdekkavgift må være et positivt tall.' },
    },
    radio_ønsker_dekket_utgifter_for_drosje: {
        header: {
            nb: 'Ønsker du å søke om få dekket utgifter til reise med taxi?',
        },
        alternativer: JaNeiTilTekst,
        feilmelding: { nb: 'Du må svare på om du kan benytte drosje.' },
    },
    info_drosje_dokumentasjon: {
        nb: 'Vi kan dekke utgifter til taxi hvis du oppfyller kravene til dette. Hvis du har hatt utgifter til taxi og ønsker å få disse dekket, må du legge ved kvitteringene i søknaden.',
    },
    radio_har_du_tt_kort: {
        header: {
            nb: 'Har du TT-kort?',
        },
        alternativer: JaNeiTilTekst,
        feilmelding: { nb: 'Du må svare på om du har TT-kort.' },
    },
    info_tt_kort: {
        nb: [
            'Hvis du har et TT-kort, må vi vite om du kan benytte TT-kortet til å reise til/ fra aktivitetsstedet. Du må sende inn dokumentasjon som viser hvilke type reiser TT-kortet ditt kan brukes til og hva du eventuelt må betale i egenandel. ',
            'Hvis du betaler egenandel, kan du få pengestøtte til å dekke denne utgiften.',
        ],
    },
    radio_betaler_for_reise_selv: {
        header: {
            nb: 'Skal du betale for reisen selv?',
        },
        alternativer: JaNeiTilTekst,
        feilmelding: { nb: 'Du må svare på om du betaler for reisen selv.' },
    },
    advarsel_ingen_reisemåte: {
        nb: 'Du har oppgitt at du ikke kan reise med offentlig transport, benytte egen bil eller drosje, og oppfyller dermed ikke kravene for å få støtte. Du kan fortsatt søke, men du kan få avslag.',
    },
    advarsel_skal_ikke_betale_selv: {
        nb: 'Siden du ikke må betale for reisen til aktivitetsstedet selv, er ikke du kvalifisert for å motta denne stønaden. Du kan fortsatt søke - men du vil mest sannsynlig få avslag.',
    },
    barnehage_adresse: {
        label: { nb: 'Adresse til barnehage' },
        feilmelding: { nb: 'Du må fylle inn adressen til barnehagen.' },
    },
    barnehage_postnummer: {
        label: { nb: 'Postnummer til barnehage' },
        feilmelding: { nb: 'Du må fylle inn postnummeret til barnehagen.' },
    },
};
