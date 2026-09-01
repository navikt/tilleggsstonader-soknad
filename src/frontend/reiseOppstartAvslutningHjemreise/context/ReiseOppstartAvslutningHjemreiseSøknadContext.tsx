import { useState } from 'react';

import createUseContext from 'constate';

import {
    initialAktivitet,
    initialDokumentasjon,
    initialHarBekreftet,
    initialHovedytelse,
} from './reiseOppstartAvslutningHjemreiseInitialState';
import { DokumentasjonFelt } from '../../typer/skjema';
import { AktivitetFelles, Hovedytelse } from '../../typer/søknad';

const [ReiseOppstartAvslutningHjemreiseSøknadProvider, useReiseOppstartAvslutningHjemreiseSøknad] =
    createUseContext(() => {
        ReiseOppstartAvslutningHjemreiseSøknadProvider.displayName =
            'SØKNAD_STØTTE_TIL_REISE_OPPSTART_AVSLUTNING_HJEMREISE_PROVIDER';

        const [harBekreftet, settHarBekreftet] = useState<boolean>(initialHarBekreftet());
        const [hovedytelse, settHovedytelse] = useState<Hovedytelse | undefined>(
            initialHovedytelse()
        );
        const [aktivitet, settAktivitet] = useState<AktivitetFelles | undefined>(
            initialAktivitet()
        );
        const [dokumentasjon, settDokumentasjon] =
            useState<DokumentasjonFelt[]>(initialDokumentasjon());

        const resetSøknad = () => {
            settHarBekreftet(initialHarBekreftet());
            settHovedytelse(initialHovedytelse());
            settAktivitet(initialAktivitet());
            settDokumentasjon(initialDokumentasjon());
        };

        return {
            harBekreftet,
            settHarBekreftet,
            hovedytelse,
            settHovedytelse,
            aktivitet,
            settAktivitet,
            dokumentasjon,
            settDokumentasjon,
            resetSøknad,
        };
    });

export {
    ReiseOppstartAvslutningHjemreiseSøknadProvider,
    useReiseOppstartAvslutningHjemreiseSøknad,
};
