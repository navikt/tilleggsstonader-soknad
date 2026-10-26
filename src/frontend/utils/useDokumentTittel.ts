import { useEffect } from 'react';

import { useSpråk } from '../context/SpråkContext';
import { skjematypeTilSkjemainfo } from '../typer/skjemanavn';
import { Skjematype } from '../typer/skjematyper';

export const useDokumentTittel = (skjematype: Skjematype) => {
    const { locale } = useSpråk();

    useEffect(() => {
        document.title = skjematypeTilSkjemainfo[skjematype].dokumentTittel[locale];
    }, [locale, skjematype]);
};
