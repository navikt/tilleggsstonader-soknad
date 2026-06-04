import { useState, useEffect } from 'react';

import { hentBehandlingStatus } from '../../api/api';
import { Skjematype } from '../../typer/skjematyper';

export const useSjekkBehandlingStatus = (stonadstype: Skjematype) => {
    const [harBehandling, setHarBehandling] = useState<boolean>(false);
    const [harLastetBehandlingsstatus, setHarLastetBehandlingsstatus] = useState<boolean>(false);

    useEffect(() => {
        hentBehandlingStatus(stonadstype)
            .then(setHarBehandling)
            .catch(() => {
                setHarBehandling(false);
            })
            .finally(() => {
                setHarLastetBehandlingsstatus(true);
            });
    }, [stonadstype]);
    return { harBehandling, harLastetBehandlingsstatus };
};
