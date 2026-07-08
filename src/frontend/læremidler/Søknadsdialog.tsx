import React from 'react';

import { useLæremidlerSøknad } from './context/LæremidlerSøknadContext';
import { Forside } from './Forside';
import { StegRoute, Søknadsdialog as SøknadsdialogShell } from '../components/Søknadsdialog';
import { fellesTekster } from '../tekster/felles';
import { Skjematype } from '../typer/skjematyper';
import { HovedytelseLæremidler } from './steg/1-hovedytelse/HovedytelseLæremidler';
import { Utdanning } from './steg/2-utdanning/Utdanning';
import { VedleggLæremidler } from './steg/3-vedlegg/VedleggLæremidler';
import { Oppsummering } from './steg/4-oppsummering/Oppsummering';

const steg: StegRoute[] = [
    { path: '/hovedytelse', element: <HovedytelseLæremidler /> },
    { path: '/utdanning', element: <Utdanning /> },
    { path: '/vedlegg', element: <VedleggLæremidler /> },
    { path: '/oppsummering', element: <Oppsummering /> },
];

export const Søknadsdialog: React.FC = () => {
    const { harBekreftet } = useLæremidlerSøknad();

    return (
        <SøknadsdialogShell
            tittel={fellesTekster.banner_læremidler}
            skjematype={Skjematype.SØKNAD_LÆREMIDLER}
            harBekreftet={harBekreftet}
            forside={<Forside />}
            steg={steg}
        />
    );
};
