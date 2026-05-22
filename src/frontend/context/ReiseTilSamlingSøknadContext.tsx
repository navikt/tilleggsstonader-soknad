import { useState } from 'react';

import createUseContext from 'constate';

import { Aktivitet, Aktivitetsadresse, Hovedytelse, Reiseavstand, Samling } from '../typer/søknad';

const initialSamlinger = (): Samling[] => [{ _id: 1, lagret: false }];
const initialReiseavstand = (): Reiseavstand => ({ aktivitetsadresse: {} });

const [ReiseTilSamlingSøknadProvider, useReiseTilSamlingSøknad] = createUseContext(() => {
    ReiseTilSamlingSøknadProvider.displayName = 'SØKNAD_REISE_TIL_SAMLING_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(false);
    const [hovedytelse, settHovedytelse] = useState<Hovedytelse>();
    const [aktivitet, settAktivitet] = useState<Aktivitet>();
    const [samlinger, settSamlinger] = useState<Samling[]>(initialSamlinger());
    const [reiseavstand, settReiseavstand] = useState<Reiseavstand>(initialReiseavstand());

    const resetSøknad = () => {
        settHarBekreftet(false);
        settHovedytelse(undefined);
        settAktivitet(undefined);
        settSamlinger(initialSamlinger());
        settReiseavstand(initialReiseavstand());
    };

    const settAktivitetsadresse = (oppdatering: Partial<Aktivitetsadresse>) => {
        settReiseavstand((prev) => ({
            ...prev,
            aktivitetsadresse: { ...prev.aktivitetsadresse, ...oppdatering },
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
        resetSøknad,
    };
});

export { ReiseTilSamlingSøknadProvider, useReiseTilSamlingSøknad };
