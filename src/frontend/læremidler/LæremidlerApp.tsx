import React, { useEffect } from 'react';

import Søknadsdialog from './Søknadsdialog';
import { PersonRouting } from '../components/PersonRouting';
import SøknadRouting from '../components/SøknadRouting/SøknadRouting';
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
            }}
            resetValideringsfeil={resetValideringsfeil}
            resetSøknad={resetSøknad}
        >
            <SøknadRouting>
                <Søknadsdialog />
            </SøknadRouting>
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
