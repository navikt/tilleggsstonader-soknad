import { Landvelger } from '../../../components/Landvelger/Landvelger';
import { customNode, inputNode, radioNode } from '../../../felles/spørsmålsgraf/builders';
import { Spørsmålsnode } from '../../../felles/spørsmålsgraf/rendering';
import { flattenGraf } from '../../../felles/spørsmålsgraf/traversering';
import { JaNeiTilTekst } from '../../../tekster/felles';
import { Avreiseadresse, JaNei } from '../../../typer/søknad';
import { TekstElement } from '../../../typer/tekst';
import { harVerdi } from '../../../utils/typeUtils';

export const SKAL_REISE_FRA_FOLKEREG_ADR = 'avreiseadresse_skalReiseFraFolkeregAdr';
export const AVREISE_LAND = 'avreiseadresse_avreise_land';
export const AVREISE_GATEADRESSE = 'avreiseadresse_avreise_gateadresse';
export const AVREISE_POSTNUMMER = 'avreiseadresse_avreise_postnummer';
export const AVREISE_POSTSTED = 'avreiseadresse_avreise_poststed';
const spørsmålNodeIder = [
    SKAL_REISE_FRA_FOLKEREG_ADR,
    AVREISE_LAND,
    AVREISE_GATEADRESSE,
    AVREISE_POSTNUMMER,
    AVREISE_POSTSTED,
] as const;

type AvreiseadresseSpørsmålNodeId = (typeof spørsmålNodeIder)[number];
type AvreiseadresseNodeId = AvreiseadresseSpørsmålNodeId;
type AvreiseadresseNode = Spørsmålsnode<Avreiseadresse, unknown, AvreiseadresseNodeId>;

const avreiseadresseSpørsmålNodeSet = new Set<AvreiseadresseSpørsmålNodeId>(spørsmålNodeIder);
export const erAvreiseadresseSpørsmålNode = (
    nodeId: string
): nodeId is AvreiseadresseSpørsmålNodeId =>
    avreiseadresseSpørsmålNodeSet.has(nodeId as AvreiseadresseSpørsmålNodeId);

export const avreiseadresseTittel: TekstElement<string> = { nb: 'Avreiseadresse' };
export const avreiseadresseFolkeregistrertTekst: TekstElement<string> = {
    nb: 'Din folkeregistrerte adresse er [0].',
};
export const avreiseadresseInfoTekst: TekstElement<string> = {
    nb: 'Adressen er hentet fra Folkeregisteret. Det er viktig at denne adressen er korrekt. Du kan ',
};
export const avreiseadresseLenkeTekst: TekstElement<string> = {
    nb: 'endre adressen på Skatteetatens nettsider (åpnes i ny fane)',
};
export const avreiseadresseLenkeUrl = 'https://www.skatteetaten.no/person/folkeregister/endre/';
export const avreiseadresseManuellTittel: TekstElement<string> = {
    nb: 'Oppgi adressen du skal reise fra',
};

export const avreiseadresseSpørsmålGraf: AvreiseadresseNode = radioNode<
    Avreiseadresse,
    unknown,
    AvreiseadresseNodeId,
    JaNei
>({
    id: SKAL_REISE_FRA_FOLKEREG_ADR,
    tekst: {
        header: { nb: 'Skal du reise fra din folkeregistrerte adresse?' },
        alternativer: JaNeiTilTekst,
        feilmelding: { nb: 'Du må svare på om du skal reise fra din folkeregistrerte adresse.' },
    },
    validate: (state) =>
        !harVerdi(state.skalReiseFraFolkeregistrertAdresse?.verdi)
            ? 'Du må svare på om du skal reise fra din folkeregistrerte adresse.'
            : undefined,
    value: (state) => state.skalReiseFraFolkeregistrertAdresse?.verdi ?? '',
    write: (state, value) => ({
        ...state,
        skalReiseFraFolkeregistrertAdresse: value,
        adresseDetSkalReisesFra: value.verdi === 'NEI' ? state.adresseDetSkalReisesFra : undefined,
    }),
    barn: [
        customNode({
            id: AVREISE_LAND,
            når: (state) => state.skalReiseFraFolkeregistrertAdresse?.verdi === 'NEI',
            validate: (state) =>
                !harVerdi(state.adresseDetSkalReisesFra?.land?.verdi)
                    ? 'Du må velge land.'
                    : undefined,
            render: ({ state, valideringsfeil, oppdaterState, nullstillFeil }) => (
                <Landvelger
                    id={valideringsfeil[AVREISE_LAND]?.id}
                    label={{ nb: 'Velg land' }}
                    value={state.adresseDetSkalReisesFra?.land?.verdi}
                    onChange={(verdi) => {
                        oppdaterState((forrige) => ({
                            ...forrige,
                            adresseDetSkalReisesFra: {
                                ...forrige.adresseDetSkalReisesFra,
                                land: verdi,
                            },
                        }));
                        if (verdi.verdi) {
                            nullstillFeil(AVREISE_LAND);
                        }
                    }}
                    medNorskeOmråder
                    error={valideringsfeil[AVREISE_LAND]?.melding}
                    defaultNorge
                />
            ),
        }),
        inputNode({
            id: AVREISE_GATEADRESSE,
            når: (state) => state.skalReiseFraFolkeregistrertAdresse?.verdi === 'NEI',
            tekst: {
                label: { nb: 'Gateadresse' },
                feilmelding: { nb: 'Du må fylle inn gateadresse.' },
            },
            validate: (state) =>
                !harVerdi(state.adresseDetSkalReisesFra?.gateadresse?.verdi)
                    ? 'Du må fylle inn gateadresse.'
                    : undefined,
            value: (state) => state.adresseDetSkalReisesFra?.gateadresse?.verdi ?? '',
            write: (state, value, label) => ({
                ...state,
                adresseDetSkalReisesFra: {
                    ...state.adresseDetSkalReisesFra,
                    gateadresse: { label, verdi: value },
                },
            }),
        }),
        inputNode({
            id: AVREISE_POSTNUMMER,
            når: (state) => state.skalReiseFraFolkeregistrertAdresse?.verdi === 'NEI',
            tekst: {
                label: { nb: 'Postnummer' },
                feilmelding: { nb: 'Du må fylle inn postnummer.' },
            },
            inputProps: { inputMode: 'numeric' },
            validate: (state) =>
                !harVerdi(state.adresseDetSkalReisesFra?.postnummer?.verdi)
                    ? 'Du må fylle inn postnummer.'
                    : undefined,
            value: (state) => state.adresseDetSkalReisesFra?.postnummer?.verdi ?? '',
            write: (state, value, label) => ({
                ...state,
                adresseDetSkalReisesFra: {
                    ...state.adresseDetSkalReisesFra,
                    postnummer: { label, verdi: value },
                },
            }),
        }),
        inputNode({
            id: AVREISE_POSTSTED,
            når: (state) => state.skalReiseFraFolkeregistrertAdresse?.verdi === 'NEI',
            tekst: {
                label: { nb: 'Poststed' },
                feilmelding: { nb: 'Du må fylle inn poststed.' },
            },
            validate: (state) =>
                !harVerdi(state.adresseDetSkalReisesFra?.poststed?.verdi)
                    ? 'Du må fylle inn poststed.'
                    : undefined,
            value: (state) => state.adresseDetSkalReisesFra?.poststed?.verdi ?? '',
            write: (state, value, label) => ({
                ...state,
                adresseDetSkalReisesFra: {
                    ...state.adresseDetSkalReisesFra,
                    poststed: { label, verdi: value },
                },
            }),
        }),
    ],
});

export const avreiseadresseVisningsrekkefølge = flattenGraf(
    avreiseadresseSpørsmålGraf
) as AvreiseadresseNode[];

export const rensInaktiveAvreiseadresseSvar = (avreiseadresse: Avreiseadresse): Avreiseadresse =>
    avreiseadresse.skalReiseFraFolkeregistrertAdresse?.verdi === 'NEI'
        ? avreiseadresse
        : {
              ...avreiseadresse,
              adresseDetSkalReisesFra: undefined,
          };

export const erAdressemanuell = (aktiveNoder: Set<string>) => aktiveNoder.has(AVREISE_LAND);
