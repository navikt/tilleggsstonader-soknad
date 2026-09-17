import {
    alertNode,
    checkboxNode,
    customNode,
    inputNode,
    radioNode,
} from '../../../felles/spørsmålsgraf/builders';
import { Spørsmålsnode } from '../../../felles/spørsmålsgraf/rendering';
import { flattenGraf, finnAktiveNoder } from '../../../felles/spørsmålsgraf/traversering';
import { JaNeiTilTekst } from '../../../tekster/felles';
import {
    DrivstoffType,
    JaNei,
    KanBenytteEgenBil,
    KanIkkeBenytteEgenBilBegrunnelser,
    KanIkkeReiseMedOffentligTransportBegrunnelser,
    Reisemåte,
} from '../../../typer/søknad';
import { TekstElement } from '../../../typer/tekst';
import { erGyldigKostnad } from '../../../utils/tall';
import { harVerdi } from '../../../utils/typeUtils';

const KAN_REISE_MED_OFFENTLIG_TRANSPORT = 'KAN_REISE_MED_OFFENTLIG_TRANSPORT';
const TOTALUTGIFTER_OFFENTLIG_TRANSPORT = 'TOTALUTGIFTER_OFFENTLIG_TRANSPORT';
const KAN_IKKE_REISE_MED_OFFENTLIG_TRANSPORT_BEGRUNNELSER =
    'KAN_IKKE_REISE_MED_OFFENTLIG_TRANSPORT_BEGRUNNELSER';
const BARNEHAGE_ADRESSE = 'BARNEHAGE_ADRESSE';
const BARNEHAGE_POSTNUMMER = 'BARNEHAGE_POSTNUMMER';
const KAN_BENYTTE_EGEN_BIL = 'KAN_BENYTTE_EGEN_BIL';
const KAN_IKKE_BENYTTE_EGEN_BIL_BEGRUNNELSER = 'KAN_IKKE_BENYTTE_EGEN_BIL_BEGRUNNELSER';
const ØNSKER_DEKKET_UTGIFTER_FOR_DROSJE = 'ØNSKER_DEKKET_UTGIFTER_FOR_DROSJE';
const HAR_TT_KORT = 'HAR_TT_KORT';
const BETALER_FOR_REISE_SELV = 'BETALER_FOR_REISE_SELV';
const EGENBIL_DRIVSTOFFTYPE = 'EGENBIL_DRIVSTOFFTYPE';
const EGENBIL_BOMPENGER = 'EGENBIL_BOMPENGER';
const EGENBIL_FERGE = 'EGENBIL_FERGE';
const EGENBIL_PIGGDEKKAVGIFT = 'EGENBIL_PIGGDEKKAVGIFT';

const INFO_OFFENTLIG = 'INFO_OFFENTLIG';
const INFO_DÅRLIG_TRANSPORT = 'INFO_DÅRLIG_TRANSPORT';
const INFO_HELSE_OFFENTLIG = 'INFO_HELSE_OFFENTLIG';
const INFO_HELSE_BIL = 'INFO_HELSE_BIL';
const INFO_DROSJE_DOKUMENTASJON = 'INFO_DROSJE_DOKUMENTASJON';
const INFO_TT_KORT = 'INFO_TT_KORT';
const ADVARSEL_INGEN_REISEMÅTE = 'ADVARSEL_INGEN_REISEMÅTE';
const ADVARSEL_IKKE_BETALE_SELV = 'ADVARSEL_IKKE_BETALE_SELV';
const EGENBIL_SEKSJON = 'EGENBIL_SEKSJON';

const spørsmålNodeIder = [
    KAN_REISE_MED_OFFENTLIG_TRANSPORT,
    TOTALUTGIFTER_OFFENTLIG_TRANSPORT,
    KAN_IKKE_REISE_MED_OFFENTLIG_TRANSPORT_BEGRUNNELSER,
    BARNEHAGE_ADRESSE,
    BARNEHAGE_POSTNUMMER,
    KAN_BENYTTE_EGEN_BIL,
    KAN_IKKE_BENYTTE_EGEN_BIL_BEGRUNNELSER,
    ØNSKER_DEKKET_UTGIFTER_FOR_DROSJE,
    HAR_TT_KORT,
    BETALER_FOR_REISE_SELV,
    EGENBIL_DRIVSTOFFTYPE,
    EGENBIL_BOMPENGER,
    EGENBIL_FERGE,
    EGENBIL_PIGGDEKKAVGIFT,
] as const;
type ReisemåteSpørsmålNodeId = (typeof spørsmålNodeIder)[number];

type ReisemåteInfoNodeId =
    | typeof INFO_OFFENTLIG
    | typeof INFO_DÅRLIG_TRANSPORT
    | typeof INFO_HELSE_OFFENTLIG
    | typeof INFO_HELSE_BIL
    | typeof INFO_DROSJE_DOKUMENTASJON
    | typeof INFO_TT_KORT
    | typeof ADVARSEL_INGEN_REISEMÅTE
    | typeof ADVARSEL_IKKE_BETALE_SELV
    | typeof EGENBIL_SEKSJON;

type ReisemåteNodeId = ReisemåteSpørsmålNodeId | ReisemåteInfoNodeId;
type ReisemåteNode = Spørsmålsnode<Reisemåte | undefined, unknown, ReisemåteNodeId>;

const reisemåteSpørsmålNodeSet = new Set<ReisemåteSpørsmålNodeId>(spørsmålNodeIder);
export const erReisemåteSpørsmålNode = (nodeId: string): nodeId is ReisemåteSpørsmålNodeId =>
    reisemåteSpørsmålNodeSet.has(nodeId as ReisemåteSpørsmålNodeId);

const predikater = {
    erBilJa: (state: Reisemåte | undefined) => state?.kanBenytteEgenBil?.verdi === 'JA',
    erBilNei: (state: Reisemåte | undefined) => state?.kanBenytteEgenBil?.verdi === 'NEI',
    erBilMedAndre: (state: Reisemåte | undefined) =>
        state?.kanBenytteEgenBil?.verdi === 'NEI_SITTER_PÅ_MED_ANDRE',
    harBilutgiftsti: (state: Reisemåte | undefined) =>
        predikater.erBilJa(state) ||
        (predikater.erBilMedAndre(state) && state?.betalerForReiseSelv?.verdi === 'JA'),
    harOffentligBegrunnelse: (
        state: Reisemåte | undefined,
        verdi: KanIkkeReiseMedOffentligTransportBegrunnelser
    ) =>
        state?.kanIkkeReiseMedOffentligTransportBegrunnelser?.verdier.some(
            (v) => v.verdi === verdi
        ) ?? false,
    harBilBegrunnelse: (state: Reisemåte | undefined, verdi: KanIkkeBenytteEgenBilBegrunnelser) =>
        state?.kanIkkeBenytteEgenBilBegrunnelser?.verdier.some((v) => v.verdi === verdi) ?? false,
};

export const reisemåteTittel: TekstElement<string> = { nb: 'Reisemåte' };

export const reisemåteSpørsmålGraf: ReisemåteNode = radioNode<
    Reisemåte | undefined,
    unknown,
    ReisemåteNodeId,
    JaNei
>({
    id: KAN_REISE_MED_OFFENTLIG_TRANSPORT,
    tekst: {
        header: { nb: 'Kan du reise med offentlig transport?' },
        alternativer: JaNeiTilTekst,
        beskrivelse: {
            nb: 'Med offentlig transport menes fly, buss, tog, trikk, t-bane, ferge og lignende.',
        },
        feilmelding: { nb: 'Du må svare på om du kan reise med offentlig transport.' },
    },
    validate: (state) =>
        !harVerdi(state?.kanReiseMedOffentligTransport?.verdi)
            ? 'Du må svare på om du kan reise med offentlig transport.'
            : undefined,
    value: (state) => state?.kanReiseMedOffentligTransport?.verdi ?? '',
    write: (_state, value) => ({
        kanReiseMedOffentligTransport: value,
    }),
    barn: [
        inputNode({
            id: TOTALUTGIFTER_OFFENTLIG_TRANSPORT,
            tekst: {
                label: {
                    nb: 'Hva er totalutgiftene til offentlig transport til og fra samlingene?',
                },
                beskrivelse: {
                    nb: 'Oppgi totalbeløpet i kroner for alle samlingene du søker for.',
                },
                feilmelding: { nb: 'Du må fylle inn totalutgiftene.' },
            },
            inputProps: { inputMode: 'numeric', style: { width: '6rem' } },
            når: (state) => state?.kanReiseMedOffentligTransport?.verdi === 'JA',
            validate: (state) => {
                const utgifter = state?.totalUtgifterOffentligTransport?.verdi;
                if (!harVerdi(utgifter)) {
                    return 'Du må fylle inn totalutgiftene.';
                }
                if (!erGyldigKostnad(utgifter)) {
                    return 'Totalutgiftene må være et positivt tall.';
                }
                return undefined;
            },
            value: (state) => state?.totalUtgifterOffentligTransport?.verdi ?? '',
            write: (state, value, label) => ({
                ...state,
                totalUtgifterOffentligTransport: { verdi: value, label },
            }),
        }),
        alertNode({
            id: INFO_OFFENTLIG,
            variant: 'info',
            når: (state) => state?.kanReiseMedOffentligTransport?.verdi === 'JA',
            tekst: {
                nb: 'Du må dokumentere beløpet med kvitteringer eller annen dokumentasjon. Dette kan legges ved i et senere steg.',
            },
        }),
        checkboxNode<
            Reisemåte | undefined,
            unknown,
            ReisemåteNodeId,
            KanIkkeReiseMedOffentligTransportBegrunnelser
        >({
            id: KAN_IKKE_REISE_MED_OFFENTLIG_TRANSPORT_BEGRUNNELSER,
            tekst: {
                legend: { nb: 'Hvorfor kan du ikke reise med offentlig transport?' },
                alternativer: {
                    DÅRLIG_TRANSPORTTILBUD: { nb: 'Dårlig transporttilbud' },
                    HELSEMESSIGE_ÅRSAKER: { nb: 'Helsemessige årsaker' },
                    LEVERING_HENTING_I_BARNEHAGE: {
                        nb: 'Levering/henting i barnehage eller skolefritidsordning (SFO/AKS)',
                    },
                },
                feilmelding: {
                    nb: 'Du må oppgi hvorfor du ikke kan reise med offentlig transport.',
                },
            },
            når: (state) => state?.kanReiseMedOffentligTransport?.verdi === 'NEI',
            validate: (state) =>
                !state?.kanIkkeReiseMedOffentligTransportBegrunnelser?.verdier.some((felt) =>
                    harVerdi(felt.verdi)
                )
                    ? 'Du må oppgi hvorfor du ikke kan reise med offentlig transport.'
                    : undefined,
            value: (state) => state?.kanIkkeReiseMedOffentligTransportBegrunnelser?.verdier ?? [],
            write: (state, value) => ({
                ...state,
                kanIkkeReiseMedOffentligTransportBegrunnelser: value,
            }),
            barn: [
                alertNode({
                    id: INFO_DÅRLIG_TRANSPORT,
                    variant: 'info',
                    når: (state) =>
                        predikater.harOffentligBegrunnelse(state, 'DÅRLIG_TRANSPORTTILBUD'),
                    tekst: {
                        nb: 'Siden du valgte at du ikke kan reise med offentlig transport grunnet dårlig transporttilbud, kommer vi til å gjøre en vurdering av dette.',
                    },
                }),
                alertNode({
                    id: INFO_HELSE_OFFENTLIG,
                    variant: 'info',
                    når: (state) =>
                        predikater.harOffentligBegrunnelse(state, 'HELSEMESSIGE_ÅRSAKER'),
                    tekst: {
                        nb: 'Du må dokumentere din helsetilstand med legeerklæring eller annen uttalelse fra helsepersonell. Dette kan legges ved i et senere steg.',
                    },
                }),
                inputNode({
                    id: BARNEHAGE_ADRESSE,
                    tekst: {
                        label: { nb: 'Adresse til barnehage' },
                        feilmelding: { nb: 'Du må fylle inn adressen til barnehagen.' },
                    },
                    når: (state) =>
                        predikater.harOffentligBegrunnelse(state, 'LEVERING_HENTING_I_BARNEHAGE'),
                    validate: (state) =>
                        !harVerdi(state?.barnehageGateadresse?.verdi)
                            ? 'Du må fylle inn adressen til barnehagen.'
                            : undefined,
                    value: (state) => state?.barnehageGateadresse?.verdi ?? '',
                    write: (state, value, label) => ({
                        ...state,
                        barnehageGateadresse: { verdi: value, label },
                    }),
                }),
                inputNode({
                    id: BARNEHAGE_POSTNUMMER,
                    tekst: {
                        label: { nb: 'Postnummer til barnehage' },
                        feilmelding: { nb: 'Du må fylle inn postnummeret til barnehagen.' },
                    },
                    når: (state) =>
                        predikater.harOffentligBegrunnelse(state, 'LEVERING_HENTING_I_BARNEHAGE'),
                    validate: (state) =>
                        !harVerdi(state?.barnehagePostnummer?.verdi)
                            ? 'Du må fylle inn postnummeret til barnehagen.'
                            : undefined,
                    value: (state) => state?.barnehagePostnummer?.verdi ?? '',
                    write: (state, value, label) => ({
                        ...state,
                        barnehagePostnummer: { verdi: value, label },
                    }),
                }),
                radioNode<Reisemåte | undefined, unknown, ReisemåteNodeId, KanBenytteEgenBil>({
                    id: KAN_BENYTTE_EGEN_BIL,
                    tekst: {
                        header: { nb: 'Skal du kjøre bil til aktivitetsstedet?' },
                        alternativer: {
                            JA: { nb: 'Ja' },
                            NEI: { nb: 'Nei' },
                            NEI_SITTER_PÅ_MED_ANDRE: { nb: 'Nei, jeg sitter på med andre' },
                        },
                        feilmelding: { nb: 'Du må svare på om du kan benytte egen bil.' },
                    },
                    validate: (state) =>
                        !harVerdi(state?.kanBenytteEgenBil?.verdi)
                            ? 'Du må svare på om du kan benytte egen bil.'
                            : undefined,
                    value: (state) => state?.kanBenytteEgenBil?.verdi ?? '',
                    write: (state, value) => ({
                        ...state,
                        kanBenytteEgenBil: value,
                    }),
                    barn: [
                        checkboxNode<
                            Reisemåte | undefined,
                            unknown,
                            ReisemåteNodeId,
                            KanIkkeBenytteEgenBilBegrunnelser
                        >({
                            id: KAN_IKKE_BENYTTE_EGEN_BIL_BEGRUNNELSER,
                            tekst: {
                                legend: {
                                    nb: 'Hvorfor kan du ikke kjøre bil til aktivitetsstedet?',
                                },
                                alternativer: {
                                    HAR_IKKE_BIL_ELLER_FØRERKORT: {
                                        nb: 'Har ikke bil eller førerkort',
                                    },
                                    HELSEMESSIGE_ÅRSAKER: { nb: 'Helsemessige årsaker' },
                                    ANNET: { nb: 'Annet' },
                                },
                                feilmelding: {
                                    nb: 'Du må oppgi hvorfor du ikke kan benytte egen bil.',
                                },
                            },
                            når: (state) => predikater.erBilNei(state),
                            validate: (state) =>
                                !state?.kanIkkeBenytteEgenBilBegrunnelser?.verdier.some((felt) =>
                                    harVerdi(felt.verdi)
                                )
                                    ? 'Du må oppgi hvorfor du ikke kan benytte egen bil.'
                                    : undefined,
                            value: (state) =>
                                state?.kanIkkeBenytteEgenBilBegrunnelser?.verdier ?? [],
                            write: (state, value) => ({
                                ...state,
                                kanIkkeBenytteEgenBilBegrunnelser: value,
                            }),
                        }),
                        alertNode({
                            id: INFO_HELSE_BIL,
                            variant: 'info',
                            når: (state) =>
                                predikater.erBilNei(state) &&
                                predikater.harBilBegrunnelse(state, 'HELSEMESSIGE_ÅRSAKER'),
                            tekst: {
                                nb: 'Du må dokumentere din helsetilstand med legeerklæring eller annen uttalelse fra helsepersonell. Dette kan legges ved i et senere steg.',
                            },
                        }),
                        radioNode<Reisemåte | undefined, unknown, ReisemåteNodeId, JaNei>({
                            id: ØNSKER_DEKKET_UTGIFTER_FOR_DROSJE,
                            tekst: {
                                header: {
                                    nb: 'Ønsker du å søke om få dekket utgifter til reise med taxi?',
                                },
                                alternativer: JaNeiTilTekst,
                                feilmelding: { nb: 'Du må svare på om du kan benytte drosje.' },
                            },
                            når: (state) => predikater.erBilNei(state),
                            validate: (state) =>
                                !harVerdi(state?.ønskerDekketUtgifterForDrosje?.verdi)
                                    ? 'Du må svare på om du kan benytte drosje.'
                                    : undefined,
                            value: (state) => state?.ønskerDekketUtgifterForDrosje?.verdi ?? '',
                            write: (state, value) => ({
                                ...state,
                                ønskerDekketUtgifterForDrosje: value,
                            }),
                            barn: [
                                alertNode({
                                    id: INFO_DROSJE_DOKUMENTASJON,
                                    variant: 'info',
                                    når: (state) =>
                                        state?.ønskerDekketUtgifterForDrosje?.verdi === 'JA',
                                    tekst: {
                                        nb: 'Vi kan dekke utgifter til taxi hvis du oppfyller kravene til dette. Hvis du har hatt utgifter til taxi og ønsker å få disse dekket, må du legge ved kvitteringene i søknaden.',
                                    },
                                }),
                                radioNode<Reisemåte | undefined, unknown, ReisemåteNodeId, JaNei>({
                                    id: HAR_TT_KORT,
                                    tekst: {
                                        header: { nb: 'Har du TT-kort?' },
                                        alternativer: JaNeiTilTekst,
                                        feilmelding: { nb: 'Du må svare på om du har TT-kort.' },
                                    },
                                    når: (state) =>
                                        state?.ønskerDekketUtgifterForDrosje?.verdi === 'JA' &&
                                        predikater.harBilBegrunnelse(state, 'HELSEMESSIGE_ÅRSAKER'),
                                    validate: (state) =>
                                        !harVerdi(state?.harTTKort?.verdi)
                                            ? 'Du må svare på om du har TT-kort.'
                                            : undefined,
                                    value: (state) => state?.harTTKort?.verdi ?? '',
                                    write: (state, value) => ({
                                        ...state,
                                        harTTKort: value,
                                    }),
                                }),
                                alertNode({
                                    id: INFO_TT_KORT,
                                    variant: 'info',
                                    formatter: 'avsnitt',
                                    når: (state) => state?.harTTKort?.verdi === 'JA',
                                    tekst: {
                                        nb: [
                                            'Hvis du har et TT-kort, må vi vite om du kan benytte TT-kortet til å reise til/ fra aktivitetsstedet. Du må sende inn dokumentasjon som viser hvilke type reiser TT-kortet ditt kan brukes til og hva du eventuelt må betale i egenandel. ',
                                            'Hvis du betaler egenandel, kan du få pengestøtte til å dekke denne utgiften.',
                                        ],
                                    },
                                }),
                                alertNode({
                                    id: ADVARSEL_INGEN_REISEMÅTE,
                                    variant: 'info',
                                    når: (state) =>
                                        state?.ønskerDekketUtgifterForDrosje?.verdi === 'NEI',
                                    tekst: {
                                        nb: 'Du har oppgitt at du ikke kan reise med offentlig transport, benytte egen bil eller drosje, og oppfyller dermed ikke kravene for å få støtte. Du kan fortsatt søke, men du kan få avslag.',
                                    },
                                }),
                            ],
                        }),
                        radioNode<Reisemåte | undefined, unknown, ReisemåteNodeId, JaNei>({
                            id: BETALER_FOR_REISE_SELV,
                            tekst: {
                                header: { nb: 'Skal du betale for reisen selv?' },
                                alternativer: JaNeiTilTekst,
                                feilmelding: {
                                    nb: 'Du må svare på om du betaler for reisen selv.',
                                },
                            },
                            når: (state) => predikater.erBilMedAndre(state),
                            validate: (state) =>
                                !harVerdi(state?.betalerForReiseSelv?.verdi)
                                    ? 'Du må svare på om du betaler for reisen selv.'
                                    : undefined,
                            value: (state) => state?.betalerForReiseSelv?.verdi ?? '',
                            write: (state, value) => ({
                                ...state,
                                betalerForReiseSelv: value,
                            }),
                        }),
                        alertNode({
                            id: ADVARSEL_IKKE_BETALE_SELV,
                            variant: 'info',
                            når: (state) =>
                                predikater.erBilMedAndre(state) &&
                                state?.betalerForReiseSelv?.verdi === 'NEI',
                            tekst: {
                                nb: 'Siden du ikke må betale for reisen til aktivitetsstedet selv, er ikke du kvalifisert for å motta denne stønaden. Du kan fortsatt søke - men du vil mest sannsynlig få avslag.',
                            },
                        }),
                        customNode({
                            id: EGENBIL_SEKSJON,
                            når: (state) => predikater.harBilutgiftsti(state),
                            render: ({ locale }) => (
                                <div>
                                    <h3>
                                        {locale === 'nb'
                                            ? 'Utgifter til kjøring med privat bil'
                                            : ''}
                                    </h3>
                                    <p>
                                        {locale === 'nb'
                                            ? 'Du trenger bare å fylle inn det som gjelder for din reise.'
                                            : ''}
                                    </p>
                                </div>
                            ),
                        }),
                        radioNode<Reisemåte | undefined, unknown, ReisemåteNodeId, DrivstoffType>({
                            id: EGENBIL_DRIVSTOFFTYPE,
                            tekst: {
                                header: { nb: 'Bilens drivstofftype?' },
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
                            når: (state) => predikater.harBilutgiftsti(state),
                            validate: (state) =>
                                !harVerdi(state?.reiseMedBilUtgifter?.drivstoffType?.verdi)
                                    ? 'Du må oppgi bilens drivstofftype.'
                                    : undefined,
                            value: (state) =>
                                state?.reiseMedBilUtgifter?.drivstoffType?.verdi ?? '',
                            write: (state, value) => ({
                                ...state,
                                reiseMedBilUtgifter: {
                                    ...state?.reiseMedBilUtgifter,
                                    drivstoffType: value,
                                },
                            }),
                        }),
                        inputNode({
                            id: EGENBIL_BOMPENGER,
                            tekst: {
                                label: { nb: 'Bompenger per dag (valgfritt)' },
                                feilmelding: { nb: 'Bompenger må være et positivt tall.' },
                            },
                            inputProps: { inputMode: 'numeric' },
                            når: (state) => predikater.harBilutgiftsti(state),
                            validate: (state) => {
                                const bompenger = state?.reiseMedBilUtgifter?.bompenger?.verdi;
                                return harVerdi(bompenger) && !erGyldigKostnad(bompenger)
                                    ? 'Bompenger må være et positivt tall.'
                                    : undefined;
                            },
                            value: (state) => state?.reiseMedBilUtgifter?.bompenger?.verdi ?? '',
                            write: (state, value, label) => ({
                                ...state,
                                reiseMedBilUtgifter: {
                                    ...state?.reiseMedBilUtgifter,
                                    bompenger: { verdi: value, label },
                                },
                            }),
                        }),
                        inputNode({
                            id: EGENBIL_FERGE,
                            tekst: {
                                label: { nb: 'Ferge per dag (valgfritt)' },
                                feilmelding: { nb: 'Ferge må være et positivt tall.' },
                            },
                            inputProps: { inputMode: 'numeric' },
                            når: (state) => predikater.harBilutgiftsti(state),
                            validate: (state) => {
                                const ferge = state?.reiseMedBilUtgifter?.ferge?.verdi;
                                return harVerdi(ferge) && !erGyldigKostnad(ferge)
                                    ? 'Ferge må være et positivt tall.'
                                    : undefined;
                            },
                            value: (state) => state?.reiseMedBilUtgifter?.ferge?.verdi ?? '',
                            write: (state, value, label) => ({
                                ...state,
                                reiseMedBilUtgifter: {
                                    ...state?.reiseMedBilUtgifter,
                                    ferge: { verdi: value, label },
                                },
                            }),
                        }),
                        inputNode({
                            id: EGENBIL_PIGGDEKKAVGIFT,
                            tekst: {
                                label: { nb: 'Piggdekkavgift per dag (valgfritt)' },
                                feilmelding: { nb: 'Piggdekkavgift må være et positivt tall.' },
                            },
                            inputProps: { inputMode: 'numeric' },
                            når: (state) => predikater.harBilutgiftsti(state),
                            validate: (state) => {
                                const piggdekkavgift =
                                    state?.reiseMedBilUtgifter?.piggdekkavgift?.verdi;
                                return harVerdi(piggdekkavgift) && !erGyldigKostnad(piggdekkavgift)
                                    ? 'Piggdekkavgift må være et positivt tall.'
                                    : undefined;
                            },
                            value: (state) =>
                                state?.reiseMedBilUtgifter?.piggdekkavgift?.verdi ?? '',
                            write: (state, value, label) => ({
                                ...state,
                                reiseMedBilUtgifter: {
                                    ...state?.reiseMedBilUtgifter,
                                    piggdekkavgift: { verdi: value, label },
                                },
                            }),
                        }),
                    ],
                }),
            ],
        }),
    ],
});

export const reiseTilSamlingVisningsrekkefølge = flattenGraf(
    reisemåteSpørsmålGraf
) as ReisemåteNode[];

export const rensInaktiveReisemåteSvar = (
    reisemåte: Reisemåte | undefined
): Reisemåte | undefined => {
    if (!reisemåte) {
        return reisemåte;
    }

    const aktiveNoder = finnAktiveNoder(reisemåteSpørsmålGraf, reisemåte, {});
    const erAktiv = (nodeId: ReisemåteSpørsmålNodeId) => aktiveNoder.has(nodeId);
    const medRensedeBilUtgifter =
        erAktiv(EGENBIL_DRIVSTOFFTYPE) ||
        erAktiv(EGENBIL_BOMPENGER) ||
        erAktiv(EGENBIL_FERGE) ||
        erAktiv(EGENBIL_PIGGDEKKAVGIFT)
            ? {
                  drivstoffType: erAktiv(EGENBIL_DRIVSTOFFTYPE)
                      ? reisemåte.reiseMedBilUtgifter?.drivstoffType
                      : undefined,
                  bompenger: erAktiv(EGENBIL_BOMPENGER)
                      ? reisemåte.reiseMedBilUtgifter?.bompenger
                      : undefined,
                  ferge: erAktiv(EGENBIL_FERGE) ? reisemåte.reiseMedBilUtgifter?.ferge : undefined,
                  piggdekkavgift: erAktiv(EGENBIL_PIGGDEKKAVGIFT)
                      ? reisemåte.reiseMedBilUtgifter?.piggdekkavgift
                      : undefined,
              }
            : undefined;

    return {
        kanReiseMedOffentligTransport: reisemåte.kanReiseMedOffentligTransport,
        totalUtgifterOffentligTransport: erAktiv(TOTALUTGIFTER_OFFENTLIG_TRANSPORT)
            ? reisemåte.totalUtgifterOffentligTransport
            : undefined,
        kanIkkeReiseMedOffentligTransportBegrunnelser: erAktiv(
            KAN_IKKE_REISE_MED_OFFENTLIG_TRANSPORT_BEGRUNNELSER
        )
            ? reisemåte.kanIkkeReiseMedOffentligTransportBegrunnelser
            : undefined,
        barnehageGateadresse: erAktiv(BARNEHAGE_ADRESSE)
            ? reisemåte.barnehageGateadresse
            : undefined,
        barnehagePostnummer: erAktiv(BARNEHAGE_POSTNUMMER)
            ? reisemåte.barnehagePostnummer
            : undefined,
        kanBenytteEgenBil: erAktiv(KAN_BENYTTE_EGEN_BIL) ? reisemåte.kanBenytteEgenBil : undefined,
        kanIkkeBenytteEgenBilBegrunnelser: erAktiv(KAN_IKKE_BENYTTE_EGEN_BIL_BEGRUNNELSER)
            ? reisemåte.kanIkkeBenytteEgenBilBegrunnelser
            : undefined,
        ønskerDekketUtgifterForDrosje: erAktiv(ØNSKER_DEKKET_UTGIFTER_FOR_DROSJE)
            ? reisemåte.ønskerDekketUtgifterForDrosje
            : undefined,
        harTTKort: erAktiv(HAR_TT_KORT) ? reisemåte.harTTKort : undefined,
        betalerForReiseSelv: erAktiv(BETALER_FOR_REISE_SELV)
            ? reisemåte.betalerForReiseSelv
            : undefined,
        reiseMedBilUtgifter: medRensedeBilUtgifter,
    };
};
