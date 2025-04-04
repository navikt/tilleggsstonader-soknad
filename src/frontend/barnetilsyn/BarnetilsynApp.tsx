import React, { useEffect } from 'react';

import Søknadsdialog from './Søknadsdialog';
import { PersonRouting } from '../components/PersonRouting';
import { PassAvBarnSøknadProvider, usePassAvBarnSøknad } from '../context/PassAvBarnSøknadContext';
import { RegisterAktiviteterProvider } from '../context/RegisterAktiviteterContext';
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
            stønadstype={Stønadstype.BARNETILSYN}
            søknad={{
                hovedytelse: hovedytelse,
                aktivitet: aktivitet,
                barnMedBarnepass: barnMedBarnepass,
                dokumentasjon: dokumentasjon,
            }}
            resetValideringsfeil={resetValideringsfeil}
            resetSøknad={resetSøknad}
        >
            <Søknadsdialog />
        </SøknadProvider>
    );
};

const BarnetilsynApp = () => {
    const { locale } = useSpråk();

    useEffect(() => {
        document.title = teksterStønad.tittelHtml[Stønadstype.BARNETILSYN][locale];
    }, [locale]);

    return (
        <PersonRouting stønadstype={Stønadstype.BARNETILSYN}>
            <ValideringsfeilProvider>
                <PassAvBarnSøknadProvider>
                    <RegisterAktiviteterProvider stønadstype={Stønadstype.BARNETILSYN}>
                        <BarnetilsynInnhold />
                    </RegisterAktiviteterProvider>
                </PassAvBarnSøknadProvider>
            </ValideringsfeilProvider>
        </PersonRouting>
    );
};

export default BarnetilsynApp;
