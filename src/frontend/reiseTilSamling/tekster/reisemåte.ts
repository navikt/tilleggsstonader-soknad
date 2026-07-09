import { JaNeiTilTekst } from '../../tekster/felles';
import { JaNei, KanBenytteEgenBil } from '../../typer/søknad';
import { CheckboxGruppe, Radiogruppe, TekstElement } from '../../typer/tekst';

interface ReisemåteInnhold {
    tittel: TekstElement<string>;
    radio_kan_reise_offentlig: Radiogruppe<JaNei>;
    check_kan_ikke_reise_offentlig_begrunnelse: CheckboxGruppe<string>;
    totalutgifter_offentlig_transport_label: TekstElement<string>;
    totalutgifter_offentlig_transport_beskrivelse: TekstElement<string>;
    radio_kan_benytte_egen_bil: Radiogruppe<KanBenytteEgenBil>;
    check_kan_ikke_benytte_egen_bil_begrunnelse: CheckboxGruppe<string>;
    egen_bil_utgifter_tittel: TekstElement<string>;
    egen_bil_utgifter_beskrivelse: TekstElement<string>;
    egen_bil_utgifter_drivstoff_type: Radiogruppe<string>;
    egen_bil_utgifter_bompenger_tittel: TekstElement<string>;
    egen_bil_utgifter_ferge_tittel: TekstElement<string>;
    egen_bil_utgifter_piggdekkavgift_tittel: TekstElement<string>;
    radio_betaler_for_reise_selv: Radiogruppe<JaNei>;
    radio_kan_benytte_drosje: Radiogruppe<JaNei>;
    advarsel_ingen_reisemåte: TekstElement<string>;
    advarsel_skal_ikke_betale_selv: TekstElement<string>;
    info_helsemessige_årsaker_valg: TekstElement<string>;
    info_dårlig_transporttilbud_valg: TekstElement<string>;
    feilmelding_offentlig_mangler: TekstElement<string>;
    feilmelding_kan_ikke_reise_offentlig_begrunnelse: TekstElement<string>;
    feilmelding_totalutgifter_mangler: TekstElement<string>;
    feilmelding_totalutgifter_ugyldig: TekstElement<string>;
    feilmelding_bil_mangler: TekstElement<string>;
    feilmelding_kan_ikke_benytte_egen_bil_begrunnelse: TekstElement<string>;
    feilmelding_drosje_mangler: TekstElement<string>;
    feilmelding_egenbil_utgifter_drivstoff_type: TekstElement<string>;
    feilmelding_egenbil_utgifter_bompenger: TekstElement<string>;
    feilmelding_egenbil_utgifter_ferge: TekstElement<string>;
    feilmelding_egenbil_utgifter_piggdekkavgift: TekstElement<string>;
    feilmelding_betaler_for_reise_selv: TekstElement<string>;
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
            nb: 'Med offentlig transport menes buss, tog, trikk, t-bane, ferge og lignende.',
        },
    },
    check_kan_ikke_reise_offentlig_begrunnelse: {
        legend: {
            nb: 'Hvorfor kan du ikke reise med offentlig transport?',
        },
        alternativer: {
            dårligTransportTilbud: {
                nb: 'Dårlig transporttilbud',
            },
            helsemessigeÅrsaker: {
                nb: 'Helsemessige årsaker',
            },
            leveringHentingIBarnehage: {
                nb: 'Levering/henting i barnehage eller skolefritidsordning (SFO/AKS)',
            },
        },
    },
    info_helsemessige_årsaker_valg: {
        nb: 'Du må dokumentere din helsetilstand med legeerklæring eller annen uttalelse fra helsepersonell.',
    },
    info_dårlig_transporttilbud_valg: {
        nb: 'Siden du valgte at du ikke kan reise med offentlig transport grunnet dårlig transporttilbud, kommer vi til å gjøre en vurdering av dette.',
    },
    feilmelding_kan_ikke_reise_offentlig_begrunnelse: {
        nb: 'Du må oppgi hvorfor du ikke kan reise med offentlig transport.',
    },
    totalutgifter_offentlig_transport_label: {
        nb: 'Hva er totalutgiftene til offentlig transport til og fra samlingene?',
    },
    totalutgifter_offentlig_transport_beskrivelse: {
        nb: 'Oppgi totalbeløpet i kroner for alle samlingene du søker for.',
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
    },
    check_kan_ikke_benytte_egen_bil_begrunnelse: {
        legend: {
            nb: 'Hvorfor kan du ikke kjøre bil til aktivitetsstedet?',
        },
        alternativer: {
            manglendeFørerkortEllerBil: {
                nb: 'Har ikke bil eller førerkort',
            },
            helsemessigeÅrsaker: {
                nb: 'Helsemessige årsaker',
            },
            annet: {
                nb: 'Annet',
            },
        },
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
            Elbil: { nb: 'Elbil' },
            Hydrogen: { nb: 'Hydrogen' },
            Bensin: { nb: 'Bensin' },
            Hybrid: { nb: 'Hybrid' },
            Diesel: { nb: 'Diesel' },
        },
        beskrivelse: {
            nb: 'Bompenger og fergepriser beregnes ut fra bilens offisielle miljøklasse, derfor må du velge drivstofftype.',
        },
    },
    egen_bil_utgifter_bompenger_tittel: {
        nb: 'Bompenger per dag (valgfritt)',
    },
    egen_bil_utgifter_ferge_tittel: {
        nb: 'Ferge per dag (valgfritt)',
    },
    egen_bil_utgifter_piggdekkavgift_tittel: {
        nb: 'Piggdekkavgift per dag (valgfritt)',
    },
    radio_kan_benytte_drosje: {
        header: {
            nb: 'Kan du benytte drosje?',
        },
        alternativer: JaNeiTilTekst,
    },
    radio_betaler_for_reise_selv: {
        header: {
            nb: 'Skal du betale for reisen selv?',
        },
        alternativer: JaNeiTilTekst,
    },
    advarsel_ingen_reisemåte: {
        nb: 'Du har oppgitt at du ikke kan reise med offentlig transport, benytte egen bil eller drosje. Du vil derfor sannsynligvis få avslag på søknaden om stønad til reiser.',
    },
    advarsel_skal_ikke_betale_selv: {
        nb: 'Siden du ikke må betale for reisen til aktivitetsstedet selv, er ikke du kvalifisert for å motta denne stønaden. Du kan fortsatt søke - men du vil mest sannsynlig få avslag.',
    },
    feilmelding_offentlig_mangler: {
        nb: 'Du må svare på om du kan reise med offentlig transport.',
    },
    feilmelding_totalutgifter_mangler: {
        nb: 'Du må fylle inn totalutgiftene.',
    },
    feilmelding_totalutgifter_ugyldig: {
        nb: 'Totalutgiftene må være et positivt tall.',
    },
    feilmelding_bil_mangler: {
        nb: 'Du må svare på om du kan benytte egen bil.',
    },
    feilmelding_drosje_mangler: {
        nb: 'Du må svare på om du kan benytte drosje.',
    },
    feilmelding_kan_ikke_benytte_egen_bil_begrunnelse: {
        nb: 'Du må oppgi hvorfor du ikke kan benytte egen bil.',
    },
    feilmelding_egenbil_utgifter_drivstoff_type: {
        nb: 'Du må oppgi bilens drivstofftype.',
    },
    feilmelding_egenbil_utgifter_bompenger: {
        nb: 'Bompenger må være et positivt tall.',
    },
    feilmelding_egenbil_utgifter_ferge: {
        nb: 'Ferge må være et positivt tall.',
    },
    feilmelding_egenbil_utgifter_piggdekkavgift: {
        nb: 'Piggdekkavgift må være et positivt tall.',
    },
    feilmelding_betaler_for_reise_selv: {
        nb: 'Du må svare på om du betaler for reisen selv.',
    },
};
