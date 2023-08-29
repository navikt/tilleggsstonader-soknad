import React from 'react';

import { Radio as RadioAksel, RadioProps } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { Radio, TekstElement } from '../../typer/tekst';

const LocaleRadio: React.FC<{ tekst: TekstElement<Radio> } & Omit<RadioProps, 'children'>> = (
    props
) => {
    const { tekst, ...rest } = props;

    const { locale } = useSpråk();

    return <RadioAksel {...rest}>{tekst[locale]}</RadioAksel>;
};

export default LocaleRadio;
