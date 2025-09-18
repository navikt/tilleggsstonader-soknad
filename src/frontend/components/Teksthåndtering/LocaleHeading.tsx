import React from 'react';

import { Heading, HeadingProps } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { TekstElement } from '../../typer/tekst';

interface LocaleHeadingProps extends Omit<HeadingProps, 'children'> {
    tekst: TekstElement<string>;
}

export const LocaleHeading: React.FC<LocaleHeadingProps> = ({ tekst, ...headingProps }) => {
    const { locale } = useSpråk();

    return <Heading {...headingProps}>{tekst[locale]}</Heading>;
};
