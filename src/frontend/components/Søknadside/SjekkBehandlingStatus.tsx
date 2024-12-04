import { useState, useEffect } from 'react';

import { hentBehandlingStatus } from '../../api/api';
import { Stønadstype } from '../../typer/stønadstyper';

const useSjekkBehandlingStatus = (stonadstype: Stønadstype) => {
    const [harBehandling, setHarBehandling] = useState<boolean | false>(false);

    useEffect(() => {
        hentBehandlingStatus(stonadstype)
            .then(setHarBehandling)
            .catch(() => {
                setHarBehandling(false);
            });
    }, [stonadstype]);
    return { harBehandling };
};

export default useSjekkBehandlingStatus;
