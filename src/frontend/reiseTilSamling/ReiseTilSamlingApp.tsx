import React, { useEffect } from 'react';

import { Søknadsdialog } from './Søknadsdialog';
import { RegisterAktiviteterProvider } from '../context/RegisterAktiviteterContext';
import {
    ReiseTilSamlingSøknadProvider,
    useReiseTilSamlingSøknad,
} from '../context/ReiseTilSamlingSøknadContext';
import { useSpråk } from '../context/SpråkContext';
import { SøknadProvider } from '../context/SøknadContext';
import { useValideringsfeil, ValideringsfeilProvider } from '../context/ValideringsfeilContext';
import { teksterStønad } from '../tekster/stønad';
import { Stønadstype } from '../typer/stønadstyper';
import appConfig from '../utils/appConfig';

const ReiseTilSamlingInnhold = () => {
    const { resetValideringsfeil } = useValideringsfeil();
    const { resetSøknad, hovedytelse, aktivitet } = useReiseTilSamlingSøknad();

    return (
        <SøknadProvider
            stønadstype={Stønadstype.REISE_TIL_SAMLING}
            søknad={{
                hovedytelse: hovedytelse,
                aktivitet: aktivitet,
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

export const ReiseTilSamlingApp = () => {
    const { locale } = useSpråk();

    useEffect(() => {
        document.title = teksterStønad.tittelHtml[Stønadstype.REISE_TIL_SAMLING][locale];
    }, [locale]);

    return (
        <ValideringsfeilProvider>
            <ReiseTilSamlingSøknadProvider>
                <RegisterAktiviteterProvider stønadstype={Stønadstype.REISE_TIL_SAMLING}>
                    <ReiseTilSamlingInnhold />
                </RegisterAktiviteterProvider>
            </ReiseTilSamlingSøknadProvider>
        </ValideringsfeilProvider>
    );
};
