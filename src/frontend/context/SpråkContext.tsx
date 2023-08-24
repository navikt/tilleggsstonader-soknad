import { useState } from 'react';

import createUseContext from 'constate';

import { Locale } from '../typer/tekst';

const [SpråkProvider, useSpråk] = createUseContext(() => {
    const [locale, settLocale] = useState<Locale>('nb');
    SpråkProvider.displayName = 'SPRÅK_PROVIDER';

    return { locale, settLocale };
});

export { SpråkProvider, useSpråk };
