import React from 'react';

import { SkjemaRouting } from '../components/SkjemaRouting/SkjemaRouting';
import { SkjematypeFyllUt } from '../typer/stønadstyper';

/**
 * Boutgifter-appen redirecter alltid brukeren til ny eller gammel fyllut-søknad.
 * Viser aldri noe innhold selv.
 */
export function BoutgifterApp() {
    return <SkjemaRouting skjematypeFyllUt={SkjematypeFyllUt.SØKNAD_BOUTGIFTER} />;
}
