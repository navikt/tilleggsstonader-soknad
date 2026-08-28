import constate from 'constate';
import { useEffect, useState } from 'react';

import { hentArbeidsrettedeAktiviteter } from '../api/api';
import { mapTilRegisterAktiviteterObjektMedLabel } from '../components/Aktivitet/registerAktivitetUtil';
import type { RegisterAktivitetMedLabel } from '../typer/registerAktivitet';
import type { Skjematype } from '../typer/skjematyper';

interface Props {
    skjematype: Skjematype;
}

const [RegisterAktiviteterProvider, useRegisterAktiviteter] = constate(({ skjematype }: Props) => {
    RegisterAktiviteterProvider.displayName = 'AKTIVITETER_PROVIDER';

    const [registerAktiviteter, settRegisterAktiviteter] =
        useState<Record<string, RegisterAktivitetMedLabel>>();

    useEffect(() => {
        hentArbeidsrettedeAktiviteter(skjematype)
            .then((arbeidsrettedeAktiviteter) =>
                settRegisterAktiviteter(
                    mapTilRegisterAktiviteterObjektMedLabel(arbeidsrettedeAktiviteter)
                )
            )
            .catch(() => {
                settRegisterAktiviteter({});
            });
    }, [skjematype]);

    return {
        registerAktiviteter
    };
});

export { RegisterAktiviteterProvider, useRegisterAktiviteter };
