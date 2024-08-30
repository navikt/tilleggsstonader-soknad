import React from 'react';

import Vedlegg from '../../../components/Vedlegg/Vedlegg';
import { useLæremidlerSøknad } from '../../../context/LæremiddelSøknadContext';

const VedleggLæremidler = () => {
    const { dokumentasjon, settDokumentasjon, dokumentasjonsbehov } = useLæremidlerSøknad();
    return (
        <Vedlegg
            dokumentasjon={dokumentasjon}
            settDokumentasjon={settDokumentasjon}
            dokumentasjonsbehov={dokumentasjonsbehov}
        />
    );
};

export default VedleggLæremidler;
