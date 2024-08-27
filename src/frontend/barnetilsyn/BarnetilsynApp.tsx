import React, { useEffect } from 'react';

import Søknadsdialog from './Søknadsdialog';
import SøknadRouting from '../components/SøknadRouting/SøknadRouting';
import { PassAvBarnSøknadProvider } from '../context/PassAvBarnSøknadContext';
import { useSpråk } from '../context/SpråkContext';
import { ValideringsfeilProvider } from '../context/ValideringsfeilContext';
import { teksterStønad } from '../tekster/stønad';
import { Stønadstype } from '../typer/stønadstyper';

const BarnetilsynApp = () => {
    const { locale } = useSpråk();

    useEffect(() => {
        document.title = teksterStønad.tittelHtml[Stønadstype.BARNETILSYN][locale];
    }, [locale]);

    return (
        <ValideringsfeilProvider>
            <PassAvBarnSøknadProvider>
                <SøknadRouting stønadstype={Stønadstype.BARNETILSYN}>
                    <Søknadsdialog />
                </SøknadRouting>
            </PassAvBarnSøknadProvider>
        </ValideringsfeilProvider>
    );
};

export default BarnetilsynApp;
