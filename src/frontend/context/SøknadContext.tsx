import { useState } from 'react';

import createUseContext from 'constate';

import Environment from '../api/Environment';
import { mellomlagreSøknad } from '../api/mellomlagring';
import { MellomlagringSøknadTilsynBarn } from '../barnetilsyn/søknad';
import { useDidMountEffect } from '../hooks/useDidMountEffect';
import { Barnepass } from '../typer/barn';
import { DokumentasjonFelt, Dokumentasjonsbehov } from '../typer/skjema';
import { Aktivitet, Hovedytelse } from '../typer/søknad';
import { Valideringsfeil } from '../typer/validering';

interface Props {
    mellomlagring?: MellomlagringSøknadTilsynBarn;
}

export const [SøknadProvider, useSøknad] = createUseContext(({ mellomlagring }: Props) => {
    SøknadProvider.displayName = 'SØKNAD_PROVIDER';
    const [side, settSide] = useState<string>('');

    const [harBekreftet, settHarBekreftet] = useState<boolean>(!!mellomlagring);

    const [hovedytelse, settHovedytelse] = useState<Hovedytelse | undefined>(
        mellomlagring?.hovedytelse
    );
    const [aktivitet, settAktivitet] = useState<Aktivitet | undefined>(mellomlagring?.aktivitet);

    const [barnMedBarnepass, settBarnMedBarnepass] = useState<Barnepass[]>([]);

    const [dokumentasjonsbehov, settDokumentasjonsbehov] = useState<Dokumentasjonsbehov[]>([]);
    const [dokumentasjon, settDokumentasjon] = useState<DokumentasjonFelt[]>([]);

    const [innsentTidspunkt, settInnsentTidspunkt] = useState<string>();

    const [valideringsfeil, settValideringsfeil] = useState<Valideringsfeil>({});

    useDidMountEffect(() => {
        if (Environment().miljø === 'local') {
            const søknad: MellomlagringSøknadTilsynBarn = {
                steg: side,
                hovedytelse: hovedytelse,
                aktivitet: aktivitet,
                dokumentasjon: dokumentasjon,
                dokumentasjonsbehov: dokumentasjonsbehov,
                barnepass: barnMedBarnepass,
            };
            mellomlagreSøknad('tilsyn-barn', søknad);
        }
    }, [side, hovedytelse, aktivitet, dokumentasjon, dokumentasjonsbehov, barnMedBarnepass]);

    return {
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
        innsentTidspunkt,
        settInnsentTidspunkt,
        valideringsfeil,
        settValideringsfeil,
        settSide,
    };
});
