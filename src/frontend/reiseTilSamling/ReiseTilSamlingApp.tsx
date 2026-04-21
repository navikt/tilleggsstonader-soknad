import React, { useEffect } from 'react';

import Søknadsdialog from './Søknadsdialog';
import { useSpråk } from '../context/SpråkContext';
import { teksterStønad } from '../tekster/stønad';
import { Stønadstype } from '../typer/stønadstyper';

export const ReiseTilSamlingApp = () => {
    const { locale } = useSpråk();

    useEffect(() => {
        document.title = teksterStønad.tittelHtml[Stønadstype.REISE_TIL_SAMLING][locale];
    }, [locale]);

    return <Søknadsdialog />;
};
