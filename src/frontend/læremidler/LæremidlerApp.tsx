import React, { useEffect } from 'react';

import Søknadsdialog from './Søknadsdialog';
import { LæremidlerSøknadProvider, useLæremidlerSøknad } from '../context/LæremiddelSøknadContext';
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
            <Søknadsdialog />
        </SøknadProvider>
    );
};

const LæremidlerApp = () => {
    const { locale } = useSpråk();

    useEffect(() => {
        document.title = teksterStønad.tittelHtml[Stønadstype.LÆREMIDLER][locale];
    }, [locale]);

    // TODO: Implementer logikk for routing
    return (
        <ValideringsfeilProvider>
            <LæremidlerSøknadProvider>
                <LæremidlerInnhold />
            </LæremidlerSøknadProvider>
        </ValideringsfeilProvider>
    );
};

export default LæremidlerApp;
