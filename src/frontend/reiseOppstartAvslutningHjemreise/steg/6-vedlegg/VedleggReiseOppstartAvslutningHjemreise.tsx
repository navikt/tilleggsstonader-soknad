import React from 'react';

import { DokumentasjonFeltMedVedleggstekst, Vedlegg } from '../../../components/Vedlegg/Vedlegg';
import { useSpråk } from '../../../context/SpråkContext';
import { typerVedleggTekster } from '../../../tekster/vedlegg';
import { useReiseOppstartAvslutningHjemreiseSøknad } from '../../context/ReiseOppstartAvslutningHjemreiseSøknadContext';

export const VedleggReiseOppstartAvslutningHjemreise = () => {
    const { dokumentasjon, settDokumentasjon, dokumentasjonsbehov } =
        useReiseOppstartAvslutningHjemreiseSøknad();
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
