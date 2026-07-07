import React from 'react';

import { usePassAvBarnSøknad } from './context/PassAvBarnSøknadContext';
import { Forside } from './Forside';
import { StegRoute, Søknadsdialog as SøknadsdialogShell } from '../components/Søknadsdialog';
import { fellesTekster } from '../tekster/felles';
import { Skjematype } from '../typer/skjematyper';
import { HovedytelsePassBarn } from './steg/1-hovedytelse/HovedytelsePassBarn';
import { AktivitetPassAvBarn } from './steg/2-aktivitet/AktivitetPassAvBarn';
import { DineBarn } from './steg/3-dine-barn/DineBarn';
import { PassAvDineBarn } from './steg/4-pass-av-dine-barn/PassAvDineBarn';
import { VedleggPassAvBarn } from './steg/5-vedlegg/VedleggPassAvBarn';
import { Oppsummering } from './steg/6-oppsummering/Oppsummering';

const steg: StegRoute[] = [
    { path: '/hovedytelse', element: <HovedytelsePassBarn /> },
    { path: '/aktivitet', element: <AktivitetPassAvBarn /> },
    { path: '/dine-barn', element: <DineBarn /> },
    { path: '/barnepass', element: <PassAvDineBarn /> },
    { path: '/vedlegg', element: <VedleggPassAvBarn /> },
    { path: '/oppsummering', element: <Oppsummering /> },
];

export const Søknadsdialog: React.FC = () => {
    const { harBekreftet } = usePassAvBarnSøknad();

    return (
        <SøknadsdialogShell
            tittel={fellesTekster.banner_bt}
            skjematype={Skjematype.SØKNAD_BARNETILSYN}
            harBekreftet={harBekreftet}
            forside={<Forside />}
            steg={steg}
        />
    );
};
