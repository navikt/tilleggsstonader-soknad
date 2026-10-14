import React from 'react';

import { useFlyttingSøknad } from './context/FlyttingSøknadContext';
import { Forside } from './Forside';
import { StegRoute, Søknadsdialog as SøknadsdialogShell } from '../components/Søknadsdialog';
import { Skjematype } from '../typer/skjematyper';
import { HovedytelseFlytting } from './steg/1-hovedytelse/HovedytelseFlytting';
import { VedleggFlytting } from './steg/2-vedlegg/VedleggFlytting';
import { Oppsummering } from './steg/3-oppsummering/Oppsummering';
import { forsideTekster } from './tekster/forside';

const steg: StegRoute[] = [
    { path: '/hovedytelse', element: <HovedytelseFlytting /> },
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
