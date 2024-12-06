import { useState, useEffect } from 'react';

import { hentBehandlingStatus } from '../../api/api';
import { Stønadstype } from '../../typer/stønadstyper';

const useSjekkBehandlingStatus = (stonadstype: Stønadstype) => {
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

export default useSjekkBehandlingStatus;
