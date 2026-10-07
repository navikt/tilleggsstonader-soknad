import { useState } from 'react';

import createUseContext from 'constate';

import {
    initialAktivitet,
    initialAdresser,
    initialDokumentasjon,
    initialHarBekreftet,
    initialHovedytelse,
} from './reiseOppstartAvslutningHjemreiseInitialState';
import { DokumentasjonFelt } from '../../typer/skjema';
import { AktivitetFelles, Hovedytelse } from '../../typer/søknad';
import { AdresseReiseOppstartAvslutningHjemreise } from '../typer/søknad';

const [ReiseOppstartAvslutningHjemreiseSøknadProvider, useReiseOppstartAvslutningHjemreiseSøknad] =
    createUseContext(() => {
        ReiseOppstartAvslutningHjemreiseSøknadProvider.displayName =
            'SØKNAD_REISE_OPPSTART_AVSLUTNING_HJEMREISE_PROVIDER';

        const [harBekreftet, settHarBekreftet] = useState<boolean>(initialHarBekreftet());
        const [hovedytelse, settHovedytelse] = useState<Hovedytelse | undefined>(
            initialHovedytelse()
        );
        const [aktivitet, settAktivitet] = useState<AktivitetFelles | undefined>(
            initialAktivitet()
        );
        const [adresser, settAdresser] = useState<
            AdresseReiseOppstartAvslutningHjemreise | undefined
        >(initialAdresser());

        const [dokumentasjon, settDokumentasjon] =
            useState<DokumentasjonFelt[]>(initialDokumentasjon());

        const resetSøknad = () => {
            settHarBekreftet(initialHarBekreftet());
            settHovedytelse(initialHovedytelse());
            settAktivitet(initialAktivitet());
            settAdresser(initialAdresser());
            settDokumentasjon(initialDokumentasjon());
        };

        return {
            harBekreftet,
            settHarBekreftet,
            hovedytelse,
            settHovedytelse,
            aktivitet,
            settAktivitet,
            adresser,
            settAdresser,
            dokumentasjon,
            settDokumentasjon,
            resetSøknad,
        };
    });

export {
    ReiseOppstartAvslutningHjemreiseSøknadProvider,
    useReiseOppstartAvslutningHjemreiseSøknad,
};
