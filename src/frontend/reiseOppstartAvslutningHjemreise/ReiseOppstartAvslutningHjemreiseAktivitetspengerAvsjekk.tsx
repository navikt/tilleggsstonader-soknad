import React from 'react';

import { reiseOppstartAvslutningHjemreiseAvsjekkTekster } from './reiseOppstartAvslutningHjemreiseAvsjekkTekster';
import { reiseOppstartAvslutningHjemreisePath } from './routing/routesReiseOppstartAvslutningHjemreise';
import { MottarAktivitetspengerAvsjekk } from '../components/Avsjekk/MottarAktivitetspengerAvsjekk';
import { SkjematypeFyllUt } from '../typer/skjematype';

export const ReiseOppstartAvslutningHjemreiseAktivitetspengerAvsjekk: React.FC = () => (
    <MottarAktivitetspengerAvsjekk
        skjematype={SkjematypeFyllUt.SØKNAD_REISE_OPPSTART_AVSLUTNING_HJEMREISE}
        tekster={reiseOppstartAvslutningHjemreiseAvsjekkTekster}
        nySøknadPath={reiseOppstartAvslutningHjemreisePath}
    />
);
