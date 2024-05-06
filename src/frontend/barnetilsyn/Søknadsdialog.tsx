import { Route, Routes } from 'react-router';

import Forside from './Forside';
import Kvittering from './Kvittering';
import Hovedytelse from './steg/2-hovedytelse/Hovedytelse';
import Aktivitet from './steg/3-aktivitet/Aktivitet';
import DineBarn from './steg/4-dine-barn/DineBarn';
import Barnepass from './steg/5-barnepass/Barnepass';
import Vedlegg from './steg/6-vedlegg/Vedlegg';
import Oppsummering from './steg/7-oppsummering/Oppsummering';
import { Banner } from '../components/Banner';
import RedirectTilStart from '../components/RedirectTilStart';
import { fellesTekster } from '../tekster/felles';
import { Stønadstype } from '../typer/stønadstyper';

const Søknadsdialog: React.FC = () => {
    return (
        <>
            <Banner tittel={fellesTekster.banner_bt} />
            <Routes>
                <Route path={'/'} element={<Forside />} />
                <Route path={'*'} element={<SøknadsdialogInnhold />} />
                <Route path={'/kvittering'} element={<Kvittering />} />
            </Routes>
        </>
    );
};

const SøknadsdialogInnhold = () => {
    return (
        <RedirectTilStart stønadstype={Stønadstype.BARNETILSYN}>
            <Routes>
                <Route path={'/hovedytelse'} element={<Hovedytelse />} />
                <Route path={'/aktivitet'} element={<Aktivitet />} />
                <Route path={'/dine-barn'} element={<DineBarn />} />
                <Route path={'/barnepass'} element={<Barnepass />} />
                <Route path={'/vedlegg'} element={<Vedlegg />} />
                <Route path={'/oppsummering'} element={<Oppsummering />} />
            </Routes>
        </RedirectTilStart>
    );
};

export default Søknadsdialog;
