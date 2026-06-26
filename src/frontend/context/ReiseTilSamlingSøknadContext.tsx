import { useMemo, useState } from 'react';

import createUseContext from 'constate';

import {
    DokumentasjonFelt,
    Dokumentasjonsbehov,
    VedleggstypeReiseTilSamling,
} from '../typer/skjema';
import {
    Aktivitet,
    Aktivitetsadresse,
    Avreiseadresse,
    Hovedytelse,
    Reiseavstand,
    Reisemåte,
    Samling,
} from '../typer/søknad';

const initialSamlinger = (): Samling[] => [{ _id: 1, lagret: false }];
const initialReiseavstand = (): Reiseavstand => ({ aktivitetsadresse: {} });

const [ReiseTilSamlingSøknadProvider, useReiseTilSamlingSøknad] = createUseContext(() => {
    ReiseTilSamlingSøknadProvider.displayName = 'SØKNAD_REISE_TIL_SAMLING_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(false);
    const [hovedytelse, settHovedytelse] = useState<Hovedytelse>();
    const [aktivitet, settAktivitet] = useState<Aktivitet>();
    const [samlinger, settSamlinger] = useState<Samling[]>(initialSamlinger());
    const [reiseavstand, settReiseavstand] = useState<Reiseavstand>(initialReiseavstand());
    const [reisemåte, settReisemåte] = useState<Reisemåte | undefined>(undefined);
    const dokumentasjonsbehov = useMemo((): Dokumentasjonsbehov[] => {
        const behov: Dokumentasjonsbehov[] = [
            { type: VedleggstypeReiseTilSamling.BEKREFTELSE_SAMLINGER },
        ];
        if (reisemåte?.kanReiseKollektivt?.verdi === 'JA') {
            behov.push({ type: VedleggstypeReiseTilSamling.UTGIFTER_OFFENTLIG_TRANSPORT });
        }
        return behov;
    }, [reisemåte?.kanReiseKollektivt?.verdi]);
    const [dokumentasjon, settDokumentasjon] = useState<DokumentasjonFelt[]>([]);

    const resetSøknad = () => {
        settHarBekreftet(false);
        settHovedytelse(undefined);
        settAktivitet(undefined);
        settSamlinger(initialSamlinger());
        settReiseavstand(initialReiseavstand());
        settReisemåte(undefined);
        settDokumentasjon([]);
    };

    const settAktivitetsadresse = (oppdatering: Partial<Aktivitetsadresse>) => {
        settReiseavstand((prev) => ({
            ...prev,
            aktivitetsadresse: { ...prev.aktivitetsadresse, ...oppdatering },
        }));
    };

    const settAdresseDuSkalReiseFra = (oppdatering: Partial<Avreiseadresse>) => {
        settReiseavstand((prev) => ({
            ...prev,
            adresseDuSkalReiseFra: { ...prev.adresseDuSkalReiseFra, ...oppdatering },
        }));
    };

    return {
        harBekreftet,
        settHarBekreftet,
        hovedytelse,
        settHovedytelse,
        aktivitet,
        settAktivitet,
        samlinger,
        settSamlinger,
        reiseavstand,
        settReiseavstand,
        settAktivitetsadresse,
        settAdresseDuSkalReiseFra,
        reisemåte,
        settReisemåte,
        dokumentasjonsbehov,
        dokumentasjon,
        settDokumentasjon,
        resetSøknad,
    };
});

export { ReiseTilSamlingSøknadProvider, useReiseTilSamlingSøknad };
