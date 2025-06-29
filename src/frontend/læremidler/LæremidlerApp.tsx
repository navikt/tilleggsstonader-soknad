import React, { useEffect } from 'react';

import Søknadsdialog from './Søknadsdialog';
import { PersonRouting } from '../components/PersonRouting';
import { LæremidlerSøknadProvider, useLæremidlerSøknad } from '../context/LæremiddelSøknadContext';
import { RegisterAktiviteterProvider } from '../context/RegisterAktiviteterContext';
import { useSpråk } from '../context/SpråkContext';
import { SøknadProvider } from '../context/SøknadContext';
import { useValideringsfeil, ValideringsfeilProvider } from '../context/ValideringsfeilContext';
import { teksterStønad } from '../tekster/stønad';
import { Stønadstype } from '../typer/stønadstyper';

const LæremidlerInnhold = () => {
    const { resetValideringsfeil } = useValideringsfeil();
    const { resetSøknad, hovedytelse, utdanning, dokumentasjon } = useLæremidlerSøknad();

    return (
        <SøknadProvider
            stønadstype={Stønadstype.LÆREMIDLER}
            søknad={{
                hovedytelse: hovedytelse,
                utdanning: utdanning,
                dokumentasjon: dokumentasjon,
                søknadMetadata: {
                    søknadFrontendGitHash: process.env.COMMIT_HASH,
                },
            }}
            resetValideringsfeil={resetValideringsfeil}
            resetSøknad={resetSøknad}
        >
            <Søknadsdialog />
        </SøknadProvider>
    );
};

const LæremidlerApp = () => {
    const { locale } = useSpråk();

    useEffect(() => {
        document.title = teksterStønad.tittelHtml[Stønadstype.LÆREMIDLER][locale];
    }, [locale]);

    return (
        <PersonRouting stønadstype={Stønadstype.LÆREMIDLER}>
            <ValideringsfeilProvider>
                <LæremidlerSøknadProvider>
                    <RegisterAktiviteterProvider stønadstype={Stønadstype.LÆREMIDLER}>
                        <LæremidlerInnhold />
                    </RegisterAktiviteterProvider>
                </LæremidlerSøknadProvider>
            </ValideringsfeilProvider>
        </PersonRouting>
    );
};

export default LæremidlerApp;
