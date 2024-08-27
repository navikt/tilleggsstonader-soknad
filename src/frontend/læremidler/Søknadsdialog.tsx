import { Route, Routes } from 'react-router';

import { Banner } from '../components/Banner';
import RedirectTilStart from '../components/RedirectTilStart';
import { fellesTekster } from '../tekster/felles';
import { Stønadstype } from '../typer/stønadstyper';

const Søknadsdialog: React.FC = () => {
    return (
        <>
            <Banner tittel={fellesTekster.banner_læremidler} />
            <Routes>
                <Route path={'/'} element={<p>Forside</p>} />
                <Route path={'*'} element={<SøknadsdialogInnhold />} />
                <Route path={'/kvittering'} element={<p>Kvittering</p>} />
            </Routes>
        </>
    );
};

const SøknadsdialogInnhold = () => {
    return (
        <RedirectTilStart stønadstype={Stønadstype.LÆREMIDLER}>
            <Routes>
                <Route path={'/hovedytelse'} element={<h1>Hovedytelse</h1>} />
                <Route path={'/utdanning'} element={<h1>Utdanning</h1>} />
                <Route path={'/vedlegg'} element={<h1>Vedlegg</h1>} />
                <Route path={'/oppsummering'} element={<h1>Oppsummering</h1>} />
            </Routes>
        </RedirectTilStart>
    );
};

export default Søknadsdialog;
