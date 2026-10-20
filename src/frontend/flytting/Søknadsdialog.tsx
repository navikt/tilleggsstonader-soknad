import React from 'react';

import { useFlyttingSøknad } from './context/FlyttingSøknadContext';
import { Forside } from './Forside';
import { StegRoute, Søknadsdialog as SøknadsdialogShell } from '../components/Søknadsdialog';
import { Skjematype } from '../typer/skjematyper';
import { HovedytelseFlytting } from './steg/1-hovedytelse/HovedytelseFlytting';
import { FlyttingDetaljerSide } from './steg/2-flytting/FlyttingDetaljerSide';
import { VedleggFlytting } from './steg/3-vedlegg/VedleggFlytting';
import { Oppsummering } from './steg/4-oppsummering/Oppsummering';
import { forsideTekster } from './tekster/forside';

const steg: StegRoute[] = [
    { path: '/hovedytelse', element: <HovedytelseFlytting /> },
    { path: '/flytting', element: <FlyttingDetaljerSide /> },
    { path: '/vedlegg', element: <VedleggFlytting /> },
    { path: '/oppsummering', element: <Oppsummering /> },
];

export const Søknadsdialog: React.FC = () => {
    const { harBekreftet } = useFlyttingSøknad();

    return (
        <SøknadsdialogShell
            tittel={forsideTekster.banner_tittel}
            skjematype={Skjematype.SØKNAD_FLYTTING}
            harBekreftet={harBekreftet}
            forside={<Forside />}
            steg={steg}
        />
    );
};
