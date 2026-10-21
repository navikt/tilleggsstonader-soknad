import {
    Transportmiddel,
    ÅrsakKanIkkeBenytteOffentligTransport,
    ÅrsakKanIkkeBenytteEgenBil,
    DrivstoffType,
} from '../../typer/reisemåte';
import { JaNei } from '../../typer/søknad';
import {
    TekstElement,
    CheckboxGruppePåkrevd,
    InputFelt,
    RadiogruppePåkrevd,
    SelectGruppePåkrevd,
} from '../../typer/tekst';

export type TotalutgifterOffentligTransportFelt = InputFelt & {
    feilmelding_ugyldig: TekstElement<string>;
    beskrivelse: TekstElement<string>;
};

export type PrivatBilStrekningFelt = InputFelt & {
    feilmelding_for_lang: TekstElement<string>;
};

export interface TransportmiddelOgUnntakTekster {
    tittel: TekstElement<string>;
    check_hvilke_transportmidler: CheckboxGruppePåkrevd<Transportmiddel>;
    check_kan_ikke_benytte_egen_bil_begrunnelse: CheckboxGruppePåkrevd<ÅrsakKanIkkeBenytteEgenBil>;
    info_helsemessige_årsaker_valg: TekstElement<string>;
    info_ikke_offentlig_transport_reise_til_samling: TekstElement<string>;
}

export interface UnntakFraOffentligTransportTekster {
    kan_reise_offentlig_info: TekstElement<string>;
    check_kan_ikke_reise_offentlig_begrunnelse: CheckboxGruppePåkrevd<ÅrsakKanIkkeBenytteOffentligTransport>;
    info_dårlig_transporttilbud_valg: TekstElement<string>;
    info_helsemessige_årsaker_valg: TekstElement<string>;
    barnehage_adresse: InputFelt;
    barnehage_postnummer: InputFelt;
}

export interface OffentligTransportTekster {
    offentlig_transport_tittel: TekstElement<string>;
    kan_reise_offentlig_info: TekstElement<string>;
    totalutgifter_offentlig_transport: TotalutgifterOffentligTransportFelt;
}

export interface PrivatBilTekster {
    egen_bil_tittel: TekstElement<string>;
    radio_kan_benytte_egen_bil: RadiogruppePåkrevd<JaNei>;
    privat_bil_strekning_kjørt: PrivatBilStrekningFelt;
    privat_bil_km_kjørt: InputFelt;
    radio_betaler_for_reise_selv: RadiogruppePåkrevd<JaNei>;
    advarsel_skal_ikke_betale_selv: TekstElement<string>;
    privat_bil_utgifter_tittel: TekstElement<string>;
    privat_bil_utgifter_beskrivelse: TekstElement<string>;
    privat_bil_utgifter_drivstoff_type: SelectGruppePåkrevd<DrivstoffType>;
    privat_bil_utgifter_bompenger: InputFelt;
    privat_bil_utgifter_ferge: InputFelt;
    privat_bil_utgifter_parkering: InputFelt;
    privat_bil_utgifter_piggdekkavgift: InputFelt;
}

export interface DrosjeTekster {
    radio_ønsker_dekket_utgifter_for_drosje: RadiogruppePåkrevd<JaNei>;
    radio_har_du_tt_kort: RadiogruppePåkrevd<JaNei>;
    drosje_tittel: TekstElement<string>;
    info_tt_kort: TekstElement<string[]>;
}

export interface FellesReisemåteAdvarslerTekster {
    advarsel_ingen_reisemåte: TekstElement<string>;
}

export interface ReisemåteTekstInnhold {
    transportmiddelOgUnntak: TransportmiddelOgUnntakTekster;
    unntakFraOffentligTransport: UnntakFraOffentligTransportTekster;
    offentligTransport: OffentligTransportTekster;
    privatBil: PrivatBilTekster;
    drosje: DrosjeTekster;
    fellesAdvarsler: FellesReisemåteAdvarslerTekster;
}
