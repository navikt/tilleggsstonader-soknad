import React from 'react';

import Vedlegg from '../../../components/Vedlegg/Vedlegg';
import { usePassAvBarnSøknad } from '../../../context/PassAvBarnSøknadContext';
import { Stønadstype } from '../../../typer/stønadstyper';

const VedleggPassAvBarn = () => {
    const { dokumentasjon, settDokumentasjon, dokumentasjonsbehov } = usePassAvBarnSøknad();
    return (
        <Vedlegg
            stønadstype={Stønadstype.BARNETILSYN}
            dokumentasjon={dokumentasjon}
            settDokumentasjon={settDokumentasjon}
            dokumentasjonsbehov={dokumentasjonsbehov}
        />
    );
};

export default VedleggPassAvBarn;
