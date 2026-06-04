import React, { useEffect } from 'react';

import { Søknadsdialog } from './Søknadsdialog';
import { PersonRouting } from '../components/PersonRouting';
import { PassAvBarnSøknadProvider, usePassAvBarnSøknad } from '../context/PassAvBarnSøknadContext';
import { RegisterAktiviteterProvider } from '../context/RegisterAktiviteterContext';
import { useSpråk } from '../context/SpråkContext';
import { SøknadProvider } from '../context/SøknadContext';
import { useValideringsfeil, ValideringsfeilProvider } from '../context/ValideringsfeilContext';
import { teksterStønad } from '../tekster/stønad';
import { Skjematype } from '../typer/skjematyper';
import { appConfig } from '../utils/appConfig';

const BarnetilsynInnhold = () => {
    const { resetValideringsfeil } = useValideringsfeil();
    const { resetSøknad, hovedytelse, aktivitet, barnMedBarnepass, dokumentasjon } =
        usePassAvBarnSøknad();

    return (
        <SøknadProvider
            skjematype={Skjematype.BARNETILSYN}
            søknad={{
                hovedytelse: hovedytelse,
                aktivitet: aktivitet,
                barnMedBarnepass: barnMedBarnepass,
                dokumentasjon: dokumentasjon,
                søknadMetadata: {
                    søknadFrontendGitHash: appConfig.commitHash,
                },
            }}
            resetValideringsfeil={resetValideringsfeil}
            resetSøknad={resetSøknad}
        >
            <Søknadsdialog />
        </SøknadProvider>
    );
};

export const BarnetilsynApp = () => {
    const { locale } = useSpråk();

    useEffect(() => {
        document.title = teksterStønad.tittelHtml[Skjematype.BARNETILSYN][locale];
    }, [locale]);

    return (
        <PersonRouting skjematype={Skjematype.BARNETILSYN}>
            <ValideringsfeilProvider>
                <PassAvBarnSøknadProvider>
                    <RegisterAktiviteterProvider skjematype={Skjematype.BARNETILSYN}>
                        <BarnetilsynInnhold />
                    </RegisterAktiviteterProvider>
                </PassAvBarnSøknadProvider>
            </ValideringsfeilProvider>
        </PersonRouting>
    );
};
