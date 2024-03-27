import { useState } from 'react';

import createUseContext from 'constate';

import { mellomlagreSøknad } from '../api/mellomlagring';
import { MellomlagretSøknadTilsynBarn } from '../barnetilsyn/søknad';
import { useDidMountEffect } from '../hooks/useDidMountEffect';
import { Barnepass } from '../typer/barn';
import { DokumentasjonFelt, Dokumentasjonsbehov } from '../typer/skjema';
import { Aktivitet, Hovedytelse } from '../typer/søknad';
import { Valideringsfeil } from '../typer/validering';

interface Props {
    mellomlagring?: MellomlagretSøknadTilsynBarn;
}

export const [SøknadProvider, useSøknad] = createUseContext(({ mellomlagring }: Props) => {
    SøknadProvider.displayName = 'SØKNAD_PROVIDER';
    const [side, settSide] = useState<string>('');

    const [harBekreftet, settHarBekreftet] = useState<boolean>(!!mellomlagring);

    const [aktivitet, settAktivitet] = useState<Aktivitet | undefined>(mellomlagring?.aktivitet);
    const [hovedytelse, settHovedytelse] = useState<Hovedytelse | undefined>(
        mellomlagring?.hovedytelse
    );

    const [valgteBarnIdenter, settValgteBarnIdenter] = useState<string[]>(
        mellomlagring?.valgteBarn ?? []
    );
    const [barnMedBarnepass, settBarnMedBarnepass] = useState<Barnepass[]>(
        mellomlagring?.barnepass ?? []
    );

    const [dokumentasjonsbehov, settDokumentasjonsbehov] = useState<Dokumentasjonsbehov[]>(
        mellomlagring?.dokumentasjonsbehov ?? []
    );
    const [dokumentasjon, settDokumentasjon] = useState<DokumentasjonFelt[]>(
        mellomlagring?.dokumentasjon ?? []
    );

    const [valideringsfeil, settValideringsfeil] = useState<Valideringsfeil>({});

    const resetSøknad = () => {
        settHovedytelse(undefined);
        settAktivitet(undefined);
        settValgteBarnIdenter([]);
        settBarnMedBarnepass([]);
        settDokumentasjonsbehov([]);
        settDokumentasjon([]);
        settValideringsfeil({});
        settHarBekreftet(false);
    };

    useDidMountEffect(() => {
        if (window.location.hostname === 'localhost') {
            const søknad: MellomlagretSøknadTilsynBarn = {
                steg: side,
                hovedytelse,
                aktivitet,
                dokumentasjon,
                dokumentasjonsbehov,
                valgteBarn: valgteBarnIdenter,
                barnepass: barnMedBarnepass,
            };
            // TODO useDebouncedCallback
            // TODO on error?
            mellomlagreSøknad('tilsyn-barn', søknad);
        }
    }, [side, hovedytelse, aktivitet, dokumentasjon, dokumentasjonsbehov, barnMedBarnepass]);

    return {
        side,
        settSide,
        harBekreftet,
        settHarBekreftet,
        hovedytelse,
        settHovedytelse,
        barnMedBarnepass,
        settBarnMedBarnepass,
        aktivitet,
        settAktivitet,
        dokumentasjonsbehov,
        settDokumentasjonsbehov,
        dokumentasjon,
        settDokumentasjon,
        valideringsfeil,
        settValideringsfeil,
        resetSøknad,
        valgteBarnIdenter,
        settValgteBarnIdenter,
    };
});
