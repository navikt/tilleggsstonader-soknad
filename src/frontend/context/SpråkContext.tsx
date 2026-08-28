import createUseContext from 'constate';
import { useState } from 'react';

import { Locale } from '../typer/tekst';

const [SpråkProvider, useSpråk] = createUseContext(() => {
    const [locale, settLocale] = useState<Locale>(Locale.NB);
    SpråkProvider.displayName = 'SPRÅK_PROVIDER';

    return { locale, settLocale };
});

export { SpråkProvider, useSpråk };
