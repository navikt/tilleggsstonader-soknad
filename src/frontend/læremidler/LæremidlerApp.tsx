import React, { useEffect } from 'react';

import Søknadsdialog from './Søknadsdialog';
import { LæremidlerSøknadProvider } from '../context/LæremiddelSøknadContext';
import { useSpråk } from '../context/SpråkContext';
import { ValideringsfeilProvider } from '../context/ValideringsfeilContext';
import { teksterStønad } from '../tekster/stønad';
import { Stønadstype } from '../typer/stønadstyper';

const LæremidlerApp = () => {
    const { locale } = useSpråk();

    useEffect(() => {
        document.title = teksterStønad.tittelHtml[Stønadstype.LÆREMIDLER][locale];
    }, [locale]);

    // TODO: Implementer logikk for routing
    return (
        <ValideringsfeilProvider>
            <LæremidlerSøknadProvider>
                <Søknadsdialog />
            </LæremidlerSøknadProvider>
        </ValideringsfeilProvider>
    );
};

export default LæremidlerApp;
