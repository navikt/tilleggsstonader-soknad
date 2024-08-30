import { Route, Routes } from 'react-router';

import Forside from './Forside';
import HovedytelseLæremidler from './steg/1-hovedytelse/HovedytelseLæremidler';
import Utdanning from './steg/2-utdanning/Utdanning';
import VedleggLæremidler from './steg/3-vedlegg/VedleggLæremidler';
import { Banner } from '../components/Banner';
import RedirectTilStart from '../components/RedirectTilStart';
import { useLæremidlerSøknad } from '../context/LæremiddelSøknadContext';
import { fellesTekster } from '../tekster/felles';
import { Stønadstype } from '../typer/stønadstyper';

const Søknadsdialog: React.FC = () => {
    return (
        <>
            <Banner tittel={fellesTekster.banner_læremidler} />
            <Routes>
                <Route path={'/'} element={<Forside />} />
                <Route path={'*'} element={<SøknadsdialogInnhold />} />
                <Route path={'/kvittering'} element={<p>Kvittering</p>} />
            </Routes>
        </>
    );
};

const SøknadsdialogInnhold = () => {
    const { harBekreftet } = useLæremidlerSøknad();
    return (
        <RedirectTilStart harBekreftet={harBekreftet} stønadstype={Stønadstype.LÆREMIDLER}>
            <Routes>
                <Route path={'/hovedytelse'} element={<HovedytelseLæremidler />} />
                <Route path={'/utdanning'} element={<Utdanning />} />
                <Route path={'/vedlegg'} element={<VedleggLæremidler />} />
                <Route path={'/oppsummering'} element={<h1>Oppsummering</h1>} />
            </Routes>
        </RedirectTilStart>
    );
};

export default Søknadsdialog;
