import React from 'react';

import { useReiseOppstartAvslutningHjemreiseSøknad } from './context/ReiseOppstartAvslutningHjemreiseSøknadContext';
import { Forside } from './Forside';
import { HovedytelseReiseOppstartAvslutningHjemreise } from './steg/1-hovedytelse/HovedytelseReiseOppstartAvslutningHjemreise';
import { AktivitetReiseOppstartAvslutningHjemreise } from './steg/2-aktivitet/AktivitetReiseOppstartAvslutningHjemreise';
import { Oppsummering } from './steg/3-oppsummering/Oppsummering';
import { forsideTekster } from './tekster/forside';
import { StegRoute, Søknadsdialog as SøknadsdialogShell } from '../components/Søknadsdialog';
import { Skjematype } from '../typer/skjematyper';

const steg: StegRoute[] = [
    { path: '/hovedytelse', element: <HovedytelseReiseOppstartAvslutningHjemreise /> },
    { path: '/aktivitet', element: <AktivitetReiseOppstartAvslutningHjemreise /> },
    { path: '/oppsummering', element: <Oppsummering /> },
];

export const Søknadsdialog: React.FC = () => {
    const { harBekreftet } = useReiseOppstartAvslutningHjemreiseSøknad();

    return (
        <SøknadsdialogShell
            tittel={forsideTekster.banner_tittel}
            skjematype={Skjematype.SØKNAD_REISE_OPPSTART_AVSLUTNING_HJEMREISE}
            harBekreftet={harBekreftet}
            forside={<Forside />}
            steg={steg}
        />
    );
};
