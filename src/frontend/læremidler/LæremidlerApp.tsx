import React, { useEffect } from 'react';

import Søknadsdialog from './Søknadsdialog';
import { useSpråk } from '../context/SpråkContext';
import { teksterStønad } from '../tekster/stønad';
import { Stønadstype } from '../typer/stønadstyper';

const LæremidlerApp = () => {
    const { locale } = useSpråk();

    useEffect(() => {
        document.title = teksterStønad.tittelHtml[Stønadstype.LÆREMIDLER][locale];
    }, [locale]);

    // TODO: Implementer logikk for routing
    return <Søknadsdialog />;
};

export default LæremidlerApp;
