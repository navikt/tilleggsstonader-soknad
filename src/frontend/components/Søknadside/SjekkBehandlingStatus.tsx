import { useState, useEffect } from 'react';

import { hentBehandlingStatus } from '../../api/api';
import { Stønadstype } from '../../typer/stønadstyper';

const useSjekkBehandlingStatus = (stonadstype: Stønadstype) => {
    const [harBehandling, setHarBehandling] = useState<boolean | false>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const sjekkBehandlingStatus = async () => {
            setLoading(true);
            try {
                const data = await hentBehandlingStatus(stonadstype);
                setHarBehandling(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        sjekkBehandlingStatus();
    }, [stonadstype]);
    return { harBehandling, loading, error };
};

export default useSjekkBehandlingStatus;
