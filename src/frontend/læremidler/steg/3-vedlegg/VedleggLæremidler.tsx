import React from 'react';

import Vedlegg, { DokumentasjonFeltMedVedleggstekst } from '../../../components/Vedlegg/Vedlegg';
import { useLæremidlerSøknad } from '../../../context/LæremiddelSøknadContext';
import { useSpråk } from '../../../context/SpråkContext';
import { VedleggstypeLæremidler } from '../../../typer/skjema';
import { typerVedleggTeksterLæremidler } from '../../tekster/vedlegg';

const VedleggLæremidler = () => {
    const { dokumentasjon, settDokumentasjon, dokumentasjonsbehov } = useLæremidlerSøknad();
    const { locale } = useSpråk();

    const dokumentasjonMedTittelOgBeskrivelse: DokumentasjonFeltMedVedleggstekst[] =
        dokumentasjon.map((dokumentasjon) => {
            const vedleggstekster =
                typerVedleggTeksterLæremidler[dokumentasjon.type as VedleggstypeLæremidler];
            return {
                ...dokumentasjon,
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

export default VedleggLæremidler;
