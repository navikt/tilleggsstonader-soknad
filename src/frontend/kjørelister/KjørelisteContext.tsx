import { useState } from 'react';

import createUseContext from 'constate';
import { isEqual } from 'date-fns';

import { Rammevedtak } from './types/Rammevedtak';
import { finnDagerMellomFomOgTomInklusiv, tilTekstligDato, tilUkedag } from '../utils/datoUtils';
import { Kjøreliste, Reisedag, UkeMedReisedager } from './types/Kjøreliste';
import { Dokument, VedleggstypeKjøreliste } from '../typer/skjema';
import { tilLocaleDateString } from '../utils/formateringUtils';

interface Props {
    rammevedtak: Rammevedtak;
}

const [KjørelisteProvider, useKjøreliste] = createUseContext(({ rammevedtak }: Props) => {
    KjørelisteProvider.displayName = 'KJØRELISTE_PROVIDER';

    const [kjøreliste, setKjøreliste] = useState(initialiserKjøreliste(rammevedtak));

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
                verdi: tilLocaleDateString(rammevedtakDag),
                label: `${tilUkedag(rammevedtakDag)} ${tilTekstligDato(rammevedtakDag.toISOString())}`,
            },
            harKjørt: false,
            parkeringsutgift: {
                verdi: null,
                label: 'Parkeringsutgifter (kr)',
            },
        }));
        return {
            ukeLabel: `Uke ${rammevedtakUke.ukeNummer} (${tilTekstligDato(rammevedtakUke.fom)} - ${tilTekstligDato(rammevedtakUke.tom)})`,
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
