import { Route, Routes } from 'react-router';

import { Forside } from './Forside';
import { Personalia } from './steg/1-personalia/Personalia';
import { fellesTeksterBT } from './tekster/felles';
import { Banner } from '../components/Banner';

const Søknadsdialog: React.FC = () => {
    return (
        <>
            <Banner tittel={fellesTeksterBT.banner} />
            <Routes>
                <Route path={'*'} element={<Forside />} />
                <Route path={'/personalia'} element={<Personalia />} />
            </Routes>
        </>
    );
};

export default Søknadsdialog;
