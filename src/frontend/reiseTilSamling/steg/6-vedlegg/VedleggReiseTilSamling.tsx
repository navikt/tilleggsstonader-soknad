// biome-ignore lint/correctness/noUnusedImports: React er nødvendig for webpack JSX-transform
import React from 'react';

import {
    type DokumentasjonFeltMedVedleggstekst,
    Vedlegg
} from '../../../components/Vedlegg/Vedlegg';
import { useSpråk } from '../../../context/SpråkContext';
import { typerVedleggTekster } from '../../../tekster/vedlegg';
import { useReiseTilSamlingSøknad } from '../../context/ReiseTilSamlingSøknadContext';

export const VedleggReiseTilSamling = () => {
    const { dokumentasjon, settDokumentasjon, dokumentasjonsbehov } = useReiseTilSamlingSøknad();
    const { locale } = useSpråk();

    const dokumentasjonMedTittelOgBeskrivelse: DokumentasjonFeltMedVedleggstekst[] =
        dokumentasjon.map((dok) => {
            const vedleggstekster = typerVedleggTekster[dok.type];
            return {
                ...dok,
                tittel: vedleggstekster.tittel[locale],
                beskrivelse: vedleggstekster.beskrivelse[locale]
            };
        });

    return (
        <Vedlegg
            dokumentasjon={dokumentasjonMedTittelOgBeskrivelse}
            settDokumentasjon={settDokumentasjon}
            dokumentasjonsbehov={dokumentasjonsbehov}
        />
    );
};
