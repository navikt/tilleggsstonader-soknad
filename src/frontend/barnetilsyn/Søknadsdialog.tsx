import { Route, Routes } from 'react-router';

import Forside from './Forside';
import Kvittering from './Kvittering';
import Personalia from './steg/1-personalia/Personalia';
import Aktivitet from './steg/3-aktivitet/Aktivitet';
import DineBarn from './steg/4-dine-barn/DineBarn';
import { Banner } from '../components/Banner';
import RedirectTilStart from '../components/RedirectTilStart';
import { fellesTekster } from '../tekster/felles';
import { Stønadstype } from '../typer/stønadstyper';

const Søknadsdialog: React.FC = () => {
    return (
        <>
            <Banner tittel={fellesTekster.banner_bt} />
            <Routes>
                <Route path={'*'} element={<Forside />} />
                <Route
                    path={'/personalia'}
                    element={
                        <RedirectTilStart stønadstype={Stønadstype.barnetilsyn}>
                            <Personalia />
                        </RedirectTilStart>
                    }
                />
                <Route
                    path={'/hovedytelse'}
                    element={
                        <RedirectTilStart stønadstype={Stønadstype.barnetilsyn}>
                            <Personalia />
                        </RedirectTilStart>
                    }
                />
                <Route
                    path={'/aktivitet'}
                    element={
                        <RedirectTilStart stønadstype={Stønadstype.barnetilsyn}>
                            <Aktivitet />
                        </RedirectTilStart>
                    }
                />
                <Route
                    path={'/dine-barn'}
                    element={
                        <RedirectTilStart stønadstype={Stønadstype.barnetilsyn}>
                            <DineBarn />
                        </RedirectTilStart>
                    }
                />
                <Route
                    path={'/kvittering'}
                    element={
                        <RedirectTilStart stønadstype={Stønadstype.barnetilsyn}>
                            <Kvittering />
                        </RedirectTilStart>
                    }
                />
            </Routes>
        </>
    );
};

export default Søknadsdialog;
