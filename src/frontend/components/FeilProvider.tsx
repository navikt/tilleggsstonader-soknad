import { useEffect, useState } from 'react';
import { settGlobalFeilHandler } from '../api/globalFeil';
import { Feilside } from './Feilside';

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
