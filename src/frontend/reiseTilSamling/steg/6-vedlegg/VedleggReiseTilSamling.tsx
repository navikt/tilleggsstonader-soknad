import React from 'react';

import Vedlegg, { DokumentasjonFeltMedVedleggstekst } from '../../../components/Vedlegg/Vedlegg';
import { useReiseTilSamlingSøknad } from '../../../context/ReiseTilSamlingSøknadContext';
import { useSpråk } from '../../../context/SpråkContext';
import { typerVedleggTekster } from '../../../tekster/vedlegg';

const VedleggReiseTilSamling = () => {
    const { dokumentasjon, settDokumentasjon, dokumentasjonsbehov } = useReiseTilSamlingSøknad();
    const { locale } = useSpråk();

    const dokumentasjonMedTittelOgBeskrivelse: DokumentasjonFeltMedVedleggstekst[] =
        dokumentasjon.map((dok) => {
            const vedleggstekster = typerVedleggTekster[dok.type];
            return {
                ...dok,
                tittel: vedleggstekster.tittel[locale],
                beskrivelse: vedleggstekster.beskrivelse[locale],
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

export default VedleggReiseTilSamling;
