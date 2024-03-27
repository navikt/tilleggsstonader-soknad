import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Loader } from '@navikt/ds-react';

import { MellomlagretSøknadTilsynBarn } from './søknad';
import Søknadsdialog from './Søknadsdialog';
import TaStillingTilMellomlagring from './TaStillingTilMellomlagring';
import Environment from '../api/Environment';
import { hentMellomlagring, slettMellomlagring } from '../api/mellomlagring';
import SøknadRouting from '../components/SøknadRouting/SøknadRouting';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import { useSpråk } from '../context/SpråkContext';
import { SøknadProvider } from '../context/SøknadContext';
import { fellesTekster } from '../tekster/felles';
import { teksterStønad } from '../tekster/stønad';
import { Stønadstype } from '../typer/stønadstyper';

const BarnetilsynApp = () => {
    const { locale } = useSpråk();
    const [fetching, settFetching] = useState<boolean>(true);
    const [skalBrukeMellomlagring, settSkalBrukeMellomlagring] = useState<boolean>(false);
    const [mellomlagring, settMellomlagring] = useState<MellomlagretSøknadTilsynBarn>();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = teksterStønad.tittelHtml[Stønadstype.BARNETILSYN][locale];
    }, [locale]);

    useEffect(() => {
        if (Environment().miljø === 'local') {
            hentMellomlagring<MellomlagretSøknadTilsynBarn | undefined>('tilsyn-barn')
                .then((data) => {
                    // TODO fjern barn som ikke lengre er gyldige? Og dokumentasjonen til disse?
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
