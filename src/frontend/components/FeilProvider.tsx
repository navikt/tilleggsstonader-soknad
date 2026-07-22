import { useEffect, useState } from 'react';

import { Feilside } from './Feilside';
import { settGlobalFeilHandler } from '../api/globalFeil';

export const FeilProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [harFeil, settHarFeil] = useState(false);

    useEffect(() => {
        settGlobalFeilHandler(() => settHarFeil(true));
        return () => settGlobalFeilHandler(() => {});
    }, []);

    if (harFeil) {
        return <Feilside />;
    }
    return <>{children}</>;
};
