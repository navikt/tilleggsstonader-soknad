import { Route, Routes } from 'react-router';

import { Forside } from './Forside';
import { Personalia } from './steg/1-personalia/Personalia';

const Søknadsdialog: React.FC = () => {
    return (
        <Routes>
            <Route path={'*'} element={<Forside />} />
            <Route path={'/personalia'} element={<Personalia />} />
        </Routes>
    );
};

export default Søknadsdialog;
