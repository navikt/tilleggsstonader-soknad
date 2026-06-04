import React, { useEffect } from 'react';

import { Søknadsdialog } from './Søknadsdialog';
import { PersonRouting } from '../components/PersonRouting';
import { RegisterAktiviteterProvider } from '../context/RegisterAktiviteterContext';
import {
    ReiseTilSamlingSøknadProvider,
    useReiseTilSamlingSøknad,
} from '../context/ReiseTilSamlingSøknadContext';
import { useSpråk } from '../context/SpråkContext';
import { SøknadProvider } from '../context/SøknadContext';
import { useValideringsfeil, ValideringsfeilProvider } from '../context/ValideringsfeilContext';
import { teksterStønad } from '../tekster/stønad';
import { Skjematype } from '../typer/skjematyper';
import { appConfig } from '../utils/appConfig';

const ReiseTilSamlingInnhold = () => {
    const { resetValideringsfeil } = useValideringsfeil();
    const {
        resetSøknad,
        hovedytelse,
        aktivitet,
        samlinger,
        reiseavstand,
        reisemåte,
        dokumentasjon,
    } = useReiseTilSamlingSøknad();

    return (
        <SøknadProvider
            skjematype={Skjematype.REISE_TIL_SAMLING}
            søknad={{
                hovedytelse: hovedytelse,
                aktivitet: aktivitet,
                samlinger: samlinger,
                reiseavstand: reiseavstand,
                reisemåte: reisemåte,
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

export const ReiseTilSamlingApp = () => {
    const { locale } = useSpråk();

    useEffect(() => {
        document.title = teksterStønad.tittelHtml[Skjematype.REISE_TIL_SAMLING][locale];
    }, [locale]);

    return (
        <PersonRouting skjematype={Skjematype.REISE_TIL_SAMLING}>
            <ValideringsfeilProvider>
                <ReiseTilSamlingSøknadProvider>
                    <RegisterAktiviteterProvider skjematype={Skjematype.REISE_TIL_SAMLING}>
                        <ReiseTilSamlingInnhold />
                    </RegisterAktiviteterProvider>
                </ReiseTilSamlingSøknadProvider>
            </ValideringsfeilProvider>
        </PersonRouting>
    );
};
