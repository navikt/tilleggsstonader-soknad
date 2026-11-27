import { useState } from 'react';

import { Ytelse } from './typer';
import { validerHovedytelse } from './validering';
import { useSpråk } from '../../context/SpråkContext';
import { EnumFlereValgFelt } from '../../typer/skjema';
import { ArbeidOgOpphold, Hovedytelse } from '../../typer/søknad';
import { Valideringsfeil } from '../../typer/validering';

export const defaultArbeidOgOpphold: ArbeidOgOpphold = {
    oppholdUtenforNorgeSiste12mnd: [],
    oppholdUtenforNorgeNeste12mnd: [],
};

export const useHovedytelse = (hovedytelse: Hovedytelse | undefined) => {
    const { locale } = useSpråk();

    const [ytelse, settYtelse] = useState<EnumFlereValgFelt<Ytelse> | undefined>(
        hovedytelse?.ytelse
    );
    const [arbeidOgOpphold, settArbeidOgOpphold] = useState<ArbeidOgOpphold>(
        hovedytelse?.arbeidOgOpphold || defaultArbeidOgOpphold
    );

    const valider = (): Valideringsfeil => validerHovedytelse(ytelse, arbeidOgOpphold, locale);

    const utfyltHovedytelse: Hovedytelse | undefined =
        ytelse !== undefined ? { ytelse, arbeidOgOpphold } : undefined;

    return {
        ytelse,
        settYtelse,
        arbeidOgOpphold,
        settArbeidOgOpphold,
        valider,
        utfyltHovedytelse,
    };
};

export type HovedytelseTilstand = ReturnType<typeof useHovedytelse>;
