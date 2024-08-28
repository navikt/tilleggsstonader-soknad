import React from 'react';

import Vedlegg from '../../../components/Vedlegg/Vedlegg';
import { useLæremidlerSøknad } from '../../../context/LæremiddelSøknadContext';
import { Stønadstype } from '../../../typer/stønadstyper';

const VedleggLæremidler = () => {
    const { dokumentasjon, settDokumentasjon, dokumentasjonsbehov } = useLæremidlerSøknad();
    return (
        <Vedlegg
            stønadstype={Stønadstype.LÆREMIDLER}
            dokumentasjon={dokumentasjon}
            settDokumentasjon={settDokumentasjon}
            dokumentasjonsbehov={dokumentasjonsbehov}
        />
    );
};

export default VedleggLæremidler;
