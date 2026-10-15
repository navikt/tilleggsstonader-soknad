import React from 'react';

import { useReiseOppstartAvslutningHjemreiseSøknad } from './context/ReiseOppstartAvslutningHjemreiseSøknadContext';
import { Forside } from './Forside';
import { StegRoute, Søknadsdialog as SøknadsdialogShell } from '../components/Søknadsdialog';
import { Skjematype } from '../typer/skjematyper';
import { HovedytelseReiseOppstartAvslutningHjemreise } from './steg/1-hovedytelse/HovedytelseReiseOppstartAvslutningHjemreise';
import { AktivitetReiseOppstartAvslutningHjemreise } from './steg/2-aktivitet/AktivitetReiseOppstartAvslutningHjemreise';
import { AdresserReiseOppstartAvslutningHjemreise } from './steg/3-adresser/AdresserReiseOppstartAvslutningHjemreise';
import { Oppsummering } from './steg/3-oppsummering/Oppsummering';
import { BarnOgHelseSteg } from './steg/4-barn-og-helse/BarnOgHelseReiseOppstartAvslutningHjemreise';
import { forsideTekster } from './tekster/forside';

const steg: StegRoute[] = [
    { path: '/hovedytelse', element: <HovedytelseReiseOppstartAvslutningHjemreise /> },
    { path: '/aktivitet', element: <AktivitetReiseOppstartAvslutningHjemreise /> },
    { path: '/adresser', element: <AdresserReiseOppstartAvslutningHjemreise /> },
    { path: '/barn-og-helse', element: <BarnOgHelseSteg /> },
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
