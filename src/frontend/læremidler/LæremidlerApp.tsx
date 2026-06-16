import React, { useEffect } from 'react';

import { Søknadsdialog } from './Søknadsdialog';
import { PersonRouting } from '../components/PersonRouting';
import { LæremidlerSøknadProvider, useLæremidlerSøknad } from '../context/LæremiddelSøknadContext';
import { RegisterAktiviteterProvider } from '../context/RegisterAktiviteterContext';
import { useSpråk } from '../context/SpråkContext';
import { SøknadProvider } from '../context/SøknadContext';
import { useValideringsfeil, ValideringsfeilProvider } from '../context/ValideringsfeilContext';
import { teksterStønad } from '../tekster/stønad';
import { Skjematype } from '../typer/skjematyper';
import { appConfig } from '../utils/appConfig';

const LæremidlerInnhold = () => {
    const { resetValideringsfeil } = useValideringsfeil();
    const { resetSøknad, hovedytelse, utdanning, dokumentasjon } = useLæremidlerSøknad();

    return (
        <SøknadProvider
            skjematype={Skjematype.SØKNAD_LÆREMIDLER}
            søknad={{
                hovedytelse: hovedytelse,
                utdanning: utdanning,
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

export const LæremidlerApp = () => {
    const { locale } = useSpråk();

    useEffect(() => {
        document.title = teksterStønad.tittelHtml[Skjematype.SØKNAD_LÆREMIDLER][locale];
    }, [locale]);

    return (
        <PersonRouting skjematype={Skjematype.SØKNAD_LÆREMIDLER}>
            <ValideringsfeilProvider>
                <LæremidlerSøknadProvider>
                    <RegisterAktiviteterProvider skjematype={Skjematype.SØKNAD_LÆREMIDLER}>
                        <LæremidlerInnhold />
                    </RegisterAktiviteterProvider>
                </LæremidlerSøknadProvider>
            </ValideringsfeilProvider>
        </PersonRouting>
    );
};
