import { useMemo, useState } from 'react';

import createUseContext from 'constate';

import {
    initialDokumentasjon,
    initialHarBekreftet,
    initialHovedytelse,
} from './flyttingInitialState';
import { Dokumentasjonsbehov, VedleggstypeFlytting } from '../../typer/skjema';
import { DokumentasjonFelt } from '../../typer/skjema';
import { Hovedytelse } from '../../typer/søknad';
import { FlyttingDetaljer } from '../typer/flyttingDetaljer';

const [FlyttingSøknadProvider, useFlyttingSøknad] = createUseContext(() => {
    FlyttingSøknadProvider.displayName = 'SØKNAD_FLYTTING_PROVIDER';
    const [harBekreftet, settHarBekreftet] = useState<boolean>(initialHarBekreftet());
    const [hovedytelse, settHovedytelse] = useState<Hovedytelse | undefined>(initialHovedytelse());
    const [dokumentasjon, settDokumentasjon] =
        useState<DokumentasjonFelt[]>(initialDokumentasjon());
    const [flyttingDetaljer, settFlyttingDetaljer] = useState<FlyttingDetaljer>();

    const flytteÅrsak = flyttingDetaljer?.årsak?.verdi;
    const flyttemåte = flyttingDetaljer?.flyttemåte?.verdi;

    const dokumentasjonsbehov = useMemo(() => {
        const behov: Dokumentasjonsbehov[] = [];

        switch (flyttemåte) {
            case 'FLYTTER_SELV':
                behov.push({ type: VedleggstypeFlytting.UTGIFTER_EGEN_FLYTTING });
                break;
            case 'FLYTTEBYRÅ':
                behov.push(
                    { type: VedleggstypeFlytting.TILBUD_FLYTTEBYRÅ_1 },
                    { type: VedleggstypeFlytting.TILBUD_FLYTTEBYRÅ_2 }
                );
                break;
        }

        if (flytteÅrsak === 'NY_JOBB') {
            behov.push({ type: VedleggstypeFlytting.ARBEIDSKONTRAKT_FLYTTING });
        }

        return behov;
    }, [flytteÅrsak, flyttemåte]);

    const resetSøknad = () => {
        settHarBekreftet(initialHarBekreftet());
        settHovedytelse(initialHovedytelse());
        settDokumentasjon(initialDokumentasjon());
        settFlyttingDetaljer(undefined);
    };

    return {
        harBekreftet,
        settHarBekreftet,
        hovedytelse,
        settHovedytelse,
        dokumentasjon,
        settDokumentasjon,
        flyttingDetaljer,
        settFlyttingDetaljer,
        dokumentasjonsbehov,
        resetSøknad,
    };
});

export { FlyttingSøknadProvider, useFlyttingSøknad };
