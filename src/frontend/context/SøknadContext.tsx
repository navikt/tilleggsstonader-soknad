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
            type: Vedleggstype.UTGIFTER_PASS_ANNET,
            label: 'label',
            harSendtInn: false,
            opplastedeVedlegg: [],
            barnId: 'Ronja',
        },
        {
            type: Vedleggstype.UTGIFTER_PASS_SFO_AKS_BARNEHAGE,
            label: 'label',
            harSendtInn: false,
            opplastedeVedlegg: [],
            barnId: 'Espen',
        },

        {
            type: Vedleggstype.EKSTRA_PASS_BEHOV,
            label: 'label',
            harSendtInn: false,
            opplastedeVedlegg: [],
            barnId: 'Espen',
        },
    ]);

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
    };
});

export { SøknadProvider, useSøknad };
