import React, { useEffect } from 'react';

import Søknadsdialog from './Søknadsdialog';
import SøknadRouting from '../components/SøknadRouting/SøknadRouting';
import { useSpråk } from '../context/SpråkContext';
import { teksterStønad } from '../tekster/stønad';
import { Stønadstype } from '../typer/stønadstyper';

const BarnetilsynApp = () => {
    const { locale } = useSpråk();

    useEffect(() => {
        document.title = teksterStønad.tittelHtml[Stønadstype.BARNETILSYN][locale];
    }, [locale]);

    return (
        <SøknadRouting stønadstype={Stønadstype.BARNETILSYN}>
            <Søknadsdialog />
        </SøknadRouting>
    );
};

export default BarnetilsynApp;
