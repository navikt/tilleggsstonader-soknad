import { useMemo, useState } from 'react';

import createUseContext from 'constate';

import { DokumentasjonFelt, VedleggstypeLæremidler } from '../../typer/skjema';
import { Hovedytelse } from '../../typer/søknad';
import { Utdanning } from '../typer/søknad';

const [LæremidlerSøknadProvider, useLæremidlerSøknad] = createUseContext(() => {
    LæremidlerSøknadProvider.displayName = 'SØKNAD_LÆREMIDLER_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(false);
    const [hovedytelse, settHovedytelse] = useState<Hovedytelse>();
    const [utdanning, settUtdanning] = useState<Utdanning>();
    const dokumentasjonsbehov = useMemo(() => {
        const harFunksjonsnedsettelse = utdanning?.harFunksjonsnedsettelse;
        if (harFunksjonsnedsettelse && harFunksjonsnedsettelse.verdi === 'JA') {
            return [
                { type: VedleggstypeLæremidler.DOKUMENTASJON_FUNKSJONSNEDSETTELSE },
                { type: VedleggstypeLæremidler.UTGIFTER_LÆREMIDLER },
            ];
        }
        return [];
    }, [utdanning?.harFunksjonsnedsettelse]);
    const [dokumentasjon, settDokumentasjon] = useState<DokumentasjonFelt[]>([]);

    const resetSøknad = () => {
        settHarBekreftet(false);
        settHovedytelse(undefined);
        settUtdanning(undefined);
        settDokumentasjon([]);
    };

    return {
        harBekreftet,
        settHarBekreftet,
        hovedytelse,
        settHovedytelse,
        utdanning,
        settUtdanning,
        dokumentasjonsbehov,
        dokumentasjon,
        settDokumentasjon,
        resetSøknad,
    };
});

export { LæremidlerSøknadProvider, useLæremidlerSøknad };
