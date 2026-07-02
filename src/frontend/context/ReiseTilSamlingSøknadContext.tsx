import { useMemo, useState } from 'react';

import createUseContext from 'constate';

import {
    initialAktivitet,
    initialDokumentasjon,
    initialHarBekreftet,
    initialHovedytelse,
    initialReiseavstand,
    initialReisemåte,
    initialSamlinger,
    initialTilleggsopplysninger,
} from './reiseTilSamlingInitialState';
import {
    AktivitetReiseTilSamling,
    TilleggsopplysningerAnnenAktivitet,
} from '../reiseTilSamling/typer/aktivitet';
import {
    DokumentasjonFelt,
    Dokumentasjonsbehov,
    VedleggstypeReiseTilSamling,
} from '../typer/skjema';
import {
    Aktivitetsadresse,
    Avreiseadresse,
    Hovedytelse,
    Reiseavstand,
    Reisemåte,
    Samling,
} from '../typer/søknad';

const [ReiseTilSamlingSøknadProvider, useReiseTilSamlingSøknad] = createUseContext(() => {
    ReiseTilSamlingSøknadProvider.displayName = 'SØKNAD_REISE_TIL_SAMLING_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(initialHarBekreftet());
    const [hovedytelse, settHovedytelse] = useState<Hovedytelse | undefined>(initialHovedytelse());
    const [aktivitet, settAktivitet] =
        useState<Omit<AktivitetReiseTilSamling, 'tilleggsopplysningerAnnenAktivitet'>>(
            initialAktivitet()
        );
    const [tilleggsopplysninger, settTilleggsopplysninger] = useState<
        TilleggsopplysningerAnnenAktivitet | undefined
    >(initialTilleggsopplysninger());
    const [samlinger, settSamlinger] = useState<Samling[]>(initialSamlinger());
    const [reiseavstand, settReiseavstand] = useState<Reiseavstand>(initialReiseavstand());
    const [reisemåte, settReisemåte] = useState<Reisemåte | undefined>(initialReisemåte());
    const dokumentasjonsbehov = useMemo((): Dokumentasjonsbehov[] => {
        const behov: Dokumentasjonsbehov[] = [
            { type: VedleggstypeReiseTilSamling.BEKREFTELSE_SAMLINGER },
        ];
        if (reisemåte?.kanReiseKollektivt?.verdi === 'JA') {
            behov.push({ type: VedleggstypeReiseTilSamling.UTGIFTER_OFFENTLIG_TRANSPORT });
        }
        return behov;
    }, [reisemåte?.kanReiseKollektivt?.verdi]);
    const [dokumentasjon, settDokumentasjon] =
        useState<DokumentasjonFelt[]>(initialDokumentasjon());

    const resetSøknad = () => {
        settHarBekreftet(initialHarBekreftet());
        settHovedytelse(initialHovedytelse());
        settAktivitet(initialAktivitet());
        settTilleggsopplysninger(initialTilleggsopplysninger());
        settSamlinger(initialSamlinger());
        settReiseavstand(initialReiseavstand());
        settReisemåte(initialReisemåte());
        settDokumentasjon(initialDokumentasjon());
    };

    const oppdaterAktivitet = (
        oppdatering: Partial<Omit<AktivitetReiseTilSamling, 'tilleggsopplysningerAnnenAktivitet'>>
    ) => {
        settAktivitet((prev) => ({
            ...prev,
            ...oppdatering,
        }));
    };

    const oppdaterTilleggsopplysninger = (
        oppdatering: Partial<TilleggsopplysningerAnnenAktivitet>
    ) => {
        settTilleggsopplysninger((prev) => ({
            erLærlingEllerLiknende: undefined,
            fårDekketReise: undefined,
            erUnder25År: undefined,
            måBetaleForReiseTilSkole: undefined,
            ...prev,
            ...oppdatering,
        }));
    };

    const settAktivitetsadresse = (oppdatering: Partial<Aktivitetsadresse>) => {
        settReiseavstand((prev) => ({
            ...prev,
            aktivitetsadresse: { ...prev.aktivitetsadresse, ...oppdatering },
        }));
    };

    const settAdresseDetSkalReisesFra = (oppdatering: Partial<Avreiseadresse>) => {
        settReiseavstand((prev) => ({
            ...prev,
            adresseDetSkalReisesFra: { ...prev.adresseDetSkalReisesFra, ...oppdatering },
        }));
    };

    return {
        harBekreftet,
        settHarBekreftet,
        hovedytelse,
        settHovedytelse,
        aktivitet,
        settAktivitet,
        oppdaterAktivitet,
        tilleggsopplysninger,
        settTilleggsopplysninger,
        oppdaterTilleggsopplysninger,
        samlinger,
        settSamlinger,
        reiseavstand,
        settReiseavstand,
        settAktivitetsadresse,
        settAdresseDetSkalReisesFra,
        reisemåte,
        settReisemåte,
        dokumentasjonsbehov,
        dokumentasjon,
        settDokumentasjon,
        resetSøknad,
    };
});

export { ReiseTilSamlingSøknadProvider, useReiseTilSamlingSøknad };
