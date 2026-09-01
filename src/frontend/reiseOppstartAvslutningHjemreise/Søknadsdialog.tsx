import React from 'react';

import { useReiseOppstartAvslutningHjemreiseSøknad } from './context/ReiseOppstartAvslutningHjemreiseSøknadContext';
import { Forside } from './Forside';
import { HovedytelseReiseOppstartAvslutningHjemreise } from './steg/1-hovedytelse/HovedytelseReiseOppstartAvslutningHjemreise';
import { AktivitetReiseOppstartAvslutningHjemreise } from './steg/2-aktivitet/AktivitetReiseOppstartAvslutningHjemreise';
import { NesteStegReiseOppstartAvslutningHjemreise } from './steg/3-neste-steg/NesteStegReiseOppstartAvslutningHjemreise';
import { forsideTekster } from './tekster/forside';
import { StegRoute, Søknadsdialog as SøknadsdialogShell } from '../components/Søknadsdialog';
import { Skjematype } from '../typer/skjematyper';

// TODO: steg utover hovedytelse/aktivitet bygges ut i senere PR-er, se NesteStegReiseOppstartAvslutningHjemreise
const steg: StegRoute[] = [
    { path: '/hovedytelse', element: <HovedytelseReiseOppstartAvslutningHjemreise /> },
    { path: '/aktivitet', element: <AktivitetReiseOppstartAvslutningHjemreise /> },
    { path: '/neste-steg', element: <NesteStegReiseOppstartAvslutningHjemreise /> },
];

export const Søknadsdialog: React.FC = () => {
    const { harBekreftet } = useReiseOppstartAvslutningHjemreiseSøknad();

    return (
        <SøknadsdialogShell
            tittel={forsideTekster.banner_tittel}
            skjematype={Skjematype.SØKNAD_STØTTE_TIL_REISE_OPPSTART_AVSLUTNING_HJEMREISE}
            harBekreftet={harBekreftet}
            forside={<Forside />}
            steg={steg}
        />
    );
};
