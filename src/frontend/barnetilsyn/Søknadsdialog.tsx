import React from 'react';

import { Route, Routes } from 'react-router';

import Forside from './Forside';
import { Header } from '../components/Header';
import RedirectTilStart from '../components/RedirectTilStart';
import { RootRoute } from '../components/RootRoute';
import { usePassAvBarnSøknad } from '../context/PassAvBarnSøknadContext';
import { fellesTekster } from '../tekster/felles';
import { barnetilsynPath } from './routing/routesBarnetilsyn';
import HovedytelsePassBarn from './steg/2-hovedytelse/HovedytelsePassBarn';
import Aktivitet from './steg/3-aktivitet/Aktivitet';
import DineBarn from './steg/4-dine-barn/DineBarn';
import PassAvDineBarn from './steg/5-pass-av-dine-barn/PassAvDineBarn';
import VedleggPassAvBarn from './steg/6-vedlegg/VedleggPassAvBarn';
import Oppsummering from './steg/7-oppsummering/Oppsummering';
import Kvittering from '../components/Kvittering/Kvittering';
import { Stønadstype } from '../typer/stønadstyper';

const Søknadsdialog: React.FC = () => {
    return (
        <>
            <Header tittel={fellesTekster.banner_bt} />
            <Routes>
                <Route
                    path={'/'}
                    element={
                        <RootRoute stønadstype={Stønadstype.BARNETILSYN} forside={<Forside />} />
                    }
                />
                <Route path={'*'} element={<SøknadsdialogInnhold />} />
                <Route
                    path={'/kvittering'}
                    element={<Kvittering pathTilForside={barnetilsynPath} />}
                />
            </Routes>
        </>
    );
};

const SøknadsdialogInnhold = () => {
    const { harBekreftet } = usePassAvBarnSøknad();
    return (
        <RedirectTilStart harBekreftet={harBekreftet}>
            <Routes>
                <Route path={'/hovedytelse'} element={<HovedytelsePassBarn />} />
                <Route path={'/aktivitet'} element={<Aktivitet />} />
                <Route path={'/dine-barn'} element={<DineBarn />} />
                <Route path={'/barnepass'} element={<PassAvDineBarn />} />
                <Route path={'/vedlegg'} element={<VedleggPassAvBarn />} />
                <Route path={'/oppsummering'} element={<Oppsummering />} />
            </Routes>
        </RedirectTilStart>
    );
};

export default Søknadsdialog;
