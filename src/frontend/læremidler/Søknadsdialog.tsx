import React from 'react';

import { Route, Routes } from 'react-router';

import Forside from './Forside';
import { læremidlerPath } from './routing/routesLæremidler';
import { Header } from '../components/Header';
import { RootRoute } from '../components/RootRoute';
import HovedytelseLæremidler from './steg/1-hovedytelse/HovedytelseLæremidler';
import Utdanning from './steg/2-utdanning/Utdanning';
import VedleggLæremidler from './steg/3-vedlegg/VedleggLæremidler';
import Oppsummering from './steg/4-oppsummering/Oppsummering';
import Kvittering from '../components/Kvittering/Kvittering';
import RedirectTilStart from '../components/RedirectTilStart';
import { useLæremidlerSøknad } from '../context/LæremiddelSøknadContext';
import { fellesTekster } from '../tekster/felles';

const Søknadsdialog: React.FC = () => {
    return (
        <>
            <Header tittel={fellesTekster.banner_læremidler} />
            <Routes>
                <Route path={'/'} element={<RootRoute forside={<Forside />} />} />
                <Route path={'*'} element={<SøknadsdialogInnhold />} />
                <Route
                    path={'/kvittering'}
                    element={<Kvittering pathTilForside={læremidlerPath} />}
                />
            </Routes>
        </>
    );
};

const SøknadsdialogInnhold = () => {
    const { harBekreftet } = useLæremidlerSøknad();
    return (
        <RedirectTilStart harBekreftet={harBekreftet}>
            <Routes>
                <Route path={'/hovedytelse'} element={<HovedytelseLæremidler />} />
                <Route path={'/utdanning'} element={<Utdanning />} />
                <Route path={'/vedlegg'} element={<VedleggLæremidler />} />
                <Route path={'/oppsummering'} element={<Oppsummering />} />
            </Routes>
        </RedirectTilStart>
    );
};

export default Søknadsdialog;
