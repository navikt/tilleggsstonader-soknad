import { Route, Routes } from 'react-router';

import Forside from './Forside';
import Kvittering from './Kvittering';
import Personalia from './steg/1-personalia/Personalia';
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
            <RedirectTilStart stønadstype={Stønadstype.BARNETILSYN}>
                <Routes>
                    <Route path={'*'} element={<Forside />} />
                    <Route path={'/personalia'} element={<Personalia />} />
                    <Route path={'/hovedytelse'} element={<Hovedytelse />} />
                    <Route path={'/aktivitet'} element={<Aktivitet />} />
                    <Route path={'/dine-barn'} element={<DineBarn />} />
                    <Route path={'/barnepass'} element={<Barnepass />} />
                    <Route path={'/vedlegg'} element={<Vedlegg />} />
                    <Route path={'/oppsummering'} element={<Oppsummering />} />
                    <Route path={'/kvittering'} element={<Kvittering />} />
                </Routes>
            </RedirectTilStart>
        </>
    );
};

export default Søknadsdialog;
