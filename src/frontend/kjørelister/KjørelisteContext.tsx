import { useState } from 'react';

import createUseContext from 'constate';
import { isEqual } from 'date-fns';

import { Rammevedtak } from './types/Rammevedtak';
import { finnDagerMellomFomOgTomInklusiv, tilTekstligDato, tilUkedag } from '../utils/datoUtils';
import { Kjøreliste, Reisedag, UkeMedReisedager } from './types/Kjøreliste';
import { Dokument, VedleggstypeKjøreliste } from '../typer/skjema';

interface Props {
    rammevedtak: Rammevedtak;
}

const [KjørelisteProvider, useKjøreliste] = createUseContext(({ rammevedtak }: Props) => {
    KjørelisteProvider.displayName = 'KJØRELISTE_PROVIDER';

    const [kjøreliste, setKjøreliste] = useState(initialiserKjøreliste(rammevedtak));

    const oppdaterHarReist = (dag: Date, harKjørt: boolean) => {
        setKjøreliste((kjøreliste) => ({
            ...kjøreliste,
            reisedagerPerUkeAvsnitt: kjøreliste.reisedagerPerUkeAvsnitt.map((uke) => ({
                ...uke,
                reisedager: uke.reisedager.map((reisedag) =>
                    isEqual(reisedag.dato.verdi, dag) ? { ...reisedag, harKjørt } : reisedag
                ),
            })),
        }));
    };

    const oppdaterParkeringsutgift = (dag: Date, parkeringsutgift: number) => {
        setKjøreliste((kjøreliste) => ({
            ...kjøreliste,
            reisedagerPerUkeAvsnitt: kjøreliste.reisedagerPerUkeAvsnitt.map((uke) => ({
                ...uke,
                reisedager: uke.reisedager.map((reisedag) => {
                    if (isEqual(reisedag.dato.verdi, dag)) {
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

    const oppdaterDokumentasjon = (dokumenter: Dokument[]) => {
        setKjøreliste((kjøreliste) => ({
            ...kjøreliste,
            dokumentasjon: kjøreliste.dokumentasjon.map((dokumentasjonFelt) =>
                dokumentasjonFelt.type === VedleggstypeKjøreliste.PARKERINGSUTGIFT
                    ? { ...dokumentasjonFelt, opplastedeVedlegg: dokumenter }
                    : dokumentasjonFelt
            ),
        }));
    };

    return {
        rammevedtak,
        kjøreliste,
        oppdaterHarReist,
        oppdaterParkeringsutgift,
        oppdaterDokumentasjon,
    };
});

export { KjørelisteProvider, useKjøreliste };

const initialiserKjøreliste = (rammevedtak: Rammevedtak): Kjøreliste => {
    const reisedagerPerUkeAvsnitt: UkeMedReisedager[] = rammevedtak.uker.map((rammevedtakUke) => {
        const dager = finnDagerMellomFomOgTomInklusiv(rammevedtakUke.fom, rammevedtakUke.tom);
        const reisedager: Reisedag[] = dager.map((rammevedtakDag) => ({
            dato: {
                verdi: rammevedtakDag,
                label: `${tilUkedag(rammevedtakDag)} ${tilTekstligDato(rammevedtakDag.toISOString())}`,
            },
            harKjørt: false,
            parkeringsutgift: {
                verdi: 0,
                label: 'Parkeringsutgifter (kr)',
            },
        }));
        return {
            ukeLabel: `(${tilTekstligDato(rammevedtakUke.fom)} - ${tilTekstligDato(rammevedtakUke.tom)})`,
            spørsmål: 'Hvilke dager kjørte du?',
            reisedager: reisedager,
        };
    });
    return {
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
