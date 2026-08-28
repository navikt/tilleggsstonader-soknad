import { useEffect } from 'react';

import { useSpråk } from '../context/SpråkContext';
import { teksterStønad } from '../tekster/stønad';
import type { Skjematype } from '../typer/skjematyper';

export const useDokumentTittel = (skjematype: Skjematype) => {
    const { locale } = useSpråk();

    useEffect(() => {
        document.title = teksterStønad.tittelHtml[skjematype][locale];
    }, [locale, skjematype]);
};
