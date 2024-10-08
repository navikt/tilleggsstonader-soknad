import { useEffect, useState } from 'react';

import createUseContext from 'constate';

import { hentArbeidsrettedeAktiviteter } from '../api/api';
import { mapTilRegisterAktiviteterObjektMedLabel } from '../components/Aktivitet/registerAktivitetUtil';
import { RegisterAktivitetMedLabel } from '../typer/registerAktivitet';

const [RegisterAktiviteterProvider, useRegisterAktiviteter] = createUseContext(() => {
    RegisterAktiviteterProvider.displayName = 'AKTIVITETER_PROVIDER';

    const [registerAktiviteter, settRegisterAktiviteter] =
        useState<Record<string, RegisterAktivitetMedLabel>>();

    useEffect(() => {
        hentArbeidsrettedeAktiviteter()
            .then((arbeidsrettedeAktiviteter) =>
                settRegisterAktiviteter(
                    mapTilRegisterAktiviteterObjektMedLabel(arbeidsrettedeAktiviteter)
                )
            )
            .catch(() => settRegisterAktiviteter({}));
    }, []);

    return {
        registerAktiviteter,
    };
});

export { RegisterAktiviteterProvider, useRegisterAktiviteter };
