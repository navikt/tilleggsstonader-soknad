import React, { useEffect } from 'react';

import Søknadsdialog from './Søknadsdialog';
import SøknadRouting from '../components/SøknadRouting/SøknadRouting';
import { PassAvBarnSøknadProvider, usePassAvBarnSøknad } from '../context/PassAvBarnSøknadContext';
import { useSpråk } from '../context/SpråkContext';
import { SøknadProvider } from '../context/SøknadContext';
import { useValideringsfeil, ValideringsfeilProvider } from '../context/ValideringsfeilContext';
import { teksterStønad } from '../tekster/stønad';
import { Stønadstype } from '../typer/stønadstyper';

const BarnetilsynInnhold = () => {
    const { resetValideringsfeil } = useValideringsfeil();
    const { resetSøknad, hovedytelse, aktivitet, barnMedBarnepass, dokumentasjon } =
        usePassAvBarnSøknad();

    return (
        <SøknadProvider
            søknad={{
                hovedytelse: hovedytelse,
                aktivitet: aktivitet,
                barnMedBarnepass: barnMedBarnepass,
                dokumentasjon: dokumentasjon,
            }}
            resetValideringsfeil={resetValideringsfeil}
            resetSøknad={resetSøknad}
        >
            <SøknadRouting stønadstype={Stønadstype.BARNETILSYN}>
                <Søknadsdialog />
            </SøknadRouting>
        </SøknadProvider>
    );
};

const BarnetilsynApp = () => {
    const { locale } = useSpråk();

    useEffect(() => {
        document.title = teksterStønad.tittelHtml[Stønadstype.BARNETILSYN][locale];
    }, [locale]);

    return (
        <ValideringsfeilProvider>
            <PassAvBarnSøknadProvider>
                <BarnetilsynInnhold />
            </PassAvBarnSøknadProvider>
        </ValideringsfeilProvider>
    );
};

export default BarnetilsynApp;
