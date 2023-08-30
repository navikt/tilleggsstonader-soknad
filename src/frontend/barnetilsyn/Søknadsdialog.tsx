import { Route, Routes } from 'react-router';

import Forside from './Forside';
import Kvittering from './Kvittering';
import Personalia from './steg/1-personalia/Personalia';
import Aktivitet from './steg/3-aktivitet/Aktivitet';
import DineBarn from './steg/4-dine-barn/DineBarn';
import Oppsummering from './steg/6-oppsummering/Oppsummering';
import { Banner } from '../components/Banner';
import { fellesTekster } from '../tekster/felles';

const Søknadsdialog: React.FC = () => {
    return (
        <>
            <Banner tittel={fellesTekster.banner_bt} />
            <Routes>
                <Route path={'*'} element={<Forside />} />
                <Route path={'/personalia'} element={<Personalia />} />
                <Route path={'/hovedytelse'} element={<Personalia />} />
                <Route path={'/aktivitet'} element={<Aktivitet />} />
                <Route path={'/dine-barn'} element={<DineBarn />} />
                <Route path={'/oppsummering'} element={<Oppsummering />} />
                <Route path={'/kvittering'} element={<Kvittering />} />
            </Routes>
        </>
    );
};

export default Søknadsdialog;
