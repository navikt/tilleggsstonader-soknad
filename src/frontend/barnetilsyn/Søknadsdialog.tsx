import { Route, Routes } from 'react-router';

import Forside from './Forside';
import Personalia from './steg/1-personalia/Personalia';
import { fellesTeksterBT } from './tekster/felles';
import { Banner } from '../components/Banner';
import { SøknadProvider } from '../context/SøknadContext';

const Søknadsdialog: React.FC = () => {
    return (
        <SøknadProvider>
            <Banner tittel={fellesTeksterBT.banner} />
            <Routes>
                <Route path={'*'} element={<Forside />} />
                <Route path={'/personalia'} element={<Personalia />} />
            </Routes>
        </SøknadProvider>
    );
};

export default Søknadsdialog;
