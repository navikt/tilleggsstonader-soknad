import { Route, Routes } from 'react-router';

import Forside from './Forside';
import Personalia from './steg/1-personalia/Personalia';
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
                <Route path={'/aktivitet'} element={<Personalia />} />
                <Route path={'/dine-barn'} element={<Personalia />} />
                <Route path={'/kvittering'} element={<Personalia />} />
            </Routes>
        </>
    );
};

export default Søknadsdialog;
