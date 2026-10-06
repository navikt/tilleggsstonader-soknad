import { useMemo, useState } from 'react';

import createUseContext from 'constate';

import {
    initialAktivitet,
    initialDokumentasjon,
    initialHarBekreftet,
    initialHovedytelse,
    initialAvreiseadresse,
    initialSamlinger,
} from './reiseTilSamlingInitialState';
import {
    DokumentasjonFelt,
    Dokumentasjonsbehov,
    VedleggstypeReiseTilSamling,
} from '../../typer/skjema';
import { Adresse, Avreiseadresse, Hovedytelse, Samling } from '../../typer/søknad';
import { skalViseLønnetTiltak } from '../steg/2-aktivitet/synlighet';
import { AktivitetReiseTilSamling, TilleggsopplysningerAnnenAktivitet } from '../typer/aktivitet';

const [ReiseTilSamlingSøknadProvider, useReiseTilSamlingSøknad] = createUseContext(() => {
    ReiseTilSamlingSøknadProvider.displayName = 'SØKNAD_REISE_TIL_SAMLING_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(initialHarBekreftet());
    const [hovedytelse, settHovedytelse] = useState<Hovedytelse | undefined>(initialHovedytelse());
    const [aktivitet, settAktivitet] = useState<AktivitetReiseTilSamling>(initialAktivitet());
    const [samlinger, settSamlinger] = useState<Samling[]>(initialSamlinger());
    const [avreiseadresse, settAvreiseadresse] = useState<Avreiseadresse>(initialAvreiseadresse());

    const [dokumentasjon, settDokumentasjon] =
        useState<DokumentasjonFelt[]>(initialDokumentasjon());

    const resetSøknad = () => {
        settHarBekreftet(initialHarBekreftet());
        settHovedytelse(initialHovedytelse());
        settAktivitet(initialAktivitet());
        settSamlinger(initialSamlinger());
        settAvreiseadresse(initialAvreiseadresse());
        settDokumentasjon(initialDokumentasjon());
    };

    const oppdaterAktivitet = (oppdatering: Partial<AktivitetReiseTilSamling>) => {
        settAktivitet((prev) => ({
            ...prev,
            ...oppdatering,
        }));
    };

    // Lønnet tiltak-spørsmålet skal ikke stilles for enkelte hovedytelser.
    // Når hovedytelsen endres til kun å inneholde slike ytelser, må et evt.
    // tidligere lagret svar fjernes, så det ikke blir med i innsendingen.
    const oppdaterHovedytelse = (nyHovedytelse: Hovedytelse) => {
        settHovedytelse(nyHovedytelse);
        settAktivitet((prev) =>
            skalViseLønnetTiltak(prev.annenAktivitetTypeUtdanning, nyHovedytelse)
                ? prev
                : { ...prev, lønnetAktivitet: undefined }
        );
    };

    const dokumentasjonsbehov = useMemo((): Dokumentasjonsbehov[] => {
        const behov: Dokumentasjonsbehov[] = [
            { type: VedleggstypeReiseTilSamling.BEKREFTELSE_SAMLINGER },
        ];

        const reisemåter = samlinger.map((samling) => samling.reisemåte);
        const transportmidlerBenyttet = reisemåter.flatMap(
            (reisemåte) =>
                reisemåte?.hvilkeTransportmidlerBleBenyttet?.verdier.map((v) => v.verdi) ?? []
        );

        if (transportmidlerBenyttet.includes('OFFENTLIG_TRANSPORT')) {
            behov.push({ type: VedleggstypeReiseTilSamling.UTGIFTER_OFFENTLIG_TRANSPORT });
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
                type: VedleggstypeReiseTilSamling.SKRIFTLIG_UTTALELSE_HELSEPERSONELL_REISE_TIL_SAMLING,
            });
        }

        if (transportmidlerBenyttet.includes('DROSJE')) {
            behov.push({ type: VedleggstypeReiseTilSamling.UTGIFTER_TAXI });
        }
        if (reisemåter.some((reisemåte) => reisemåte?.drosje?.harTTKort?.verdi === 'JA')) {
            behov.push({ type: VedleggstypeReiseTilSamling.TT_KORT });
        }

        return behov;
    }, [samlinger]);

    const oppdaterTilleggsopplysninger = (
        oppdatering: Partial<TilleggsopplysningerAnnenAktivitet>
    ) => {
        settAktivitet((prev) => ({
            ...prev,
            tilleggsopplysningerAnnenAktivitet: {
                erLærlingEllerLiknende:
                    prev.tilleggsopplysningerAnnenAktivitet?.erLærlingEllerLiknende,
                fårDekketReise: prev.tilleggsopplysningerAnnenAktivitet?.fårDekketReise,
                erUnder25År: prev.tilleggsopplysningerAnnenAktivitet?.erUnder25År,
                måBetaleForReiseTilSkole:
                    prev.tilleggsopplysningerAnnenAktivitet?.måBetaleForReiseTilSkole,
                ...oppdatering,
            },
        }));
    };

    const settAdresseDetSkalReisesFra = (oppdatering: Partial<Adresse>) => {
        settAvreiseadresse((prev) => ({
            ...prev,
            adresseDetSkalReisesFra: { ...prev.adresseDetSkalReisesFra, ...oppdatering },
        }));
    };

    return {
        harBekreftet,
        settHarBekreftet,
        hovedytelse,
        oppdaterHovedytelse,
        aktivitet,
        settAktivitet,
        oppdaterAktivitet,
        oppdaterTilleggsopplysninger,
        samlinger,
        settSamlinger,
        avreiseadresse,
        settAvreiseadresse,
        settAdresseDetSkalReisesFra,
        dokumentasjonsbehov,
        dokumentasjon,
        settDokumentasjon,
        resetSøknad,
    };
});

export { ReiseTilSamlingSøknadProvider, useReiseTilSamlingSøknad };
