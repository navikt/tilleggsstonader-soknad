import { useState, useEffect } from 'react';

import { hentBehandlingStatus } from '../../api/api';
import { Stønadstype } from '../../typer/stønadstyper';

const useSjekkBehandlingStatus = (stonadstype: Stønadstype) => {
    const [harBehandling, setHarBehandling] = useState<boolean | false>(false);
    const [status, setStatus] = useState<boolean | false>(false);

    useEffect(() => {
        hentBehandlingStatus(stonadstype)
            .then(setHarBehandling)
            .catch(() => {
                setHarBehandling(false);
            })
            .finally(() => {
                setStatus(true);
            });
    }, [stonadstype]);
    return { harBehandling, status };
};

export default useSjekkBehandlingStatus;
