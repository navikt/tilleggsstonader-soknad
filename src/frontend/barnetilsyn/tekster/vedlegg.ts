import { VedleggstypePassAvBarn } from '../../typer/skjema';
import { Vedleggstekst } from '../../typer/tekst';

export type TekstTypeVedlegg = {
    [key in VedleggstypePassAvBarn]: Vedleggstekst;
};

export const typerVedleggTeksterPassAvBarn: TekstTypeVedlegg = {
    [VedleggstypePassAvBarn.UTGIFTER_PASS_SFO_AKS_BARNEHAGE]: {
        tittel: {
            nb: 'Faktura fra SFO/AKS/barnehage',
        },
        liste_tittel: {
            nb: 'Faktura fra SFO/AKS/barnehage for [0]',
        },
        beskrivelse: {
            nb:
                'Hvis du har like utgifter hver måned, holder det å legge ved én faktura. ' +
                'Fakturaen må være spesifisert. Vi godkjenner ikke skjermbilde av kontoutskrift/vipps eller lignende.',
        },
        krav_til_dokumentasjon: {
            nb: [
                'Dokumentasjon på utgifter må inneholde barnets navn, beløp og perioden den gjelder for.',
                'Vi godkjenner ikke bilde av kontoutskrift, vipps eller lignende fordi vi trenger å se hva som er utgifter til pass av barn og hva som er utgift til bleier eller mat.',
                'Hvis du har ulike utgifter fra måned til måned, må du legge ved fakturaene som viser dette.',
            ],
        },
    },
    [VedleggstypePassAvBarn.UTGIFTER_PASS_PRIVAT]: {
        tittel: {
            nb: 'Dokumentasjon av utgifter til privat pass',
        },
        liste_tittel: {
            nb: 'Dokumentasjon av utgifter til privat pass for [0]',
        },
        beskrivelse: {
            nb: 'Vi trenger avtale med barnepasser, kvittering for betaling og eventuelt A-melding sendt Skatteetaten.',
        },
        krav_til_dokumentasjon: {
            nb: [
                'Dokumentasjon på utgifter må inneholde barnets navn, beløp og perioden den gjelder for.',
                'Vi godkjenner ikke bilde av kontoutskrift, vipps eller lignende fordi vi trenger å se hva som er utgifter til pass av barn og hva som er utgift til bleier eller mat.',
                'Ved privat barnepass regnes du som arbeidsgiver og derfor er det  egne regler du kan lese om på Skatteetaten. ',
            ],
        },
    },
    [VedleggstypePassAvBarn.SKRIFTLIG_UTTALELSE_HELSEPERSONELL]: {
        tittel: {
            nb: 'Skriftlig uttalelse fra helsepersonell for [0]',
        },
        beskrivelse: {
            nb: 'Legeerklæring eller annen uttalelse fra helsepersonell som beskriver helsetilstand for [0].',
        },
        krav_til_dokumentasjon: {
            nb: 'Legeerklæringen/uttalelsen fra helsepersonell må inneholde barnets navn og gjelde for perioden du søker om støtte til pass for.',
        },
    },
    [VedleggstypePassAvBarn.TILTAKSSTED_ELLER_UTDANNINGSSTED]: {
        tittel: {
            nb: 'Dokumentasjon fra tiltakssted eller utdanningssted',
        },
        beskrivelse: {
            nb: 'For eksempel en avtale, vaktliste eller timeliste som beskriver din arbeidstid eller obligatorisk oppmøtetid.',
        },
    },
};
