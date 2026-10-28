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
import { DokumentasjonFelt, Dokumentasjonsbehov, VedleggstypeROAH } from '../../typer/skjema';
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
            const behov: Dokumentasjonsbehov[] = [{ type: VedleggstypeROAH.UTGIFTER_ROAH }];

            const reisemåter = reiser.map((reise) => reise.reisemåte);

            if (reisemåter.some((reisemåte) => reisemåte?.drosje?.harTTKort?.verdi === 'JA')) {
                behov.push({ type: VedleggstypeROAH.TT_KORT_ROAH });
            }

            if (barnOgSærligeBehov?.harSærligeBehovForFlereHjemreiser?.verdi === 'JA') {
                behov.push({
                    type: VedleggstypeROAH.SÆRLIGE_BEHOV_ROAH,
                });
            }

            if (
                reisemåter.some(
                    (reisemåte) =>
                        reisemåte?.unntakFraOffentligTransport?.årsaker?.verdier.some(
                            (v) => v.verdi === 'HELSEMESSIGE_ÅRSAKER'
                        ) ||
                        reisemåte?.unntakFraPrivatBil?.verdier.some(
                            (v) => v.verdi === 'HELSEMESSIGE_ÅRSAKER'
                        )
                )
            ) {
                behov.push({
                    type: VedleggstypeROAH.SKRIFTLIG_UTTALELSE_HELSEPERSONELL_ROAH,
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
