import React from 'react';

import Vedlegg from '../../../components/Vedlegg/Vedlegg';
import { usePassAvBarnSøknad } from '../../../context/PassAvBarnSøknadContext';

const VedleggPassAvBarn = () => {
    const { dokumentasjon, settDokumentasjon, dokumentasjonsbehov } = usePassAvBarnSøknad();
    return (
        <Vedlegg
            dokumentasjon={dokumentasjon}
            settDokumentasjon={settDokumentasjon}
            dokumentasjonsbehov={dokumentasjonsbehov}
        />
    );
};

export default VedleggPassAvBarn;
