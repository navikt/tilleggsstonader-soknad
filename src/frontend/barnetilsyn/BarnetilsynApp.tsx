import React from 'react';

import Søknadsdialog from './Søknadsdialog';
import SøknadRouting from '../components/SøknadRouting/SøknadRouting';
import { Stønadstype } from '../typer/stønadstyper';

const BarnetilsynApp = () => {
    return (
        <SøknadRouting stønadstype={Stønadstype.BARNETILSYN}>
            <Søknadsdialog />
        </SøknadRouting>
    );
};

export default BarnetilsynApp;
