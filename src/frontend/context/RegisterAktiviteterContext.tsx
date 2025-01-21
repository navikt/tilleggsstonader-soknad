import { useEffect, useState } from 'react';

import constate from 'constate';

import { hentArbeidsrettedeAktiviteter } from '../api/api';
import { mapTilRegisterAktiviteterObjektMedLabel } from '../components/Aktivitet/registerAktivitetUtil';
import { RegisterAktivitetMedLabel } from '../typer/registerAktivitet';
import { Stønadstype } from '../typer/stønadstyper';

interface Props {
    stønadstype: Stønadstype;
}

const [RegisterAktiviteterProvider, useRegisterAktiviteter] = constate(({ stønadstype }: Props) => {
    RegisterAktiviteterProvider.displayName = 'AKTIVITETER_PROVIDER';

    const [registerAktiviteter, settRegisterAktiviteter] =
        useState<Record<string, RegisterAktivitetMedLabel>>();

    useEffect(() => {
        hentArbeidsrettedeAktiviteter(stønadstype)
            .then((arbeidsrettedeAktiviteter) =>
                settRegisterAktiviteter(
                    mapTilRegisterAktiviteterObjektMedLabel(arbeidsrettedeAktiviteter)
                )
            )
            .catch(() => settRegisterAktiviteter({}));
    }, [stønadstype]);

    return {
        registerAktiviteter,
    };
});

export { RegisterAktiviteterProvider, useRegisterAktiviteter };
