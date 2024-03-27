import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Loader } from '@navikt/ds-react';

import { SøknadTilsynBarn } from './søknad';
import Søknadsdialog from './Søknadsdialog';
import TaStillingTilMellomlagring from './TaStillingTilMellomlagring';
import { hentMellomlagring, slettMellomlagring } from '../api/mellomlagring';
import SøknadRouting from '../components/SøknadRouting/SøknadRouting';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import { SøknadProvider } from '../context/SøknadContext';
import { fellesTekster } from '../tekster/felles';
import { Stønadstype } from '../typer/stønadstyper';

const BarnetilsynApp = () => {
    const [fetching, settFetching] = useState<boolean>(true);
    const [skalBrukeMellomlagring, settSkalBrukeMellomlagring] = useState<boolean>(false);
    const [mellomlagring, settMellomlagring] = useState<SøknadTilsynBarn>();
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.hostname === 'localhost') {
            hentMellomlagring<SøknadTilsynBarn | undefined>('tilsyn-barn')
                .then((data) => {
                    settMellomlagring(data);
                }) // catch log feil?
                .finally(() => settFetching(false));
        } else {
            settFetching(false);
        }
        // eslint-disable-next-line
    }, []);

    if (fetching) {
        return (
            <Loader
                variant="neutral"
                size="xlarge"
                title={<LocaleTekst tekst={fellesTekster.laster} />}
            />
        );
    }

    if (mellomlagring && !skalBrukeMellomlagring) {
        return (
            <TaStillingTilMellomlagring
                brukMellomlagring={() => {
                    settSkalBrukeMellomlagring(true);
                    navigate(mellomlagring.steg);
                }}
                startPåNytt={() => {
                    settMellomlagring(undefined);
                    slettMellomlagring('tilsyn-barn');
                    // TODO håndter svar fra promise?
                }}
            />
        );
    }

    return (
        <SøknadProvider mellomlagring={mellomlagring}>
            <SøknadRouting stønadstype={Stønadstype.BARNETILSYN}>
                <Søknadsdialog />
            </SøknadRouting>
        </SøknadProvider>
    );
};

export default BarnetilsynApp;
