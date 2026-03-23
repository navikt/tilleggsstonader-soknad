import { useState } from 'react';

import createUseContext from 'constate';
import { isEqual } from 'date-fns';

import { Rammevedtak } from './types/Rammevedtak';
import { Dokument, VedleggstypeKjøreliste } from '../typer/skjema';
import { finnDagerMellomFomOgTomInklusiv, tilTekstligDato, tilUkedag } from '../utils/datoUtils';
import { Kjøreliste, Reisedag, UkeMedReisedager } from './types/Kjøreliste';
import { tilLocaleDateString } from '../utils/formateringUtils';

interface Props {
    rammevedtak: Rammevedtak;
    tidligereInnsendt: Kjøreliste | null;
}

const [KjørelisteProvider, useKjøreliste] = createUseContext(
    ({ rammevedtak, tidligereInnsendt }: Props) => {
        KjørelisteProvider.displayName = 'KJØRELISTE_PROVIDER';

        const [kjøreliste, setKjøreliste] = useState(
            initialiserKjøreliste(rammevedtak, tidligereInnsendt)
        );

        const oppdaterHarReist = (dato: string, harKjørt: boolean) => {
            setKjøreliste((kjøreliste) => ({
                ...kjøreliste,
                reisedagerPerUkeAvsnitt: kjøreliste.reisedagerPerUkeAvsnitt.map((uke) => ({
                    ...uke,
                    reisedager: uke.reisedager.map((reisedag) =>
                        isEqual(reisedag.dato.verdi, dato) ? { ...reisedag, harKjørt } : reisedag
                    ),
                })),
            }));
        };

        const oppdaterParkeringsutgift = (dato: string, parkeringsutgift: number) => {
            setKjøreliste((kjøreliste) => ({
                ...kjøreliste,
                reisedagerPerUkeAvsnitt: kjøreliste.reisedagerPerUkeAvsnitt.map((uke) => ({
                    ...uke,
                    reisedager: uke.reisedager.map((reisedag) => {
                        if (isEqual(reisedag.dato.verdi, dato)) {
                            return {
                                ...reisedag,
                                parkeringsutgift: {
                                    verdi: parkeringsutgift,
                                    label: reisedag.parkeringsutgift.label,
                                },
                            };
                        }
                        return reisedag;
                    }),
                })),
            }));
        };

        const oppdaterDokumentasjon = (oppdater: (vedlegg: Dokument[]) => Dokument[]) => {
            setKjøreliste((kjøreliste) => ({
                ...kjøreliste,
                dokumentasjon: kjøreliste.dokumentasjon.map((felt) =>
                    felt.type === VedleggstypeKjøreliste.PARKERINGSUTGIFT
                        ? { ...felt, opplastedeVedlegg: oppdater(felt.opplastedeVedlegg) }
                        : felt
                ),
            }));
        };

        const leggTilDokument = (dokument: Dokument) => {
            oppdaterDokumentasjon((vedlegg) => [...vedlegg, dokument]);
        };

        const slettDokument = (dokumentId: string) => {
            oppdaterDokumentasjon((vedlegg) =>
                vedlegg.filter((dokument) => dokument.id !== dokumentId)
            );
        };

        return {
            rammevedtak,
            kjøreliste,
            oppdaterHarReist,
            oppdaterParkeringsutgift,
            leggTilDokument,
            slettDokument,
        };
    }
);

export { KjørelisteProvider, useKjøreliste };

const initialiserKjøreliste = (
    rammevedtak: Rammevedtak,
    tidligereInnsendt: Kjøreliste | null
): Kjøreliste => {
    const tidligereReisedagerMap = lagTidligereReisedagerMap(tidligereInnsendt);

    const reisedagerPerUkeAvsnitt: UkeMedReisedager[] = rammevedtak.uker.map((rammevedtakUke) => {
        const dager = finnDagerMellomFomOgTomInklusiv(rammevedtakUke.fom, rammevedtakUke.tom);
        const reisedager: Reisedag[] = dager.map((rammevedtakDag) => {
            const dato = tilLocaleDateString(rammevedtakDag);
            const tidligereReisedag = tidligereReisedagerMap.get(dato);

            return {
                dato: {
                    verdi: dato,
                    label: `${tilUkedag(rammevedtakDag)} ${tilTekstligDato(rammevedtakDag.toISOString())}`,
                },
                harKjørt: tidligereReisedag?.harKjørt ?? false,
                parkeringsutgift: {
                    verdi: tidligereReisedag?.parkeringsutgift?.verdi ?? null,
                    label: 'Parkeringsutgifter (kr)',
                },
            };
        });
        return {
            ukeLabel: `Uke ${rammevedtakUke.ukeNummer} (${tilTekstligDato(rammevedtakUke.fom)} - ${tilTekstligDato(rammevedtakUke.tom)})`,
            spørsmål: 'Hvilke dager kjørte du?',
            reisedager: reisedager,
            sendtInnTidligere: rammevedtakUke.innsendtDato != null,
        };
    });
    return {
        reiseId: rammevedtak.reiseId,
        reisedagerPerUkeAvsnitt: reisedagerPerUkeAvsnitt,
        dokumentasjon: [
            {
                type: VedleggstypeKjøreliste.PARKERINGSUTGIFT,
                label: 'Vedlegg parkeringsutgift',
                opplastedeVedlegg: [],
            },
        ],
        søknadMetadata: {
            søknadFrontendGitHash: process.env.COMMIT_HASH,
        },
    };
};

const lagTidligereReisedagerMap = (tidligereInnsendt: Kjøreliste | null): Map<string, Reisedag> => {
    const map = new Map<string, Reisedag>();
    if (!tidligereInnsendt) return map;

    tidligereInnsendt.reisedagerPerUkeAvsnitt.forEach((uke) => {
        uke.reisedager.forEach((reisedag) => {
            map.set(reisedag.dato.verdi, reisedag);
        });
    });
    return map;
};
