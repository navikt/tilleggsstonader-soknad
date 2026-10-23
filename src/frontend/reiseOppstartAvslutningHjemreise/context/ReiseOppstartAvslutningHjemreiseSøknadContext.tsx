import { useMemo, useState } from 'react';

import createUseContext from 'constate';

import {
    initialAktivitet,
    initialAdresser,
    initialBarnOgSærligeBehov,
    initialDokumentasjon,
    initialHarBekreftet,
    initialHovedytelse,
    initialReiser,
} from './reiseOppstartAvslutningHjemreiseInitialState';
import {
    DokumentasjonFelt,
    Dokumentasjonsbehov,
    VedleggstypeReiseTilSamling,
} from '../../typer/skjema';
import { AktivitetFelles, Hovedytelse } from '../../typer/søknad';
import {
    AdresseReiseOppstartAvslutningHjemreise,
    BarnOgSærligeBehovReiseOppstartAvslutningHjemreise,
    ReiseInfoReiseOppstartAvslutningHjemreise,
} from '../typer/søknad';

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

        const [barnOgSærligeBehov, settBarnOgSærligeBehov] = useState<
            BarnOgSærligeBehovReiseOppstartAvslutningHjemreise | undefined
        >(initialBarnOgSærligeBehov());

        const [reiser, settReiser] =
            useState<ReiseInfoReiseOppstartAvslutningHjemreise[]>(initialReiser());

        const [dokumentasjon, settDokumentasjon] =
            useState<DokumentasjonFelt[]>(initialDokumentasjon());

        const dokumentasjonsbehov = useMemo((): Dokumentasjonsbehov[] => {
            const behov: Dokumentasjonsbehov[] = [];

            const reisemåter = reiser.map((reise) => reise.reisemåte);
            const transportmidlerBenyttet = reisemåter.flatMap(
                (reisemåte) =>
                    reisemåte?.hvilkeTransportmidlerBleBenyttet?.verdier.map((v) => v.verdi) ?? []
            );

            if (transportmidlerBenyttet.includes('OFFENTLIG_TRANSPORT')) {
                behov.push({ type: VedleggstypeReiseTilSamling.UTGIFTER_OFFENTLIG_TRANSPORT });
            }

            if (transportmidlerBenyttet.includes('DROSJE')) {
                behov.push({ type: VedleggstypeReiseTilSamling.UTGIFTER_TAXI });
            }

            if (reisemåter.some((reisemåte) => reisemåte?.drosje?.harTTKort?.verdi === 'JA')) {
                behov.push({ type: VedleggstypeReiseTilSamling.TT_KORT });
            }

            if (barnOgSærligeBehov?.harSærligeBehovForFlereHjemreiser?.verdi === 'JA') {
                behov.push({
                    type: VedleggstypeReiseTilSamling.SKRIFTLIG_UTTALELSE_HELSEPERSONELL_REISE_TIL_SAMLING,
                });
            }

            return behov;
        }, [reiser, barnOgSærligeBehov?.harSærligeBehovForFlereHjemreiser?.verdi]);

        const resetSøknad = () => {
            settHarBekreftet(initialHarBekreftet());
            settHovedytelse(initialHovedytelse());
            settAktivitet(initialAktivitet());
            settAdresser(initialAdresser());
            settBarnOgSærligeBehov(initialBarnOgSærligeBehov());
            settReiser(initialReiser());
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
            barnOgSærligeBehov,
            settBarnOgSærligeBehov,
            reiser,
            settReiser,
            dokumentasjonsbehov,
            dokumentasjon,
            settDokumentasjon,
            resetSøknad,
        };
    });

export {
    ReiseOppstartAvslutningHjemreiseSøknadProvider,
    useReiseOppstartAvslutningHjemreiseSøknad,
};
