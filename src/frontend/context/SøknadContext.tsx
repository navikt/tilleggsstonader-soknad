import { useState } from 'react';

import createUseContext from 'constate';

import { Barnepass } from '../typer/barn';
import { DokumentasjonFelt, Vedleggstype } from '../typer/skjema';
import { Aktivitet, Hovedytelse } from '../typer/søknad';

const [SøknadProvider, useSøknad] = createUseContext(() => {
    SøknadProvider.displayName = 'SØKNAD_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(false);

    const [hovedytelse, settHovedytelse] = useState<Hovedytelse>();
    const [aktivitet, settAktivitet] = useState<Aktivitet>();

    const [barnMedBarnepass, settBarnMedBarnepass] = useState<Barnepass[]>([]);
    const [dokumentasjon, settDokumentasjon] = useState<DokumentasjonFelt[]>([
        {
            type: Vedleggstype.UTGIFTER_PASS_SFO_AKS_BARNEHAGE,
            label: 'Faktura fra SFO/AKS for Spontan',
            harSendtInn: false,
            opplastedeVedlegg: [],
            barnId: 'Spontan',
        },
        {
            type: Vedleggstype.UTGIFTER_PASS_ANNET,
            label: 'Dokumentasjon på utgifter for privat barnepasser for Ru',
            harSendtInn: false,
            opplastedeVedlegg: [],
            barnId: 'Ru',
        },

        {
            type: Vedleggstype.EKSTRA_PASS_BEHOV,
            label: 'Skriftlig uttalelse fra helsepersonell for Ru',
            harSendtInn: false,
            opplastedeVedlegg: [],
            barnId: 'Ru',
        },
    ]);

    const [innsentTidspunkt, settInnsentTidspunkt] = useState<string>();

    return {
        harBekreftet,
        settHarBekreftet,
        hovedytelse,
        settHovedytelse,
        barnMedBarnepass,
        settBarnMedBarnepass,
        aktivitet,
        settAktivitet,
        dokumentasjon,
        settDokumentasjon,
        innsentTidspunkt,
        settInnsentTidspunkt,
    };
});

export { SøknadProvider, useSøknad };
