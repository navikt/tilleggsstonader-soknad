import { useState } from 'react';

import createUseContext from 'constate';

import { Valideringsfeil } from '../typer/validering';

const [ValideringsfeilProvider, useValideringsfeil] = createUseContext(() => {
    ValideringsfeilProvider.displayName = 'VALIDERINGSFEIL_PROVIDER';

    const [valideringsfeil, settValideringsfeil] = useState<Valideringsfeil>({});

    const resetValideringsfeil = () => {
        settValideringsfeil({});
    };

    return {
        valideringsfeil,
        settValideringsfeil,
        resetValideringsfeil,
    };
});

export { ValideringsfeilProvider, useValideringsfeil };
