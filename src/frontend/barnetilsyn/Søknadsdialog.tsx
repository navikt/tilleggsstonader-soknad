import { Route, Routes } from 'react-router';

import Forside from './Forside';
import Kvittering from './Kvittering';
import HovedytelsePassBarn from './steg/2-hovedytelse/HovedytelsePassBarn';
import Aktivitet from './steg/3-aktivitet/Aktivitet';
import DineBarn from './steg/4-dine-barn/DineBarn';
import PassAvDineBarn from './steg/5-pass-av-dine-barn/PassAvDineBarn';
import Oppsummering from './steg/7-oppsummering/Oppsummering';
import { Banner } from '../components/Banner';
import RedirectTilStart from '../components/RedirectTilStart';
import Vedlegg from '../components/Vedlegg/Vedlegg';
import { usePassAvBarnSøknad } from '../context/PassAvBarnSøknadContext';
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
    const { harBekreftet } = usePassAvBarnSøknad();
    return (
        <RedirectTilStart harBekreftet={harBekreftet} stønadstype={Stønadstype.BARNETILSYN}>
            <Routes>
                <Route path={'/hovedytelse'} element={<HovedytelsePassBarn />} />
                <Route path={'/aktivitet'} element={<Aktivitet />} />
                <Route path={'/dine-barn'} element={<DineBarn />} />
                <Route path={'/barnepass'} element={<PassAvDineBarn />} />
                <Route path={'/vedlegg'} element={<Vedlegg />} />
                <Route path={'/oppsummering'} element={<Oppsummering />} />
            </Routes>
        </RedirectTilStart>
    );
};

export default Søknadsdialog;
